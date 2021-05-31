import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class ValidateUser extends Component {
    constructor(props){
        super(props)
        this.state ={
            redirectTo:'',
            password:'',
            snack_open:false,
            snack_msg:'',
            alert_type:'',
        }
    }
    check =(e) =>{
        this.setState({password:e.target.value})
    }
    Validate =(e)=>{
        e.preventDefault()
      if(!this.state.password)
      {
        this.setState({
          snack_open:true,
          snack_msg:'Enter all the Details !!',
          alert_type:'warning',
        });
      }
      else
      {
        axios.post('/etest/user/checkadmin',{password:this.state.password})
        .then(res=>{
            if(res.data.succ)
            {
                this.props.showDiv({
                    show: 'block',
                    modal:false,
                    showButton:'block',
                    disabled:'',
                    allowed:true,
                    success:'none',
                  });
            }
            else if(res.data.fail)
            {
                this.setState({redirectTo:'/etest/'})

            }
        })
        this.setState({password:''})
      }
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

              <Dialog open={true}  aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" align="center">Validate YourSelf</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                     In order to access media kindly validate yourself
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Type your password"
                    type="password" value={this.state.password} onChange={this.check}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.Validate} color="primary">
                    Validate
                  </Button>
                </DialogActions>
              </Dialog>
          </React.Fragment>
        )
    }
  }
}
