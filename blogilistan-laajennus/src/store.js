import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/messages/notificationReducer'
import errorReducer from './reducers/messages/errorReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  errMessage: errorReducer,
  message: notificationReducer,
  blogs: blogReducer,
  user: loginReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store