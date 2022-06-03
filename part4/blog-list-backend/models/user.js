const mongoose = require('mongoose')

const userScheme = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
})

userScheme.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
        delete returnObject.passwordHash
    }
})

const User = mongoose.model('User', userScheme)

module.exports = User