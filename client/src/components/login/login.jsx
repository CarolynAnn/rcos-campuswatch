import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, ValidateEmail} from '../../services/util/util';
import './login.css'



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
    const styles = {
      card: {
        minWidth: 275,
        maxWidth: 400
      }
    };
    console.log(this.props)
    return (
      <Card className="loginBox" id="loginForm">
      
        <CardContent className="cardContent">
            <h1>Login</h1>
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

  export default withRouter(withSnackbar(Login));
