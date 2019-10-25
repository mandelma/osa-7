import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import './index.css'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { notificationMessage } from './reducers/messages/notificationReducer'
import { errorMessage } from './reducers/messages/errorReducer'
import { initializeBlogs, like, addNewBlog, removeBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
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
      username.cleanField()
      salasana.cleanField()
    }catch(exception){
      username.cleanField()
      salasana.cleanField()
      props.errorMessage('Wrong username or password!', 5)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value
    }

    props.addNewBlog(blogObject)

    title.cleanField()
    author.cleanField()
    url.cleanField()
    likes.cleanField()

    props.notificationMessage(`New Blog '${blogObject.title}' is added`, 5)
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
    <div className = 'container'>
      <Notification />
      <div>
        <Menu
          users = {props.users}
          blogs = {props.blogs}
          user = {props.user}
          logOut = {logOut}
          addBlog = {addBlog}
          title = {title}
          author = {author}
          url = {url}
          likes = {likes}
          blogFormRef = {blogFormRef}
          addLike = {addLike}
          removeBlog = {removeHandler}
          handleLogin = {handleLogin}
          username = {username}
          salasana = {salasana}
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
  errorMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App)