import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {Snackbar,Backdrop,Typography} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default class SuperAdmin extends Component {
  constructor(props)
  {
    super()
    this.state={
      submit:true,
      colleges:[],
      fetch_colleges:[],
      school:'',
      h_order:0.1,
      username:'CO-',
      suspension_status:false,
      active:false,
      admin_type:'CAMPUS ADMIN',
      inserted_by:props.user.username,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount()
  {
    this.fetchDesignation();
  }
  fetchDesignation=()=>{
    axios.post('/etest/user/fetch_data_S',{fix_action:'Colleges'})
    .then(res => {
        if(res.data)
        {
          console.log(res.data);
          this.setState({fetch_colleges:res.data,submit:false})
        }
    })
    .catch( err =>{
        this.setState({submit:false})
    })
  }

  InsertDeptAdmin =(event)=>
  {
        event.preventDefault()
        if(!(this.state.username) || !(this.state.campus) || !(this.state.mailid))
        {
          this.setState({
            snack_open:true,
            snack_msg:'Fill all the Details Please!!',
            alert_type:'warning',
          });
        }
        else
        {
          this.setState({
            snack_open:true,
            snack_msg:'Submitting..!!..Sending Mail...!!',
            alert_type:'info',
            submit:true,
          });
        axios.post('/etest/user/insert-co-admin',{data:this.state})
        .then( res => {
          this.setState({
            submit:false,
            username:'',
            mailid:'',
            campus:'',
          })
            if(res.data === 'ok')
            {
              this.setState({
                snack_open:true,
                snack_msg:'Successfully Inserted  !!',
                alert_type:'success',
              });
            }
            else if(res.data === 'no')
            {
              this.setState({
                snack_open:true,
                snack_msg:'User Already There !!',
                alert_type:'error',
              });
            }
        })
        .catch( err => {
            this.setState({
              submit:false,
            })
        });
      }
  }

  render() {
    if(this.state.submit)
    {
      return(
        <Backdrop  open={true} style={{zIndex:'2040'}}>
          <CircularProgress style={{color:'yellow'}}/>&emsp;
          <div style={{color:'yellow'}}>Processing Your Request.....</div>
        </Backdrop>
      )
    }
    else {
      if(this.state.fetch_colleges.length === 0)
      {
       return(
         <Typography align="center" variant="h6" style={{paddingTop:'26px'}}>Not Enough Datas Available !!</Typography>
       )
      }
      else
       {
         console.log(this.state);
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
          <Paper elevation={3} style={{padding:'50px'}}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} xl={3} lg={3} md={4}>
                          <TextField
                            type="text"
                            id="Enter Offical Id"
                            label="Enter Offical Id"
                            fullWidth
                            name="username" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value.toUpperCase()})}
                            variant="outlined"
                          />
                    </Grid>
                    <Grid item xs={12} sm={12} xl={3} lg={3} md={4}>
                          <TextField
                            type="email"
                            id="Enter Offical Mail Id"
                            label="Enter Offical Mail Id"
                            fullWidth
                            name="mailid" value={this.state.mailid} onChange={(e)=>this.setState({mailid:e.target.value})}
                            variant="outlined"
                          />
                    </Grid>
                    <Grid item xs={12} sm={12} xl={3} lg={3} md={4}>
                        <FormControl variant="outlined" style={{width:'100%'}}>
                           <InputLabel id="demo-simple-select-outlined-label">
                             Campus
                           </InputLabel>
                           <Select
                           labelId="campus"
                           id="campus"
                           value={this.state.campus}
                           name="campus"
                           onChange={(e)=>this.setState({campus:e.target.value,colleges:this.state.fetch_colleges.filter(item=>item.campus ===  e.target.value)})}
                           labelWidth={60}
                           >
                           <MenuItem value="KTR">Kattankulathur Campus</MenuItem>
                           <MenuItem value="RAMAPURAM">Ramapuram Campus</MenuItem>
                           <MenuItem value="VADAPALANI">Vadapalani Campus</MenuItem>
                           <MenuItem value="DELHI">DELHI NCR Campus</MenuItem>
                           <MenuItem value="AP">AP Campus</MenuItem>
                           </Select>
                         </FormControl>
                    </Grid>
                </Grid>
                <br /><br />
                   <Button
                   variant="contained" color="secondary"
                   style={{float:'right',padding:'10px'}}
                   onClick={this.InsertDeptAdmin}>Insert Campus Admin</Button>
            </Paper>
        </React.Fragment>
      );
     }
   }
  }
}
