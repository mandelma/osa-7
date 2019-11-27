import React from 'react'
import PropTypes from 'prop-types'
import Togglable from '../Togglable'
import Blogi from '../blogiForm'
import { Link } from 'react-router-dom'

const Blog = ({ blogs , addBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogFormRef = React.createRef()

  //const showOrNot = { display: userName === blogiUserName ? '' : 'none')

  return(
    <div className = 'blogi'>
      <Togglable buttonLabel = 'New blog' ref = {blogFormRef}>
        <Blogi
          handleBlogi = {addBlog}
          blogFormRef = {blogFormRef}
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

/* Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func,
  removeBlog: PropTypes.func,
  userName: PropTypes.string,
  blogiUserName: PropTypes.string
} */




export default Blog