import React from 'react'
import {
  Redirect
} from 'react-router-dom'

const Blogs = ({ blogs, removeBlog, addLike, id, user }) => {
  if(user === null){
    return (
      <Redirect to = '/login' />
    )
  }
  return (
    <div>
      {blogs.map(blog => blog.id === id ?
        <div key = {blog.id}>
          <h3 style = {{ color: 'green' }}><bold>{blog.title}</bold></h3><br/>
          <p><a href = {blog.url}>{blog.url}</a></p><br/>
          <div>
            {blog.likes} likes&nbsp;&nbsp;
            <button onClick = {() => addLike(blog)}>Like</button>
          </div>     <br/>
          <p>added by {blog.author}</p><br/><br/>
          {blog.user.username === user.username ? <button onClick = {() => removeBlog(blog)}>Remove</button> : null}
        </div>
        : null
      )}
    </div>
  )
}

export default Blogs