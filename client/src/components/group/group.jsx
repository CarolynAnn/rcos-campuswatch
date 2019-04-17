import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, {Component} from 'react';
import {Link}from 'react-router-dom';
import Button from '@material-ui/core/Button'
class Group extends Component {
    
    constructor(props){
        super(props)

        this.join = this.join.bind(this);
    }

    join(){

        this.props.userStore.userInfo.groups.push(this.props.group.id);
        this.props.userStore.users.forEach((user, index) => {
        if (user.id == this.props.userStore.userInfo.id){
            console.log('found user')
            this.props.userStore.users[index].groups.push(this.props.group.id);
        }
        });

    }
  
    render() {
        let group = this.props.group;

        let to = "/groups/" + group.id;
        return <ListItem  button component={Link} to={to} alignItems="flex-start">
        
        <ListItemText
            
            primary={group.name}
            secondary={
            <React.Fragment>
                {group.description}
            </React.Fragment>
            }
        />
        {
            this.props.userStore.userInfo.groups.indexOf(group.id) < 0 ? 
            <Button variant="contained" color="secondary" onClick={this.join}>
            Join Group
          </Button> :
          null
        }
        </ListItem>

    }

}

export default  Group;