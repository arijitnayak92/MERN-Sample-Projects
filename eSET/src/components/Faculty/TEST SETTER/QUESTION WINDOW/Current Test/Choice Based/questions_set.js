import React, { Component } from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

import {Paper,CardContent,Grid,InputBase,Card,Divider,CardHeader,Checkbox,Dialog,DialogTitle,DialogActions,DialogContent,
  IconButton,CardActionArea,TablePagination,Button,Typography,
} from '@material-ui/core';

export default class GenerateQuestions extends Component {
  constructor()
  {
    super()
    this.state={
      fetching: true,
      generateset:[],
      finalarray:[],
      q_count:0,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount()
  {
      this.fetchQuestions();
  }

  fetchQuestions=()=>{
    axios.post('/etest/user/fetch_questions',
    {action:'question_set',username:this.props.props.username,course_id:this.props.props.props_data.state.course_id})
    .then( res => {
      let questionSet = [];
        this.props.state.data.setdata.map(content=>{
          let questions=[];
           questions =  res.data.filter(item=>((item.question_type ===  this.props.state.data.question_type)
           && (item.mark === parseInt(content.mark_for_combination))
            && (item.level ===  this.props.state.data.level)));
             let n =0 ;
              n=n + parseInt(content.no_of_question);
              let com_type = content.mark_for_combination;
           questionSet.push({total:n,questions:questions,com_type:com_type});
        })
        this.setState({generateset:questionSet,fetching:false,})
    })
    .catch( err => {

    });
  }

  render() {
    if(this.state.fetching)
    {
      return (
        <div>
          Loading...
        </div>
      );
    }
    else {
      return (
        <React.Fragment>
        <Grid container spacing={1}>
          {this.state.generateset.map((content,index)=>{
            return(
              <Grid item xs={12} sm={12} lg={12} xl={12} md={12} key={index}>
                <EnhancedTable data={content.questions} q_count={content.total} index={index}
                 com_type={content.com_type} generateset={this.props.props.refer_data.questions} questions={this.props.questions}
                 state={this.props.state} props={this.props.props} fetch={this.props.fetch} saveQuestion={this.props.saveQuestion} />
              </Grid>
            )
          })}
        </Grid>
        </React.Fragment>
      );
    }
  }
}



class EnhancedTable extends Component {
  constructor()
  {
    super()
    this.state={
      page:0,
      preview:false,
      fetching:true,
      q_set:[],
      checkedItems:new Map(),
      rowsPerPage:6
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  handleChangePage = (event, newPage) => {
    this.setState({page:newPage})
  };
  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage:(parseInt(event.target.value,10)),page:0})
  };
  setData=(e,data,index)=>{
      const item = parseInt(data.serial);
      const isChecked = e.target.checked;
      let setup = this.state.checkedItems.set(item, isChecked)
      let dataset=this.state.q_set.concat(data.serial)
      this.setState({checkedItems:setup,q_set:dataset,})
  }
  deleteQ =(e,row,index,action)=>{
    if(action ===  true)
    {
      const new_set = this.state.q_set.filter(item=>item !== row);
      const updateChecked = typeof (this.state.checkedItems.get(parseInt(row))) === "undefined" ? true : false;
      let setup = this.state.checkedItems.set(parseInt(row), updateChecked);
      this.setState({checkedItems:setup,preview:false,q_set:new_set})
    }
    else {
      const new_set = this.state.q_set.filter(item=>item !== row.serial);
      const updateChecked = typeof (this.state.checkedItems.get(parseInt(row.serial))) === "undefined" ? true : false;
      let setup = this.state.checkedItems.set(parseInt(row.serial), updateChecked);
      this.setState({checkedItems:setup,preview:false,q_set:new_set})
    }
  }

  saveQuestion=()=>{
    this.props.saveQuestion(this.props.state.refer_part+(this.props.index),this.state.q_set);
    this.setState({preview:false})
  }


  componentDidMount()
  {
    if(this.props.props.refer_data.questions.length>0)
    {
      let filterdata;
      this.props.props.refer_data.questions.map(content=>{
          if(content.part ===  this.props.state.refer_part+(this.props.index))
          {
            filterdata =content.questions;
            filterdata.map(row=>{
              const item = parseInt(row);
              let setup = this.state.checkedItems.set(item, true)
              this.setState({checkedItems:setup,q_set:filterdata})
            })
          }
      })
      this.setState({fetching:false})
    }
    else if(this.props.questions.length>0)
    {
      let filterdata;
      this.props.questions.map(content=>{
          if(content.part ===  this.props.state.refer_part+(this.props.index))
          {
            filterdata =content.questions;
            filterdata.map(row=>{
              const item = parseInt(row);
              let setup = this.state.checkedItems.set(item, true)
              this.setState({checkedItems:setup,q_set:filterdata})
            })
          }
      })
      this.setState({fetching:false})
    }
    else {
      this.setState({fetching:false})
    }
  }

render(){
  if(this.state.fetching)
  {
    return(
      <div>Fetching...</div>
    )
  }
  else{
  return (
    <div>
     {this.state.preview &&
       <Dialog
       fullWidth
       maxWidth={'lg'}
         open={this.state.preview}
         keepMounted
         onClose={()=>this.setState({preview:false})}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title" align="center">Questions You Added</DialogTitle>
          <DialogContent>
            <Button variant="outlined" color="primary" onClick={this.saveQuestion} disabled={(this.state.q_set.length ===  this.props.q_count) ? false : true}
            >Save Questions</Button><br /><br />
              <Paper elevation={3} style={{padding:'10px'}}>
                  <Grid container spacing={1}>
                      {this.state.q_set.map((row, index) => {
                          return (
                            <Grid item xs={2} sm={2} key={index}>
                            <Card>
                              <CardActionArea>
                              <CardHeader
                                  action={
                                    <IconButton onClick={e => this.deleteQ(e,row,index,true)}>
                                      <DeleteIcon />
                                    </IconButton>
                                      }
                                />
                                <CardContent>
                                  Question No - {row}
                                </CardContent>
                              </CardActionArea>
                            </Card>
                         </Grid>
                          );
                        })}
                  </Grid>
              </Paper>
          </DialogContent>
        <DialogActions>
        <Button onClick={()=>this.setState({preview:false})} color="primary">
          CLOSE
        </Button>
        </DialogActions>
      </Dialog>
     }
      <Paper elevation={3}  style={{padding:'10px'}}>
        <Typography align="center" variant="h6">{this.props.com_type} Marker Questions</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6}>

          </Grid>
          <Grid item xs={4} sm={4}>
            <Paper elevation={3} style={{padding:'11px'}}>
              <Typography align="center">Choosed Question Count - {this.state.q_set.length} / {this.props.q_count}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Button onClick={()=>this.setState({preview:true})} disabled={(this.state.q_set.length ===  this.props.q_count) ? false : true}
             variant="outlined" style={{float:'right'}} color="secondary">Preview</Button>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
          <Grid container spacing={1}>
              {this.props.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                .map((row, index) => {
                  return (
                    <Grid item xs={4} sm={4} key={index}>
                    <Card>
                      <CardActionArea>
                      <CardHeader
                          action={
                            <React.Fragment>
                             {(!!this.state.checkedItems.get(row.serial)) ?
                               <IconButton onClick={e => this.deleteQ(e,row,index,false)}>
                                 <DeleteIcon />
                               </IconButton>
                               :
                               <Checkbox
                               checked={!!this.state.checkedItems.get(row.serial)} disabled={(this.state.q_set.length ===  this.props.q_count) ? true : false}
                                 onChange={e => this.setData(e,row,index)}
                                 inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                             }
                            </React.Fragment>
                              }
                        />
                        <CardContent>
                          {row.question && <React.Fragment><b>Question</b>  -  {row.question}<br /><br /></React.Fragment>}
                          {(row.options.length>0 && !(row.optionBs.length>0)) &&
                            <React.Fragment>
                            <Typography align="center" >Options</Typography><br />
                              <Grid container spacing={1}>
                                {row.options.map((content,index)=>{
                                  return(
                                    <Grid item xs={6} sm={6} key={index}><b>Option {index+1}</b> - {content}</Grid>
                                  )
                                })}
                              </Grid><br />
                            </React.Fragment>
                          }

                          {(row.options.length>0 && row.optionBs.length>0 && row.answers.length>0 )&&
                            <React.Fragment>
                              <Grid container spacing={1}>
                                <Grid item xs={6} sm={6}>
                                  <Typography align="center"><b>Part - A</b></Typography>
                                  {row.options.map((content,index)=>{
                                    return(
                                      <Typography align="center" key={index}>{content}</Typography>
                                    )
                                  })}
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                  <Typography align="center"><b>Part - B</b></Typography>
                                  {row.optionBs.map((content,index)=>{
                                    return(
                                      <Typography align="center" key={index}>{content}</Typography>
                                    )
                                  })}
                                </Grid>
                              </Grid>
                              <hr />
                              <Typography align="center"><b>Answers</b></Typography>
                              {row.answers.map((content,index)=>{
                                return(
                                <Grid container spacing={1} key={index}>
                                  <Grid item xs={6} sm={6}>Part A{index+1}</Grid>
                                  <Grid item xs={6} sm={6}>{content}</Grid>
                                  </Grid>
                                )
                              })}
                              <br />
                            </React.Fragment>
                          }
                          {row.answer && <React.Fragment><b>Answer</b> - {row.answer} </React.Fragment>}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                 </Grid>
                  );
                })}
          </Grid>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.props.data.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
  }
 }
}
