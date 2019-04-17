
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, {Component} from 'react';
import './alert.css'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import {observer} from 'mobx-react'
class Alert extends Component {
    

    

    render() {
        let alert= this.props.alert;

        return <ExpansionPanel  expanded={this.props.expanded} onChange={this.props.onchange(alert.id)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Grid item direction="row" container spacing={0}>
            <Grid item xs={12} container spacing={0}>
                <Typography className="alertHeading">{alert.title}</Typography>
            </Grid>
            <Grid item xs ={12} className="alertPoster">
                <Typography>
                    Posted by: <Link to= {'/user/' + alert.poster_id}>{this.props.userStore.users[alert.poster_id-1].first_name + ' ' + this.props.userStore.users[alert.poster_id-1].last_name}</Link> 
                </Typography>
            </Grid>
        </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Typography>
            {alert.message}
        </Typography>
        
        </ExpansionPanelDetails>
    </ExpansionPanel>
    }
}

export default  observer(Alert);