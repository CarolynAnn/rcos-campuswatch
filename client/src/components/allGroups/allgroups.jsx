import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, } from '../../services/util/util';
import List from '@material-ui/core/List';
import Group from '../group/group';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CreateGroup from '../creategroup/creategroup'
import './allgroups.css';
import red from '@material-ui/core/colors/red';
import AddCircle from '@material-ui/icons/AddCircle';
import {observer} from 'mobx-react'

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
      expanded: null,
      open: false
    }
  
    this.redirectTo = redirectTo.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  
  componentDidMount(){
   
  
  }
  render() {

    
    let groupsHTML = this.props.userStore.groups.map((group) =>{
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
                    <AddCircle onClick={this.handleClickOpen}/>    
                </div>
              </div>

                
              <Divider />
              <List component="nav">
                {groupsHTML}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <CreateGroup userStore={this.props.userStore} handleClose = {this.handleClose} open = {this.state.open}/>
      </div>);
    }
  }

  export default  observer(withRouter(withSnackbar(AllGroups)));
