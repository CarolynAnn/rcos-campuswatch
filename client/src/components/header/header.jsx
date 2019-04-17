import React, {Component} from 'react'
import logo from '../../logo.png'
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

  componentDidMount(){
    if(!this.props.userStore.loggedIn)
      this.redirectTo('/login'); 
  }
  
  render(){
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
