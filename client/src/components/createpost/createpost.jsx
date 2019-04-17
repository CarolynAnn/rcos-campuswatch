import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {redirectTo, } from '../../services/util/util';
import './createpost.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide'
import {observer} from 'mobx-react'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CreatePost extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      title: "",
      message: ""
    }
  
    this.redirectTo = redirectTo.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  logChange(e) {
    if (e.target) {
      if (e.target.name) {
        this.setState({ [e.target.name]: e.target.value });
      }
    }
  }

  handlePost(){
      if (this.props.alert){
          let newPost = {
            "id": this.props.userStore.alerts.length + 1,
            "title": this.state.title,
            "message": this.state.message,
            "poster_id": this.props.userStore.userInfo.id,
            "group_id": this.props.group_id,
            "posted": this.props.userStore.alerts.length + 1
          }

          this.props.userStore.alerts.unshift(newPost);
          this.props.handleClose();
      }
      else {
        let newPost = {
          "id": this.props.userStore.alerts.length + 1,
          "title": this.state.title,
          "message": this.state.message,
          "poster_id": this.props.userStore.userInfo.id,
          "group_id": this.props.group_id,
          "posted": Date.now()
        }

        this.props.userStore.discussions.unshift(newPost);
        this.props.handleClose();
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
        <DialogTitle id="form-dialog-title">Create {this.props.alert ? "Alert" : "Discussion"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
            {this.props.alert ? "Enter the information about this alert": "Give the group something to talk about. You can ask a question or anything else you'd like"}
            </DialogContentText>

            <TextField
                autoFocus
                margin="dense"
                name="title"
                id="title"
                label="Title"
                type="text"
                fullWidth
                onChange={this.logChange}
            />

            <TextField
                margin="dense"
                name="message"
                id="message"
                label="Message"
                type="text"
                multiline
                rows="5"
                fullWidth
                onChange={this.logChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handlePost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>);
    }
  }

  export default  observer(withRouter(withSnackbar(CreatePost)));
