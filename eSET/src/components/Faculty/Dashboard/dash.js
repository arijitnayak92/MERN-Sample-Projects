import React, { Component } from 'react';
import {  Redirect} from 'react-router-dom';
import
{Dialog,Button,Grid,Card,List,CardActions,CardContent,CardActionArea,
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import Nav from '../../dynnav'
import DetailWindow from '../TEST SETTER/testSetter'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class Dashboard extends Component {
    constructor(){
        super()
        this.state={
            course_id:'15SE303',
            course_name:'React Js',
            total_stud:28,
            open:false,
            username:'',
            loading:true,
            home:'/etest/faculty',
            logout:'/etest/user/logout',
            login:'/etest/flogin',
            get:'/etest/user/',
            noti_route:true,
            nav_route: '/ework/user/fetchnav',
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount()
    {
      axios.get('/etest/user/')
      .then( res => {
            if (res.data.user) {
              this.setState({
                  username:res.data.user.username,
                  loading:false,
              })
            }
            else {
              this.setState({redirectTo:this.state.home})
            }
      });
    }
    handleOpen=()=>{
        this.setState({open:!this.state.open})
    }
    render() {
      if(this.state.loading)
      {
        return(
          <div style={{textAlign:'center'}}>Loading....</div>
        )
      }
      else{
        if (this.state.redirectTo) {
             return <Redirect to={{ pathname: this.state.redirectTo }} />
         } else {
        return (
            <React.Fragment>
              <Nav noti_route={this.state.noti_route} login={this.state.login}
              home={ this.state.home} nav_route={this.state.nav_route} get={this.state.get}
              logout={this.state.logout}/>
              <br /><br /><br />
            <Grid container spacing={1} style={{padding:'20px'}}>
                <Grid item xs={12} sm={2} lg={3} md={4} xl={3}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h5">Course ID: {this.state.course_id}</Typography>
                      <Typography variant="h6" color="secondary">Course Name: {this.state.course_name}</Typography>
                      <Typography variant="h6" color="secondary">Total Students: {this.state.total_stud}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="secondary" onClick={this.handleOpen}>
                      View Details
                    </Button>
                    <Typography></Typography>
                  </CardActions>
                </Card>

                </Grid>
                <Dialog fullScreen open={this.state.open} onClose={this.handleOpen} TransitionComponent={Transition}>
                    <AppBar position="relative" style={{backgroundColor:'#009688'}}>
                    <Toolbar>
                        <Grid container spacing={1}>
                            <Grid item xs={1} sm={1} xl={1}>
                                <IconButton edge="start" color="inherit" onClick={this.handleOpen} aria-label="close">
                                <CloseIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={11} sm={11} xl={11}>
                            <Typography variant="h6" align="center" style={{paddingTop:'8px'}}>
                                {this.state.course_id} : {this.state.course_name}
                            </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                    </AppBar>
                    <List>
                       <DetailWindow state={this.state} />
                    </List>
                </Dialog>
            </Grid>
            </React.Fragment>
        )
       }
      }
    }
}
