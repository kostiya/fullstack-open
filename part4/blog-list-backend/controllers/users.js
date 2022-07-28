const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

const testInput = async (username, password, response) => {
    let returnResponse = null
    if(!username || !password){
        returnResponse = response.status(400)
            .json({ error: 'No username and/or no password given' })
    }

    if(returnResponse){
        return returnResponse
    }

    if(username.length < 3 || password.length < 3){
        returnResponse =  response.status(400)
            .json({ error: 'username and/or password is shorter than 3 charectors' })
    }

    if(returnResponse){
        return returnResponse
    }

    const existingUser = await User.findOne({ username })

    if(existingUser){
        returnResponse = response.status(400).json({
            error: 'username must be unique'
        })
    }

    return returnResponse
}

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const returnedTest = await testInput(username, password, response)

    if(returnedTest){
        return returnedTest
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name: name || '',
        passwordHash
    })

    const savedUser = await user.save()

    return response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = userRouter