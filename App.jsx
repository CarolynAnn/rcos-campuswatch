import React, {Component} from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {observer} from 'mobx-react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import {redirectTo} from './services/util/util'
import {logo} from './logo.png'
import Main from './main'
import Header from './components/header/header'
import './App.css'



class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      drawerIsOpen:false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
  

    this.redirectTo = redirectTo.bind(this);

  }

  goToDrawer(text){
    
    this.redirectTo(text)
  }

  toggleDrawer(){
    console.log("toggle drawer")
    this.setState({drawerIsOpen:! this.state.drawerIsOpen})
    console.log("set to " + this.state.drawerIsOpen)
  }

  logout(){
    this.props.userStore.loggedIn = false;
  }

  render() {

    var links =[ 'login', 'register']
    let pathname = window.location.pathname;
    if (this.props.userStore.loggedIn)
    {
      links = [ 'home', 'allgroups', 'user']
    }
    console.log("links" + links)

    var drawers = links.map((text, index) => (
       <div key={index}>
        <Link className="drawerLink" to={"/" + text}>
          <ListItem button key={text}>
          {text}
          </ListItem>
        </Link>
        
      </div>));
    if (this.props.userStore.loggedIn){
      drawers.push((
        <div key={4}>
         <Link className="drawerLink" to='/login' onClick={this.logout}>
           <ListItem button key={4}>
            log out
           </ListItem>
         </Link>
         
       </div>))
    }
    return ( //
        <div className="App">
          
            <SnackbarProvider maxSnack={3}>
              <div>

              <Drawer open={this.state.drawerIsOpen} onClose={this.toggleDrawer}>
                <img onClick={this.toggleDrawer} src = {logo} className = "App-logo" alt = "logo" />
                <div
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer}
                  onKeyDown={this.toggleDrawer}
                >
                  <List>
                    {
                      drawers
                    }
                  </List>
                </div>
              </Drawer>
              <Header userStore = {this.props.userStore} drawerOpenClickHandler={this.toggleDrawer}></Header> 
              
              <Main userStore={this.props.userStore}></Main>
            </div>
            </SnackbarProvider>
          
        </div>);
  }
}

export default (App);
