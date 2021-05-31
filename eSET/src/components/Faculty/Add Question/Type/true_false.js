import React, { Component } from 'react'
import axios from 'axios'
import {
  Select,FormControl,MenuItem,InputLabel,Grid,CircularProgress,Backdrop,Button,
  Dialog,DialogActions,DialogTitle,DialogContent,TextField,
} from '@material-ui/core';
import Show from './show';


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
   onCreate = (e) => {
     this.setState({ isAddProduct: true ,product: {}});
   }
   onFormSubmit(data) {
     let apiUrl;
     if(this.state.isEditProduct){
       apiUrl = '/etest/user/edit_questions';
     } else {
       apiUrl = '/etest/user/add_questions';
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
     axios.post('/etest/user/fetch_questions_to_edit',{
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
          header: "Question Description",
          name: "question",
          placeholder: "Question Description",
          type: "text",
        },
        {
          header: "Time Limit",
          name: "set_timelimit",
          placeholder: "Set time limit",
          verify:true,
        },
        {
          header: "Time limit(in min)",
          name: "time_limit_in_min",
          placeholder: "Set time limit of this questions(in min)",
          type: "number",
        },
        {
          header: "Answer",
          name: "answer",
          placeholder: "Answer",
          type: "text",
        },
      ],
    };
    if(this.state.isAddProduct || this.state.isEditProduct)
    {
     productForm = <AddProduct cancel={this.updateState} username={this.props.state.username} state={this.props.state}
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
                                     <ViewData username={this.props.state.username} state={this.props.state}
                                     data={data}  editProduct={this.editProduct}/>
                                }
                                <br />
                                {!this.state.isAddProduct &&
                                 <React.Fragment>
                                   <Grid container spacing={1}>
                                     <Grid item xs={12} sm={6} />
                                     <Grid item xs={6} sm={6}>
                                     {this.props.state.question_type &&
                                        <Button style={{float:'right'}} variant="contained" color="secondary"
                                        onClick={(e) => this.onCreate(e)}>Add Data</Button>
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
      username:'',
      set_timelimit:false,
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

  handleD = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }


componentDidMount(){
  this.setState({
    course_id:this.props.state.course_id,
    skill_name:this.props.state.skill_name,
    username: this.props.username,
    level:this.props.state.level,
    mark:1,
    question_type:this.props.state.question_type,
  })
}
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    if(!this.state.question || !this.state.answer)
    {
      return false;
    }
    else
    {
      if(this.state.time_limit)
      {
        if(this.state.time_limit_in_min)
        {

          this.props.onFormSubmit(this.state);
          this.setState(this.initialState);
        }
        else {
          return false;
        }
      }
      else {
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
      }
    }
  }

  render() {
    let pageTitle;
if(this.state.serial) {
  pageTitle = "EDIT DATAS";
} else {
  pageTitle ="ADD DATAS";
}
console.log(this.state);
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

          <TextField
            id={'question'}
            label={'Type the question'}
            fullWidth
            multiline
            type="text"
            name="question"
            value={this.state.question}
            onChange={e => this.handleD(e)}
            variant="outlined"
          />
          <br /><br />
          <TextField
            id={'mark'}
            label={'Type the mark'}
            fullWidth
            multiline
            disabled={true}
            type="number"
            name="mark"
            value={1}
            variant="outlined"
          />
          <br /><br />
             <FormControl style={{width:'100%'}}>
               <InputLabel id="test_type">Want to Set Time Limit</InputLabel>
                 <Select
                   labelId="set_timelimit"
                   id="set_timelimit"
                   name="set_timelimit"
                   value={this.state.set_timelimit}
                   onChange={e => this.handleD(e)}
                 >
                 <MenuItem value={false}>No</MenuItem>
                 <MenuItem value={true}>Yes</MenuItem>
                 </Select>
              </FormControl>
              <br /><br />
              <TextField
                disabled={this.state.set_timelimit ? false : true}
                id={'notable'}
                label={'Type time limit in min for this question'}
                fullWidth
                type="number"
                name="time_limit_in_min"
                value={this.state.time_limit_in_min}
                onChange={e => this.handleD(e)}
                variant="outlined"
              /><br /><br />
             <FormControl style={{width:'100%'}}>
               <InputLabel id="test_type">Answer</InputLabel>
                 <Select
                   labelId="answer"
                   id="answer"
                   name="answer"
                   value={this.state.answer}
                   onChange={e => this.handleD(e)}
                 >
                 <MenuItem value={"false"}>False</MenuItem>
                 <MenuItem value={"true"}>True</MenuItem>
                 </Select>
              </FormControl>
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
    if((prevProps.state.question_type !== this.props.state.question_type) ) {
      this.fetch();
    }
  }

  deleteProduct = (productId) => {
    this.setState({fetching:true})
  const { products } = this.state;
  axios.post('/etest/user/delete_questions',{
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
  axios.post('/etest/user/fetch_questions',{
    question_type:this.props.state.question_type,
    skill_name:this.props.state.skill_name,
    course_id:this.props.state.course_id,
    level:this.props.state.level,
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
            <Show data ={products} fielddata={this.props.data.fielddata} modal_view={false}
             editProduct={this.props.editProduct} deleteProduct={this.deleteProduct} />
        </React.Fragment>
      )
    }
    }
  }
}
