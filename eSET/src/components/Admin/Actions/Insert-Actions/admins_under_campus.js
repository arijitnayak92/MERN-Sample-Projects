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

import Autocomplete from '@material-ui/lab/Autocomplete';



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
      department:[],
      schools:[],
      school:'',
      h_order:0,
      campus:'',
      username:'CO-',
      suspension_status:false,
      active:false,
      admin_type:'',
      inserted_by:props.user.username,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount()
  {
    this.fetchDesignation();
    this.setOrder();
  }
  componentDidUpdate=(prevProps)=>{
    if(prevProps.action !== this.props.action)
    {
      this.setOrder();
    }
  }
  fetchDesignation=()=>{

    axios.post('/etest/user/fetch_data_S')
    .then(res => {
        if(res.data)
        {
          let colleges;
          if(this.props.user.h_order>0)
          {
            let schools;
            colleges = res.data.filter(item=>(item.action === 'Colleges' && item.campus === this.props.user.campus));
            if(this.props.user.h_order === 0.2 && this.props.action === 'insert-school-admin')
            {
              schools = res.data.filter(item=>(item.action === 'Schools' && item.college_name === this.props.user.college && item.campus === this.props.user.campus));
              let department = res.data.filter(item=>item.action === 'Department');
              this.setState({schools:schools,college:this.props.user.college,fetch_department:department})
            }
            if(this.props.user.h_order === 0.3 && this.props.action === 'insert-dept-admin')
            {
              schools = res.data.filter(item=>(item.action === 'Schools' && item.college_name === this.props.user.college && item.campus === this.props.user.campus));
              let department =
              res.data.filter(item=>(item.action === 'Department' &&
              item.usertype === this.props.user.school && item.college_name ===  this.props.user.college && item.campus === this.props.user.campus));
              this.setState({schools:schools,college:this.props.user.college,school:this.props.user.school,department:department})
            }
            else {
              schools = res.data.filter(item=>item.action === 'Schools');
              let department = res.data.filter(item=>item.action === 'Department');
              this.setState({fetch_schools:schools,fetch_department:department})
            }

            this.setState({colleges:colleges,fetch_colleges:colleges,campus:this.props.user.campus,submit:false})
          }
          else {
            colleges = res.data.filter(item=>(item.action === 'Colleges'));
            let schools = res.data.filter(item=>item.action === 'Schools');
            let department = res.data.filter(item=>item.action === 'Department');
            this.setState({fetch_colleges:colleges,fetch_schools:schools,fetch_department:department,submit:false})
          }
        }
    })
    .catch( err =>{
        this.setState({submit:false})
    })
  }

  setOrder=()=>{

    if(this.props.action === 'insert-college-admin')
    {
      this.setState({h_order:0.2,admin_type:'COLLEGE ADMIN',})
    }
    else if(this.props.action === 'insert-school-admin')
    {
      this.setState({h_order:0.3,admin_type:'SCHOOL ADMIN'})
    }
    else if(this.props.action === 'insert-dept-admin')
    {
      this.setState({h_order:0.5,admin_type:'DEPARTMENT ADMIN'})
    }
  }

  InsertDeptAdmin =(event)=>
  {
        let checks;
        if(this.props.action === 'insert-college-admin')
        {
          checks =(!(this.state.username) || !(this.state.college) || !(this.state.campus) || !(this.state.mailid));
        }
        else if(this.props.action === 'insert-school-admin')
        {
          checks =(!(this.state.username) || !(this.state.college) || !(this.state.school) || !(this.state.campus) || !(this.state.mailid));
        }
        else if(this.props.action === 'insert-dept-admin')
        {
          checks= (!(this.state.username) || !(this.state.college) || !(this.state.department_name) ||
                    !(this.state.school) || !(this.state.campus) || !(this.state.mailid));
        }
        if(checks)
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
            college:'',
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
  setSkill=(e)=>{
    if(e === null)
    {

    }
    else
    {
      this.setState({department_name:e.department_name,})
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
      if((this.state.fetch_colleges.length === 0))
      {
       return(
         <Typography align="center" variant="h6" style={{paddingTop:'26px'}}>Not Enough Datas Available !!</Typography>
       )
      }
      else
       {
         let options=[];
         if(this.state.department.length>0)
         {
           options = this.state.department.map(option => {
             const firstLetter = option.department_name[0].toUpperCase();
             return {
               firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
               ...option,
             };
           });
         }
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
                           disabled={this.props.user.h_order>0 ? true : false}
                           value={this.state.campus}
                           onChange={(e)=>this.setState({campus:e.target.value,colleges:this.state.fetch_colleges.filter(item=>item.campus === e.target.value)})}
                           name="campus"
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
                    <Grid item xs={12} sm={12} xl={3} lg={3} md={4}>
                        <FormControl variant="outlined" style={{width:'100%'}}>
                           <InputLabel id="demo-simple-select-outlined-label">
                             Colleges
                           </InputLabel>
                           <Select
                           labelId="college"
                           id="college"
                           value={this.state.college}
                           disabled={
                             this.state.colleges.length>0 ?
                              (this.state.college && this.props.user.h_order>0.1) ? true :false
                              : true
                           }
                           name="college" onChange={(e)=>this.setState({college:e.target.value,schools:
                             this.state.fetch_schools.filter(item=>(item.college_name === e.target.value && item.campus === this.state.campus))})}
                           labelWidth={60}
                           >
                                {this.state.colleges.map((content,index)=>{
                                      return(
                                        <MenuItem key={index} value={content.college_name}>{content.college_name}</MenuItem>
                                      )
                                })}
                           </Select>
                         </FormControl>
                    </Grid>
                  {(this.props.action === 'insert-school-admin' || this.props.action === 'insert-dept-admin')  &&
                   <Grid item xs={12} sm={12} xl={3} lg={3} md={4}>
                        <FormControl variant="outlined" style={{width:'100%'}}>
                           <InputLabel id="demo-simple-select-outlined-label">
                             Schools
                           </InputLabel>
                           <Select
                           labelId="college"
                           id="college"
                           value={this.state.school}
                           disabled={
                             this.state.schools.length>0 ?
                              (this.state.school && this.props.user.h_order === 0.3) ? true :false
                              : true
                           }
                           name="school"
                           onChange={(e)=>this.setState({school:e.target.value,department:this.state.fetch_department.filter(item=>(item.usertype === e.target.value && item.college_name ===  this.state.college && item.campus === this.state.campus))})}
                           labelWidth={60}
                           >
                                {this.state.schools.map((content,index)=>{
                                      return(
                                        <MenuItem key={index} value={content.school_name}>{content.school_name}</MenuItem>
                                      )
                                })}
                           </Select>
                         </FormControl>
                    </Grid>
                  }
                  {this.props.action === 'insert-dept-admin'  &&
                   <Grid item xs={12} sm={12} xl={3} lg={3} md={4}>
                     <Autocomplete
                       id="grouped-demo"
                       disabled={options.length>0 ? false : true}
                       options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                       groupBy={option => option.firstLetter}
                       getOptionLabel={option => option.department_name}
                       onChange={(event, value) => this.setSkill(value)}
                       style={{ width: '100%' }}
                       renderInput={params => (
                         <TextField {...params} label="Available Departments" variant="outlined" fullWidth />
                       )}
                     />
                    </Grid>
                  }
                </Grid>
                <br /><br />
                   <Button
                   variant="contained" color="secondary"
                   style={{float:'right',padding:'10px'}}
                   onClick={this.InsertDeptAdmin}>Insert Admins</Button>
            </Paper>
        </React.Fragment>
      );
     }
   }
  }
}
