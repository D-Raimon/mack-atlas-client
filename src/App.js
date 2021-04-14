import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
// import LoginForm from './components/LogIn/LogIn'
import Books from './components/Book/Books'
import Book from './components/Book/Book'
import CreateBook from './components/Book/CreateBook'
import EditBook from './components/Book/EditBook'
import Home from './components/Home/Home'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home user={user}/>
          )} />
          {/* <Route path='/log-in' render={() => (
            <LoginForm alert={this.alert} setUser={this.setUser} />
          )} /> */}
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <Switch>
            <Route path="/books/:id/edit" render={(props) => (
              <EditBook {...props} alert={this.alert} user={user} />
            )} />
            <Route exact path='/books/:id' render={(props) => (
              <Book {...props} alert={this.alert} user={user} />
            )} />
            <Route exact path='/books' render={() => (
              <Books alert={this.alert} user={user} />
            )} />
          </Switch>
          <Route exact path='/create-book' render={(props) => (
            <CreateBook {...props} alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
