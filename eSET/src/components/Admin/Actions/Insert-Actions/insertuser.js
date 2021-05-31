import React, { Component} from 'react'
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
import {Snackbar,Backdrop} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import NavAdd from '../CRUD_In_Input/NavHandle'
import AddSection from '../CRUD_In_Input/handleSection'
import Res from '../CRUD_In_Input/handleRes'
import InsertDesignation from '../CRUD_In_Input/insertDesignation'
import InsertDept from '../CRUD_In_Input/handleDept';
import ValidateUser from '../validateUser';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class InsertUser extends Component{
    constructor(){
        super();
        this.initialState = {
            username: 'D',
            mailid: '',
            campus:'',
            dept:'',
            h_order:'0.5',
            password:'',
            deptToken:'',
            suspension_status:true,
            resetPasswordToken:'',
            resetPasswordExpires:'',
            count:3,
            active:false,
            department:'',
            snack_open:false,
            alert_type:'',
            snack_msg:'',
            success:'block',
            submit:false,
        }
        this.state = this.initialState;
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount()
    {
      this.setState({submit:true})
        axios.post('/ework/user/fetch_designation')
        .then(res => {
            if(res.data)
            {
                      const department = res.data.filter(item =>
                      item.action ==='Department');
              this.setState({department:department,submit:false})
            }
        });
    }
    handleField = (e) =>{
        this.setState({
          [e.target.name] : e.target.value,
        })
    }
    InsertDeptAdmin =(event)=>
    {
          event.preventDefault()
          if(!(this.state.username) || !(this.state.dept) || !(this.state.campus) || !(this.state.mailid))
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
          axios.post('/ework/user/insert_dept_admin',{data:this.state})
          .then( res => {
            this.setState({
              submit:false,
              username:'',
              mailid:'',
              campus:'',
              dept:'',
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

    showDiv =(userObject) => {
     this.setState(userObject)
    }


    render(){
        if(this.props.select==='insertadmin')
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
            return(
              <React.Fragment>

              {this.state.success === 'block' &&
              <ValidateUser showDiv={this.showDiv}/>
              }
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
                                name="mailid" value={this.state.mailid} onChange={this.handleField}
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
                               name="campus" onChange={this.handleField}
                               labelWidth={60}
                               >
                               <MenuItem value="Kattankulathur Campus">Kattankulathur Campus</MenuItem>
                               <MenuItem value="Ramapuram Campus">Ramapuram Campus</MenuItem>
                               <MenuItem value="Vadapalani Campus">Vadapalani Campus</MenuItem>
                               <MenuItem value="NCR Campus">NCR Campus</MenuItem>
                               </Select>
                             </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} xl={3} lg={3} md={4}>
                            <FormControl variant="outlined" style={{width:'100%'}}>
                                  <InputLabel id="demo-simple-select-outlined-label">
                                    Department
                                  </InputLabel>
                                  <Select
                                     labelId="dept"
                                     id="dept"
                                     value={this.state.dept}
                                     labelWidth={90}
                                     name="dept" onChange={this.handleField}>
                                       {this.state.department.map((content,index)=>{
                                             return(
                                               <MenuItem key={index} value={content.department_name}>{content.department_name}</MenuItem>
                                             )
                                       })}
                                  </Select>
                             </FormControl>
                        </Grid>
                    </Grid>
                    <br /><br />
                       <Button
                       variant="contained" color="secondary"
                       style={{float:'right',padding:'10px'}}
                       onClick={this.InsertDeptAdmin}>Insert Department Admin</Button>
                </Paper>
                </React.Fragment>
                )
            }
        }
        else if(this.props.select==='insert_in_nav')
        {
            return(
                  <NavAdd user={this.props.user} />
              )
        }
        else if(this.props.select==='responsibilty_percentages')
        {
            return(
                <Res user={this.props.user} />
              )
        }
        else if(this.props.select==='section_part_insert')
        {
            return(
                  <AddSection user={this.props.user} />
                )
        }
        else if(this.props.select === 'insert_designation')
        {
          return(
            <InsertDesignation user={this.props.user} />
           )
        }
        else if(this.props.select === 'insert_department')
        {
          return(
            <InsertDept user={this.props.user} />
          )
        }
        else{
            return(
                <React.Fragment></React.Fragment>
            )
        }
    }
}
