const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    url: {
        type: String
    },
    likes: {
        type: Number
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', noteSchema)