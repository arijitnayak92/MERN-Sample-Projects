import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Forgot extends Component{
    constructor(){
        super();
        this.state={
            open:false,
            mailid:'',
            official_id:''
        }
    }

    handleForgo=(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={3}/>
                    <Grid item xs={6}>
                        <div style={{textAlign:'center',color:'red',cursor:'pointer'}} className="go" onClick={() => this.setState({open:true})}>Forgot password?</div>
                    </Grid>
                    <Grid item xs={3}/>
                </Grid>
                <Dialog open={this.state.open} onClose={() => this.setState({open:false})} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" align="center">Forgot Password</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Please enter all the details!
                        </DialogContentText>
                        <FormGroup row>
                            <TextField
                                autoFocus
                                id="regid"
                                variant="outlined"
                                label="Your Official Id or Registration Number"
                                name="official_id" value={this.state.official_id} onChange={this.handleForgo}
                                fullWidth
                            /><br /><br /><br /><br />
                            <TextField
                                id="mailid"
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                name="mailid" value={this.state.mailid} onChange={this.handleForgo}
                                fullWidth
                            />
                        </FormGroup>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={() => this.setState({open:false})} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary">
                            Send Mail
                        </Button>
                        </DialogActions>
                    </Dialog>
            </div>

        )
    }
}