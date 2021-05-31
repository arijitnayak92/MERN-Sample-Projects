import React, { Component } from 'react'
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import {FormControl,Grid,Hidden,TextField} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Backdrop,Typography,Switch} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import SemesterDetails from './ModifyUser/semesterDetails';
import ValidateUser from '../validateUser';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class ModifyUser extends Component{
  constructor(props){
      super(props);
      this.initialState={
        submit:true,
        success:'',
        modal:false,
        disabled:'',
        allowed:false,
        done:'',
        cday:'',
        cmonth:'',
        cyear:'',
          replacable_day_order:'',
          snack_open:false,
          snack_msg:'',
          alert_type:'',
          start_sem:false,
          end_sem:false,
          start_data:'',
          end_data:'',
          all_data:'',
          found:false,
          adviser_data:'',
          alter_user:'',
          reason:'',
      }
      this.state = this.initialState;
      this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount()
  {
    axios.get('/ework/user/fetch_admin_order')
    .then( res => {
        if(res.data.length>0)
        {
          let start_data =  res.data.filter(item=>(item.order === 'Semester-Details' && item.start_sem:true))
          let end_data =  res.data.filter(item=>(item.order === 'Semester-Details' && item.end_sem:true))
          let all_data =  res.data.filter(item=>(item.order === 'Semester-Details'))
          this.setState({start_data:start_data,end_data:end_data,all_data:all_data})
        }
        this.setState({submit:false})
    })
    .catch( err => {
        this.setState({submit:false})
    });
  }
  componentDidUpdate =(prevProps,prevState) => {
    if (prevState.allowed !== this.state.allowed) {
      this.navigate();
    }
  }
  showDiv =(userObject) => {
    this.setState(userObject)
  }

  navigate =(e) =>{
    this.setState({success:'block',disabled:true})
    if(this.state.allowed === true)
    {
      this.setState({success:'none',disabled:false})
      if(this.props.select === "modifytoday")
      {
        this.Reset_Today_DayOrder()
      }
      else if(this.props.select === "cancel_or_declare_today_as_a_holiday")
      {
        this.handleCancel_Holiday()
      }
    }
  }


  handleChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  /*------------------------------------Cancellation For Holiday & Also DayOrder Cancelled---------------- */
  handleCancel_Holiday = (e) =>{
    var day = Date.today().toString("dd");
    var month = Date.today().toString("M");
    var year = Date.today().toString("yyyy");
    if((this.state.cday === day) && (this.state.cmonth === month) && (this.state.cyear === year))
    {
      this.setState({submit:true})
    axios.post('/ework/user/declare_cancel_or_holiday',this.state,
    this.setState({done:''})
  )
    .then(res=>{
      this.setState({done:res.data,disabled:'',
      success:'none',submit:false})
    })
    .catch(error =>{
      this.setState({
        snack_open:true,
        snack_msg:'Something Went Wrong',
        alert_type:'error',
        submit:false,
      })
    })
  }
  else
  {
    this.setState({
      cday:'',cmonth:'',
      cyear:'',disabled:false,
      success:'none',
      snack_open:true,
      snack_msg:'Invalid Input !!',
      alert_type:'warning',
    });
  }
  }

/*------------------------------------------------Reset Today's DayOrder---------------------------- */
Reset_Today_DayOrder = (e) =>{
  this.setState({submit:true})
    axios.post('/ework/user/handle_change_today_dayorder',{day_order:this.state.replacable_day_order})
    .then(res=>{
      if(res.data)
      {
        this.setState({
        replacable_day_order:'',
        disabled:false,
        success:'none',
        snack_open:true,
        snack_msg:res.data,
        alter_on:false,
        alert_type:'info',submit:false})
      }
    })
    .catch( err => {
        this.setState({submit:false})
    });
}

startSem=(data)=>{
  this.setState({start_sem:true,submit:true})
  axios.post('/ework/user/start_sem')
  .then( response => {
    this.setState({
    snack_open:true,
    snack_msg:'Done',
    alert_type:'succ',submit:false})
  })
  .catch( err => {
    this.setState({
    snack_open:true,
    snack_msg:'Something went wrong !!',
    alert_type:'error',submit:false})
  });
}

endSem=(data)=>{
  this.setState({start_sem:true,submit:true})
  axios.post('/ework/user/end_sem')
  .then( res => {
    if(res.data === 'ok')
    {
        this.suspenAllStudent();
    }
    else {
      this.setState({
      snack_open:true,
      snack_msg:'Oops!! Can not able to update !!',
      alert_type:'error',submit:false})
    }

  })
  .catch( err => {
    this.setState({
    snack_open:true,
    snack_msg:'Something went wrong !!',
    alert_type:'error',submit:false})
  });
}

suspenAllStudent=()=>{
  axios.post('/ework/user2/breakall')
  .then( res => {
    this.setState({
    snack_open:true,
    snack_msg:'Done',
    alert_type:'success',submit:false})
  });
}
alterAdviser=()=>{
  if(!(this.state.alter_user) || !(this.state.reason))
  {
      this.setState({
      snack_open:true,
      snack_msg:'Enter all the Details !!',
      alert_type:'warning',
    })
  }
  else {
    this.setState({submit:true})
    axios.post('/ework/user/alter_adviser',{ac_user:this.state.adviser_data,state:this.state})
    .then( res => {
        if(res.data === 'ok')
        {
          this.setForStudent()
        }
        else {
          this.setState({
          submit:false,
          snack_open:true,
          snack_msg:'Unable to update !!',
          alert_type:'error',found:false,alter_user:'',reason:'',username:''})
        }
    })
    .catch( err => {
        this.setState({submit:false})
    });
  }
}

setForStudent=()=>{
  axios.post('/ework/user2/change_adviser',{ac_user:this.state.adviser_data,state:this.state})
  .then( res => {
        this.setState({
        submit:false,
        snack_open:true,
        snack_msg:'Done',
        alert_type:'success',found:false,alter_user:'',reason:'',username:''})
  })
  .catch( err => {
      this.setState({submit:false})
  });
}

viewDetails=()=>{
  this.setState({submit:true})
  axios.post('/ework/user/know_adviser',{username:this.state.username})
  .then( res => {
    console.log(res.data);
      if(res.data === 'no')
      {
        this.setState({
        snack_open:true,
        snack_msg:'Invalid Username !!',
        alert_type:'error',submit:false})
      }
      else {
        this.setState({adviser_data:res.data,found:true,submit:false,})
      }
  })
  .catch( err => {
      this.setState({submit:false})
  });
}

changeFadviser=()=>{
  this.setState({submit:true})
  axios.post('/ework/user2/change_adviser_for_a_student',{state:this.state})
  .then( res => {
    if(res.data === 'no')
    {
      this.setState({
      submit:false,
      snack_open:true,
      snack_msg:'Invalid Details !!',
      alert_type:'error',username:'',faculty_adviser_id:''})
    }
    else {
      this.setState({
      submit:false,
      snack_open:true,
      snack_msg:'Done',
      alert_type:'success',username:'',faculty_adviser_id:''})
    }

  })
  .catch( err => {
    this.setState({
    snack_open:true,
    snack_msg:'Something went wrong !!',
    alert_type:'error',submit:false})
  });
}


  render(){
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
    let content;
     if(this.props.select === 'modifytoday'){
          content =
                <Grid container spacing={1}>
                   <Hidden xsDown><Grid item sm={3}/></Hidden>
                   <Grid item sm={6} xs={12}>
                        <Paper  variant="outlined" square style={{padding:'10px 10px 45px 10px'}}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel htmlFor="outlined-adornment-amount">Reset Today's Day Order to:</InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-amount1"
                                onChange={this.handleChange}
                                type="text" name="replacable_day_order" className="validate" value={this.state.replacable_day_order}
                                startAdornment={<InputAdornment position="start">DayOrder</InputAdornment>}
                                labelWidth={200}
                              />
                            </FormControl>
                           <br /><br />
                           <Button style={{float:'right'}} variant="contained" color="primary" disabled={this.state.replacable_day_order ? false:true} onClick={this.navigate}>Reset Day Order</Button>
                        </Paper>
                      </Grid>
                     <Hidden xsDown><Grid item sm={3}/></Hidden>
                  </Grid>
      }
      else if(this.props.select === 'cancel_or_declare_today_as_a_holiday'){
          content =
          <Grid container spacing={1}>
             <Hidden xsDown><Grid item sm={3}/></Hidden>
             <Grid item sm={6} xs={12}>
                  <Paper elevation={3} style={{padding:'20px 10px 45px 10px'}}>
                    <Grid container spacing={1}>
                       <Grid item xs={12} sm={4}>
                           <FormControl fullWidth variant="outlined">
                             <InputLabel htmlFor="outlined-adornment-amount">Today's Day</InputLabel>
                             <OutlinedInput
                               id="outlined-adornment-amount2"
                               type="Number" name="cday" className="validate" value={this.state.cday} onChange={this.handleChange}
                               labelWidth={100}
                             />
                           </FormControl>
                       </Grid>
                       <Grid item xs={12} sm={4}>
                           <FormControl fullWidth variant="outlined">
                             <InputLabel htmlFor="outlined-adornment-amount">Today's Month</InputLabel>
                             <OutlinedInput
                               id="outlined-adornment-amount3"
                               type="Number" name="cmonth" className="validate" value={this.state.cmonth} onChange={this.handleChange}
                               labelWidth={105}
                             />
                           </FormControl>
                       </Grid>
                       <Grid item xs={12} sm={4}>
                           <FormControl fullWidth variant="outlined">
                             <InputLabel htmlFor="outlined-adornment-amount">Today's Year</InputLabel>
                             <OutlinedInput
                               id="outlined-adornment-amount4"
                               type="Number" name="cyear" className="validate" value={this.state.cyear} onChange={this.handleChange}
                               labelWidth={100}
                             />
                           </FormControl>
                       </Grid>
                    </Grid>
                     <br /><br />
                     <Button style={{float:'right'}} variant="contained" color="primary"
                     disabled={(this.state.cday && this.state.cmonth && this.state.cyear)?false :true}
                     onClick={this.navigate}>Cancel Today's DayOrder</Button>
                  </Paper>
                </Grid>
               <Hidden xsDown><Grid item sm={3}/></Hidden>
            </Grid>
      }
      else if(this.props.select === 'semester-details'){
          content =
          <Grid container spacing={1} style={{padding:'15px'}}>
                <Grid container item sm={12} xs={12} lg={4} xl={4} md={12}>
                  <Grid item sm={6} xs={6}>
                      <Paper square style={{padding:'8px'}}>
                        <Typography variant="h6" align="center">Start Semester</Typography><br />
                          <Switch
                            disabled={this.state.start_data.length>0 && this.state.start_data[0].start_sem}
                            checked={this.state.start_data.length>0  ? this.state.start_data[0].start_sem : this.state.start_sem}
                            onChange={()=>this.startSem('start')}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                          <Typography color="secondary">Start Date - {this.state.start_data.length>0 && this.state.start_data[0].start_date}</Typography>
                      </Paper>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <Paper square style={{padding:'8px'}}>
                      <Typography variant="h6" align="center">End Semester</Typography><br />
                      <Switch
                        disabled={this.state.end_data.length >0 && this.state.end_data[0].end_sem}
                        checked={this.state.end_data.length>0 ? this.state.end_data[0].end_sem : this.state.end_sem}
                        onChange={()=>this.endSem('end')}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                      <Typography color="secondary">End Date - {this.state.end_data.length>0 && this.state.end_data[0].end_date}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item sm={12} xs={12} lg={8} xl={8} md={12}>
                  <SemesterDetails all_data={this.state.all_data}/>
                </Grid>
            </Grid>
      }
      else if(this.props.select === 'alter_faculty_adviser'){
           content =
             <React.Fragment>
               <Grid container spacing={1}>
                  <Hidden xsDown><Grid item sm={3}/></Hidden>
                  <Grid item sm={6} xs={12}>
                       <Paper  variant="outlined" square style={{padding:'10px 10px 45px 10px'}}>
                           <TextField
                             autoFocus
                             id="username"
                             variant="outlined"
                             label="Enter the Username"
                             name="official_id" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}
                             fullWidth
                           />
                          <br /><br />
                          <Button style={{float:'right'}} variant="contained" color="primary"
                          disabled={this.state.username ? false:true} onClick={this.viewDetails}>View Details</Button>
                       </Paper><br /><br />
                       <Paper  variant="outlined" square style={{padding:'10px 10px 45px 10px'}}>
                          {this.state.found &&
                            <Grid container spacing={1}>
                              <Grid item xs={6} sm={6}>
                                 Faculty Adviser For Year - {this.state.adviser_data.faculty_adviser_year}.
                                 <br /><br />
                                 <Button variant="contained" color="secondary" onClick={()=>this.setState({alter_on:true})}>
                                 Alter Responsibility</Button>
                              </Grid>
                              <Grid item xs={6} sm={6}>
                               {this.state.alter_on &&
                                  <React.Fragment>
                                    <TextField
                                      autoFocus
                                      id="alter_user"
                                      variant="outlined"
                                      label="Enter the Faculty Id"
                                      name="alter_user" value={this.state.alter_user}
                                       onChange={(e)=>this.setState({alter_user:e.target.value})}
                                      fullWidth
                                    /><br /><br />
                                    <TextField
                                      multiline
                                      rows="2"
                                      id="reason"
                                      variant="outlined"
                                      label="Enter the Reason"
                                      name="reason" value={this.state.reason} onChange={(e)=>this.setState({reason:e.target.value})}
                                      fullWidth
                                    />
                                    <br /><br />
                                    <Button variant="contained" color="secondary" onClick={this.alterAdviser}>Alter</Button>
                                  </React.Fragment>
                                }
                              </Grid>
                            </Grid>
                          }
                       </Paper>
                     </Grid>
                    <Hidden xsDown><Grid item sm={3}/></Hidden>
                 </Grid>
             </React.Fragment>
       }
       else if(this.props.select === 'change_faculty_adviser'){
            content =
              <React.Fragment>
                <Grid container spacing={1}>
                   <Hidden xsDown><Grid item sm={3}/></Hidden>
                   <Grid item sm={6} xs={12}>
                        <Paper  variant="outlined" square style={{padding:'10px 10px 45px 10px'}}>
                            <Typography variant="h6" align="center">Change Student's Faculty Adviser</Typography><br />
                            <TextField
                              autoFocus
                              id="username2"
                              variant="outlined"
                              label="Enter the Student's Id"
                              name="official_id" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}
                              fullWidth
                            />
                            <br /><br />
                            <TextField
                              id="username2"
                              variant="outlined"
                              label="Enter new Faculty Adviser Id"
                              name="official_id" value={this.state.faculty_adviser_id}
                              onChange={(e)=>this.setState({faculty_adviser_id:e.target.value})}
                              fullWidth
                            />
                           <br /><br />
                           <Button style={{float:'right'}} variant="contained" color="primary"
                           disabled={(this.state.username && this.state.faculty_adviser_id) ? false:true} onClick={this.changeFadviser}>Change Faculty Adviser</Button>
                        </Paper>
                      </Grid>
                     <Hidden xsDown><Grid item sm={3}/></Hidden>
                  </Grid>
              </React.Fragment>
        }
      else{
          content=
              <div></div>
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
        {content}
        </React.Fragment>
      )
    }
  }
}
