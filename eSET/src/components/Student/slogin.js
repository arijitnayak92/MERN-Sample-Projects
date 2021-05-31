import React, { Component } from 'react';
import Modal from '../forget'
import Register from './ssignup'
import
{Dialog,Button,Grid,DialogActions,
  Divider,DialogContent,DialogTitle,
  Snackbar,Zoom,TextField
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Navbar from '../dynnav';

export default class Fcred extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:'',

        }
        // this.componentDidMount = this.componentDidMount.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUser= this.handleUser.bind(this)
        this.handlePass= this.handlePass.bind(this)
    }
    handleUser(e) {
        this.setState({
            username: e.target.value,
        })
    }
    handlePass(e) {
        this.setState({
            password: e.target.value,
        })
    }
    render() {
        const checked = true;
        return (
            <React.Fragment>
                <Navbar />
                <Grid container>
                    <Grid item xs={1} sm={4} xl={4}></Grid>
                    <Grid item xs={10} sm={4} xl={4}>
                    <Zoom
                    in={true}
                    {...(checked ? { timeout: 700 } : {})}
                    >
                    <Paper elevation={3} style={{marginTop:'100px',borderRadius:'8px'}}>
                        <div className="center">
                            <Link style={{textDecoration:'none'}} to ="/">
                            <Typography variant="h5" color="secondary" align="center"
                            style={{padding:'8px',color: 'white',borderRadius:'10px 10px 0px 0px',
                                display: 'block',backgroundColor:'#009688'}}>eTest</Typography>

                            </Link>
                            <Typography variant="h6" color="secondary" align="center"
                            style={{padding:'8px',color: '#7b7b7b',borderRadius:'10px 10px 0px 0px',
                                display: 'block'}}>
                                STUDENT LOG IN
                            </Typography>
                        </div>
                        <form className="form-con">
                           <Grid container spacing={1}>
                             <Grid item xs={12} sm={12}>
                                <TextField id="outlined-basic1" label="Registration No."
                                type="text" value={this.state.username} onChange={this.handleUser} fullWidth
                                 variant="outlined" />
                                 <br /><br />
                             </Grid>
                             <Grid item xs={12} sm={12}>
                               <TextField id="outlined-basic2" label="Password"
                                type="password" className="validate" value={this.state.password} onChange={this.handlePass} fullWidth
                                variant="outlined" />
                                <br /><br />
                             </Grid>
                           </Grid>
                           <Grid container spacing={3}>
                               <Grid item xs={6} sm={6}>
                                    <Register />
                                   
                                  
                               </Grid>
                              <Grid item xs={6} sm={6}>
                                 <Button disabled={this.state.block_click} fullWidth
                                  style={{backgroundColor:'#009688',color:'white'}}
                                  onClick={this.handleSubmit}>Login</Button>
                              </Grid>
                           </Grid>
                           <br />

                         <Divider /><br />

                         <Modal/>

                     </form>
                    </Paper>
                    </Zoom>
                    </Grid>
                    <Grid item xs={1} sm={4} xl={4}></Grid>
                </Grid>


            </React.Fragment>
        )
    }
}
