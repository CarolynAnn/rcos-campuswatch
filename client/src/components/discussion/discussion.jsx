import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, {Component} from 'react';
import './discussion.css'
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { Divider } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react'
class Discussion extends Component {
    constructor(props) {
      super(props)
        this.state ={
            reply: ""
        }

        this.logChange = this.logChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    logChange(e) {
        if (e.target) {
          if (e.target.name) {
            this.setState({ [e.target.name]: e.target.value });
          }
        }
      }
    
    submit(){
        console.log('submitting')
        let reply = {
            "id": this.props.userStore.replies.length + 1,
            "message": this.state.reply,
            "discussion_id": this.props.discussion.id,
            "poster_id": this.props.userStore.userInfo.id,
            "posted": Date.now()
        }

        this.props.userStore.replies.push(reply);
    }

    render() {
        let discussion= this.props.discussion;
        let time = (new Date(discussion.posted))
        let day = time.toDateString()
        let t = time.toTimeString().substring(0,5);
        let replyHTML = this.props.userStore.replies.map((reply) =>
        {
            let color = reply.poster_id == discussion.poster_id ? 'secondary' : 'default';
            
            return reply.discussion_id ==discussion.id ? <Grid item><Chip  key={reply.id} color={color} label={reply.message} /> <br /> <Link className="poster" to={'/user/' + reply.poster_id}>-{this.props.userStore.users[reply.poster_id-1].first_name + ' ' + this.props.userStore.users[reply.poster_id-1].last_name}</Link></Grid> : null
        });
        return <ExpansionPanel className="discussionPanel" expanded={this.props.expanded} onChange={this.props.onchange(discussion.id)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          container spacing={8}>
            <Grid item direction="row" container spacing={0}>
                <Grid item xs={12} container spacing={0}>
                    <Typography  className="discussionHeading">{discussion.title}</Typography>
                </Grid>
                <Grid item xs ={12} className="discussionPoster">
                    <Typography >
                        Posted by: <Link to= {'/user/' + discussion.poster_id}>{this.props.userStore.users[discussion.poster_id-1].first_name + ' ' + this.props.userStore.users[discussion.poster_id-1].last_name}</Link> on {day} at {t}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {discussion.message}
                </Typography>
            </Grid>
        </Grid>
        
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
            <Grid direction ="row">
                <Grid item direction ="column" 
                justify="space-evenly"
                alignItems="flex-end"
                container spacing={8}>
                    
                    {replyHTML} 
                </ Grid>
                <Divider className="replyDiv"/>
                <Grid item xs={12} container direction="row" alignItems="center" justify="center">
                    <Grid item xs={10} >
                        <InputBase fullWidth={true} multiline= {true} name="reply" rowsMax={4} placeholder="Reply" onChange={this.logChange}/>
                    </Grid>
                    <Grid item xs={2} style={{height: "32px"}}>
                    <IconButton  onClick={this.submit} aria-label="Send">
                        <Send />
                    </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
    </ExpansionPanel>
    }
}

export default  observer(Discussion);