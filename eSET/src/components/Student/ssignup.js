import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import {InputAdornment} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default class FSignup extends Component {
    constructor(){
        super();
        this.state={
            open:false,
            name:'',
            username:'',
            mailid:'',
            phone:'',
            campus:'',
            degree:'',
            dept:'',
            year:'',
            sem:'',
            batch:'',
            batch_no:'',
            password:'',
			cnf_pswd:'',
			showPassword:false,
			show_modal:false,
			verify_modal:false,
            
        }
    }
   
	showValidation=()=>{
		this.setState({show_modal:!this.state.show_modal})
	}

    handleField = (e) =>{
        this.setState({
            [e.target.name] : e.target.value,
        })
    }
    render() {
        return (
            <div>
                <Button fullWidth style={{backgroundColor:'#009688',color:'white'}} onClick={() => this.setState({open:true})}>
                    Register
                </Button>
                <Dialog fullWidth={true} maxWidth={'lg'} open={this.state.open} onClose={() => this.setState({open:false})} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" align="center">Student Registration</DialogTitle>
                    <Divider/>
                        <DialogContent>
                            <form className="form-con">
                                <Grid container spacing={2}>
                                        
								        <Grid item xs={12} sm={6}>
                                            <TextField id="name" name="name" type="text" fullWidth
                                            value={this.state.name} onChange={this.handleField} label="Name" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField id="username" name="username" type="text" fullWidth
                                            value={this.state.username} onChange={this.handleField} label="Registration No." />
                                        </Grid>
                                        <Grid item xs={12} sm={5}>
                                            <TextField id="mailid" name="mailid" type="text" fullWidth
                                            value={this.state.mailid} onChange={this.handleField} label="Official Mail ID" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField id="phone" name="phone" type="text" fullWidth
                                            value={this.state.phone} onChange={this.handleField} label="Mobile No." />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
											<FormControl style={{width:'100%'}}>
												<InputLabel id="campus">Campus</InputLabel>
													<Select
														labelId="campus"
														id="campus"
														value={this.state.campus} name="campus" onChange={this.handleField}
													>
													<MenuItem value="Kattankulathur Campus">Kattankulathur Campus</MenuItem>
													<MenuItem value="Ramapuram Campus">Ramapuram Campus</MenuItem>
													<MenuItem value="Vadapalani Campus">Vadapalani Campus</MenuItem>
													<MenuItem value="NCR Campus">NCR Campus</MenuItem>
													</Select>
											 </FormControl>
									    </Grid>
                                        <Grid item xs={12} sm={6}>
											<FormControl style={{width:'100%'}}>
												<InputLabel id="degree">Degree</InputLabel>
													<Select
														labelId="degree"
														id="degree"
														value={this.state.degree} name="degree" onChange={this.handleField}
													>
													<MenuItem value="btech">B.Tech</MenuItem>
													<MenuItem value="bca">BCA</MenuItem>
													<MenuItem value="mtech">M.Tech</MenuItem>
													<MenuItem value="mba">MBA</MenuItem>
													</Select>
											 </FormControl>
									    </Grid>
                                        <Grid item xs={12} sm={6}>
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
                                        <Grid item xs={12} sm={3}>
											<FormControl style={{width:'100%'}}>
												<InputLabel id="year">Year</InputLabel>
													<Select
														labelId="year"
														id="year"
														value={this.state.year} name="year" onChange={this.handleField}
													>
													<MenuItem value="first">1</MenuItem>
													<MenuItem value="Second">2</MenuItem>
													<MenuItem value="Third">3</MenuItem>
													<MenuItem value="Fourth">4</MenuItem>
													</Select>
											 </FormControl>
									    </Grid>
                                        <Grid item xs={12} sm={3}>
											<FormControl style={{width:'100%'}}>
												<InputLabel id="sem">Semester</InputLabel>
													<Select
														labelId="sem"
														id="sem"
														value={this.state.sem} name="sem" onChange={this.handleField}
													>
													<MenuItem value="first">1</MenuItem>
													<MenuItem value="second">2</MenuItem>
													<MenuItem value="third">3</MenuItem>
													<MenuItem value="fourth">4</MenuItem>
													</Select>
											 </FormControl>
									    </Grid>
                                        <Grid item xs={12} sm={3}>
											<FormControl style={{width:'100%'}}>
												<InputLabel id="batch">Batch</InputLabel>
													<Select
														labelId="batch"
														id="batch"
														value={this.state.batch} name="batch" onChange={this.handleField}
													>
													<MenuItem value="A">A</MenuItem>
													<MenuItem value="B">B</MenuItem>
													<MenuItem value="C">C</MenuItem>
													<MenuItem value="D">D</MenuItem>
													</Select>
											 </FormControl>
									    </Grid>
                                        <Grid item xs={12} sm={3}>
											<FormControl style={{width:'100%'}}>
												<InputLabel id="batch_no">Batch No.</InputLabel>
													<Select
														labelId="batch_no"
														id="batch_no"
														value={this.state.batch_no} name="batch_no" onChange={this.handleField}
													>
													<MenuItem value="A1">A1</MenuItem>
													<MenuItem value="B1">B1</MenuItem>
													<MenuItem value="C3">C3</MenuItem>
													<MenuItem value="D3">D3</MenuItem>
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
                        <Button color="primary" style={{color:'#009688',border:'1px solid #009688'}}>
                            Submit
                        </Button>
                        </DialogActions>
                    </Dialog>
                
            </div>
        )
    }
}
