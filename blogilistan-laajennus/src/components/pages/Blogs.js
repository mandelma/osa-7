import React from 'react'
import Comments from './BlogComment'
import { useField } from '../../hooks'
import {
  Redirect
} from 'react-router-dom'

const Blogs = ({ blogs, removeBlog, id, user, addLike, addComment }) => {
  const comment = useField('text')
  const addcomment = async (blogComment) => {
    try {
      await addComment(blogComment)
      comment.reset()
    }catch(exception){
      console.log(exception)
    }
  }

  const submit = (event) => {
    event.preventDefault()
    addcomment({
      id: id,
      comment: comment.value
    })
  }

  const removeButton = (blog) => {
    if (user.username !== blog.user.username) {
      return null
    }
    return <button onClick = {() => removeBlog(blog)}>Remove</button>
  }

  if(user === null){
    return (
      <Redirect to = '/login' />
    )
  }

  return (
    <div>
      <div style = {{ border: 'solid', padding: 10, backgroundColor: 'yellow' }}>
        {blogs.map(blog => blog.id === id ?
          <div key = {blog.id}>
            <h3 style = {{ color: 'green' }}>{blog.title}</h3><br/>
            <p><a href = {blog.url}>{blog.url}</a></p><br/>
            <div>
              {blog.likes} likes&nbsp;&nbsp;
              <button onClick = {() => addLike(blog)}>Like</button>
            </div><br/>
            <p>added by {blog.author}</p><br/><br/>
            {removeButton(blog)}
          </div>
          : null
        )}
      </div>

      <p>Comments here:</p>
      <form onSubmit = {submit}>
        <input id = '_comment' {...comment} />
        <button >add comment</button>
      </form>
      
      <Comments
        blogs = {blogs}
        id = {id}
      />
    </div>
  )
}


export default Blogs