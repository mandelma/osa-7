const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./user_helper')
const apis = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/users')

describe('When there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({
            username: helper.initialUsers[0].username,
            name: helper.initialUsers[0].name,
            password: helper.initialUsers[0].password
        })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'MarMan',
            name: 'Marko',
            password: 'salainen'
        }

        await apis
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    }) 
 

     test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await apis
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
         expect(result.body.error).toContain('`username` to be unique')
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length) 
    })

    test('creation failed with proper statuscode if username length is less than 3', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "ha",
            name: "Hanna",
            password: "secret"
        }

        await apis
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtStart.length).toBe(usersAtEnd.length)
    })
 
    test('creation failed with statuscode 400 if password length is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "HannaHa",
            name: "Hanna",
            password: "sa"
        }

        await apis
            .post('/api/users')
            .send(newUser)
            expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtStart.length).toBe(usersAtEnd.length)
    })
}) 

afterAll(() => {
    mongoose.connection.close()
})