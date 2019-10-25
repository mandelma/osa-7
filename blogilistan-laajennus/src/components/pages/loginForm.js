import React from 'react'
import {
  Redirect
} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

const Login = (props) => {
  if(props.user === null){
    return(
      <div>
        <h2>Log in to application:</h2>
        <Form onSubmit = {props.handleLogin}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control {...props.username} />
            <Form.Label>Password:</Form.Label>
            <Form.Control {...props.password} /><br/>
            <Button variant = 'primary' type = "submit">Kirjaudu</Button>
          </Form.Group>
        </Form><br/>
      </div>
    )
  }
  return(
    <Redirect to = '/' />
  )
}

export default Login
