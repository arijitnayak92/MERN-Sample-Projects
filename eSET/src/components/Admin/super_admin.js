import React, { Component} from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import NavHandle from './Super Admin/Add Actions/add_navbar';
import Designation from './Super Admin/Add Actions/add_designation';
import CampusAdmin from './Super Admin/Add Actions/add_campusadmin';
import Schools from './Super Admin/Add Actions/add_schools';
import Colleges from './Super Admin/Add Actions/add_colleges';

export default class SuperAdmin extends Component {
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
  color =(position) =>
  {
    if (this.state.active === position) {
        return "#ff4081";
      }
      return "";
  }
  render() {
    return (
      <React.Fragment>
          {this.state.open_drawer === false &&
            <div onClick={()=>this.setState({open_drawer:true})} className="float-left"
              style={{float:'center',boxShadow: '0px 10px 10px 2px pink',textAlign:'center',
              width:'42px',borderRadius: '0px 20px 20px 0px'}}>
              <ChevronRightIcon />
            </div>
          }
           <div style={{marginTop:'15px'}}>
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
                       <ListItem button style={{color:this.color('campus-admin')}}
                       onClick={(e)=>{this.handleCheck('campus-admin')}}>
                         <ListItemText primary={"Insert Campus Admin"} />
                       </ListItem>
                       <ListItem button style={{color:this.color('add-nav')}}
                       onClick={(e)=>{this.handleCheck('add-nav')}}>
                         <ListItemText primary={"Add Navbar"} />
                       </ListItem>
                       <ListItem button style={{color:this.color('add-desgn')}}
                       onClick={(e)=>{this.handleCheck('add-desgn')}}>
                         <ListItemText primary={"Add Designation"} />
                       </ListItem>
                       <ListItem button style={{color:this.color('add-colleges')}}
                       onClick={(e)=>{this.handleCheck('add-colleges')}}>
                         <ListItemText primary={"Add Colleges"} />
                       </ListItem>
                       <ListItem button style={{color:this.color('add-schools')}}
                       onClick={(e)=>{this.handleCheck('add-schools')}}>
                         <ListItemText primary={"Add Schools"} />
                       </ListItem>
                       <ListItem button style={{color:this.color('view-cadmins')}}
                       onClick={(e)=>{this.handleCheck('view-cadmins')}}>
                         <ListItemText primary={"View Campus Admin Details"} />
                       </ListItem>
                       <ListItem button style={{color:this.color('handle-render')}}
                       onClick={(e)=>{this.handleCheck('handle-render')}}>
                         <ListItemText primary={"Handle Renders"} />
                       </ListItem>
                       <ListItem button style={{color:this.color('handle-signup')}}
                       onClick={(e)=>{this.handleCheck('handle-signup')}}>
                         <ListItemText primary={"Handle Signup"} />
                       </ListItem>
                   </List>
                 </Drawer>
                 <main style={{marginTop:'69px',padding:'0px 10px 0px 10px'}}>
                    {this.state.select === 'add-nav' &&
                      <NavHandle user={this.props.user} />
                    }
                    {this.state.select === 'add-desgn' &&
                      <Designation user={this.props.user} />
                    }
                    {this.state.select === 'add-colleges' &&
                      <Colleges user={this.props.user} />
                    }
                    {this.state.select === 'add-schools' &&
                      <Schools user={this.props.user} />
                    }
                    {this.state.select === 'campus-admin' &&
                      <CampusAdmin user={this.props.user} />
                    }
                 </main>
           </div>
      </React.Fragment>
    );
  }
}
