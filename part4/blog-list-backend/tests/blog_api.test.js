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

afterAll(() => {
    mongoose.connection.close()
})