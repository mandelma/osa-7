const blogReducer = (state = '', action) => {
  switch (action.type) {
  case 'BLOG':
    return ''
  default:
    return state
  }
}

export default blogReducer