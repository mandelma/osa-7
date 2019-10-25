import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'BLOG':
    return action.data
  case 'LIKE':
    return state.map(b => b.id !== action.data.id ? b : action.data.likedBlog)
  case 'ADD_NEW':
    return state.concat(action.data)
  case 'REMOVE':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOG',
      data: blogs
    })
  }
}

export const like = (blogList, blog) => {
  const newLike = blog.likes + 1
  const blogForLike = blogList.find(item => item.id === blog.id)
  const likedBlog = {
    ...blogForLike, likes: newLike
  }
  return async dispatch => {
    const liked = await blogService.update(blog.id, likedBlog)
    dispatch({
      type: 'LIKE',
      data: {
        likedBlog: liked,
        id: liked.id
      }
    })
  }
}

export const addNewBlog = (newBlog) => {
  return async dispatch => {
    const added = await blogService.create(newBlog)
    dispatch({
      type: 'ADD_NEW',
      data: added
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      data: blog.id
    })
  }
}


export default blogReducer