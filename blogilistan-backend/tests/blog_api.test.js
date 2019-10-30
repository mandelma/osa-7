const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const apis = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/users')

beforeEach(async () => {
    await  Blog.deleteMany({})
    
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

describe('Blogs are returned as correct formatted', () => {  
     test('notes are returned as json', async () => {
        await apis   
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })    
    
    
    test('id field is id, not _id', async () => {
        const response =  await apis.get('/api/blogs')
    
        expect(response.body[0].id).toBeDefined()
        
    })

    test('all blogs are returned', async () => {
        const response = await apis.get('/api/blogs')
      
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })  
})


describe('Blogs can be added and empty likes count is zero', () => {
    test('Blog can be added', async () => {
        await User.deleteMany({})
        const user = { username: 'testaaja', password: 'salasana'}
        await apis
            .post('/api/users')
            .send(user)
            .expect(200)

        const loginDetails = {
            username: user.username,
            password: user.password
        }

        const login = await apis
            .post('/api/login')
            .send(loginDetails)
            .expect(200)

        const token = login.body.token

        const newBlog = {
            title: 'Some test blog',
            author: 'Kristina',
            url: 'www.kristina.ee',
            likes: 50,
        }
    
        await apis
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsInDb = await helper.inDb()
        expect(blogsInDb.length).toBe(helper.initialBlogs.length + 1)
    })
    

    test('If no likes, likes count is zero', async () => {
        await User.deleteMany({})
         const user = { username: 'testaaja', password: 'salasana'}
          await apis
            .post('/api/users')
            .send(user)
            .expect(200)

        const loginDetails = {
            username: user.username,
            password: user.password
        }

        const login = await apis
            .post('/api/login')
            .send(loginDetails)
            .expect(200)

        const token = login.body.token

        const newBlog = {
            title: 'mr',
            author: 'Marco Polo',
            url: 'www.polo.us',
        }
    
        await apis 
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const noLikes = await helper.inDb()
        const noLikesBlog = noLikes.find(line => line.author === newBlog.author)
        noLikesBlog.likes = 0
        expect(noLikesBlog.likes).toBe(0)
    })
})  
   

describe('If contents are missing from blog', () => {
    test('There is no url in the blog, response 400', async () => {
        await User.deleteMany({})
        const user = { username: 'testaaja', password: 'salasana'}
        await apis
        .post('/api/users')
        .send(user)
        .expect(200)

        const loginDetails = {
            username: user.username,
            password: user.password
        }

        const login = await apis
            .post('/api/login')
            .send(loginDetails)
            .expect(200)

        const token = login.body.token
        
        const newBlog = {
            author: "Author",
            title: "This is the title!",
            likes: 48,
        }
    
        await apis
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
    }) 
    
    test('There is no title in the blog, response 400', async () => {
        await User.deleteMany({})
        const user = { username: 'testaaja', password: 'salasana'}
        await apis
            .post('/api/users')
            .send(user)
            .expect(200)

        const loginDetails = {
            username: user.username,
            password: user.password
        }

        const login = await apis
            .post('/api/login')
            .send(loginDetails)
            .expect(200)

        const token = login.body.token
        
        const newBlog = {
            author: "Kalle",
            url: 'www.uusiUrl.com',
            likes: 480,
        }
    
        await apis
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })
})


describe('Delete blog and update blog', () => {
    beforeEach(async () => {
        await  Blog.deleteMany({})
    
        let blogObject = new Blog(helper.initialBlogs[0])
        await blogObject.save()
    
        blogObject = new Blog(helper.initialBlogs[1])
        await blogObject.save()
    })


    test('Delete blog and response statuscode 204', async () => {
        const firstBlog = await helper.inDb()
        const deletedBlog = firstBlog[0]
    
        await apis
            .delete('/api/blogs/' + deletedBlog.id)
            .expect(204)
    
        const blogsAfter = await helper.inDb()
    
        expect(blogsAfter.length).toBe(helper.initialBlogs.length - 1)
    })

    test('Update blog likes and response statuscode 200', async () => {
        await User.deleteMany({})
        const user = { username: 'testaaja', password: 'salasana'}
        await apis
            .post('/api/users')
            .send(user)
            .expect(200)

        const loginDetails = {
            username: user.username,
            password: user.password
        }

        const login = await apis
            .post('/api/login')
            .send(loginDetails)
            .expect(200)

        const token = login.body.token

        const upBlog = {
            title: "Blog for update",
            author: "Hanna",
            url: 'www.uusiUrl.com',
            likes: 70,
        }
    
        await apis
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(upBlog)
            .expect(200)

        const blogsFirst = await helper.inDb()
        const updateBlog = blogsFirst[2]

        const uusiBlogi = {
            title: "Blog for update",
            authoor: "Hanna",
            url: "www.uusiUrl.com",
            likes: upBlog.likes + 1
        }
        await apis
            .put(`/api/blogs/${updateBlog.id}`)
            .send(uusiBlogi)
            .expect(200)

        const blogsAfterUpdate = await helper.inDb()

        const  updatedBlog= blogsAfterUpdate[2]
        expect(updatedBlog.likes).toBe(updateBlog.likes + 1)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
