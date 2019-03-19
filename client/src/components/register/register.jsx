import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link, withRouter} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import { redirectTo, ValidateEmail } from '../../services/util/util';
import 'bootstrap/dist/css/bootstrap.css';
import './register.css'
import {Card, CardContent, CardActions } from '@material-ui/core';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmpassword: '',
      passwordsmatch:true,
      username_invalid:false,
      password_invalid:false,
      redirect:undefined
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    this.handleFirstChange = this.handleFirstChange.bind(this)
    this.handleLastChange = this.handleLastChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)

    this.redirectTo = redirectTo.bind(this)
    this.handleRegister = this.handleRegister.bind(this)

  }
  handleRegister() {
    const { enqueueSnackbar } = this.props;
    if (!this.state.passwordsmatch){
      enqueueSnackbar("Passwords do not match")
      return;
    }

    enqueueSnackbar("registered")

  }
  handleUsernameChange(event){
    this.props.userStore.userInfo.username = event.target.value
  }

  handleFirstChange(event){
    this.props.userStore.userInfo.first = event.target.value
  }

  handleLastChange(event){
    this.props.userStore.userInfo.last = event.target.value
  }

  handleAddressChange(event){
    this.props.userStore.userInfo.address = event.target.value
  }

  handlePasswordChange(event){
    this.props.userStore.userInfo.password = event.target.value
  }

  handleConfirmPasswordChange(event){
    this.setState({
      confirmpassword: event.target.value,
      passwordsmatch: this.props.userStore.userInfo.password === event.target.value
    })

  }
  componentDidMount(){
   
    var input = document.getElementById("registerForm");
    input.addEventListener("keyup", function(event) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("registerButton").click();
      }
    });
  }


  render() {
    return (
      <Card className = "loginBox" id = "registerForm" >
        <CardContent className="cardContent">
        <h1>Register</h1>
        <TextField className="cardContent" id="rcs" label="RCS ID"  type="text"  defaultValue={this.props.userStore.userInfo.username} onChange={this.handleUsernameChange}/>
        <br/>
        <TextField className="cardContent" id="first" label="First Name"  type="text"  defaultValue={this.props.userStore.userInfo.first} onChange={this.handleFirstChange}/>
        <br/>
        <TextField className="cardContent" id="last" label="Last Name"  type="text"  defaultValue={this.props.userStore.userInfo.last} onChange={this.handleLastChange}/>
        <br/>
        <TextField className="cardContent" id="address" label="Street Address"  type="text"  defaultValue={this.props.userStore.userInfo.address} onChange={this.handleAddressChange}/>
        <br/>
        <TextField className="cardContent" id="password" label="Password" type="password" defaultValue={this.props.userStore.userInfo.password} onChange={this.handlePasswordChange}/>
        <br/>
        <TextField className="cardContent" id="confirmpassword" label="Confirm Password" type="password" onChange={this.handleConfirmPasswordChange}/>
        <br/>
        </CardContent>
        <CardActions>
        <Button className="cardContent" variant="outlined" id="registerButton" onClick={this.handleRegister}>Register</Button>
        </CardActions>
        <p className="cardContent">Already have an account... <Link to="/login">Log In</Link></p>

      </Card>);
    }
  }

  export default withRouter(withSnackbar(Register));
