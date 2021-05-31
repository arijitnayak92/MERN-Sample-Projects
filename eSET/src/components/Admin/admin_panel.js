import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Drawer,List,ListItem,ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import Nav from '../dynnav';
import SelectorS from './selector';
import SADMIN from './super_admin';



export default class Ap extends Component{
  constructor() {
    super()
    this.state={
      active:'',
      logout:'/etest/user/logout',
      get:'/etest/user/',
      noti_route:true,
      nav_route: '',
      toggled:true,
      loader:true,
      user:'',
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount()
  {
      this.fetchlogin();
  }
  fetchlogin = () =>{
      axios.get('/etest/user/')
      .then(response=>{
        if(response.data.user === null)
        {
          this.setState({
            loader:false,
            redirectTo:'/etest/',
          });
        }
        else {
          this.setState({user:response.data.user,loader:false})
        }
      })
    }
  handleComp = (e) =>{
    this.setState({
      active: e,
      toggled:false,
    })
      this.setState({active : e})
  }


   color =(position) =>{
     if (this.state.active === position) {
         return 'red';
       }
       return '';
   }

  render()
  {
    const dstyle = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

    if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      if(this.state.loader)
      {
        return(
          <div>Loading .....</div>
        )
      }
      else
      {
        let radio = [{name:'radio0',value:'System'},{name:'radio1',value:'Insert'},{name:'radio2',value:'Update'},
                    {name:'radio3',value:'Super'},{name:'radio4',value:'Delete'},{name:'radio5',value:'View'},
                    {name:'radio6',value:'Communicate'}];
    return(
        <React.Fragment>
          <Nav noti_route={this.state.noti_route} home={this.state.home} nav_route={this.state.nav_route} get={this.state.get} logout={this.state.logout}/>
          <div style={{marginTop:'10px'}}>

               {this.state.toggled ===  false &&
                 <div onClick={()=>this.setState({toggled:true})} className="dig"
                   style={{float:'center',boxShadow: '0px 10px 10px 2px pink',textAlign:'center',
                   width:'30px',borderRadius: '0px 0px 20px 20px'}}>
                   <ArrowDropDownIcon />
                 </div>
               }

               <Drawer anchor="top" open={this.state.toggled} onClose={()=>this.setState({toggled:false})}>
                 <div
                    className={dstyle.fullList}
                    role="presentation"
                    onKeyDown={()=>this.setState({toggled:false})}
                    >
                    <List>
                      {(this.state.user.h_order === 0) &&
                        <ListItem onClick={(e)=>{this.handleComp('System')}} button style={{color:this.color('System')}}>
                          <ListItemText align="center" primary={"System"} />
                        </ListItem>
                      }
                      {((this.state.user.h_order === 0) || (this.state.user.campus === 'KTR')) &&
                        <ListItem onClick={(e)=>{this.handleComp('KTR')}} button style={{color:this.color('KTR')}}>
                          <ListItemText align="center" primary={"KTR CAMPUS"} />
                        </ListItem>
                      }
                      {((this.state.user.h_order === 0) || (this.state.user.campus === 'RAMAPURAM')) &&
                        <ListItem onClick={(e)=>{this.handleComp('RAMAPURAM')}} button style={{color:this.color('RAMAPURAM')}}>
                          <ListItemText align="center" primary={"RAMAPURAM CAMPUS"} />
                        </ListItem>
                      }
                      {((this.state.user.h_order === 0) || (this.state.user.campus === 'DELHI')) &&
                        <ListItem onClick={(e)=>{this.handleComp('DELHI')}} button style={{color:this.color('DELHI')}}>
                          <ListItemText align="center" primary={"DELHI CAMPUS"} />
                        </ListItem>
                      }
                      {((this.state.user.h_order === 0) || (this.state.user.campus === 'AP')) &&
                        <ListItem onClick={(e)=>{this.handleComp('AP')}} button style={{color:this.color('AP')}}>
                          <ListItemText align="center" primary={"AP CAMPUS"} />
                        </ListItem>
                      }
                        {(this.state.user.h_order === 0) &&
                          <ListItem onClick={(e)=>{this.handleComp('S ADMIN')}} button style={{color:this.color('S ADMIN')}}>
                            <ListItemText align="center" primary={"SUPER ADMIN"} />
                          </ListItem>
                        }
                    </List>
                  </div>
              </Drawer>
          </div>
          {this.state.toggled === false &&
            <React.Fragment>
             {this.state.active === 'System' &&
              <System />
             }
             {this.state.active === 'S ADMIN' &&
              <SADMIN user={this.state.user} />
             }
             {(this.state.active !== 'System' && this.state.active !=='S ADMIN') &&
              <SelectorS radio={radio} campus={this.state.active} user={this.state.user}  />
             }
            </React.Fragment>
          }
       </React.Fragment>
    )
   }
  }
  }
}

class System extends Component{
  render()
  {
    return(
      <div>System</div>
    )
  }
}
