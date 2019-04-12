import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, {Component} from 'react';
import {Link, withRouter}from 'react-router-dom';

import {observer} from 'mobx-react'
class Group extends Component {
    constructor(props) {
      super(props);
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
        </ListItem>

    }

}

export default  Group;