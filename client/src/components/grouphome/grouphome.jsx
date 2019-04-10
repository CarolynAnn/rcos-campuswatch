import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, } from '../../services/util/util';
import List from '@material-ui/core/List';
import Group from '../group/group';
import Alert from '../alert/alert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
//import './home.css';

var alerts = require('../../data/alerts.json');
var groups = require('../../data/groups.json');

class GroupHome extends Component {
  constructor(props) {
    super(props)
    const splitUrl = this.props.location.pathname.split('/');
    
      
    this.state = {
      id: splitUrl[splitUrl.length - 1], 
      redirect:false,
      alerts: alerts,
      groups: groups,
      expanded: null
    }
  
    this.redirectTo = redirectTo.bind(this);

  }


  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  
  componentDidMount(){
   
  
  }
  render() {

    let alertsHTML = this.state.alerts.alerts.map((alert) =>{
      return <Alert key={alert.id}  onchange={this.handleChange} alert={alert} expanded={this.state.expanded === alert.id} /> 
    });

    let groupsHTML = this.props.userStore.groups.map((group) =>{
        return <Group key={group.id} group= {group} />      
    });

    return (
      <div className="container">
        <div className="pageHeader">
          Welcome to Group ID: {this.state.id}
        </div>
        <Grid direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          container spacing={24}>
          <Grid item xs={6}>
            <Paper>
              <div className="header">
                Community Alerts
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
      </div>);
    }
  }

  export default withRouter(withSnackbar(GroupHome));
