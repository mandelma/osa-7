import React from 'react'
import BlogToggle from './BlogToggle'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, userName, blogiUserName }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5

  }

  const blogTitle = <div>{blog.title} added by {blog.author}</div>

  const showOrNot = { display: userName === blogiUserName ? '' : 'none' }
  return(
    <div style = {blogStyle} className = 'blogi'>
      <BlogToggle openBlog = {blogTitle}>
        <div>
          <a href = {blog.url}>{blog.url}</a><br/>
          {blog.likes} likes&nbsp;&nbsp;
          <button onClick = {addLike}>Like</button><br/>
          added by {blog.author}<br/><br/>
          <div style = {showOrNot}>
            <button onClick = {removeBlog}>Remove</button>
          </div>
        </div>
      </BlogToggle>
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