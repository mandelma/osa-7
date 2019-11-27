import React from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { useField } from '../hooks'
import { addNewBlog } from '../reducers/blogReducer'
import { notificationMessage } from '../reducers/messages/notificationReducer'

const Blogi = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  
  const submitNewBlog = (event) => {
    event.preventDefault()
    props.blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }
    
    props.addNewBlog(blogObject)
    
  }

  return(
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit = {submitNewBlog}>
        <Form.Field>
          <label>Title:</label><br/>
          <input id = '_title' {...title} />
        </Form.Field>
        <Form.Field>
          <label>Author:</label><br/>
          <input id = '_author' {...author} />
        </Form.Field>
        <Form.Field>
          <label>Url:</label><br/>
          <input id = '_url' {...url} /><br/><br/>
        </Form.Field>
        <Button primary type = 'submit'>
          Create blog
        </Button>
      </Form><br/>
    </div>
  )
}

const mapDispatchToProps = {
  addNewBlog,
  notificationMessage
  
}

export default connect(
  0,
  mapDispatchToProps)(Blogi)