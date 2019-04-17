import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, } from '../../services/util/util';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Group from '../group/group'
import ListItem from '@material-ui/core/ListItem'
import {observer} from 'mobx-react'
import ListItemText from '@material-ui/core/ListItemText'

class User extends Component {
  constructor(props) {
    super(props)
    const splitUrl = this.props.location.pathname.split('/');
    
    let id = splitUrl[splitUrl.length - 1];
    if (id === 'user')
        id = this.props.userStore.userInfo.id
    console.log(id)
    this.state = {
      id: id, 
      redirect:false,
      groups: this.props.userStore.groups,
      discussions: this.props.userStore.discussions,
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

        
        let user = this.props.userStore.users[this.state.id-1];
        let same = false;
        if (user.id == this.props.userStore.userInfo.id){
            same = true;
        }
        let groupsHTML = this.props.userStore.groups.map((group) =>{
            if (user.groups.indexOf(group.id) > -1){
              return <Group key={group.id} userStore={this.props.userStore} group= {group} /> 
            }     
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
                    {user.first_name + ' ' + user.last_name}'s Profile
                    
                  </div>
                  <Divider />
                  <List>
                    <ListItem>
                        <ListItemText >Name: {user.first_name + ' '+ user.last_name}</ListItemText>
                    </ListItem> 
                    <ListItem>
                        <ListItemText >Email: {user.rcs_id}@rpi.edu</ListItemText>
                    </ListItem> 
                    {same? 
                    <ListItem>
                        <ListItemText >Address: {user.address}</ListItemText>
                    </ListItem> : null
                    }
                    <ListItem>
                        <ListItemText >Role: {user.role_id === 1 ? 'Community Member' : 'Community Admin'}</ListItemText>
                    </ListItem> 
                </List>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className="header">
                    {same ? 'My Groups' : 'Their Groups'}
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

  export default  observer(withRouter(withSnackbar(User)));
