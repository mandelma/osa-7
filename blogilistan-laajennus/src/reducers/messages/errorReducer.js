const errorReducer = (state = null, action) => {
  switch (action.type) {
  case 'ERR_MESSAGE':
    return action.data
  case 'CLEAR_MESSAGE':
    return action.data
  default:
    return state
  }
}

export const errorMessage = (msg, time) => {
  return async dispatch => {
    dispatch({
      type: 'ERR_MESSAGE',
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

export default errorReducer