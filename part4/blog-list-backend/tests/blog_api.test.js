const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const promiseArray = helper.initialBlogs
        .map(blog => new Blog(blog).save())
    await Promise.all(promiseArray)
})

test('correct number of blogs return', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body)
        .toHaveLength(helper.initialBlogs.length)
})

test('blogs returned with id parameter', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
        expect(blog._id).not.toBeDefined()
    })
})

test('blog can be added', async () => {
    const newBlog = {
        title: 'Some new intresting blog',
        author: 'Menashe',
        url: 'https://blog.wordpress.com/',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(
        'Some new intresting blog'
    )
})

afterAll(() => {
    mongoose.connection.close()
})