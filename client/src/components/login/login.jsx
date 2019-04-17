import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo} from '../../services/util/util';
import './login.css'
import {observer} from 'mobx-react'

class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      redirect:false
    }
    this.props.userStore.userInfo ={
      id: 0,
      first_name: "",
      last_name: "",
      rcs_id: "",
      password: "",
      address: "",
      picture_location: null,
      role_id: 1
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.redirectTo = redirectTo.bind(this);

  }
  handleLogin() {

    const { enqueueSnackbar } = this.props;
    enqueueSnackbar("logged in");
    this.props.userStore.users.forEach(user => {
      if (user.rcs_id == this.props.userStore.userInfo.username)
          {
            this.props.userStore.userInfo =  user
            
          }
    });
    if (this.props.userStore.userInfo.id == 0){
      this.props.userStore.userInfo =  this.props.userStore.users[0]
    }
    console.log(this.props.userStore.userInfo);
    this.props.userStore.loggedIn = true;
    this.redirectTo('home');

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
    
    return (
      <Card className="loginBox" id="loginForm">
      
        <CardContent className="cardContent">
            <h1>Campus Watch</h1>
            <TextField className="autofillOverride cardContent" id="rcs" label="RCS ID"  type="text" defaultValue={this.props.userStore.userInfo.username} onChange={this.handleUsernameChange}/>
            <br/>
            <TextField className="autofillOverride cardContent" id="password" label="Password" type="password" defaultValue={this.props.userStore.userInfo.password}   onChange={this.handlePasswordChange}/>
            <br/>
          </CardContent>
          <CardActions >
            <Button className="cardContent" id="loginButton" variant="outlined" onClick={this.handleLogin}>Log In</Button>
          </CardActions>
          <p className="cardContent">Don't have an account... <Link to="/register">Register</Link></p>
          
        </Card>);
    }
  }

  export default  observer(withRouter(withSnackbar(Login)));
