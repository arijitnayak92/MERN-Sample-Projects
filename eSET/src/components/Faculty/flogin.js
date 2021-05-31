import {
  Button,
  Divider, Grid,
  TextField, Zoom
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../dynnav';
import Modal from '../forget';
import Register from './fsignup';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Fcred extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            home:'/etest/faculty',
            logout:'/etest/user/logout',
            login:'/etest/flogin',
            get:'/etest/user/',
            noti_route:true,
            nav_route: '/ework/user/fetchnav',
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount()
    {
      axios.get('/etest/user/')
      .then( res => {
            if (res.data.user) {

              if(res.data.user.h_order<1)
              {
                this.setState({
                    redirectTo: '/etest/admin'
                })
              }
              else {
                this.setState({
                    redirectTo: '/etest/dashboard'
                })
              }
            }
      });
    }

    handleSubmit=(event)=> {
    //console.log(this.state);
    if(!(this.state.username)||!(this.state.password)){
      this.setState({
        snack_open:true,
        snack_msg:'Enter the Details !!',
        alert_type:'warning',
        all:true,
      })
      return false;
    }
    else{
      this.setState({
        snack_open:true,
        snack_msg:'Logging In..',
        alert_type:'info',
      })
    axios.post('/etest/user/faclogin', {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
          console.log(response);
            if (response.status === 200) {
              if(response.data.h_order<1)
              {
                this.setState({
                    redirectTo: '/etest/admin'
                })
              }
              else {
                this.setState({
                    redirectTo: '/etest/dashboard'
                })
              }
          }
        }).catch(error => {
          if(error.response.status === 401)
          {
            this.setState({
              snack_open:true,
              snack_msg:error.response.data,
              alert_type:'error',
            });
          }
          else
          {
            this.setState({
              snack_open:true,
              snack_msg:'Internal Error !!',
              alert_type:'error',
              block_click:false,
            });
          }
        })
        this.setState({
           username: '',
           password: '',
         })

      }
}


    render() {
        const checked = true;
        if (this.state.redirectTo) {
     return <Redirect to={{ pathname: this.state.redirectTo }} />
 } else {
        return (
            <React.Fragment>

              
            <Navbar noti_route={this.state.noti_route} login={this.state.login}
            home={ this.state.home} nav_route={this.state.nav_route} get={this.state.get}
            logout={this.state.logout}/>
                            <Snackbar
        		        open={this.state.snack_open} autoHideDuration={2000}
        		        onClose={()=>this.setState({snack_open:false})}>
        			    <Alert onClose={()=>this.setState({snack_open:false})}
        			    severity={this.state.alert_type}>
        				{this.state.snack_msg}
        			    </Alert>
        		     </Snackbar>
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
                                display: 'block',backgroundColor:'#009688'}}>eSeat</Typography>

                            </Link>
                            <Typography variant="h6" color="secondary" align="center"
                            style={{padding:'8px',color: '#7b7b7b',borderRadius:'10px 10px 0px 0px',
                                display: 'block'}}>
                                FACULTY LOG IN
                            </Typography>
                        </div>
                        <form className="form-con">
                           <Grid container spacing={1}>
                             <Grid item xs={12} sm={12}>
                                <TextField id="outlined-basic1" label="Username"
                                type="text" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} fullWidth
                                 variant="outlined" />
                                 <br /><br />
                             </Grid>
                             <Grid item xs={12} sm={12}>
                               <TextField id="outlined-basic2" label="Password"
                                type="password" className="validate" value={this.state.password}
                                onChange={(e)=>this.setState({password:e.target.value})} fullWidth
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
}
