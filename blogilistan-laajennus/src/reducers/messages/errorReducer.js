const errorReducer = (state = null, action) => {
  switch (action.type) {
  case 'ERR_MESSAGE':
    return action.data
  case 'CLEAR_MESSAGE':
    return null
  default:
    return state
  }
}

export const errMessage = (msg) => {
  return {
    type: 'ERR_MESSAGE',
    data: msg
  }
}

export const clearError = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default errorReducer