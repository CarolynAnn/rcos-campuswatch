import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link, withRouter} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import { redirectTo, ValidateEmail } from '../../services/util/util';


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
    this.redirectTo = redirectTo.bind(this)
    this.handleRegister = this.handleRegister.bind(this)

  }
  handleRegister() {
    const { enqueueSnackbar } = this.props;
    if (!this.state.passwordsmatch){
      enqueueSnackbar("Passwords do not match")
      return;
    }

    if (!ValidateEmail(this.state.username)){
      enqueueSnackbar("Invalid email address");
      document.getElementById("name").focus();
      return;
    }

    this.setState({
      username_invalid:false,
      password_invalid:false,
    })

    console.log("registering");
  
    enqueueSnackbar("registered")

  }
  handleUsernameChange(event){
    this.props.userStore.userInfo.username = event.target.value
  }
  handlePasswordChange(event){
    this.props.userStore.userInfo.password = event.target.value
  }
  handleConfirmPasswordChange(event){
    this.setState({
      confirmpassword: event.target.value,
      passwordsmatch: this.state.password === event.target.value
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
      <div className = "Register" id = "registerForm" >
      <div className="portalContainer">
      <div className="portal">
        <h1>Register</h1>
        <TextField id="name" label="Email"  type="text"  defaultValue={this.props.userStore.userInfo.username} onChange={this.handleUsernameChange}/>
        <br/>
        <TextField id="password" label="Password" type="password" defaultValue={this.props.userStore.userInfo.password} onChange={this.handlePasswordChange}/>
        <br/>
        <TextField id="confirmpassword" label="Confirm Password" type="password" onChange={this.handleConfirmPasswordChange}/>
        <br/>
        <Button variant="outlined" id="registerButton" onClick={this.handleRegister}>Register</Button>
        <p>Already have an account... <Link to="/login">Log In</Link></p>

      </div>
    </div> </div>);
    }
  }

  export default withRouter(withSnackbar(Register));
