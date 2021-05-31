import React, { Component } from 'react'
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';

import {
  Select,FormControl,MenuItem,InputLabel,Grid,CircularProgress,Backdrop,Button,DialogContentText,
  Dialog,DialogActions,DialogTitle,DialogContent,TextField,Snackbar,Card,CardHeader,CardActions,CardContent,CardActionArea,
  IconButton,Tooltip,Typography,
} from '@material-ui/core';

import CSV from './csv_upload';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



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
   onCreate = (e,action) => {
     this.setState({ isAddProduct: true ,product: {},csv:action});
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
          header: "Question",
          name: "question",
          placeholder: "Question Description",
          type: "text",
        },
        {
          header: "Answer",
          name: "answer",
          placeholder: "Mark for this question",
          select:true,
        },
      ],
    };
    if(this.state.isAddProduct || this.state.isEditProduct)
    {
      if(this.state.csv)
      {
        productForm = <CSV cancel={this.updateState} username={this.props.state.username} state={this.props.state}
         data={data} onFormSubmit={this.onFormSubmit}  product={this.state.product} />
      }
      else {
        productForm = <AddProduct cancel={this.updateState} username={this.props.state.username} state={this.props.state}
         data={data} onFormSubmit={this.onFormSubmit}  product={this.state.product} />
      }

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
                                <br />
                                {!this.state.isAddProduct &&
                                   <React.Fragment>
                                     <Grid container spacing={1}>
                                       <Grid item xs={12} sm={6} />
                                       <Grid item xs={6} sm={6}>
                                       {this.props.state.question_type &&
                                         <Grid container spacing={1}>
                                         <Button style={{float:'right'}} variant="contained" color="secondary"
                                         onClick={(e) => this.onCreate(e,false)}>Add Data Manually</Button> <br />
                                           <Button style={{float:'right'}} variant="outlined" color="primary"
                                           onClick={(e) => this.onCreate(e,true)}>Add with CSV Upload</Button>
                                         </Grid>

                                        }
                                       </Grid>
                                     </Grid>
                                  </React.Fragment>
                                }
                                {!this.state.isAddProduct &&
                                     <ViewData username={this.props.state.username} state={this.props.state}
                                     data={data}  editProduct={this.editProduct}/>
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
      confirm:false,
      options:[],
      optionBs:[],
      answers:[],
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

  setData = (e) =>{
    let stat = false;
    for(var i =0;i<=this.state.rowA;i++)
    {
      if(this.state['answer'+(i+1)] ===  e.target.value)
      {
        stat = true;
      }
    }
    if(stat === true)
    {
      this.setState({
        snack_open:true,
        alert_type:'error',
        snack_msg:'Answer can not be same for two !!',
      })
    }
    else {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }
  }


componentDidMount(){
  this.setState({
    course_id:this.props.state.course_id,
    skill_name:this.props.state.skill_name,
    username: this.props.username,
    level:this.props.state.level,
    question_type:this.props.state.question_type,
  })
  if(this.props.product.options)
  {
    this.props.product.options.map((content,index)=>{
      this.setState({['option'+(index+1)]:content})
    })
  }
  if(this.props.product.optionBs)
  {
    this.props.product.optionBs.map((con,ind)=>{
      this.setState({['optionB'+(ind+1)]:con})
    })
  }
  if(this.props.product.answers)
  {
    this.props.product.answers.map((co,inde)=>{
      this.setState({['answer'+(inde+1)]:co})
    })
  }
}
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  submitData=()=>{
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  handleSubmit(event) {
    if(!this.state.mark || !this.state.optionB1 || !this.state.optionB2 ||  !this.state.optionB3 ||
     !this.state.optionB4 ||  !this.state.option1 ||  !this.state.option2 ||  !this.state.option3 ||  !this.state.option4
    ||  !this.state.answer1 ||  !this.state.answer2 ||  !this.state.answer3 ||  !this.state.answer4)
    {
      return false;
    }
    else
    {
      let data = [];
      let dataB = [];
      let answerA = [];
      for(var i=1;i<=this.state.rowA;i++)
      {
        data.push(this.state['option'+i]);
      }
      for(var j=1;j<=this.state.rowA;j++)
      {
        dataB.push(this.state['optionB'+j]);
      }
      for(var k=1;k<=this.state.rowA;k++)
      {
        answerA.push(this.state['answer'+k]);
      }
      this.setState({options:data,optionBs:dataB,answers:answerA})
      if(this.state.time_limit)
      {
        if(this.state.time_limit_in_min)
        {
          this.setState({confirm:true})
        }
        else {
          return false;
        }
      }
      else {
        this.setState({confirm:true})
      }
    }
  }

  render() {
  //  console.log(this.state);
    let pageTitle;
if(this.state.serial) {
  pageTitle = "EDIT DATAS";
} else {
  pageTitle ="ADD DATAS";
}
console.log(this.state);
    return(
      <React.Fragment>
      {this.state.confirm &&
        <Dialog
          open={this.state.confirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Aggrement</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to submit this data ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.setState({confirm:false,options:'',optionBs:'',answers:''})} color="primary">
              Disagree
            </Button>
            <Button onClick={this.submitData} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      }
      <Dialog
        open={true}
        fullWidth
        onClose={this.props.cancel}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" align="center">{pageTitle}</DialogTitle>
      <DialogContent >
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}}
open={this.state.snack_open} autoHideDuration={2000}
onClose={()=>this.setState({snack_open:false})}>
  <Alert onClose={()=>this.setState({snack_open:false})}
  severity={this.state.alert_type}>
    {this.state.snack_msg}
  </Alert>
</Snackbar>
          <Typography variant="h6">Remember 4 /4 combination is mandatory for match the following.</Typography><br />
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6} lg={6} xl={6} md={6}>
                      <FormControl style={{width:'100%'}}>
                        <InputLabel id="rows">No Of Rows in PartA</InputLabel>
                          <Select
                            labelId="rowA"
                            id="rowA"
                            name="rowA"
                            value={this.state.rowA}
                            onChange={e => this.handleD(e)}
                          >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          </Select>
                       </FormControl>
                       <br /><br />
                           {Array.apply(null, {length:this.state.rowA}).map((i,index)=>{
                            return(
                              <React.Fragment key={index}>
                                <TextField
                                  id={'option'+(index+1)}
                                  label={'PartA - '+(index+1)}
                                  fullWidth
                                  type="text"
                                  name={"option"+(index+1)}
                                  value={this.state['option'+(index+1)]}
                                  onChange={e => this.handleD(e)}
                                  variant="outlined"
                                /><br /><br />
                                </React.Fragment>
                            )
                          })}
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6} xl={6} md={6}>
                      <FormControl style={{width:'100%'}}>
                        <InputLabel id="rows">No Of Rows in PartB</InputLabel>
                          <Select
                            labelId="rowB"
                            id="rowB"
                            name="rowB"
                            value={this.state.rowB}
                            onChange={e => this.handleD(e)}
                          >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          </Select>
                       </FormControl>
                       <br /><br />
                           {Array.apply(null, {length:this.state.rowB}).map((i,index)=>{
                            return(
                              <React.Fragment key={index}>
                                <TextField
                                  id={'optionB'+(index+1)}
                                  label={'PartB - '+(index+1)}
                                  fullWidth
                                  type="text"
                                  name={"optionB"+(index+1)}
                                  value={this.state['optionB'+(index+1)]}
                                  onChange={e => this.handleD(e)}
                                  variant="outlined"
                                /><br /><br />
                                </React.Fragment>
                            )
                          })}
                  </Grid>
                </Grid>
                <br />
                <Typography> Match the answers...</Typography><br />
                <Grid container spacing={1}>
                  <Grid item xs={6} sm={6}>
                  {Array.apply(null, {length:this.state.rowA}).map((i,index)=>{
                   return(
                     <React.Fragment  key={index}><Typography variant="h6">PartA - {index+1} </Typography><br /></React.Fragment>
                   )
                  })}
                  </Grid>
                  <Grid item xs={6} sm={6}>
                        {Array.apply(null, {length:this.state.rowA}).map((i,index)=>{
                         return(
                           <React.Fragment>
                           <FormControl style={{width:'100%'}}>
                             <InputLabel id="rows">Answers</InputLabel>
                               <Select
                                 labelId={'Answer'+(index+1)}
                                 id="answer"
                                 name={"answer"+(index+1)}
                                 value={this.state['answer'+(index+1)]}
                                 onChange={e => this.setData(e)}
                               >
                                 {Array.apply(null, {length:this.state.rowB}).map((i,index)=>{
                                    return(
                                      <MenuItem value={this.state['optionB'+(index+1)]} key={index}>{this.state['optionB'+(index+1)]}</MenuItem>
                                    )
                                  })}
                               </Select>
                            </FormControl>
                            <br /><br />
                             </React.Fragment>
                         )
                       })}
                  </Grid>
                </Grid><br /><br />
                <TextField
                  id={'marks'}
                  label={'Marks'}
                  fullWidth
                  type="number"
                  name={'mark'}
                  value={this.state.mark}
                  onChange={e => this.handleD(e)}
                  variant="outlined"
                />
            </DialogContent>
          <DialogActions>
          <Button  variant="outlined" color="secondary" onClick={this.props.cancel} >CANCEL</Button>
          <Button variant="contained" color="primary" type="submit" onClick={this.handleSubmit}>
            UPLOAD
          </Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
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
        <Grid container spacing={1}>
          {products.map((row,index)=>{
            return(
              <Grid item xs={3} sm={3} lg={3} xl={3} md={3} key={index}>
                  <Card>
                    <CardActionArea>
                    <CardHeader
                        title={"Q "+row.serial}
                        action={
                          <Tooltip title="Edit Data">
                              <IconButton onClick={() => this.props.editProduct(row.serial,this.props.action)}>
                                <EditIcon />
                              </IconButton>
                          </Tooltip>
                            }
                      />
                      <CardContent>
                           <Grid container spacing={1}>
                                <Grid item xs={6} sm={6} lg={6} xl={6} md={6}>
                                 <Typography align="center">Part A</Typography>
                                  {row.options.map((content,index)=>{
                                    return(
                                      <Typography align="center" key={index}>{content}<br /></Typography>
                                    )
                                  })}
                                </Grid>
                                <Grid item xs={6} sm={6} lg={6} xl={6} md={6}>
                                 <Typography align="center">Part B</Typography>
                                  {row.optionBs.map((content,index)=>{
                                    return(
                                      <Typography align="center" key={index}>{content}<br /></Typography>
                                    )
                                  })}
                                </Grid>
                             </Grid>
                             <hr />
                               <Typography align="center">Answers</Typography><br />
                          <Grid container spacing={1}>
                                 {row.answers.map((content,index)=>{
                                   return(
                                     <Grid item xs={12} sm={12}>
                                       <Typography align="center" key={index}>
                                         Part A{index+1} - {content}</Typography>
                                       </Grid>
                                   )
                                 })}
                           </Grid>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="secondary" onClick={() => this.deleteProduct(row.serial)}>
                        Delete
                      </Button>
                      <Typography>Mark - {row.mark}</Typography>
                    </CardActions>
                  </Card>
              </Grid>
            )
          })}
        </Grid>
      )
    }
    }
  }
}
