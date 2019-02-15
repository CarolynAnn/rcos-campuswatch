import React, {Component} from 'react'
import logo from '../../logo.svg';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo} from '../../services/util/util';

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl:null,
      redirect:''
    }
    this.handleAvatarClick = this.handleAvatarClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
   
    this.redirectTo = redirectTo.bind(this);


  }
  handleAvatarClick(){
    this.setState({
      expanded: !this.state.expanded
    })
  }
  handleMenuClose(){
    this.setState({
      anchorEl:null
    })
  }
  handleMenuOpen(event){
    this.setState({
      anchorEl:event.currentTarget
    })
  }
  
  render(){
    const { anchorEl } = this.state;
    return (
      <header className="App-header">
        <img onClick={this.props.drawerOpenClickHandler} src={logo} className="App-logo" alt="logo"/>
        <nav></nav>
        
          
        <div>
          <Avatar
            onClick={this.handleMenuOpen}
            className="userProfile">
            {/*JSON.parse(localStorage.user === undefined? '{"username":""}':localStorage.user).username.substring().slice(0,1)*/}
            U
          </Avatar>
          <Menu
            className="userMenu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleMenuClose}>

          </Menu>
        </div>
          

        
      </header>
    )
  }


}


export default withRouter(withSnackbar(Header))
