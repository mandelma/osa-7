

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'MESSAGE':
    return action.data
  case 'ERR_MESSAGE':
    return action.data
  case 'CLEAR_MESSAGE':
    return action.data
  case 'DO':
    return action.data
  default:
    return state
  }
}

export const notificationMessage = (msg, time) => {
  return async dispatch => {
    dispatch({
      type: 'MESSAGE',
      data: msg
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE',
        data: null      
      })
    }, time * 1000)
  }
}

export default notificationReducer