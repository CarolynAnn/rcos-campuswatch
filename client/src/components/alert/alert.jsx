import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, {Component} from 'react';


class Alert extends Component {
    constructor(props) {
      super(props)
     
    }

    

    render() {
        let alert= this.props.alert;

        return <ExpansionPanel expanded={this.props.expanded} onChange={this.props.onchange(alert.id)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="alertHeading">{alert.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <Typography>
            {alert.message}
        </Typography>
        <Typography>
            Posted by: {alert.poster_id}
        </Typography>
        </ExpansionPanelDetails>
    </ExpansionPanel>
    }
}

export default Alert;