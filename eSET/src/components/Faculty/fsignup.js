import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import {InputAdornment} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default class FSignup extends Component {
    constructor(){
        super();
        this.state={
            open:false,
            title:'',
            name:'',
            username:'',
            mailid:'',
            phone:'',
            password:'',
            cnf_pswd:'',
            campus:'',
            dept:'',
            desgn:'',
            showPassword:false,
			show_modal:false,
            verify_modal:false,
            snack_open:false,
			alert_type:'',
			snack_msg:'',
        }
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    handleField = (e) =>{
        this.setState({
            [e.target.name] : e.target.value,
        })
    }
    showValidation=()=>{
		this.setState({show_modal:!this.state.show_modal})
    }

    handleSubmit(event) {
        console.log(this.state)
		event.preventDefault()
		if(!(this.state.title)||!(this.state.name)||!(this.state.mailid)||!(this.state.username)||!(this.state.phone)||!(this.state.password)||!(this.state.cnf_pswd)||!(this.state.campus)||!(this.state.desgn))
		{
			this.setState({
				snack_open:true,
				snack_msg:'Enter all the Details !!',
				alert_type:'warning',
			})
            return false;
        }
        else if(!(this.state.password.match(/[a-z]/g) && this.state.password.match(
							/[A-Z]/g) && this.state.password.match(
							/[0-9]/g) && this.state.password.match(
							/[^a-zA-Z\d]/g) && this.state.password.length >= 6))
		{
			this.setState({
				snack_open:true,
				snack_msg:'Follow Correct Format !!',
				alert_type:'warning',
			})
				this.showValidation();
        }
        else if(this.state.password !==this.state.cnf_pswd)
		{
			this.setState({
				snack_open:true,
				snack_msg:'Password Does Not Match !!',
				alert_type:'warning',
			})
			this.setState({cnf_pswd:''})
	        return false;
      }
      else if ((this.state.phone).length!==10)
		{
			this.setState({
				snack_open:true,
				snack_msg:'Phone no should be of 10 digit !!',
				alert_type:'warning',
			})
			return false;
        }
        else{
            this.setState({
				snack_open:true,
				snack_msg:'Signing Up !!',
				alert_type:'info',
            })
            axios.post('/etest/user/signup', {
                title: this.state.title,
                name: this.state.name,
                username: this.state.username,
                mailid: this.state.mailid,
                phone: this.state.phone,
                campus: this.state.campus,
                dept: this.state.dept,
                desgn:this.state.desgn,
                password: this.state.password,
            })
            .then(response => {
				if(response.status===200){
					if(response.data.emsg)
					{
						this.setState({
							snack_open:true,
							snack_msg:response.data.emsg,
							alert_type:'info',
						})
				  }
					else if(response.data==='ok')
					{
						this.setState({
								verify_modal:true,
						})
                    }
                    else if(response.data.succ)
                    {
                        this.setState({
							snack_open:true,
							snack_msg:response.data.succ,
							alert_type:'info',
						})
                    }
				}
			}).catch(error => {
            this.setState({
  				snack_open:true,
  				snack_msg:'Something Went Wrong !!',
  				alert_type:'error',
  			})
			})
			this.setState({loader:false})
        }
    }
    render() {
        return (
            <div>
                <Snackbar
        		        open={this.state.snack_open} autoHideDuration={2000}
        		        onClose={()=>this.setState({snack_open:false})}>
        			    <Alert onClose={()=>this.setState({snack_open:false})}
        			    severity={this.state.alert_type}>
        				{this.state.snack_msg}
        			    </Alert>
        		     </Snackbar>
                <Button fullWidth style={{backgroundColor:'#009688',color:'white'}} onClick={() => this.setState({open:true})}>
                    Register
                </Button>
                <Dialog fullWidth={true} maxWidth={'lg'} open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" align="center">Faculty Registration</DialogTitle>
                    <Divider/>
                        <DialogContent>
                            <form className="form-con">
                                <Grid container spacing={2}>
                                        <Grid item xs={6} sm={2}>
                                                <FormControl style={{width:'100%'}}>
                                                    <InputLabel id="title">Salutation</InputLabel>
                                                        <Select
                                                            labelId="title"
                                                            id="title"
                                                            name="title" value={this.state.title} onChange={this.handleField}
                                                        >
                                                        <MenuItem value="Mr.">Mr.</MenuItem>
                                                        <MenuItem value="Mrs.">Mrs.</MenuItem>
                                                        <MenuItem value="Miss.">Miss.</MenuItem>
                                                        <MenuItem value="Dr.">Dr.</MenuItem>
                                                        </Select>
                                                </FormControl>
                                        </Grid>
								        <Grid item xs={6} sm={6}>
                                            <TextField id="name" name="name" type="text" fullWidth
                                            value={this.state.name} onChange={this.handleField} label="Name" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField id="username" name="username" type="text" fullWidth
                                            value={this.state.username} onChange={this.handleField} label="Official ID" />
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField id="mailid" name="mailid" type="text" fullWidth
                                            value={this.state.mailid} onChange={this.handleField} label="Official Mail ID" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField id="phone" name="phone" type="text" fullWidth
                                            value={this.state.phone} onChange={this.handleField} label="Mobile No." />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
											<FormControl style={{width:'100%'}}>
												<InputLabel id="campus">Campus</InputLabel>
													<Select
														labelId="campus"
														id="campus"
														value={this.state.campus} name="campus" onChange={this.handleField}
													>
													<MenuItem value="KTR">Kattankulathur Campus</MenuItem>
													<MenuItem value="RAMAPURAM">Ramapuram Campus</MenuItem>
													<MenuItem value="VADAPALANI">Vadapalani Campus</MenuItem>
													<MenuItem value="DELHI">NCR Campus</MenuItem>
													<MenuItem value="AP">AP Campus</MenuItem>
													</Select>
											 </FormControl>
									    </Grid>
                                        <Grid item xs={12} sm={4}>
											<FormControl style={{width:'100%'}}>
												<InputLabel id="dept">Department</InputLabel>
													<Select
														labelId="dept"
														id="dept"
														value={this.state.dept} name="dept" onChange={this.handleField}
													>
													<MenuItem value="cse">Computer Science</MenuItem>
													<MenuItem value="mech">Mechanical</MenuItem>
													<MenuItem value="eee">Electrical</MenuItem>
													<MenuItem value="swe">Software</MenuItem>
													</Select>
											 </FormControl>
									    </Grid>
                                        <Grid item xs={12} sm={4}>
											<FormControl style={{width:'100%'}}>
												<InputLabel id="desgn">Designation</InputLabel>
													<Select
														labelId="desgn"
														id="desgn"
														value={this.state.desgn} name="desgn" onChange={this.handleField}
													>
													<MenuItem value="prof">Professor</MenuItem>
													<MenuItem value="asso_prof">Associate Professor</MenuItem>
													<MenuItem value="assi_prof">Assistant Professor</MenuItem>
													<MenuItem value="hod">Head Of Department</MenuItem>
													</Select>
											 </FormControl>
									    </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl style={{width:'100%'}}>
												<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
												<Input
													type={this.state.showPassword ? 'text' : 'password'}
													onChange={this.handleField}  name="password" id="password" value={this.state.password}
													endAdornment={
													<InputAdornment position="end">
														<IconButton
														aria-label="toggle password visibility"
														onClick={()=>this.setState({showPassword:!this.state.showPassword})}
														onMouseDown={this.handleMouseDownPassword}
														>
														{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
														</IconButton>
													</InputAdornment>
													}
												/>
                                                <HelpOutlineIcon style={{color:'#009688',cursor:'pointer'}} onClick={this.showValidation} />
											</FormControl>
											<React.Fragment>
												<Dialog style={{userSelect:'none'}}
                                                open={this.state.show_modal}
                                                onClick={this.showValidation}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">Password Should Consist of </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                                        <Typography variant="button" display="block" gutterBottom>
                                                                        At least 1 uppercase character.<br />
                                                                        At least 1 lowercase character.<br />
                                                                        At least 1 digit.<br />
                                                                        At least 1 special character.<br />
                                                                        Minimum 6 characters.<br />
                                                                </Typography>
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={this.showValidation} color="primary" autoFocus>
                                                    Agree
                                                    </Button>
                                                </DialogActions>
                                                </Dialog>
                                            </React.Fragment>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl style={{width:'100%'}}>
												<InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
												<Input
													type={this.state.showPassword ? 'text' : 'password'}
													onChange={this.handleField}  name="cnf_pswd" id="cnf_pswd" value={this.state.cnf_pswd}
													endAdornment={
													<InputAdornment position="end">
														<IconButton
														aria-label="toggle password visibility"
														onClick={()=>this.setState({showPassword:!this.state.showPassword})}
														onMouseDown={this.handleMouseDownPassword}
														>
														{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
														</IconButton>
													</InputAdornment>
													}
												/>
											</FormControl>
                                        </Grid>

                               </Grid>
                            </form>
                        </DialogContent>
                        <Divider/>
                        <DialogActions>

                        <Button onClick={() => this.setState({open:false})} color="primary" style={{color:'red',border:'1px solid red'}}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary" style={{color:'#009688',border:'1px solid #009688'}}>
                            Submit
                        </Button>
                        </DialogActions>
                    </Dialog>

            </div>
        )
    }
}
