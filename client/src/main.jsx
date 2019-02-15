import React from 'react'
import {Switch, Route,Redirect} from 'react-router-dom'
import Login from './components/login/login'
import Register from './components/register/register'
const Main = () => {
  return ( //
      <main>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Redirect to='/login'/>
        </Switch>
      </main>)
}

export default Main
