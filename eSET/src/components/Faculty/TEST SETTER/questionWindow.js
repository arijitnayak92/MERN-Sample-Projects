import {
  AppBar, Backdrop, Button, CircularProgress,
  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid,
  IconButton, InputLabel, List, MenuItem, Paper, Select, Slide,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Toolbar, Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import React, { Component } from 'react';
import AddQuestions from './QUESTION WINDOW/addQuestions';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class Section extends Component {
  constructor(props)
  {
    super(props)
    this.state ={
      isAddProduct: false,
      response: {},
      product: {},
      isEditProduct: false,
      username:'',
      loading:false,
      home:'/etest/faculty',
      logout:'/etest/user/logout',
      login:'/etest/flogin',
      get:'/etest/user/',
      noti_route:true,
      nav_route: '/etest/user/fetchnav',
    }
     this.onFormSubmit = this.onFormSubmit.bind(this);
  }
   onCreate = (e,index) => {
     this.setState({ isAddProduct: true ,product: {}});
   }
   onFormSubmit(data) {
     let apiUrl;
     if(this.state.isEditProduct){
       apiUrl = '/etest/user/edit_test';
     } else {
       apiUrl = '/etest/user/add_test';
     }
     this.setState({loading:true})
     axios.post(apiUrl, {data})
         .then(response => {
           this.setState({
             response: response.data,
             isAddProduct: false,
             isEditProduct: false,
             loading:false,
           })
         })
         .catch( err => {
           this.setState({loading:false})
         });
    }

   editProduct = (productId,index)=> {
     this.setState({loading:true})
     axios.post('/etest/user/fetch_test_to_edit',{
       id: productId,
       username: this.props.username,
     })
         .then(response => {
           this.setState({
             product: response.data,
             isEditProduct: true,
             isAddProduct: true,
             loading:false,
           });
         })
         .catch( err => {
           this.setState({loading:false})
         });

  }
  updateState = () =>{
    this.setState({
      isAddProduct:false,
      isEditProduct:false,
    })
  }

handleExpand =(e) => {
  this.setState({isExpanded:!this.state.isExpanded});
};

  render()
  {
    let productForm;
    var data = {
      fielddata: [
        {
          header: "Type of the Pattern",
          name: "test_type",
          placeholder: "Type of the pattern",
          type: "",
          select:true,
        },
        {
          header: "Total Number Attende",
          name: "total_mark",
          placeholder: "Total Number",
          type: "number",
        },
        {
          header: "Description of the Target",
          name: "description",
          placeholder: "Description of the Target",
          type: "text",
        },
        {
          header: "Date of Conduct",
          name: "date_of_conduct",
          type: "date",
          placeholder: "Enter the Date of Conduct"
        },
        {
          header: "Capacity Of this Pattern",
          name: "time_limit",
          type: "number",
          placeholder: "Enter the Capacity Of this Pattern"
        },
      ],
    };
    if(this.state.isAddProduct || this.state.isEditProduct)
    {
     productForm = <AddProduct cancel={this.updateState} username={this.props.username} type={this.props.type}
      layout={this.props.layout}
      data={data} onFormSubmit={this.onFormSubmit}  product={this.state.product} />
    }

    if(this.state.loading)
    {
      return(
        <Backdrop  open={true} style={{zIndex:'2040'}}>
          <CircularProgress style={{color:'yellow'}}/>&emsp;
          <div style={{color:'yellow'}}>Processing Your Request.....</div>
        </Backdrop>
      );
    }
    else
    {
    return(
      <React.Fragment>

        <div className="section-data" style={{padding:'15px'}}>
                              <div style={{padding:'15px'}}>
                                {!this.state.isAddProduct &&
                                     <ViewData username={this.props.username} props_data={this.props.props_data}
                                      type={this.props.type} layout={this.props.layout}
                                     data={data}  editProduct={this.editProduct}/>
                                }
                                <br />
                                {!this.state.isAddProduct &&
                                 <React.Fragment>
                                   <Grid container spacing={1}>
                                     <Grid item xs={12} sm={6} />
                                     <Grid item xs={6} sm={6}>
                                     {this.props.layout &&
                                        <Button style={{float:'right'}} variant="contained" color="secondary"
                                        onClick={(e) => this.onCreate(e,this.props.options)}>Add Data</Button>
                                      }
                                     </Grid>
                                   </Grid>
                                </React.Fragment>
                              }
                                { productForm }
                                <br/>
                              </div>
            </div>
      </React.Fragment>
    )
}
  }
}


class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      value:'',
      username: this.props.username,
      description:'',
      verified:false,
    }
    if(this.props.product){
      this.state = this.props.product
    } else {
      this.state = this.initialState;
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleD = (event,index) =>{
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }


componentDidMount(){
  this.setState({
    action:this.props.action,
    username: this.props.username,
    done:false,
    verified:false,
    type:this.props.type,
    layout:this.props.layout,
  })
}


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
      event.preventDefault();
      this.props.onFormSubmit(this.state);
      this.setState(this.initialState);
  }

  render() {
    let pageTitle;
if(this.state.serial) {
  pageTitle = "EDIT DATAS";
} else {
  pageTitle ="ADD DATAS";
}
    return(
      <Dialog
        open={true}
        fullWidth
        onClose={this.props.cancel}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" align="center">{pageTitle}</DialogTitle>
      <DialogContent >

              {this.props.data.fielddata.map((content,index)=>(
                <React.Fragment key={index}>
                 {content.select ?
                   <React.Fragment>
                     <FormControl style={{width:'100%'}}>
                       <InputLabel id="test_type">Type of Exam</InputLabel>
                         <Select
                           labelId="test_type"
                           id="test_type"
                           name={content.name}
                           value={this.state[content.name]}
                           onChange={e => this.handleD(e, index)}
                         >
                         <MenuItem value="3D Co-ordinates">Pattern With 3D Co-ordinates</MenuItem>
                         <MenuItem value="Custom Input">Pattern With Custom Input</MenuItem>
                         <MenuItem value="Default">Default Patterns</MenuItem>
                         </Select>
                      </FormControl>
                   </React.Fragment>
                   :
                   <React.Fragment>
                     <TextField
                       id={content.name}
                       label={content.placeholder}
                       fullWidth
                       type={content.type}
                       name={content.name}
                       value={this.state[content.name]}
                       onChange={e => this.handleD(e, index)}
                       variant="outlined"
                     />
                   </React.Fragment>
                 }
                  <br /><br />
                </React.Fragment>
              ))}

            </DialogContent>
          <DialogActions>
          <Button  variant="outlined" color="secondary" onClick={this.props.cancel} >CANCEL</Button>
          <Button variant="contained" color="primary" type="submit" onClick={this.handleSubmit}>
            UPLOAD
          </Button>
        </DialogActions>

      </Dialog>
    )
  }
}

class ViewData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      fetching:true,
      question_window:false,
      refer_data:'',
    }
    this.fetch = this.fetch.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
  }
  componentWillMount(){
      this.fetch()
  }
  componentDidUpdate =(prevProps) => {
    if ((prevProps.type !== this.props.type) || (prevProps.layout !== this.props.layout) ) {
      this.fetch();
    }
  }

  deleteProduct = (productId,index) => {
    this.setState({fetching:true})
  const { products } = this.state;
  axios.post('/etest/user/delete_test',{
    serial: productId,
    username: this.props.username,
  })
      .then(response => {
        this.setState({
          response: response,
          products: products.filter(product => product.serial !== productId),
          fetching:false,
       })
      })
      .catch( err => {
          this.setState({fetching:false,})
      });
}


fetch =() =>{
  axios.post('/etest/user/fetch_test',{
    type: this.props.type,
    layout:this.props.layout,
    username: this.props.username,
  })
  .then(response =>{
    this.setState({
     products: response.data,
     fetching:false
   })
  })
  .catch( err => {
      this.setState({fetching:false})
  });
}
  render() {
    if(this.state.fetching)
    {
      return(
        <Backdrop  open={true} style={{zIndex:'2040'}}>
          <CircularProgress style={{color:'yellow'}}/>&emsp;
          <div style={{color:'yellow'}}>Processing Your Request.....</div>
        </Backdrop>
      )
    }
    else {
      const { products} = this.state;
      if(products.length === 0)
      {
        return(
          <div style={{textAlign:'center'}}>No Data Found !!  </div>
        )
      }
      else{

      return(
        <React.Fragment>
        {this.state.question_window &&
          <Dialog fullScreen open={this.state.question_window}
          onClose={()=>this.setState({question_window:false})} TransitionComponent={Transition}>
            <AppBar>
              <Toolbar>
               <Grid style={{marginTop:'55'}}container>
                 <Grid item xs={2} sm={2}>
                    <IconButton edge="start" color="inherit" onClick={()=>this.setState({question_window:false})} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                 </Grid>
                 <Grid item xs={10} sm={10} />
               </Grid>
              </Toolbar>
            </AppBar>
            <List style={{marginTop:'58px'}}>
              <AddQuestions fetch={this.fetch} username={this.props.username} props_data={this.props.props_data} refer_data={this.state.refer_data} />
            </List>
          </Dialog>
        }
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                {this.props.data.fielddata.map((content,index)=>(
                  <TableCell align="center" key={index}><b>{content.header}</b></TableCell>
                ))}
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Set Question</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row,index)=> (
                  <TableRow key={index}>
                    {this.props.data.fielddata.map((content,ind)=>(
                      <TableCell align="center" key={ind}>
                            <Typography>{row[content.name]}</Typography>
                       </TableCell>
                    ))}
                    <TableCell align="center">
                     {row.verified ?
                      <Typography style={{color:'green'}}>Verified</Typography>
                        :
                      <Typography style={{color:'red'}}>Not Verified</Typography>
                     }
                    </TableCell>
                    <TableCell align="center">
                      {row.done ?
                        <Typography style={{color:'red'}}>NOT EDITABLE</Typography>
                         :
                         <React.Fragment>
                           <EditIcon className="go"
                           onClick={() => this.props.editProduct(row.serial,this.props.action)} />&emsp;
                          <DeleteIcon color="secondary" className="go"
                          onClick={() => this.deleteProduct(row.serial,this.props.action)} />
                         </React.Fragment>
                      }
                    </TableCell>
                      <TableCell align="center">
                          <Button variant="outlined" color="secondary" disabled={!row.verified}
                           onClick={()=>this.setState({question_window:true,refer_data:row})}>Add Patterns</Button>
                       </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      )
    }
    }
  }
}
