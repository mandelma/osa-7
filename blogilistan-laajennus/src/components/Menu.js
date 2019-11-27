import React from 'react'
import Blog from './pages/Blog'
import Users from './pages/Users'
import Login from './pages/loginForm'
import UserBlogs from './pages/UserBlogs'
import Blogs from './pages/Blogs'
import {
  BrowserRouter as Router, Route, Link
} from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

const Menu = ({ user, blogs, users, logOut, addLike, removeBlog, addBlog,
  handleLogin, username, salasana, addComment }) => {
  const menuStyle = { padding: 10 }

  return (
    <div>
      <Router>
        <div>
          <Navbar collapseOnSelect expand = 'lg' bg = 'dark' variant = 'dark'>
            <Navbar.Toggle aria-controls = 'rewsoinsive-navbar-nav' />
            <Navbar.Collapse id = 'responsive-navbar-nav'>
              <Nav className = 'mr-auto'>
                <Nav.Link href = '#' as = 'span'>
                  <Link style = {menuStyle} to = '/'>Home</Link>
                </Nav.Link>
                <Nav.Link href = '#' as = 'span'>
                  <Link style = {menuStyle} to = '/users'>Users</Link>
                </Nav.Link>
                <Nav.Link href = '#' as = 'span'>
                  {user
                    ? <em>{user.name} logged in</em>
                    : <Link to = '/login'>login</Link>
                  }&nbsp;&nbsp;
                  {user ? <button onClick = {logOut}>log out</button> : null}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <h1>Blogs</h1>
        <div>
          <Route exact path = '/' render = {() => <Blog
            addLike = {addLike}
            blogs = {blogs}
            addBlog = {addBlog}
          />
          } />

          <Route exact path = '/users' render = {() => <Users
            users = {users}
          />} />
          <Route exact path = '/users/:id' render = {({ match }) =>
            <UserBlogs userId = {match.params.id} user = {user} blogs = {blogs}
              users = {users} />
          }
          />
          <Route exact path = '/blogs/:id' render = {({ match }) =>
            <Blogs
              id = {match.params.id}
              user = {user}
              blogs = {blogs}
              addLike = {addLike}
              removeBlog = {removeBlog}
              addComment = {addComment}
            />
          } />
          <Route exact path = '/login' render = {() =>
            <Login
              user = {user}
              handleLogin = {handleLogin}
              username = {username}
              password = {salasana}
            />} />
        </div>
      </Router>
    </div>
  )
}

export default Menu