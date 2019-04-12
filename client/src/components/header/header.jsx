import React, {Component} from 'react'
import logo from '../../logo.svg';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo} from '../../services/util/util';
import {observer} from 'mobx-react'

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      anchorEl:null,
      redirect:''
    }

    this.redirectTo = redirectTo.bind(this);


  }

  
  render(){
    const { anchorEl } = this.state;
    return (
      <header className="App-header">
        <img onClick={this.props.drawerOpenClickHandler} src={logo} className="App-logo" alt="logo"/>
        <nav></nav>
        
        {/*  
        <div>
          <Avatar
            className="userProfile">
            
            U
          </Avatar>
        </div>
       */}
          

        
      </header>
    )
  }


}


export default  observer(withRouter(withSnackbar(Header)))
