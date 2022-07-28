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

test('blog without likes defaults to 0', async () => {
    const newBlog = {
        title: 'Some new intresting blog',
        author: 'Menashe',
        url: 'https://blog.wordpress.com/',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const newBlogInDB = blogsAtEnd.find(blog => blog.title === newBlog.title)
    expect(newBlogInDB).toBeDefined()
    expect(newBlogInDB.likes).toBe(0)
})

test('sending blog without author or URL returns bad request', async () => {
    const blogWithoutTitle = {
        author: 'Menashe',
        url: 'https://blog.wordpress.com/',
        likes: 1
    }

    const blogWithoutURL = {
        title: 'Some new intresting blog',
        author: 'Menashe',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(blogWithoutURL)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
describe('requesting delete of blog with', () => {
    test('malformated id returnes 400 bad request', async () => {
        const malformattedId = '12a6f3'

        const badId = await api
            .delete(`/api/blogs/${malformattedId}`)
            .expect(400)

        expect(badId.body.error).toBe('malformatted id')
    })

    test('non existent id returnes 204 without changing DB', async () => {
        const nonExistentId = await helper.nonExistingId()

        await api
            .delete(`/api/blogs/${nonExistentId}`)
            .expect(204)

        const blogsAfterinDb = await helper.blogsInDb()
        expect(blogsAfterinDb).toHaveLength(helper.initialBlogs.length)
    })

    test('of existing blog works', async () => {
        const blogsBeforeinDb = await helper.blogsInDb()
        const deletedID = blogsBeforeinDb[0].id
        await api
            .delete(`/api/blogs/${deletedID}`)
            .expect(204)

        const blogsAfterinDb = await helper.blogsInDb()
        expect(blogsAfterinDb)
            .toHaveLength(helper.initialBlogs.length - 1)

        expect(blogsAfterinDb.map(blog => blog.id)).not.toContain(deletedID)

        expect(blogsAfterinDb.map(blog => blog.title)).not.toContain(blogsBeforeinDb[0].title)
    })
})

describe('PUT', () => {
    test('on existent and non existent but correct ID works', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const nonExistentId = await helper.nonExistingId()

        const newBlog = {
            title: 'Some new intresting blog',
            author: 'Menashe',
            url: 'https://blog.wordpress.com/',
            likes: 1
        }

        const secontNewBlog = {
            title: 'Some second new intresting blog',
            author: 'Menashe',
            url: 'https://blog.wordpress.com/',
            likes: 10
        }

        await api
            .put(`/api/blogs/${blogsAtStart[1].id}`)
            .send(newBlog)
            .expect(200)

        await api
            .put(`/api/blogs/${nonExistentId}`)
            .send(secontNewBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles)
            .toContain('Some new intresting blog')
        expect(titles)
            .not.toContain('Some second new intresting blog')
    })

    test('on sending blog without author or URL returns bad request', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogWithoutTitle = {
            author: 'Menashe',
            url: 'https://blog.wordpress.com/',
            likes: 1
        }

        const blogWithoutURL = {
            title: 'Some new intresting blog',
            author: 'Menashe',
            likes: 1
        }

        await api
            .put(`/api/blogs/${blogsAtStart[1]}`)
            .send(blogWithoutTitle)
            .expect(400)

        await api
            .put(`/api/blogs/${blogsAtStart[1]}`)
            .send(blogWithoutURL)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('malformated id returnes 400 bad request', async () => {
        const malformattedId = '12a6f3'

        const newBlog = {
            title: 'Some new intresting blog',
            author: 'Menashe',
            url: 'https://blog.wordpress.com/',
            likes: 1
        }

        const badId = await api
            .put(`/api/blogs/${malformattedId}`)
            .send(newBlog)
            .expect(400)

        expect(badId.body.error).toBe('malformatted id')
    })
})

afterAll(() => {
    mongoose.connection.close()
})