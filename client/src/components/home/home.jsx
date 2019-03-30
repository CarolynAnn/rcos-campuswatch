import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, ValidateEmail} from '../../services/util/util';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import './home.css';

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


  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  
  componentDidMount(){
   
  
  }
  render() {

    let alertsHTML = this.state.alerts.alerts.map((alert) =>{
      return <ExpansionPanel key={alert.id} expanded={this.state.expanded === alert.id} onChange={this.handleChange(alert.id)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="alertHeading">{alert.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {alert.message}
        </Typography>
        <Typography>
          Posted by: {alert.poster_id}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    });

    let groupsHTML = this.props.userStore.groups.map((group) =>{
        let to = "/groups/" + group.id;
        return <ListItem key={group.id} button component={Link} to={to} alignItems="flex-start">
        
        <ListItemText
          primary={group.name}
          secondary={
            <React.Fragment>
              {group.description}
            </React.Fragment>
          }
        />
      </ListItem>
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

  export default withRouter(withSnackbar(Home));
