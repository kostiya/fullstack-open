const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})
    response.json(allBlogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    if(!body.title || !body.url) {
        return response.status(400).end()
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    try{
        await Blog.findByIdAndRemove(request.params.id)
    } catch(error){
        if(error.name === 'CastError'){
            return response
                .status(400)
                .send({ error: 'malformatted id' })
        }
    }
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    if(!title || !url) {
        return response.status(400).end()
    }

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
            { title, author, url, likes },
            { new: true, runValidators: true, context: 'query' })
        response.json(updatedBlog)
    } catch(error) {
        if(error.name === 'CastError'){
            return response
                .status(400)
                .send({ error: 'malformatted id' })
        } else {
            return response
                .status(500).end()
        }
    }
})

module.exports = blogRouter