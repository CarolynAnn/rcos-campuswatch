import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, ValidateEmail} from '../../services/util/util';
import 'bootstrap/dist/css/bootstrap.css';


class Home extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      redirect:false
    }
  
    this.redirectTo = redirectTo.bind(this);

  }

  
  componentDidMount(){
   
  
  }
  render() {
    console.log(this.props)
    return (
      <div className = "Login" id="loginForm">
        <div className="portalContainer">
          <div className="portal">
            <h1>Login</h1>
            <TextField className="autofillOverride" id="name" label="Email"  type="text" defaultValue={this.props.userStore.userInfo.username} onChange={this.handleUsernameChange}/>
            <br/>
            <TextField className="autofillOverride" id="password" label="Password" type="password" defaultValue={this.props.userStore.userInfo.password}   onChange={this.handlePasswordChange}/>
            <br/>
            <Button id="loginButton" variant="outlined" onClick={this.handleLogin}>Log In</Button>
            <p>Don't have an account... <Link to="/register">Register</Link></p>
          </div>
        </div> </div>);
    }
  }

  export default withRouter(withSnackbar(Home));
