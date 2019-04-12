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
import './home.css';
import AddCircle from '@material-ui/icons/AddCircle';
import CreatePost from '../createpost/createpost'

var alerts = require('../../data/alerts.json');
var groups = require('../../data/groups.json');

class Home extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      redirect:false,
      alerts: alerts,
      groups: groups,
      expanded: null
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

    let alertsHTML = this.state.alerts.alerts.map((alert) =>{
      return <Alert key={alert.id}  onchange={this.handleChange} alert={alert} expanded={this.state.expanded === alert.id} /> 
    });

    let groupsHTML = this.props.userStore.groups.map((group) =>{
        return <Group key={group.id} group= {group} />      
    });

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
                <div className="right">
                    <AddCircle onClick={this.handleClickOpen}/>    
                </div>
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
        <CreatePost handleClose = {this.handleClose} alert={true} open = {this.state.open}/>
      </div>);
    }
  }

  export default withRouter(withSnackbar(Home));
