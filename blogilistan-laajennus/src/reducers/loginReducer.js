import loginService from '../services/login'

import blogService from '../services/blogs'

const reduceUsers = (state = null, action) => {
  switch (action.type) {
  case 'LOG_IN':
    return action.data
  case 'LOG_OUT':
    return action.data
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'LOG_IN',
    data: user
  }
}

export const logInUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username: username,
      password: password
    })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      data: user
    })
  }
}

export const logOutUser = () => {
  return {
    type: 'LOG_OUT',
    data: null
  }
}


export default reduceUsers