import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, } from '../../services/util/util';
import List from '@material-ui/core/List';
import Group from '../group/group';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import './allgroups.css';
import red from '@material-ui/core/colors/red';
import AddCircle from '@material-ui/icons/AddCircle';

var groups = require('../../data/groups.json');

const styles = {
    iconHover: {
      
      '&:hover': {
        color: red[800],
      },
    },
  };

class AllGroups extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      redirect:false,
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

    
    let groupsHTML = this.props.userStore.allGroups.map((group) =>{
        return <Group key={group.id} group= {group} />      
    });

    return (
      <div className="container">
        <div className="pageHeader">
          Find a Group to Join
        </div>
        <Grid direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          container spacing={24}>
          
          <Grid item xs={12}>
            <Paper>
              <div className="header">
                All Groups
                <div className="right">
                    <AddCircle/>    
                </div>
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

  export default withRouter(withSnackbar(AllGroups));
