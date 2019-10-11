

const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'MESSAGE':
    return action.data
  case 'ERR_MESSAGE':
    return action.data
  case 'CLEAR_MESSAGE':
    return null
  case 'DO':
    return action.data
  case 'DEL_MESSAGE':
    return null
  default:
    return state
  }
}

export const createMessage = (msg) => {
  return {
    type: 'MESSAGE',
    data: msg
  }
}

export const errMessage = (errMsg) => {
  return {
    type: 'ERR_MESSAGE',
    data: errMsg
  }
}

export const delMes = () => {
  return {
    type: 'DEL_MESSAGE'
  }
}
export default notificationReducer