import React, { Component } from 'react'
import
{Dialog,Button,Grid,DialogActions,
  Divider,DialogContent,DialogTitle,
  Snackbar,Zoom,TextField
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FlagIcon from '@material-ui/icons/Flag';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default class TestLayout extends Component {
    render() {
        return (
            <React.Fragment>
                <Grid container spacing={1} style={{padding:'5px'}}>
                    <Grid item xs={12} sm={12} xl={12}>
                        <Typography variant="h5" align="center">
                            Test Description
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2} xl={2}>
                        <Paper elevation={3} style={{borderRadius:'6px',padding:'5px'}}>
                            <Typography variant="h6" align="center">Questions</Typography>
                            <Divider />
                            <Grid container spacing={2} style={{padding:'5px'}}>
                                <Grid item xs={2} sm={3} xl={3}>
                                <Paper elevation={3} style={{borderRadius:'5px'}}>
                                <Typography variant="h6" align="center" style={{backgroundColor:'green',color:'white',cursor:'pointer'}}>Q1.</Typography>
                                </Paper>
                                </Grid>

                                <Grid item xs={2} sm={3} xl={3}>
                                <Paper elevation={3} style={{borderRadius:'5px'}}>
                                <Typography variant="h6" align="center" style={{backgroundColor:'orange', color:'white',cursor:'pointer'}}>Q2.</Typography>
                                </Paper>
                                </Grid>
                                <Grid item xs={2} sm={3} xl={3}>
                                <Paper elevation={3} style={{borderRadius:'5px'}}>
                                <Typography variant="h6" align="center" style={{cursor:'pointer'}}>Q3.</Typography>
                                </Paper>
                                </Grid>
                                <Grid item xs={2} sm={3} xl={3}>
                                <Paper elevation={3} style={{borderRadius:'5px'}}>
                                <Typography variant="h6" align="center" style={{cursor:'pointer'}}>Q4.</Typography>
                                </Paper>
                                </Grid>
                                <Grid item xs={2} sm={3} xl={3}>
                                <Paper elevation={3} style={{borderRadius:'5px'}}>
                                <Typography variant="h6" align="center" style={{cursor:'pointer'}}>Q5.</Typography>
                                </Paper>
                                </Grid>

                            </Grid>
                            <Divider />

                            <Grid container spacing={2} style={{padding:'5px'}}>

                                <Grid item xs={12} sm={12} xl={12}>

                                <Typography variant="h6" align="center">Labels</Typography>
                                </Grid>


                            <Grid container spacing={2}>

                                {/* Labels for the given answered or not answered or marked for review qiestions  */}
                                <Grid item xs={2} sm={3} xl={3}>
                                <Paper elevation={3} style={{borderRadius:'5px'}}>
                                <Typography variant="h6" align="center">Q</Typography>
                                </Paper>
                                </Grid>

                                <Grid item xs={10} sm={9} xl={9}>
                                <Typography variant="h6">Not Answered</Typography>
                                </Grid>

                                <Grid item xs={2} sm={3} xl={3}>
                                <Paper elevation={3} style={{borderRadius:'5px'}}>
                                <Typography variant="h6" align="center" style={{backgroundColor:'green',color:'white'}}>Q</Typography>
                                </Paper>
                                </Grid>

                                <Grid item xs={10} sm={9} xl={9}>
                                <Typography variant="h6">Saved</Typography>
                                </Grid>

                                <Grid item xs={2} sm={3} xl={3}>
                                <Paper elevation={3} style={{borderRadius:'5px'}}>
                                <Typography variant="h6" align="center" style={{backgroundColor:'orange',color:'white'}}>Q</Typography>
                                </Paper>
                                </Grid>

                                <Grid item xs={10} sm={9} xl={9}>
                                <Typography variant="h6">Marked for review</Typography>
                                </Grid>


                            </Grid>
                        </Grid>

                        </Paper>

                    </Grid>

                    <Grid item xs={12} sm={10} xl={10} >

                        <Paper elevation={3} style={{borderRadius:'6px',padding:'10px'}}>

                            <Grid container spacing={1}>

                                <Grid item xs={6} sm={10} xl={10}>
                                    <Typography variant="h5">Question 1: </Typography>
                                </Grid>
                                <Grid item xs={6} sm={2} xl={2}>
                                    <Typography variant="h6">Remaining Time : 10:53</Typography>
                                </Grid>

                            </Grid>

                            <Grid container spacing={1}>

                                <Grid item xs={12} sm={12} xl={12}>
                                    <Typography variant="h6">
                                        <b>When was the Constitution of India came into effect?</b>
                                    </Typography>
                                </Grid>

                            </Grid>

                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6} xl={6}>
                                    <Paper elevation={3} style={{padding:'10px'}}>
                                        Options
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6} xl={6}>
                                    <Paper elevation={3} style={{padding:'10px'}}>
                                        Options
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6} xl={6}>
                                    <Paper elevation={3} style={{padding:'10px'}}>
                                        Options
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} sm={6} xl={6}>
                                    <Paper elevation={3} style={{padding:'10px'}}>
                                        Options
                                    </Paper>
                                </Grid>

                            </Grid>

                            <Grid container spacing={1} style={{paddingTop:'10px'}}>

                                <Grid item xs={3} sm={3} xl={3}>
                                <Grid container spacing={1} justify="flex-start">

                                    <Button
                                    style={{border:'2px solid green'}}
                                    > <ArrowBackIcon/> Prev</Button>

                                </Grid>
                                </Grid>

                                <Grid item xs={6} sm={6} xl={6}>
                                <Grid container spacing={1} justify="center">

                                    <Button
                                    style={{border:'2px solid yellow'}}
                                    > <FlagIcon/> Mark For Review</Button>

                                </Grid>
                                </Grid>

                                <Grid item xs={3} sm={3} xl={3}>
                                <Grid container spacing={1} justify="flex-end">

                                    <Button
                                    style={{border:'2px solid green'}}
                                    > Next <ArrowForwardIcon/></Button>

                                </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>


                </Grid>

            </React.Fragment>
        )
    }
}
