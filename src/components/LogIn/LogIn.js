import React from 'react'

import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'

import { Accordion, Card } from 'react-bootstrap'

const LoginForm = ({ setUser, msgAlert }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          New User? Sign Up!
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <SignUp
              setUser={setUser}
              msgAlert={msgAlert}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Returning User? Sign In!
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <SignIn
              setUser={setUser}
              msgAlert={msgAlert}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default LoginForm
