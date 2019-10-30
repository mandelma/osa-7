import React from 'react'
import PropTypes from 'prop-types'
import Togglable from '../Togglable'
import Blogi from '../blogiForm'
import { Link } from 'react-router-dom'

const Blog = ({ blogs , addBlog, title, author, url, likes, blogFormRef }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //const showOrNot = { display: userName === blogiUserName ? '' : 'none')

  return(
    <div className = 'blogi'>
      <Togglable buttonLabel = 'New blog' ref = {blogFormRef}>
        <Blogi
          handleBlogi = {addBlog}
          title = {title}
          author = {author}
          url = {url}
          likes = {likes}
        />
      </Togglable><br/>
      <div>
        {blogs.map(blog =>
          <div style = {blogStyle} key = {blog.id}>
            <Link to = {`blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </div>)}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func,
  removeBlog: PropTypes.func,
  userName: PropTypes.string,
  blogiUserName: PropTypes.string
}


export default Blog