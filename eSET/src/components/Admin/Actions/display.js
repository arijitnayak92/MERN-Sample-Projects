import React, { Component} from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CampusAdminsAdd from './Insert-Actions/admins_under_campus';

export default class Display extends Component{
    constructor(){
        super();
        this.state={
            isChecked: '',
            select: '',
            active:'',
            open_drawer:true,
        }
    }
    handleCheck = (e) => {
        this.setState({
            select: e,
            open_drawer:false,
            active : e
        })
    }

    componentDidUpdate=(prevProps)=>{
      if(prevProps.choosed !== this.props.choosed)
      {
        this.setState({open_drawer:true})
      }
    }

    color =(position) =>
    {
      if (this.state.active === position) {
          return "#ff4081";
        }
        return "";
    }

    render(){
      let choosed_option;
        if(this.props.choosed === 1)
        {
            choosed_option=
            <React.Fragment>
            <Drawer
                  variant="persistent"
                  anchor="left"
                  open={this.state.open_drawer}
                  onClose={()=>this.setState({open_drawer:false})}
                >
                <div>
                    <IconButton onClick={()=>this.setState({open_drawer:false})}>
                      {this.state.open_drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                  <Divider />
                  <List>
                      {(this.props.props_data.user.h_order === 0.1 || this.props.props_data.user.h_order === 0 ) &&
                      <ListItem button style={{color:this.color('insert-college-admin')}}
                      onClick={(e)=>{this.handleCheck('insert-college-admin')}}>
                        <ListItemText primary={"Insert Co-Admins For a College"} />
                      </ListItem>
                      }
                      {(this.props.props_data.user.h_order === 0.2 || this.props.props_data.user.h_order === 0 ) &&
                      <ListItem button style={{color:this.color('insert-school-admin')}}
                      onClick={(e)=>{this.handleCheck('insert-school-admin')}}>
                        <ListItemText primary={"Insert School Admin"} />
                      </ListItem>
                      }
                      {(this.props.props_data.user.h_order === 0.3  || this.props.props_data.user.h_order === 0 ) &&
                      <ListItem button style={{color:this.color('insert-dept-admin')}}
                      onClick={(e)=>{this.handleCheck('insert-dept-admin')}}>
                      <ListItemText primary={"Insert Department Admins"} />
                      </ListItem>
                      }
                  </List>
                </Drawer>
                <main>
                  {this.state.select === 'insert-college-admin' &&
                   <CampusAdminsAdd action={this.state.select} user={this.props.props_data.user} />
                  }
                  {this.state.select === 'insert-school-admin' &&
                   <CampusAdminsAdd action={this.state.select} user={this.props.props_data.user} />
                  }
                  {this.state.select === 'insert-dept-admin' &&
                   <CampusAdminsAdd action={this.state.select} user={this.props.props_data.user} />
                  }
                </main>
            </React.Fragment>

        }
        else if(this.props.choosed === 2)
        {
            choosed_option=
            <React.Fragment>
            <Drawer
                  variant="persistent"
                  anchor="left"
                  open={this.state.open_drawer}
                  onClose={()=>this.setState({open_drawer:false})}
                >
                <div>
                    <IconButton onClick={()=>this.setState({open_drawer:false})}>
                      {this.state.open_drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                  <Divider />
                  <List>
                      <ListItem button style={{color:this.color('facpwd')}}
                      onClick={(e)=>{this.handleCheck('facpwd')}}>
                        <ListItemText primary={"Reset Faculty or Admin Password"} />
                      </ListItem>
                      <ListItem button style={{color:this.color('studpwd')}}
                      onClick={(e)=>{this.handleCheck('studpwd')}}>
                        <ListItemText primary={"Reset Student Password"} />
                      </ListItem>
                  </List>
                </Drawer>
                <main>
                </main>
            </React.Fragment>
        }
        else if(this.props.choosed === 3)
        {
            choosed_option=
            <React.Fragment>
            <Drawer
                  variant="persistent"
                  anchor="left"
                  open={this.state.open_drawer}
                  onClose={()=>this.setState({open_drawer:false})}
                >
                <div>
                    <IconButton onClick={()=>this.setState({open_drawer:false})}>
                      {this.state.open_drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                  <Divider />
                    <List>
                        <ListItem button style={{color:this.color('suspend_fac')}}
                         onClick={(e)=>{this.handleCheck('suspendfac')}}>
                          <ListItemText primary={"Suspend User"} />
                        </ListItem>
                        <ListItem button style={{color:this.color('suspend_student')}}
                         onClick={(e)=>{this.handleCheck('suspend_student')}}>
                          <ListItemText primary={"Suspend Student"} />
                        </ListItem>
                    </List>
                </Drawer>
                <main>
                </main>
            </React.Fragment>
        }
        else if(this.props.choosed === 4)
        {
            choosed_option=
            <React.Fragment>
            <Drawer
                  variant="persistent"
                  anchor="left"
                  open={this.state.open_drawer}
                  onClose={()=>this.setState({open_drawer:false})}
                >
                <div>
                    <IconButton onClick={()=>this.setState({open_drawer:false})}>
                      {this.state.open_drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                  <Divider />
                  <List>
                      <ListItem button style={{color:this.color('deleteadmin')}}
                      onClick={(e)=>{this.handleCheck('deleteadmin')}}>
                        <ListItemText primary={"Delete Admin"} />
                      </ListItem>
                      <ListItem button style={{color:this.color('deletefac')}}
                      onClick={(e)=>{this.handleCheck('deletefac')}}>
                        <ListItemText primary={"Delete Faculty"} />
                      </ListItem>
                      <ListItem button style={{color:this.color('deletestu')}}
                      onClick={(e)=>{this.handleCheck('deletestu')}}>
                        <ListItemText primary={"Delete Student"} />
                      </ListItem>
                  </List>
                </Drawer>
                <main>
                </main>
            </React.Fragment>
        }
        else if(this.props.choosed ===5)
        {
            choosed_option=
            <React.Fragment>
            <Drawer
                  variant="persistent"
                  anchor="left"
                  open={this.state.open_drawer}
                  onClose={()=>this.setState({open_drawer:false})}
                >
                <div>
                    <IconButton onClick={()=>this.setState({open_drawer:false})}>
                      {this.state.open_drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                  <Divider />
                  <List>
                      <ListItem button style={{color:this.color('dept_admin_profile')}}
                      onClick={(e)=>{this.handleCheck('dept_admin_profile')}}>
                        <ListItemText primary={"Department Admin Profile"} />
                      </ListItem>
                      <ListItem button style={{color:this.color('facprofile')}}
                      onClick={(e)=>{this.handleCheck('facprofile')}}>
                        <ListItemText primary={"Faculty Profile"} />
                      </ListItem>
                      <ListItem button style={{color:this.color('studprofile')}}
                      onClick={(e)=>{this.handleCheck('studprofile')}}>
                        <ListItemText primary={"Student Profile"} />
                      </ListItem>
                  </List>
                </Drawer>
                <main>
                </main>
            </React.Fragment>
        }
        else if(this.props.choosed ===6)
        {
            choosed_option=
            <React.Fragment>
            <Drawer
                  variant="persistent"
                  anchor="left"
                  open={this.state.open_drawer}
                  onClose={()=>this.setState({open_drawer:false})}
                >
                <div>
                    <IconButton onClick={()=>this.setState({open_drawer:false})}>
                      {this.state.open_drawer ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                  <Divider />
                  <List>
                      <ListItem button style={{color:this.color('connect_user')}}
                      onClick={(e)=>{this.handleCheck('connect_user')}}>
                        <ListItemText primary={"With Faculty/Dept-Admin"} />
                      </ListItem>
                      <ListItem button style={{color:this.color('connect_student')}}
                      onClick={(e)=>{this.handleCheck('connect_student')}}>
                        <ListItemText primary={"With Student"} />
                      </ListItem>
                  </List>
                </Drawer>
              {this.state.select &&
                <main>
                </main>
              }
            </React.Fragment>
        }
        else if(this.props.choosed ===0)
        {
            choosed_option=
            <React.Fragment>
              System of the Campus
            </React.Fragment>
        }
        else
        {
            choosed_option=<div></div>
        }
        return(
          <React.Fragment>
              {this.state.open_drawer === false &&
                <div onClick={()=>this.setState({open_drawer:true})} className="float-left"
                  style={{float:'center',boxShadow: '0px 10px 10px 2px pink',textAlign:'center',
                  width:'42px',borderRadius: '0px 20px 20px 0px'}}>
                  <ChevronRightIcon />
                </div>
              }
             <div style={{marginTop:'15px'}}>
               {choosed_option}
             </div>
          </React.Fragment>
        )
    }
}
