import React, { Component } from 'react';
import {TextField,FormControl,Select,InputLabel,MenuItem,Typography,Button,Dialog,DialogTitle,DialogActions,Paper,
        Grid,Card,CardActions,CardContent,CardActionArea,Snackbar,CardHeader,Slide,List,AppBar,Toolbar,IconButton} from '@material-ui/core';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

import QuestionGenerate from './questions_set';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default class componentName extends Component {
  constructor()
  {
    super()
    this.state={
      add_action:false,
      combination:[],
      question_type:'',
      level:'',
      no_of_question:'',
      edit_id:'',
      snack_open:false,
      alert_type:'',
      snack_msg:'',
      submit:false,
      generate:false,
      confirm_window:false,
      question_window:false,
      refer_part:'',
      questions:[],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount()
  {
    if(this.props.refer_data.combination)
    {
      this.setState({combination:this.props.refer_data.combination})
    }
    if(this.props.refer_data.questions)
    {
      this.setState({questions:this.props.refer_data.questions})
    }
  }
  setCombination=()=>{
    axios.post('/etest/user/check_availability',{data:this.state,props_data:this.props.props_data})
    .then( res => {
        if(res.data === 'ok')
        {
          let setdata = [];
          for(var i=1;i<=parseInt(this.state.q_combination);i++)
          {
            let setdatas = {no_of_question:this.state['no_of_question'+i],mark_for_combination:this.state['mark_for_combination'+i]}
            setdata.push(setdatas);
          }
          let data = {question_type:this.state.question_type,level:this.state.level,setdata:setdata}
          this.setState(state => {
            const combination = [...state.combination, data];
            return {
              combination,
              question_type: '',
              level:'',
              no_of_question:'',
            };
          });
          this.setState({add_action:false})
        }
        else {
          this.setState({snack_open:true,
                alert_type:'error',
                snack_msg:'This number of questions is not available !!'})
        }
    })
    .catch( err => {
      this.setState({snack_open:true,
            alert_type:'error',
            snack_msg:'Something went Wrong !!'})
    });
  }

  combinationEdit=()=>{
    axios.post('/etest/user/check_availability',{data:this.state,props_data:this.props.props_data})
    .then( res => {
        if(res.data === 'ok')
        {
          this.setState(state => {
            const combination = state.combination.map((item, j) => {
              let setdata = [];
              for(var i=1;i<=parseInt(this.state.q_combination);i++)
              {
                let setdatas = {no_of_question:this.state['no_of_question'+i],mark_for_combination:this.state['mark_for_combination'+i]}
                setdata.push(setdatas);
              }
              if (j === this.state.edit_id) {
                return {question_type:this.state.question_type,level:this.state.level,setdata:setdata};
              } else {
                return item;
              }
            });

            return {
              combination,
              question_type: '',
              level:'',
              no_of_question:'',
            };
          });
          this.setState({add_action:false,edit_action:false})
        }
        else {
          this.setState({snack_open:true,
                alert_type:'error',
                snack_msg:'This number of questions is not available !!'})
        }
    })
    .catch( err => {
      this.setState({snack_open:true,
            alert_type:'error',
            snack_msg:'Something went Wrong !!'})
    });
  }
  removeCombination = (i)=> {
    if(this.props.refer_data.combination.length>0)
    {
      axios.post('/etest/user/delete_combination',{data:this.state,index:i,
        props_data:this.props.props_data,refer_data:this.props.refer_data})
      .then( res => {
        if(res.data === 'ok')
        {
          this.setState(state => {
            const combination = state.combination.filter((item, j) => i !== j);
            return {
              combination,
            };
          });
        }
        else {
          this.setState({snack_open:true,
                alert_type:'error',
                snack_msg:'Can not able to update !!'})
        }
      });
    }
    else {
      this.setState(state => {
        const combination = state.combination.filter((item, j) => i !== j);
        return {
          combination,
        };
      });
    }

  };
  saveCombination=()=>{
    let count_q = 0;
    let count_m = 0;
    this.state.combination.map((content)=>{
      content.setdata.map((item)=>{
        count_q = count_q + parseInt(item.no_of_question);
        count_m = count_m +((parseInt(item.mark_for_combination)) * (parseInt(item.no_of_question)));
      })
    })
      console.log(count_q);
      console.log(count_m);
    if((count_q>this.props.refer_data.no_of_questions) || (count_m>this.props.refer_data.total_mark))
    {
      this.setState({snack_open:true,
            alert_type:'error',
            snack_msg:'Mismatch in total number of questions'})
    }
    else {
      this.setState({submit:true})
      axios.post('/etest/user/add_combination',{data:this.state,props_data:this.props.props_data,refer_data:this.props.refer_data,
      question_setup:this.props.question_setup})
      .then( res => {
        if(res.data === 'ok')
        {
          this.setState({snack_open:true,submit:false,confirm_window:false,
                alert_type:'success',
                snack_msg:'Combination saved !!'})
        }
        else {
          this.setState({snack_open:true,submit:false,
                alert_type:'error',
                snack_msg:'Can not able to update !!'})
        }
      })
      .catch( err => {
        this.setState({snack_open:true,submit:false,
              alert_type:'error',
              snack_msg:'Something went wrong !!'})
      });
    }
  }

  saveQuestion=(part,questions)=>{
    if(this.state.questions.length>0)
    {
      let quest =  this.state.questions.filter((item) => item.part !== part);
        if(quest.length>0)
        {
          let data = {part:part,questions:questions};
            let ques = [];
            ques =  this.state.questions.filter((item) => item.part !== part);
            ques.push(data);
            this.setState({questions:ques});
        }
        else {
          let data = {part:part,questions:questions}
          this.setState(state => {
            const questions = [...state.questions, data];
            return {
              questions,
            };
          });
        }

    }
    else {
      let data = {part:part,questions:questions}
      this.setState(state => {
        const questions = [...state.questions, data];
        return {
          questions,
        };
      });
    }
  }

  saveSetUP=()=>{
    axios.post('/etest/user/save_choice_setup',{questions:this.state.questions,
      props_data:this.props.props_data,refer_data:this.props.refer_data,})
      .then( res => {
          if(res.data === 'ok')
          {
            this.props.fetch();
            this.setState({snack_open:true,submit:false,
                  alert_type:'success',
                  snack_msg:'Saved your questions !!'})
          }
          else {
            this.setState({snack_open:true,submit:false,
                  alert_type:'error',
                  snack_msg:'Can not able to update !!'})
          }
      })
      .catch( err => {
        this.setState({snack_open:true,submit:false,
              alert_type:'error',
              snack_msg:'Something went wrong !!'})
      });
  }


  render() {
    if(this.state.submit)
    {
      return(
        <div>Loading....</div>
      )
    }
    else {
      let total_count =0;
      if(this.state.combination.length>0)
      {
        this.state.combination.map((content)=>{
          content.setdata.map((item)=>{
            total_count = total_count + parseInt(item.no_of_question);
          })
        })
      }
    return (
      <React.Fragment>
      <Dialog
        open={this.state.confirm_window}
        onClose={()=>this.setState({confirm_window:false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
          After you save this combination there will not be any chance to edit it. Only you can delete the whole combination
        <DialogActions>
          <Button onClick={()=>this.setState({confirm_window:false})} color="primary">
            Close
          </Button>
          <Button onClick={this.saveCombination} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>



      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          open={this.state.snack_open} autoHideDuration={2000}
          onClose={()=>this.setState({snack_open:false})}>
        <Alert onClose={()=>this.setState({snack_open:false})}
        severity={this.state.alert_type}>
      {this.state.snack_msg}
        </Alert>
       </Snackbar>

       <Button style={{float:'right',padding:'8px'}} variant="contained" color="secondary"
       onClick={this.saveSetUP}>Save Whole Questions</Button>
       <br /><br />
      {(!this.state.add_action || !this.state.edit_action) &&
        <Paper elevation={3} style={{padding:'10px 10px 47px 10px',margin:'10px'}}>
          {(this.props.refer_data.combination.length === 0)?
            <Button style={{float:'right'}} variant="outlined"
            disabled={(total_count ===  this.props.refer_data.no_of_questions) ? true : false}
             onClick={()=>this.setState({add_action:true})}>
             Add DataSet</Button>
             :
             <Button style={{float:'right'}} variant="outlined" color="secondary">Delete Combination</Button>
          }
         <br /><br />
         <Typography variant="h6" align="center">Possible combination of Question set</Typography>
          {this.state.combination ?
            <React.Fragment>
             <Grid container spacing={1}>
              {this.state.combination.map((content,index)=>{
                return(
                  <Grid item xs={6} sm={6} lg={3} xl={3} md={4} key={index}>
                    <Card>
                      <CardActionArea>
                      <CardHeader
                          title={"Part "+(index+1)}
                        />
                        <CardContent>
                          <Typography>Type : {content.question_type}</Typography>
                          <Typography>Level : {content.level}</Typography>
                          {content.setdata.map((row,ind)=>{
                            return(
                              <Typography key={ind}>No of Questions : {row.no_of_question} [ for mark {row.mark_for_combination}]</Typography>
                            )
                          })}
                        </CardContent>
                      </CardActionArea>
                    <CardActions>
                        {(this.props.refer_data.combination.length === 0) ?
                          <React.Fragment>
                            <Button size="small" color="secondary" onClick={() => this.removeCombination(index)}>
                              Delete
                            </Button>
                            <Button size="small" color="primary" onClick={()=>this.setState({edit_action:true,add_action:true,edit_id:index,
                            question_type:content.question_type,level:content.level,no_of_question:content.no_of_question})}>
                              Edit
                            </Button>
                          </React.Fragment>
                           :
                            <Button size="small" color="primary"
                            onClick={()=>this.setState({refer_part:'Part '+(index+1),question_window:true,data:content})}>
                              Generate Question
                            </Button>
                         }
                        </CardActions>
                    </Card>
                  </Grid>
                )
              })}
              </Grid>
            </React.Fragment>
            :
            <Typography align="center">No Combination Available</Typography>
          }
          {(this.props.refer_data.combination.length === 0) &&
            <Button style={{float:'right'}} variant="contained" color="primary"
            onClick={()=>this.setState({confirm_window:true})}>Save</Button>
          }
        </Paper>
      }
      {(this.state.add_action || this.state.edit_action) &&
        <Dialog
          open={this.state.add_action}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Data Combination</DialogTitle>
             <div style={{padding:'10px'}}>
             <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                 open={this.state.snack_open} autoHideDuration={2000}
                 onClose={()=>this.setState({snack_open:false})}>
               <Alert onClose={()=>this.setState({snack_open:false})}
               severity={this.state.alert_type}>
             {this.state.snack_msg}
               </Alert>
              </Snackbar>

              {this.props.refer_data.type  === ('Only MCQ') &&
              <FormControl variant="outlined" style={{width:'100%'}}>
                 <InputLabel id="demo-simple-select-outlined-label">
                   Select Type
                 </InputLabel>
                 <Select
                 labelId="type"
                 id="type"
                 name="type" value={this.state.question_type} onChange={(e)=>this.setState({question_type:e.target.value})}
                 labelWidth={90}
                 >
                 <MenuItem value="Choose From Options">Choose From Options</MenuItem>
                 <MenuItem value="True-False">True-False</MenuItem>
                 </Select>
               </FormControl>
              }
              {this.props.refer_data.type  === ('Only SAQ') &&
              <FormControl variant="outlined" style={{width:'100%'}}>
                 <InputLabel id="demo-simple-select-outlined-label">
                   Select Type
                 </InputLabel>
                 <Select
                 labelId="type"
                 id="type"
                 name="type" value={this.state.question_type} onChange={(e)=>this.setState({question_type:e.target.value})}
                 labelWidth={90}
                 >
                   <MenuItem value="Write Answers">Write Answers</MenuItem>
                   <MenuItem value="Match the Following">Match the Following</MenuItem>
                   <MenuItem value="Write Equation">Write Equation</MenuItem>
                   <MenuItem value="Image Based">Image Based</MenuItem>
                   <MenuItem value="Coding Questions">Coding Questions</MenuItem>
                 </Select>
               </FormControl>
              }
              {this.props.refer_data.type  === ('Only Coding Type') &&
              <FormControl variant="outlined" style={{width:'100%'}}>
                 <InputLabel id="demo-simple-select-outlined-label">
                   Select Type
                 </InputLabel>
                 <Select
                 labelId="type"
                 id="type"
                 name="type" value={this.state.question_type} onChange={(e)=>this.setState({question_type:e.target.value})}
                 labelWidth={90}
                 >
                 <MenuItem value="Coding Questions">Coding Questions</MenuItem>
                 </Select>
               </FormControl>
              }
              {this.props.refer_data.type  === ('Mix Question') &&
              <FormControl variant="outlined" style={{width:'100%'}}>
                 <InputLabel id="demo-simple-select-outlined-label">
                   Select Type
                 </InputLabel>
                 <Select
                 labelId="type"
                 id="type"
                 name="type" value={this.state.question_type} onChange={(e)=>this.setState({question_type:e.target.value})}
                 labelWidth={90}
                 >
                 <MenuItem value="Choose From Options">Choose From Options</MenuItem>
                 <MenuItem value="True-False">True-False</MenuItem>
                 <MenuItem value="Write Answers">Write Answers</MenuItem>
                 <MenuItem value="Match the Following">Match the Following</MenuItem>
                 <MenuItem value="Write Equation">Write Equation</MenuItem>
                 <MenuItem value="Image Based">Image Based</MenuItem>
                 <MenuItem value="Coding Questions">Coding Questions</MenuItem>
                 </Select>
               </FormControl>
              }
              <br /><br />

                     <FormControl variant="outlined" style={{width:'100%'}}>
                        <InputLabel id="demo-simple-select-outlined-label">
                          Select Level
                        </InputLabel>
                        <Select
                          labelId="level"
                          id="level"
                          value={this.state.level} onChange={(e)=>this.setState({level:e.target.value})}
                          labelWidth={90}
                        >
                          <MenuItem value="Begineer">Beginner</MenuItem>
                          <MenuItem value="Intermediate">Intermediate</MenuItem>
                          <MenuItem value="Advanced">Advanced</MenuItem>
                        </Select>
                      </FormControl><br /><br />
                      <TextField
                        id={'noofQ1'}
                        label={'Question Combination'}
                        fullWidth
                        type="number"
                        name={"q_combination"}
                        value={this.state.q_combination}
                        onChange={e => this.setState({[e.target.name]:e.target.value})}
                        variant="outlined"
                      /><br /><br />
                    {this.state.q_combination &&
                    <React.Fragment>
                      {Array.apply(null, {length:this.state.q_combination}).map((i,index)=>{
                       return(
                         <React.Fragment key={index}>
                         <Grid container spacing={1}>
                            <Grid item xs={6} sm={6} lg={6} xl={6} md={6}>
                              <TextField
                                id={'com'+(index+1)}
                                label={'No of question for Combo'+(index+1)}
                                fullWidth
                                type="number"
                                name={"no_of_question"+(index+1)}
                                value={this.state['no_of_question'+(index+1)]}
                                onChange={e => this.setState({[e.target.name]:e.target.value})}
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item xs={6} sm={6} lg={6} xl={6} md={6}>
                              <TextField
                                id={'comb'+(index+1)}
                                label={'Unique mark for combo'+(index+1)}
                                fullWidth
                                type="number"
                                name={"mark_for_combination"+(index+1)}
                                value={this.state['mark_for_combination'+(index+1)]}
                                onChange={e => this.setState({[e.target.name]:e.target.value})}
                                variant="outlined"
                              />
                            </Grid>
                         </Grid>
                         <br />
                         </React.Fragment>
                       )})}
                       </React.Fragment>
                     }

                      </div>

                      <DialogActions>
                        <Button onClick={()=>this.setState({add_action:false,edit_action:false})} color="primary">
                          Close
                        </Button>
                        {!(this.state.edit_action) ?
                          <Button onClick={this.setCombination} color="primary" autoFocus>
                          Save
                        </Button>
                        :
                        <Button onClick={this.combinationEdit} color="primary" autoFocus>
                          Edit
                        </Button>
                       }
                      </DialogActions>
                    </Dialog>

      }
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
              <QuestionGenerate state={this.state} saveQuestion={this.saveQuestion}
              fetch={this.props.fetch} props={this.props} questions={this.state.questions} />
            </List>
          </Dialog>
        }
      </React.Fragment>
    );
   }
  }
}
