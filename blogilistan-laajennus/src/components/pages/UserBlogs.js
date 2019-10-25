import React from 'react'

const UserBlogs = ({  userId, blogs, user, users }) => {
  const blogForUser = users.find(user => user.id === userId)
  return (
    <div>
      <h2>{blogForUser.name}</h2>
      <p>Added blogs</p>
      <ul>
        {blogs.map(blog =>
          blog.user.id === userId ?
            <li key = {blog.id}>
              {blog.title}
            </li>
            : null
        )}
      </ul>
    </div>
  )
}

export default UserBlogs