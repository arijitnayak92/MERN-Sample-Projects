import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import {Grid,Paper,Typography,TextField,Button,Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default class Auth extends Component {
	constructor() {
    super()
    this.state = {
			redirectTo: null,
      id:'',
      password:'',
      username:'CO-',
			snack_open:false,
			snack_msg:'',
			alert_type:'',
    }
    this.handleAuth = this.handleAuth.bind(this)
    }

	    handleInput = (e) => {
	            this.setState({
	                [e.target.name]: e.target.value
	            });
	        };

	handleAuth(event) {
		event.preventDefault()
		if(!(this.state.password) || !(this.state.id) || !(this.state.username))
		{
			this.setState({
				snack_open:true,
				snack_msg:"Fill the Empty Fields !!",
				alert_type:'warning',
			});
		}
		else
    {
		axios.post('/etest/user/validate-co-admin', {
			id: this.state.id,
      username: this.state.username,
      password: this.state.password,
		})
			.then(response => {
				if(response.status===200){
          if(response.data === 'no')
          {
						this.setState({
							snack_open:true,
							snack_msg:"Bad Request !!",
							alert_type:'error',
						});
          }
          else if(response.data === 'ok')
					{
						this.setState({
								redirectTo: '/etest/faculty'
						})
					}
				}
			}).catch(error => {
				this.setState({
					snack_open:true,
					snack_msg:'Internal Error',
					alert_type:'error',
				});
			})
			this.setState({
	    id: '',
		})
	}
}

    componentDidMount() {
    }

render() {
	if (this.state.redirectTo) {
			 return <Redirect to={{ pathname: this.state.redirectTo }} />
	 } else {
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

		<Grid container spacing={1}>
		  <Grid item xs={3} sm={3}/>
			<Grid item xs={12} sm={6}>
					<Paper elevation={3} style={{padding:'30px',marginTop:'20px'}}>
							<div className="ew">
							   <Typography variant="h5" align="center">CO-ADMIN SIGNUP</Typography>
							</div>
							<br /><br />
									<form className="form-con" onSubmit={this.handleAuth}>
											<Grid container spacing={1}>
					                <Grid item xs={2} sm={2} />
													<Grid item xs={12} sm={8}>
													   <TextField id="outlined-basic" label="Enter the Unique Code"
														    type="text" name="id" className="validate" value={this.state.id} onChange={this.handleInput}
														    variant="outlined" fullWidth />
													</Grid>
					                <Grid item xs={2} sm={2} />
											</Grid>
											<br />
					            <Grid container spacing={1}>
					                <Grid item xs={12} sm={6}>
														<TextField id="outlined-basic1" label="Enter Your Offical ID"
															 type="text" className="validate" name="username" value={this.state.username} onChange={this.handleInput}
															 variant="outlined" fullWidth />
					                </Grid>

					                <Grid item xs={12} sm={6}>
														<TextField id="outlined-basic1" label="Password"
															 type="password" className="validate" name="password" value={this.state.password} onChange={this.handleInput}
															 variant="outlined" fullWidth />
					                </Grid>
					            </Grid>
											<br />
					              <Button variant="contained" color="secondary" style={{float:'right'}} onClick={this.handleAuth}>SIGN UP</Button>
									</form>
							</Paper>
			  </Grid>
    		<Grid item xs={3} sm={3} />

		</Grid>
</React.Fragment>
	);
}
}
}
