import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, } from '../../services/util/util';
import List from '@material-ui/core/List';
import Alert from '../alert/alert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Discussion from '../discussion/discussion'
import {observer} from 'mobx-react'
//import './home.css';

import AddCircle from '@material-ui/icons/AddCircle';
import CreatePost from '../createpost/createpost'

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
      oprn: false
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

    let alertsHTML = this.props.userStore.alerts.map((alert) =>{
      return alert.group_id == this.state.id ?  <Alert key={alert.id} userStore={this.props.userStore} onchange={this.handleChange} alert={alert} expanded={this.state.expanded === alert.id} /> : null
    });

    let discussionHTML = this.props.userStore.discussions.sort((a,b)=>{
       return a.posted < b.posted
    }).
    map((discussion) =>{
        if (discussion.group_id == this.state.id){
            let replies = this.state.discussions.replies;
            return <Discussion key={discussion.id} userStore ={this.props.userStore} replies={replies} onchange={this.handleChangeDiscussion} expanded={this.state.expandedDiscussion === discussion.id} discussion= {discussion} />      
        }
        return null
    });
    
    return (
      <div className="container">
        <div className="pageHeader">
          Welcome to {this.props.userStore.groups[this.state.id -1].name}
        </div>
        <Grid direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          container spacing={16}>
          <Grid item xs={6}>
            <Paper>
              <div className="header">
                Group Alerts
                <div className="right">
                    <AddCircle onClick={this.handleClickOpenAlert}/>    
                </div>
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
      </div>);
    }
  }

  export default  observer(withRouter(withSnackbar(GroupHome)));
