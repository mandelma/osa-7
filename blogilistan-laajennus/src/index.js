import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import notificationReducer from './reducers/messages/notificationReducer'
import errorReducer from './reducers/messages/errorReducer'

const reducer = combineReducers({
  message: notificationReducer,
  errMessage: errorReducer
})

const store = createStore(reducer)

//ReactDOM.render(<App />, document.getElementById('root'));

const renderApp = () => {
  ReactDOM.render(<App store = {store}/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)