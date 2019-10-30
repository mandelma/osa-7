const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Eka blogi',
        author: 'Eka',
        url: 'www.eka.com',
        likes: 44
    },
    {
        title: 'Toka blogi',
        author: 'Toka',
        url: 'www.toka.com',
        likes: 89
    }
]

const inDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}


module.exports = {
    initialBlogs,
    inDb
}