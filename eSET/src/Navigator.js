import { Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Etest from './logo.png';


export default class Nstart extends Component {
    constructor(){
        super();
        this.state={
            show_modal:false,
        }
    }
    showValidation=()=>{
		this.setState({show_modal:!this.state.show_modal})
	}
    render() {
        const checked = true;
        return (
            <Grid container spacing={2} style={{paddingTop:'60px'}}>
                <Grid container justify="flex-start" alignItems="center">
                    <Hidden only={['sm', 'lg', 'md']}>
                        <InfoIcon style={{cursor:'pointer',position:'absolute',top:'5px',left:'5px'}} onClick={this.showValidation}/>
                    </Hidden>
                    <React.Fragment>
							<Dialog style={{userSelect:'none'}}
                            fullWidth={true} maxWidth={'sm'}
                            open={this.state.show_modal}
                            onClick={this.showValidation}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            >
                            <DialogTitle id="alert-dialog-title">
                                <Grid container>
                                <Grid item xs={12} sm={12} xl={12}>
                                    <Grid container justify="center" style={{padding:'8px',color: 'white',borderRadius:'10px 10px 0px 0px',display: 'block',backgroundColor:'#009688'}}>
                                        <Typography variant="h5" color="secondary" align="center" style={{color: 'white',borderRadius:'10px 10px 0px 0px',display: 'block',backgroundColor:'#009688'}}>About eSeat</Typography>
                                    </Grid>
                                </Grid>
                                </Grid>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <Typography variant="h6" component="h6" align="justify">
                                        ESeat is a simple interactive tool, which automates the seating arrangement.
                                        It allows the users to choose or to create their own layout or pattern of the exam.
                                        And according to that process can be authomated in regards of seating and assigning
                                        targated object in that.
                                    </Typography>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Grid container justify="center">
                                    <CloseIcon onClick={this.showValidation} style={{color:'red',cursor:'pointer',border:'1px solid red',borderRadius:'15px'}}/>
                                </Grid>
                            </DialogActions>
                            </Dialog>
                    </React.Fragment>
                </Grid>
                <Hidden xsDown>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={7}>
                        <Paper elevation={3} style={{padding:'20px',borderRadius:'10px',marginTop:'100px'}}>
                        <div className="center">
                            <Typography variant="h4" color="secondary" align="center" style={{padding:'8px',color: 'white',borderRadius:'10px 10px 0px 0px', display: 'block',backgroundColor:'#009688'}}>
                                About eSeat
                            </Typography>
                            <br/>
                        </div>
                        <Grid container justify="flex-start" alignItems="center">
                        <Typography variant="h6" component="h6">
                        ESeat is a simple interactive tool, which automates the seating arrangement.
                                        It allows the users to choose or to create their own layout or pattern of the exam.
                                        And according to that process can be authomated in regards of seating and assigning
                                        targated object in that. This helps administators as well as vistors to manage their
                                        seats. As whole setup of the data will be in cloud that's why it is easy accessable 
                                        also.As whole setup of the data will be in cloud that's why it is easy accessable 
                                        also.As whole setup of the data will be in cloud that's why it is easy accessable 
                                        also.As whole setup of the data will be in cloud that's why it is easy.
                        </Typography>
                        </Grid>
                        </Paper>
                    </Grid>

                </Hidden>
                <Grid item xs={12} sm={3}>
                    <Paper elevation={3} style={{padding:'15px',borderRadius:'10px',marginTop:'100px'}}>
                    <Grid item sm={12}>
                            <Grid container justify="center">
                                <img src={Etest} alt="" width="135px"/>
                            </Grid>
                        </Grid>
                        <br/>

                        <Grid item sm={12}>
                            <Link to="/etest/faculty" style={{textDecoration:'none',fontSize:'20px'}}>
                                <Paper style={{color:'white',padding:'10px', height:'50px',textAlign:'center',backgroundColor:'#9c27b0'}}>
                                    Faculty
                                </Paper>
                            </Link>
                        </Grid>
                        <br/>
                        <Grid item sm={12}>
                            <Link to="/etest/student" style={{textDecoration:'none',fontSize:'20px'}}>
                                <Paper style={{color:'white',padding:'10px', height:'50px',textAlign:'center',backgroundColor: '#f44336'}}>
                                    Student
                                </Paper>
                            </Link>
                        </Grid>
                    </Paper>
                    </Grid>
                    <Grid item sm={1}></Grid>

                </Grid>


        )
    }
}
