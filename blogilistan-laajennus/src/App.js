import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import './index.css'
import Login from './components/loginForm'
import Blogi from './components/blogiForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notificationMessage } from './reducers/messages/notificationReducer'
import { errorMessage } from './reducers/messages/errorReducer'
import { initializeBlogs, like } from './reducers/blogReducer'
import { logInUser, logOutUser, setUser } from './reducers/loginReducer'
import { useField } from './hooks'

const App = (props) => {
  const username = useField('text')
  const salasana = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const likes = useField('text')

  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      if(user !== undefined && user !== null){
        props.setUser(user)
        blogService.setToken(user.token)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const readBlogs = () => props.blogs.map(blog =>
    <Blog
      key = {blog.title}
      blog = {blog}
      userName = {props.user.username}
      blogiUserName = {blog.user.username}
      addLike = {() => addLike(blog)}

      removeBlog = {() => removeHandler(blog)}
    />
  )

  const removeHandler = (item) => {
    try{
      if(window.confirm(`remove blog ${item.title} by ${item.author}`)){
        blogService.remove(item.id)
        props.blogs.filter(blog => blog.id !== item.id)

        props.notificationMessage(`Blog '${item.title}' is removed`, 5)
      }
    }catch(exception){
      console.log('Error:', exception)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      await props.logInUser(username.value, salasana.value)
      props.notificationMessage('You are logged in succesfully', 5)
    }catch(exception){
      username.cleanField()
      salasana.cleanField()

      props.errorMessage('Wrong username or password!', 5)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value
    }

    blogService
      .create(blogObject)
      .then(response => {
        props.blogs.concat(response)
        title.cleanField()
        author.cleanField()
        url.cleanField()
        likes.cleanField()

        props.notificationMessage(`New Blog '${blogObject.title}' is added`, 5)
      })
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken()
    props.logOutUser()
  }

  const addLike = (likeBlog) => {
    props.like(props.blogs, likeBlog)
    props.notificationMessage('You added like to the blog!', 5)
  }

  return (
    <div>
      <Notification

      />
      {
        props.user === null
          ?
          <Login
            handleLogin = {handleLogin}
            username = {username}
            password = {salasana}
          />
          :
          <div>
            <h1>Blogs</h1>
            <p>
              {props.user.name} logged in&nbsp;&nbsp;
              <button onClick = {logOut}>Log out</button>
            </p>
            <Togglable buttonLabel = 'New blog' ref = {blogFormRef}>
              <Blogi
                handleBlogi = {addBlog}
                title = {title}
                author = {author}
                url = {url}
                likes = {likes}
              />
            </Togglable>
            {readBlogs()}
          </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    blogs: state.blogs,
    message: state.message,
    errMessage: state.errMessage,
    user: state.user
  }
}

const mapDispatchToProps = {
  logInUser,
  logOutUser,
  setUser,
  initializeBlogs,
  like,
  notificationMessage,
  errorMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App)