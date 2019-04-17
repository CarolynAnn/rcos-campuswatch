import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, } from '../../services/util/util';
import Alert from '../alert/alert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Discussion from '../discussion/discussion'
import {observer} from 'mobx-react'
//import './home.css';
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircle from '@material-ui/icons/AddCircle';
import CreatePost from '../createpost/createpost'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

var alerts = require('../../data/alerts.json');
var discussions = require('../../data/discussions.json');
class GroupHome extends Component {
  constructor(props) {
    super(props)
    const splitUrl = this.props.location.pathname.split('/');
    
      
    this.state = {
      id: splitUrl[splitUrl.length - 1], 
      redirect:false,
      alerts: alerts,
      discussions: discussions,
      expanded: null,
      expandedDiscussion: null,
      open: false,
      anchorEl: null,
      membersOpen: false
    }
  
    this.redirectTo = redirectTo.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }
  handleClickOpen = () => {
    this.setState({ open: true, alertOpen: false });
  };

  handleClickOpenAlert = () => {
    this.setState({ open: true, alertOpen: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleMembersClose = () => {
    this.setState({ membersOpen: false, anchorEl: null });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeave = () => {
    let i = this.props.userStore.userInfo.groups.indexOf(parseInt(this.state.id))
    console.log(i)
    console.log(this.props.userStore.userInfo.groups)

    let newGroups = []

    this.props.userStore.userInfo.groups.forEach((group) => {
        if (group != parseInt(this.state.id)){
          newGroups.push(group);
        }
    });
    
    
    this.props.userStore.userInfo.groups = newGroups


    console.log(this.props.userStore.userInfo.groups)

    this.props.userStore.users.forEach((user, index) => {
      if (user.id == this.props.userStore.userInfo.id){
          console.log('found user')
          this.props.userStore.users[index].groups = newGroups
          
      }
    });

    
    this.redirectTo('/home')
  };

  handleJoin = () => {
    this.props.userStore.userInfo.groups.push(parseInt(this.state.id));
    this.props.userStore.users.forEach((user, index) => {
      if (user.id == this.props.userStore.userInfo.id){
          console.log('found user')
          this.props.userStore.users[index].groups.push(parseInt(this.state.id));
      }
    });
    this.setState({anchorEl: null});
  };

  handleMembers = () => {
    this.setState({membersOpen: true})
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleChangeDiscussion = panel => (event, expanded) => {
    this.setState({
      expandedDiscussion: expanded ? panel : false,
    });
  };
  
  componentDidMount(){
   
  
  }
  render() {
    let anchorEl = this.state.anchorEl
    console.log(this.props.userStore.userInfo.groups.indexOf(parseInt(this.state.id)) > -1)
    let alertsHTML = this.props.userStore.alerts.map((alert) =>{
      return alert.group_id == this.state.id ?  <Alert key={alert.id} userStore={this.props.userStore} onchange={this.handleChange} alert={alert} expanded={this.state.expanded === alert.id} /> : null
    });
    // console.log(this.props.userStore.discussions)
    // console.log(this.state.id)
    let discussionHTML = this.props.userStore.discussions.sort((a,b)=>{
       return a.posted < b.posted
    }).map((discussion) =>{
        
        if (discussion.group_id == this.state.id){
            let replies = this.state.discussions.replies;
            return <Discussion key={discussion.id} userStore ={this.props.userStore} replies={replies} onchange={this.handleChangeDiscussion} expanded={this.state.expandedDiscussion === discussion.id} discussion= {discussion} />      
        }
        return null
    });
    
    let dialogHTML = this.props.userStore.users.map((user)=> {
      console.log(this.state.id)
      console.log(user.groups)
      if (user.groups.indexOf(parseInt(this.state.id)) > -1){
        console.log('is in group')
        return <ListItem key={user.id} button onClick={() => this.redirectTo('/user/' + user.id)}>
        
        <ListItemText primary={user.first_name + ' ' + user.last_name}  />
      </ListItem>}
      else 
        return null
    });

    return (
      <div className="container">
        <div className="pageHeader">
          Welcome to {this.props.userStore.groups[this.state.id -1].name} 
          <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMembers}>View Members</MenuItem>
          {this.props.userStore.userInfo.groups.indexOf(parseInt(this.state.id)) > -1  ?
            <MenuItem onClick={this.handleLeave}>Leave Group</MenuItem>
            :
            <MenuItem onClick={this.handleJoin}>Join Group</MenuItem>
          }
        </Menu>
        </div>
        <Grid direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          container spacing={16}>
          <Grid item xs={6}>
            <Paper>
              <div className="header">
                Group Alerts
                {this.props.userStore.userInfo.role_id === 2?
                <div className="right">
                    <AddCircle onClick={this.handleClickOpenAlert}/>    
                </div>
                : null
                }
              </div>
              <Divider />
              {alertsHTML}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <div className="header">
                Discussions
                <div className="right">
                    <AddCircle onClick={this.handleClickOpen}/>    
                </div>
              </div>
              <Divider />
                {discussionHTML}
              
            </Paper>
          </Grid>
        </Grid>
        <CreatePost group_id={this.state.id} userStore={this.props.userStore} handleClose = {this.handleClose} alert={this.state.alertOpen} open = {this.state.open}/>
        
        <Dialog onClose={this.handleMembersClose} aria-labelledby="simple-dialog-title" open = {this.state.membersOpen}>
        <DialogTitle id="simple-dialog-title">Members</DialogTitle>
        <div>
          <List>
            
            {dialogHTML}
          </List>
        </div>
      </Dialog>
      </div>);
    }
  }

  export default  observer(withRouter(withSnackbar(GroupHome)));
