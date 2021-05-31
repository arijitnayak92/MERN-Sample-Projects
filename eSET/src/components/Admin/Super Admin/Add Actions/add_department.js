import React, { Component } from 'react'
import axios from 'axios'
import AddProduct from './add';
import ProductList from './show';
import {Backdrop,CircularProgress} from '@material-ui/core';
import {Snackbar,Grid,Button} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

 export default class InsertDept extends Component{
  constructor(props) {
     super(props);
     this.state = {
       redirectTo: null,
       username:'',
       isAddProduct: false,
       response: {},
       product: {},
       isEditProduct: false,
       snack_open:false,
       alert_type:'',
       snack_msg:'',
       submit:false,
     }
     this.onFormSubmit = this.onFormSubmit.bind(this);
   }

   onCreate = (e,index) => {
     this.setState({ isAddProduct: true,product: {}});
   }

   onFormSubmit(data) {
     let apiUrl;
     var addroute,editroute;
     addroute="/etest/user/add_actions_S";
     editroute = "/etest/user/edit_actions_S"
     if(!(data.department_name))
     {
       this.setState({
         snack_open:true,
         snack_msg:'Enter All the Details !!',
         alert_type:'warning',
         isAddProduct:false,
         isEditProduct:false,
       });
       return false;
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
      editProd ="/etest/user/edit_actions_S_for_existing_data";

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

            var  data1 = {
               fielddata: [
                 {
                   header: "Department Name",
                   name: "department_name",
                   placeholder: "Enter the Name of the Department",
                   type: "text",
                 }
               ],
             };
             if(this.state.isAddProduct || this.state.isEditProduct) {
             productForm = <AddProduct username={this.props.username} dataSet={this.props.dataSet} cancel={this.updateState}
             action="Department" data={data1} onFormSubmit={this.onFormSubmit}  product={this.state.product} />
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
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}}
    open={this.state.snack_open} autoHideDuration={2000}
    onClose={()=>this.setState({snack_open:false})}>
      <Alert onClose={()=>this.setState({snack_open:false})}
      severity={this.state.alert_type}>
        {this.state.snack_msg}
      </Alert>
    </Snackbar>
    {!this.state.isAddProduct && <ProductList action="Department" usertype={this.props.dataSet.school_name}
    data={data1} dataSet={this.props.dataSet} editProduct={this.editProduct} />}
    {!this.state.isAddProduct &&
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6}/>
            <Grid item xs={6} sm={6}>
               <div style={{float:'right',padding:'10px'}}>
                 <Button variant="contained" color="secondary"
                  onClick={(e) => this.onCreate(e,this.props.options)}>Add Data</Button>
                </div>
           </Grid>
        </Grid>
    }
    { productForm }
  </React.Fragment>

);
}
}
}
