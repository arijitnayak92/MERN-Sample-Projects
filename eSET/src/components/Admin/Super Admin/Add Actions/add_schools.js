import React, { Component } from 'react'
import axios from 'axios'
import AddProduct from './add';
import ProductList from './show';
import {Backdrop,CircularProgress} from '@material-ui/core';
import {Snackbar,Grid,Button,FormControl,MenuItem,Select,InputLabel} from '@material-ui/core';
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
       action:this.props.options,
       snack_open:false,
       alert_type:'',
       snack_msg:'',
       submit:false,
       loading:true,
       colleges:[],
       fetch_colleges:[],
     }
     this.componentDidMount = this.componentDidMount.bind(this)
     this.onFormSubmit = this.onFormSubmit.bind(this);
   }
   componentDidMount()
   {
     axios.post('/etest/user/fetch_data_S',{fix_action:'Colleges'})
     .then(res => {
         if(res.data)
         {
           this.setState({fetch_colleges:res.data,loading:false})
         }
     })
     .catch( err =>{
         this.setState({loading:false})
     })
   }
   onCreate = (e,index) => {
     this.setState({ isAddProduct: true,product: {}});
   }

   onFormSubmit(data) {
     let apiUrl;
     var addroute,editroute;
     addroute="/etest/user/add_actions_S";
     editroute = "/etest/user/edit_actions_S"
     if(!(data.school_name) || !(data.college_name))
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
                   header: "College Name",
                   name: "college_name",
                   placeholder: "Enter the Name of the College",
                   type: "text",
                   college:true,
                 },
                 {
                   header: "School Name",
                   name: "school_name",
                   placeholder: "Enter the Name of the School",
                   type: "text",
                 },
                 {
                   header: "Departments",
                   name: "department_name",
                   placeholder: "",
                   display:'none',
                   modal_view:true,
                   dept_modal:true,
                 }
               ],
             };
             if(this.state.isAddProduct || this.state.isEditProduct) {
             productForm = <AddProduct  campus={this.state.campus} username={this.props.user.username}
             cancel={this.updateState} action="Schools"
              data={data1} onFormSubmit={this.onFormSubmit}  product={this.state.product} colleges={this.state.colleges} />
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
               if(this.state.loading)
               {
                 return(
                   <div>Loading..</div>
                 )
               }
               else
                {
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
              <Grid item xs={6} sm={6} md={6} lg={4} xl={4} style={{padding:'40px'}}>
                <FormControl variant="outlined" style={{width:'100%'}}>
                   <InputLabel id="demo-simple-select-outlined-label">
                     Campus
                   </InputLabel>
                   <Select
                   labelId="campus"
                   id="campus"
                   value={this.state.campus}
                   name="campus"
                   onChange={(e)=>this.setState({campus:e.target.value,colleges:this.state.fetch_colleges.filter(item=>item.campus === e.target.value)})}
                   labelWidth={60}
                   >
                   <MenuItem value="KTR">Kattankulathur Campus</MenuItem>
                   <MenuItem value="RAMAPURAM">Ramapuram Campus</MenuItem>
                   <MenuItem value="VADAPALANI">Vadapalani Campus</MenuItem>
                   <MenuItem value="DELHI">DELHI NCR Campus</MenuItem>
                   <MenuItem value="AP">AP Campus</MenuItem>
                   </Select>
                 </FormControl>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={4} xl={4}/>
            </Grid>
            {this.state.campus &&
              <React.Fragment>
              {!this.state.isAddProduct && <ProductList action="Schools"  campus={this.state.campus} data={data1}
              editProduct={this.editProduct} />}
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
            }
          </React.Fragment>

        );
      }
}
}
}
