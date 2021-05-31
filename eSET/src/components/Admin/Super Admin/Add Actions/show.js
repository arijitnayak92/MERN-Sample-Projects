import React from 'react';
import axios from 'axios';
import {CircularProgress,Backdrop,Dialog,DialogTitle,DialogActions,DialogContent,Button} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import DeptAdd from './add_department'
import ValidateUser from '../../validate';


export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      index:'',
      modal:false,
      disabled:false,
      allowed:false,
      error: null,
      products: [],
      action:'',
      loading:false,
      success:'none',
      modal_show:false,
      dept_add:false,
    }
    this.fetch = this.fetch.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount(){
      this.fetch(this.props.usertype)
  }
  openModal()
  {
      this.setState({modal: !this.state.modal})
  }
  componentDidUpdate =(prevProps,prevState) => {
    if ((prevProps.action !== this.props.action) || (prevProps.campus !== this.props.campus) ||(prevProps.usertype !== this.props.usertype)) {
      this.setState({loading:true})
      this.fetch(this.props.action);
    }
    if (prevState.allowed !== this.state.allowed) {
      this.openModal();
      this.deleteProduct(this.state.id,this.state.index)
    }
  }

  showDiv =(userObject) => {
    this.setState(userObject)
  }
  deleteProduct = (productId,index) => {
    this.setState({success:'block',disabled:true,id:productId,index:index})
    if(this.state.allowed === true)
    {
      this.deleteOperation(productId,index);
    }
}
deleteOperation= (productId,index) =>{
  this.setState({loading:true})
  var delroute;
  if((index === "faculty") || (index === "department_admin")){
    delroute = "/etest/user/del_action_S";
  }
  else if(index === "student"){
  delroute = "/etest/user2/del_action_S";
 }

const { products } = this.state;
axios.post(delroute,{
  serial: productId,
})
    .then(response => {
      this.setState({
        disabled:'',
        success:'none',
        response: response,
        products: products.filter(product => product.serial !== productId),
        loading:false,
     })
    })
}


fetch =(action) =>{
  let fetchroute;
  if((action === "faculty") || (action === "department_admin"))
  {
    fetchroute = "/etest/user/fetch_data_S";
  }
  else if(action === "student")
  {
    fetchroute = "/etest/user2/fetch_data_S"
  }
  else {
    fetchroute = "/etest/user/fetch_data_S";
  }


  axios.post(fetchroute,{
    fix_action: this.props.action,
  })
  .then(response =>{
    if(this.props.action === 'Department')
    {
      let dept =  response.data.filter(item=>(item.usertype === this.props.usertype && item.campus === this.props.dataSet.campus && item.college_name === this.props.dataSet.college_name));
      this.setState({products:dept,loading:false})
    }
    else if((this.props.action === 'Colleges') || (this.props.action === 'Schools') )
    {
      let college =  response.data.filter(item=>(item.campus === this.props.campus));
      this.setState({products:college,loading:false})
    }
    else if(this.props.action === 'Nav Data')
    {
      let nav = response.data.filter(item=>(item.usertype === this.props.usertype));
      console.log(nav);
      this.setState({products:nav,loading:false})
    }
    else {
      this.setState({
      loading:false,
      products: response.data,
     })
    }
  })
}
  render() {
    const {products} = this.state;
    if(this.state.loading)
    {
      return(
        <Backdrop  open={true} style={{zIndex:'2040'}}>
          <CircularProgress style={{color:'yellow'}}/>&emsp;
          <div style={{color:'yellow'}}>Processing Your Request....</div>
        </Backdrop>
      );
    }
    else
    {
      return(
        <React.Fragment>

        {this.state.success === 'block' &&
        <ValidateUser showDiv={this.showDiv}/>
        }
      {this.state.modal_show &&
        <Dialog
         open={this.state.modal_show}
         keepMounted
          onClose={()=>this.setState({modal_show:false})}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
         >
         <DialogTitle id="alert-dialog-slide-title" align="center">{this.state.dept_add ? "Departments of this School" : "Campuses who can see this navbar"}</DialogTitle>
          <DialogContent>
            {this.state.dept_add ?
              <DeptAdd dataSet={this.state.modal_data} username={this.props.username} />
              :
              <React.Fragment>
                {this.state.modal_data.selected_campus.map((content,index)=>{
                  return(
                    <React.Fragment key={index}>
                       {content.title}<br />
                    </React.Fragment>
                  )
                })}
              </React.Fragment>
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.setState({modal_show:false})} color="primary">
              Close
            </Button>
          </DialogActions>

        </Dialog>
      }

          <TableContainer component={Paper} style={{marginTop:'8px'}}>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>Index</b></TableCell>
                  {this.props.data.fielddata.map((content,index)=>(
                    <TableCell align="center" key={index}>
                       <b>{content.header}</b>
                    </TableCell>
                  ))}
                  <TableCell align="center"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row,index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {index+1}
                    </TableCell>
                    {this.props.data.fielddata.map((content,ind)=>(
                      <TableCell align="center" key={ind}>
                        {content.modal_view ?
                          <IconButton onClick={()=>this.setState({modal_show:true,modal_data:row,dept_add:content.dept_modal})}>
                            <InfoIcon />
                          </IconButton>
                          :
                          <React.Fragment>{row[content.name]}</React.Fragment>
                        }
                      </TableCell>
                    ))}
                    <TableCell align="center">
                       <div style={{textAlign:'center'}}>
                          <IconButton aria-label="edit" color="primary" onClick={() => this.props.editProduct(row.serial,this.props.action)}>
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton aria-label="edit" color="secondary" onClick={() => this.deleteProduct(row.serial,this.props.action)}>
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </div>
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
