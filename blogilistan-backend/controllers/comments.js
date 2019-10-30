const commentsRouter = require('express').Router()
const Comment = require('../models/comments')
//const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {

    const comments = await Comment.find({})
    response.json(comments.map(comment => comment.toJSON()))
})

commentsRouter.get('/:id', async (request, response, next) => {
    try {
        const comment = await Comment.findById(request.params.id)
        if (comment) {
            response.json(comment.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

commentsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const newComment = new Comment({
        comment: body.comment
    })
    //console.log(mongoose.Types.ObjectId.isValid('your id here'))
    try {
        //const blog = await Blog.findById('5db5b04de46ed426e04a3294')
        if(!('comment' in body)){
            response.status(400)
        }

        const savedComment = await newComment.save()
        //blog.comment = blog.comment.concat(savedComment._id)
        //await blog.save()
        response.json(savedComment.toJSON())
    }catch(exception){
        next(exception)
    }
})

module.exports = commentsRouter