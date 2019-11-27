import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import './index.css'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { notificationMessage } from './reducers/messages/notificationReducer'
import { errorMessage } from './reducers/messages/errorReducer'
import { initializeBlogs, like, addNewBlog, removeBlog, addComment } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logInUser, logOutUser, setUser } from './reducers/loginReducer'
import { useField } from './hooks'

const App = (props) => {
  const username = useField('text')
  const salasana = useField('password')
  
  useEffect(() => {
    props.initializeBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    props.initializeUsers()
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

  const removeHandler = (item) => {
    try{
      if(window.confirm(`remove blog ${item.title} by ${item.author}`)){
        props.removeBlog(item)
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
      username.reset()
      salasana.reset()
    }catch(exception){
      username.reset()
      salasana.reset()
      props.errorMessage('Wrong username or password!', 5)
    }
  }
  
  const addBlog = async (blog) => {
    await props.addNewBlog(blog)

    title.reset()
    author.reset()
    url.reset()

    props.notificationMessage(`New Blog '${blog.title}' is added`, 5)
  }
 
  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.removeToken()
    props.logOutUser()
  }

  const addLike = (likeBlog) => {
    props.like(props.blogs, likeBlog)
    props.notificationMessage(`You added like to the blog! '${likeBlog.title}'`, 5)
  }

  return (
    <div className = 'container'>
      <Notification />
      <div>
        <Menu
          users = {props.users}
          blogs = {props.blogs}
          user = {props.user}
          logOut = {logOut}
          addBlog = {addBlog}
          addLike = {addLike}
          removeBlog = {removeHandler}
          handleLogin = {handleLogin}
          username = {username}
          salasana = {salasana}
          addComment = {props.addComment}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    blogs: state.blogs,
    message: state.message,
    errMessage: state.errMessage,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  logInUser,
  logOutUser,
  setUser,
  initializeBlogs,
  initializeUsers,
  like,
  addNewBlog,
  removeBlog,
  notificationMessage,
  errorMessage,
  addComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App)