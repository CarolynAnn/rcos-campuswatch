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
class Discussion extends Component {
    constructor(props) {
      super(props)
     
    }

    

    render() {
        let discussion= this.props.discussion;
        let time = (new Date(discussion.posted))
        let day = time.toDateString()
        let t = time.toTimeString().substring(0,5);
        let replyHTML = this.props.replies.map((reply) =>
        {
            let color = reply.poster_id == discussion.poster_id ? 'secondary' : 'default';
            
            return <Grid item><Chip key={reply.id} color={color} label={reply.message} /> </Grid>
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
                        Posted by: {discussion.poster_id} on {day} at {t}
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
                    <Grid item xs={10}>
                        <InputBase fullWidth={true} multiline= {true} rowsMax={4} placeholder="Search Google Maps" />
                    </Grid>
                    <Grid item xs={2} style={{height: "32px"}}>
                    <IconButton  aria-label="Send">
                        <Send />
                    </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </ExpansionPanelDetails>
    </ExpansionPanel>
    }
}

export default Discussion;