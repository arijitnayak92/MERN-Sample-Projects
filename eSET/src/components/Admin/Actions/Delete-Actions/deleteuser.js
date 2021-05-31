import React, { Component } from 'react';
import axios from 'axios';
import {Paper,Button,TextField,Grid,Hidden,Typography} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Backdrop} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


import ValidateUser from '../validateUser'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class DeleteUser extends Component{
    constructor(){
        super();
        this.state={
          result:'',
          modal:false,
          allowed:false,
          disabled:false,
          username: '',
          success:'none',
          snack_open:false,
          alert_type:'',
          snack_msg:'',
          submit:false,
        }
    }
    handleDelete = (e) =>{
        this.setState({
            username: e.target.value
        })
    }
    componentDidUpdate =(prevProps,prevState) => {
      if (prevProps.select !== this.props.select) {
        this.setState({username:''})
      }
      if (prevState.allowed !== this.state.allowed) {
        this.delete()
      }
    }

    showDiv =(userObject) => {
      this.setState(userObject)
    }

    delete = (e)=>{
      if(!this.state.username)
      {
        this.setState({
          snack_open:true,
          snack_msg:'Username Cannot be empty!!',
          alert_type:'warning',
        });
      }
      else{
      this.setState({success:'block',disabled:true})
      if(this.state.allowed === true)
      {
        this.setState({
          success:'none',
          snack_open:true,
          snack_msg:'Deleting ...!!',
          alert_type:'info',
        })
        if(this.props.select === "deleteadmin")
        {
          this.deleteAdmin();
        }
        else if(this.props.select === "deletefac")
        {
          this.deleteUser();
        }
        else if(this.props.select === "deletestu")
        {
          this.deleteSUser()
        }
      }
    }
    }
    deleteUser = (e) =>{
      this.setState({submit:true})
      axios.post('/ework/user/deleteuser',{username:this.state.username})
      .then(res=>{
        if(res.data === 'no')
        {
          this.setState({username:'',disabled:'',
          snack_open:true,
          snack_msg:'User not Found !!',
          alert_type:'error',
          })
        }
        else {
          this.setState({username:'',disabled:'',
          snack_open:true,
          snack_msg:res.data,
          alert_type:'success',
          })
        }
        this.setState({submit:false})
      })
      .catch( err => {
          this.setState({submit:false})
      });
    }

    deleteAdmin = (e) =>{
      this.setState({submit:true})
      axios.post('/ework/user/deleteadmin',{username:this.state.username})
      .then(res=>{
        if(res.data === 'no')
        {
          this.setState({username:'',disabled:'',
          snack_open:true,
          snack_msg:'User not Found !!',
          alert_type:'error',
          })
        }
        else {
          this.setState({username:'',disabled:'',
          snack_open:true,
          snack_msg:res.data,
          alert_type:'success',
          })
        }
        this.setState({submit:false})
      })
    }

    deleteSUser = (e) =>{
      this.setState({submit:true})
      axios.post('/ework/user2/deletesuser',{username:this.state.username})
      .then(res=>{
        if(res.data === 'no')
        {
          this.setState({username:'',disabled:'',
          snack_open:true,
          snack_msg:'User not Found !!',
          alert_type:'error',
          })
        }
        else {
          this.setState({username:'',disabled:'',
          snack_open:true,
          snack_msg:res.data,
          alert_type:'success',
          })
        }
        this.setState({submit:false})
      })
      .catch( err => {
          this.setState({submit:false})
      });
    }

    render(){
      if(this.props.select === "deleteadmin" || this.props.select === "deletefac" || this.props.select === "deletestu")
      {
        if(this.state.submit)
        {
          return(
            <Backdrop  open={true} style={{zIndex:'2040'}}>
              <CircularProgress style={{color:'yellow'}}/>&emsp;
              <div style={{color:'yellow'}}>Processing Your Request...</div>
            </Backdrop>
          )
        }
        else {
          return(
              <React.Fragment>

              <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              open={this.state.snack_open} autoHideDuration={2000}
              onClose={()=>this.setState({snack_open:false})}>
                <Alert onClose={()=>this.setState({snack_open:false})}
                severity={this.state.alert_type}>
                  {this.state.snack_msg}
                </Alert>
              </Snackbar>


                {this.state.success === 'block' &&
                    <ValidateUser showDiv={this.showDiv}/>
                }
                <Grid container spacing={1}>
                    <Hidden xsDown><Grid item sm={1}/></Hidden>
                    <Grid item xs={12} sm={10}>
                      <Paper variant="outlined" square style={{padding:'10px 5px 40px 5px'}}>
                      <Typography align="center" variant="h6" color="secondary">Delete User</Typography><br />
                          <TextField fullWidth id="outlined-basic" label="Enter Username to Delete" type="text" value={this.state.username}
                            onChange={this.handleDelete} variant="outlined" />
                          <br /><br />
                          <Button style={{float:'right'}} variant="contained" color="secondary" disabled={this.state.disabled}
                          onClick={this.delete}>Delete User</Button>

                      </Paper>
                  </Grid>
                  <Hidden xsDown><Grid item sm={1}/></Hidden>
                </Grid>
              </React.Fragment>
              )
        }
          }
          else {
            return(
              <div></div>
            )
          }
    }
}
