import React from 'react'
import {Switch, Route,Redirect} from 'react-router-dom'
import Login from './components/login/login'
import Register from './components/register/register'
import Home from './components/home/home'
import {observer} from 'mobx-react'
const Main = (mainProps) => {
  return ( //
      <main>
        <Switch>
          <Route path='/login' render={(props) => <Login {...props} userStore={mainProps.userStore}/>}/>
          <Route path='/register' render={(props) => <Register {...props } userStore={mainProps.userStore}/>}/>
          <Route path='/home' render={(props) => <Home {...props } userStore={mainProps.userStore}/>}/>
          <Redirect to='/login'/>
        </Switch>
      </main>)
}

export default observer(Main)
