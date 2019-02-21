import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, ValidateEmail} from '../../services/util/util';

class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      redirect:false
    }
  
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.redirectTo = redirectTo.bind(this);

  }
  handleLogin() {


    const { enqueueSnackbar } = this.props;
    if (!ValidateEmail(this.state.username)){
      enqueueSnackbar("Invalid email");
      document.getElementById("name").focus();
      return;
    }

    enqueueSnackbar("logged in");

  }
  handleUsernameChange(event){
    this.props.userStore.userInfo.username = event.target.value
  }
  handlePasswordChange(event){
    this.props.userStore.userInfo.password = event.target.value
  }
  
  componentDidMount(){
   
    var input = document.getElementById("loginForm");
    input.addEventListener("keyup", function(event) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("loginButton").click();
      }
    });
  }
  render() {
    console.log(this.props)
    return (
      <div className = "Login" id="loginForm">
        <div className="portalContainer">
          <div className="portal">
            <h1>Login</h1>
            <TextField className="autofillOverride" id="name" label="Email"  type="text" onChange={this.handleUsernameChange}/>
            <br/>
            <TextField className="autofillOverride" id="password" label="Password" type="password"   onChange={this.handlePasswordChange}/>
            <br/>
            <Button id="loginButton" variant="outlined" onClick={this.handleLogin}>Log In</Button>
            <p>Don't have an account... <Link to="/register">Register</Link></p>
          </div>
        </div> </div>);
    }
  }

  export default withRouter(withSnackbar(Login));
