import React, { Component } from 'react'
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Backdrop,CircularProgress,Typography} from '@material-ui/core';

import AddProduct from './add';
import ProductList from './show'
import ValidateUser from '../../validate';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Section extends Component {

  constructor(props)
  {
    super(props)
    this.state ={
      username:'',
      redirectTo:'',
      option:'',
      selected_campus:[],
    }
  }

handleOption = (e) =>{
  this.setState({option: e.target.value})
}
  render()
  {
    return(
        <Paper elevation={3} style={{padding:'30px'}}>
         <Typography align="center" variant="h6">Add Navbar</Typography><br />
         <Grid container spacing={1}>
              <Grid item xs={6} sm={6} lg={4} xl={4} md={4}>
                  <FormControl style={{width:'100%'}}>
                     <InputLabel id="catagory">Category</InputLabel>
                     <Select
                       labelId="catagory"
                       id="catagory"
                       name="title" value={this.state.option} onChange={this.handleOption}
                     >
                     <MenuItem value="faculty">Faculty Nav</MenuItem>
                     <MenuItem value="student">Student Nav</MenuItem>
                     <MenuItem value="department_admin">Department Admin Nav</MenuItem>
                     </Select>
                   </FormControl>
              </Grid>
              <Grid item  xs={3} sm={3} lg={4} xl={4} md={4}>

              </Grid>
              <Grid item  xs={3} sm={3} lg={4} xl={4} md={4}/>
          </Grid>
          {this.state.option &&
            <Collap options={this.state.option} username={this.props.user.username}/>
          }
        </Paper>
    )
  }
}


class Collap extends Component{
 constructor(props) {
    super(props);
    this.state = {
      modal:false,
      redirectTo: null,
      username:'',
      isAddProduct: false,
      response: {},
      product: {},
      isEditProduct: false,
      action:this.props.options,
      snack_open:false,
      alert_type:'',
      snack_msg:'',
      success:'block'
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

showDiv =(userObject) => {
 this.setState(userObject)
}
  onCreate = (e,index) => {
    this.setState({isAddProduct: true,product: {}});
  }

  onFormSubmit(data) {
    let apiUrl;
    var addroute,editroute;
    if((this.props.options === "faculty") || (this.props.options === "department_admin"))
    {
      addroute="/etest/user/add_actions_S";
      editroute = "/etest/user/edit_actions_S"
    }
    else if(this.props.options === "student")
    {
      addroute="/etest/user2/add_actions_S";
      editroute = "/etest/user2/edit_actions_S"
    }
    if(!(data.val)||!(data.link))
    {
      this.setState({
        snack_open:true,
        snack_msg:'Enter All the Details !!',
        alert_type:'warning',
        isAddProduct:false,
        isEditProduct:false,
      });
    }
    else
    {
    if(this.state.isEditProduct){
      apiUrl = editroute;
    } else {
      apiUrl = addroute;
    }
    this.setState({submit:true})
    axios.post(apiUrl, {data})
        .then(response => {
          this.setState({
            response: response.data,
            isAddProduct: false,
            isEditProduct: false,
            submit:false,
          })
        })
   }
  }

  editProduct = (productId,index)=> {
    this.setState({submit:true})
    var editProd;
     if(this.props.options === "faculty")
    {
      editProd ="/etest/user/edit_actions_S_for_existing_data"
    }
    else if(this.props.options === "student")
    {
      editProd = "/etest/user2/edit_actions_S_for_existing_data"
    }
    axios.post(editProd,{
      id: productId,
    })
        .then(response => {
          this.setState({
            product: response.data,
            isEditProduct: true,
            isAddProduct: true,
            submit:false,
          });
        })

 }
 updateState = () =>{
   this.setState({
     isAddProduct:false,
     isEditProduct:false,
   })
 }

  render() {
    let productForm;

           var  data = {
              fielddata: [
                {
                  header: "Nav Title",
                  name: "val",
                  placeholder: "Enter the Nav Title",
                  type: "text",
                },
                {
                  header: "Enter the Link Address",
                  name: "link",
                  placeholder: "Enter the Link Address",
                  type: "text",
                },
                {
                  header: "Available Campuses",
                  name: "selected_campus",
                  placeholder: "Available Campuses",
                  modal_view:true,
                  dept_modal:false,
                  select:true,
                },
              ],
            };
            if(this.state.isAddProduct || this.state.isEditProduct)
            {
              productForm =
              <AddProduct cancel={this.updateState} username={this.props.username} action={'Nav Data'}
              usertype={this.props.options} data={data} onFormSubmit={this.onFormSubmit}
              product={this.state.product} />
            }
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
          return (
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
             {!this.state.isAddProduct &&
                  <ProductList username={this.props.username}  action={'Nav Data'}
                  usertype={this.props.options}
                  data={data}  editProduct={this.editProduct}/>
             }

             {!this.state.isAddProduct &&
                <Grid container spacing={1}>
                 <Grid item xs={6} sm={6}/>
                  <Grid item xs={6} sm={6}>
                    {this.props.options &&
                      <div style={{float:'right',padding:'10px'}}>
                        <Button variant="contained" color="secondary"
                        onClick={(e) => this.onCreate(e,this.props.options)}>Add Data</Button>
                      </div>
                    }
                  </Grid>
                </Grid>
            }

                { productForm }
          </React.Fragment>
          );
        }

}
}
