import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, } from '../../services/util/util';
import List from '@material-ui/core/List';
import Group from '../group/group';
import Alert from '../alert/alert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import './home.css';
import AddCircle from '@material-ui/icons/AddCircle';
import CreatePost from '../createpost/createpost'
import {observer} from 'mobx-react'

class Home extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      redirect:false,
      alerts: this.props.userStore.alerts,
      groups: this.props.userStore.groups,
      myGroups: this.props.userStore.userInfo.groups,
      expanded: null,
      open: false
    }
  
    this.redirectTo = redirectTo.bind(this);

  }

  handleClickOpen = () => {
    this.setState({ open: true, alertOpen: false });
  };

  

  handleClose = () => {
    this.setState({ open: false });
  };


  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  
  componentDidMount(){
   
  
  }
  render() {
    console.log(this.props.userStore.userInfo.groups)
    
    let alertsHTML = this.props.userStore.alerts.map((alert) =>{
      
      return alert.group_id === 0 ? <Alert key={alert.id} userStore={this.props.userStore} onchange={this.handleChange} alert={alert} expanded={this.state.expanded === alert.id} /> : null
    });

    
    
    let groupsHTML = this.props.userStore.groups.map((group) =>{
        if (this.state.myGroups.indexOf(group.id) > -1){
         
          return <Group key={group.id} group= {group} userStore={this.props.userStore} />     
        } 
        else
          return
    });
    console.log(groupsHTML)
   
    
    return (
      <div className="container">
        <div className="pageHeader">
          Welcome to Campus Watch
        </div>
        <Grid direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          container spacing={24}>
          <Grid item xs={6}>
            <Paper>
              <div className="header">
                Community Alerts
                {this.props.userStore.userInfo.role_id === 2 ?
                <div className="right">
                    <AddCircle onClick={this.handleClickOpen}/>    
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
                My Groups
              </div>
              <Divider />
              <List component="nav">
                {groupsHTML}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <CreatePost group_id={0} userStore={this.props.userStore} handleClose = {this.handleClose} alert={true} open = {this.state.open}/>
      </div>);
    }
  }

  export default  observer(withRouter(withSnackbar(Home)));
