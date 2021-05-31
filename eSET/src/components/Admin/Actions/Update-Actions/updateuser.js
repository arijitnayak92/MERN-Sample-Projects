import React, { Component} from 'react'
import { } from 'react-router-dom'
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import ValidateUser from '../validateUser';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class UpdateUser extends Component{
    constructor(){
        super();
        this.initialState={
            modal:false,
            allowed:false,
            disabled:false,
            username:'',
            password:'',
            value:'',
            response:'',
            success:'none',
            snack_open:false,
            snack_msg:'',
            alert_type:'',
        }
        this.state = this.initialState;
    }

handleAddAccess_To_DayOrder = (e) =>{
  this.setState({
    [e.target.name]:e.target.value,
  })
}
handleUpdate = (e) =>{
    this.setState({
        [e.target.name]: e.target.value
    })
}

componentDidUpdate =(prevProps,prevState) => {
  if (prevProps.select !== this.props.select) {
    this.setState({username:'',password:''})
  }
  if (prevState.allowed !== this.state.allowed) {
    this.update()
  }
}

showDiv =(userObject) => {
  this.setState(userObject)
}
    update = (e)=>{
      if(!this.state.username || !this.state.password)
      {
        this.setState({
          snack_open:true,
          snack_msg:'Enter all the details !!',
          alert_type:'warning',
        });
      }
      else
      {
        this.setState({success:'block',disabled:true})
        if(this.state.allowed === true)
        {
          var route;
          this.setState({success:'none'})
          if(this.props.select === "facpwd")
          {
            route = "/ework/user/update_faculty_password";

          }
          else if(this.props.select === "studpwd")
          {
            route ="/ework/user2/update_student_password";
          }
          this.UpdateHere(route);
        }
      }
    }


  handleAllUser_DayOrder_Add = (e) =>{
    e.preventDefault();
    axios.post('/ework/user/show_a_span_of_dayorder_to_all_user',this.state)
    .then(response=>{
      this.setState({response: response.data})
    })
  }

  UpdateHere = (route)=>{
    axios.post(route,this.state)
    .then(res=>{
      this.setState({
        snack_open:true,disabled:false,password:'',username:'',
        snack_msg:res.data,
        alert_type:'success',
      });
    })
  }
    render(){
      var button;
      if(this.props.select === 'facpwd' || this.props.select === 'studpwd'){
          button =
          <Paper variant="outlined" square style={{padding:'10px 10px 40px 10px'}}>
            <Typography variant="h5" color="secondary" align="center">Change the Password</Typography><br />
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} lg={6} xl={6} md={6}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Faculty or Admin or Student Id</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount1"
                      type="text" name="username" value={this.state.username} onChange={this.handleUpdate}
                      startAdornment={<InputAdornment position="start">Username</InputAdornment>}
                      labelWidth={215}
                    />
                  </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6} md={6}>
              <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Put New Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount2"
                    type="password" className="validate" name="password" value={this.state.password} onChange={this.handleUpdate}
                    startAdornment={<InputAdornment position="start">Password</InputAdornment>}
                    labelWidth={150}
                  />
                </FormControl>
              </Grid>
            </Grid>
          <br />
          <Button variant="contained" color="secondary" style={{float:'right',marginRight:'8px'}}
          disabled={this.state.disabled} onClick={this.update}>
            {this.props.select === 'studpwd' ?
              <Typography>STUDENT RESET</Typography>
              :
              <Typography>FACULTY RESET</Typography>
            }
          </Button>
        </Paper>
        }
        else{
            button=
                <React.Fragment></React.Fragment>
        }
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
              {button}
            </React.Fragment>
        )
    }
}
