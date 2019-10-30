const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1
    })
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    try{
        const body = request.body

        if(body.password === undefined){
            return response.status(400).json({Error: 'Password field should not to be empty!'}).end()
        } 
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })


        if(body.password.length < 3){
            return response.status(400).json({error: 'Password length should be at least 3 characters!'}).end()
        }
        const savedUser = await user.save()
        response.json(savedUser)
    }catch(exception){
        next(exception)
    }
})

module.exports = usersRouter
