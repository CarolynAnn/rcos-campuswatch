import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, } from '../../services/util/util';
import './creategroup.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';
import Slide from '@material-ui/core/Slide'
import {observer} from 'mobx-react'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CreateGroup extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: "",
      description: ""
    }
  
    this.redirectTo = redirectTo.bind(this);

  }

  logChange(e) {
    if (e.target) {
      if (e.target.name) {
        this.setState({ [e.target.name]: e.target.value });
      }
    }
  }
  
  componentDidMount(){
   
  
  }
  render() {

    return (
        <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
        className="createGroup"
        fullWidth={true}
        maxWidth="md"
        TransitionComponent={Transition}
        >
        <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Enter the information about your new group! Make sure that this group is not already created somewhere or else an administrator will delete this group.
            </DialogContentText>

            <TextField
                autoFocus
                margin="dense"
                name="name"
                id="name"
                label="Name"
                type="text"
                fullWidth
            />

            <TextField
                margin="dense"
                name="description"
                id="description"
                label="Description"
                type="text"
                multiline
                rows="5"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>);
    }
  }

  export default  observer(withRouter(withSnackbar(CreateGroup)));
