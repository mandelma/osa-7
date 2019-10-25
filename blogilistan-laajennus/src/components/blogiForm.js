import React from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const Blogi = (props) => {
  return(
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit = {props.handleBlogi}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control {...props.title} />
          <Form.Label>Author:</Form.Label>
          <Form.Control {...props.author} />
          <Form.Label>Url:</Form.Label>
          <Form.Control {...props.url} />
          <Form.Label>Likes:</Form.Label>
          <Form.Control {...props.likes} /><br/>
          <Button variant = 'primary' type = 'submit'>
            Create Blog
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Blogi