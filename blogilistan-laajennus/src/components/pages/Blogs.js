import React from 'react'
import Comments from './BlogComment'
import {
  Redirect
} from 'react-router-dom'


const Blogs = ({ blogs, removeBlog, id, user, addLike, comment, addComment }) => {

  const addcomment = async () => {
    try {
      await addComment({
        id: id,
        comment: comment.value
      })
      comment.cleanField()
    }catch(exception){
      console.log(exception)
    }
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
            <h3 style = {{ color: 'green' }}><bold>{blog.title}</bold></h3><br/>
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

      <p>Comments</p>
      <input {...comment} />
      <button onClick = {() => addcomment()}>add comment</button>
      <Comments
        blogs = {blogs}
        id = {id}
      />
    </div>
  )
}


export default Blogs