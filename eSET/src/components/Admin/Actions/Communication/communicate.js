import React, { Component } from 'react';
import axios from 'axios';
import {Button,Paper,TextField,CircularProgress,Backdrop} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {FormControl,Grid} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default class componentName extends Component {
  constructor()
  {
    super();
    this.state={
      content:'',
      option:'',
      submit:false,
    }
  }

  componentDidUpdate=(prevProps)=>{
    if(prevProps.select!==this.props.select)
    {
      this.setState({content:'',option:''})
    }
  }
  mailSend=()=>{
    this.setState({submit:true})
    let query;
    if(this.props.select === 'connect_user')
    {
      if(this.state.option === 'users')
      {
        query = {$and:[{h_order:{$gt:0}}]}
      }
      else if(this.state.option === 'except-dadmin-admin'){
        query = {$and:[{h_order:{$gt:0.5}}]}
      }
      else if(this.state.option === 'only-dadmin'){
        query = {$and:[{h_order:0.5}]}
      }
      else if(this.state.option === 'inactive'){
        query = {$and:[{active:false},{h_order:{$gt:0.5}}]}
      }
      else if(this.state.option === 'suspended'){
        query = {$and:[{suspension_status:true}]}
      }
      else if(this.state.option === 'assistant'){
        query = {$and:[{h_order:7}]}
      }
      else if(this.state.option === 'associate'){
        query = {$and:[{h_order:8}]}
      }
      else if(this.state.option === 'professor'){
        query = {$and:[{h_order:6}]}
      }
      else if(this.state.option === 'hod'){
        query = {$and:[{h_order:5}]}
      }
      else if(this.state.option === 'assis-director'){
        query = {$and:[{h_order:3}]}
      }
      else if(this.state.option === 'dean'){
        query = {$and:[{h_order:4}]}
      }
      else if(this.state.option === 'principle'){
        query = {$and:[{h_order:2}]}
      }
      else if(this.state.option === 'director'){
        query = {$and:[{h_order:1}]}
      }
      console.log(query);
      axios.post('/ework/user/send_globalmail',{content:this.state.content,query:query})
      .then( res => {
        this.setState({
          snack_open:true,
          alert_type:'success',
          snack_msg:'All the mails has been sent !!',
          submit:false,
        })
      })
      .catch( err => {
        this.setState({
          snack_open:true,
          alert_type:'success',
          snack_msg:'Oops !! Something went wrong !!',
          submit:false,
        })
      });
    }
    else {
      if(this.state.option === 'susers')
      {
        query = {}
      }
      else if(this.state.option === 'inactive'){
        query = {$and:[{active:false}]}
      }
      else if(this.state.option === 'suspended'){
        query = {$and:[{suspension_status:true}]}
      }
      axios.post('/ework/user2/send_globalmail',{content:this.state.content,query:query})
      .then( res => {
        this.setState({
          snack_open:true,
          alert_type:'success',
          snack_msg:'All the mails has been sent !!',
          submit:false,
        })
      })
      .catch( err => {
        this.setState({
          snack_open:true,
          alert_type:'success',
          snack_msg:'Oops !! Something went wrong !!',
          submit:false,
        })
      });
    }

  }
  render() {
    if(this.props.select)
    {
      if(this.state.submit)
      {
        return(
          <Backdrop  open={true} style={{zIndex:'2040'}}>
            <CircularProgress style={{color:'yellow'}}/>&emsp;
            <div style={{color:'yellow'}}>Processing Your Request.....</div>
          </Backdrop>
        )
      }
      else{
    return (
      <React.Fragment>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      open={this.state.snack_open} autoHideDuration={2000}
      onClose={()=>this.setState({snack_open:false})}>
        <Alert onClose={()=>this.setState({snack_open:false})}
        severity={this.state.alert_type}>
          {this.state.snack_msg}
        </Alert>
      </Snackbar>

      <Grid container style={{margin:'0px 0px 0px 20px'}}>
        <Grid item xs={6} sm={6}>
          <FormControl style={{width:'100%'}}>
             <InputLabel id="option">Select Here</InputLabel>

              {this.props.select === 'connect_user' ?
              <Select
                labelId="option"
                id="option"
                value={this.state.option} onChange={(e)=>this.setState({option:e.target.value})}
              >
                     <MenuItem value="users">Send Mail To All(Without admin & Student)</MenuItem>
                     <MenuItem value="inactive">Send Mail to All Inactive Users</MenuItem>
                     <MenuItem value="suspended">Send Mail to the Suspended Users</MenuItem>
                     <MenuItem value="assistant">Send Mail to all Assistant Professor</MenuItem>
                     <MenuItem value="associate">Send Mail to all Associate Professor</MenuItem>
                     <MenuItem value="professor">Send Mail to all Professor</MenuItem>
                     <MenuItem value="hod">Send Mail to all HOD</MenuItem>
                     <MenuItem value="dean">Send Mail to all Dean</MenuItem>
                     <MenuItem value="assis-director">Send Mail to all Assistant Director</MenuItem>
                     <MenuItem value="director">Send Mail to all Director</MenuItem>
                     <MenuItem value="principle">Send Mail to all Principle</MenuItem>
                  </Select>
                  :
                  <Select
                    labelId="option"
                    id="option"
                    value={this.state.option} onChange={(e)=>this.setState({option:e.target.value})}
                  >
                     <MenuItem value="susers">Send Mail To All Student</MenuItem>
                     <MenuItem value="inactive">Send Mail to All Inactive Students</MenuItem>
                     <MenuItem value="suspended">Send Mail to the Suspended Students</MenuItem>
                  </Select>
              }
           </FormControl>
         </Grid>
         <Grid item xs={6} sm={6}/>
       </Grid>
       <br />

        {this.state.option &&
         <Paper elevation={1} style={{padding:'20px'}}>
             <TextField
               autoFocus
               multiline
               rows="4"
               id="username"
               variant="outlined"
               label="Enter the Mail Content"
               alue={this.state.content} onChange={(e)=>this.setState({content:e.target.value})}
               fullWidth
             />
             <br /><br />
            <Button variant="contained" color="primary" onClick={this.mailSend} disabled={this.state.content ? false : true}
            >Send Global Mail</Button>
         </Paper>
       }
      </React.Fragment>
    );
    }
   }
   else {
     return(
       <div></div>
     )
   }
  }

}
