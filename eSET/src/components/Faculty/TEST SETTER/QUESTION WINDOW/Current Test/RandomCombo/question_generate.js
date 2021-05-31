import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';

import {  makeStyles } from '@material-ui/core/styles';
import {Paper,Grid,TableHead,Table,TableRow,TableBody,TableCell,TableContainer,TablePagination,Button,Dialog,DialogTitle,DialogActions,
  DialogContentText,DialogContent,Typography,
} from '@material-ui/core';

export default class GenerateQuestions extends Component {
  constructor()
  {
    super()
    this.state={
      fetching: true,
      generateset:[],
      finalarray:[],
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount()
  {
    if(this.props.props.refer_data.questions.length>0)
    {
      this.setState({generateset:this.props.props.refer_data.questions,fetching:false})
    }
    else {
      this.fetchQuestions();
    }
  }

  fetchQuestions=()=>{
    axios.post('/etest/user/fetch_questions',{action:'question_set',username:this.props.props.username,
    course_id:this.props.props.props_data.state.course_id})
    .then( res => {
        this.generateQ(res.data);
    })
    .catch( err => {

    });
  }
  generateQ=(data)=>{
    let questionSet = [];
  this.props.state.combination.map(row=>{
      row.setdata.map(content=>{
        let questions=[];
      //  console.log(content.mark_for_combination);
         questions =  data.filter(item=>((item.question_type ===  row.question_type)
         && (item.mark === parseInt(content.mark_for_combination))
          && (item.level ===  row.level)));
        //  console.log(questions);
         let n =parseInt(content.no_of_question);
         var result = new Array(n),
             len = questions.length,
             taken = new Array(len);
           while (n --)
           {
               var x = Math.floor(Math.random() * len);
               result[n] = questions[x in taken ? taken[x] : x];
               taken[x] = --len in taken ? taken[len] : len;
           }
         questionSet.push(result);
      })
    })
    let lastset= [];
    questionSet.map(row=>{
      row.map(content=>{
        lastset.push(content.serial);
      })
    })

    this.setState({generateset:questionSet,finalarray:lastset,fetching:false})
  }
  saveSetup=()=>{
    this.setState({fetching:true})
    axios.post('/etest/user/save_random_testsetup',{data:this.state,props_data:this.props.props.props_data,
      refer_data:this.props.props.refer_data,question_setup:this.props.props.question_setup})
    .then( res => {
      this.setState({fetching:false})
    })
    .catch( err => {
      this.setState({fetching:false})
    })
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
     //console.log(this.state);
      return (
        <React.Fragment>
        <Button variant="contained" color="secondary" style={{float:'right',padding:'10px'}}
        disabled={this.props.props.refer_data.questions.length>0 ? true : false}
         onClick={this.saveSetup}>Save the Whole Setup</Button>
        <br /><br />
        <Grid container spacing={1}>
          {this.state.generateset.map((content,index)=>{
            return(
              <Grid item xs={12} sm={12} lg={12} xl={12} md={12} key={index}>
                <EnhancedTable data={content}/>
              </Grid>
            )
          })}
        </Grid>
        </React.Fragment>
      );
    }
  }
}




function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
           <TableCell align="center" padding="none">Question</TableCell>
            <TableCell align="center" padding="none">Options</TableCell>
           <TableCell align="center" padding="none">Option B</TableCell>
           <TableCell align="center" padding="none">Answers</TableCell>
           <TableCell align="center" padding="none">Answer</TableCell>
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
};
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: '100%',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

 function EnhancedTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [option, setData] = React.useState({
    modal_open:false,
    data:'',
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
console.log(props.data);
console.log(props.data.length);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
            {option.modal_open &&
              <Dialog
              fullWidth
                open={option.modal_open}
                keepMounted
                onClose={()=>setData({modal_open:false})}
                 aria-labelledby="scroll-dialog-title"
                 aria-describedby="scroll-dialog-description"
               >
                 <DialogTitle id="scroll-dialog-title" align="center">Options</DialogTitle>
             <DialogContent >
                   <DialogContentText
                     id="scroll-dialog-description"
                     tabIndex={-1}
                   >
                     {(option.data.options.length>0 && (!option.data.answers.length>0)) &&
                       <React.Fragment>
                         {option.data.options.map((content,index)=>{
                           return(
                             <React.Fragment key={index}>
                               Option {index+1} - {content} <br />
                             </React.Fragment>
                           )
                         })}
                       </React.Fragment>
                     }
                     <br />

                     {(option.data.answers.length>0 && option.data.optionBs.length>0 ) &&
                       <React.Fragment>
                        <Grid container spacing={1}>
                          <Grid item xs={6} sm={6}>
                            <Typography align="center">PartA</Typography><br />
                              {option.data.options.map((content,index)=>{
                                return(
                                  <React.Fragment key={index}>
                                   {content} <br />
                                  </React.Fragment>
                                )
                              })}
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <Typography align="center">PartB</Typography><br />
                              {option.data.optionBs.map((content,index)=>{
                                return(
                                  <React.Fragment key={index}>
                                   {content} <br />
                                  </React.Fragment>
                                )
                              })}
                          </Grid>
                        </Grid><br />
                        <Grid container spacing={1}>
                               {option.data.answers.map((content,index)=>{
                                 return(
                                   <Grid item xs={3} sm={3} lg={3} xl={3} md={3} key={index}>
                                     Answer{index+1} - {content}</Grid>
                                 )
                               })}
                         </Grid>
                       </React.Fragment>
                     }


                   </DialogContentText>
              </DialogContent>
            <DialogActions>
            <Button onClick={()=>setData({modal_open:false})} color="primary">
              CLOSE
            </Button>
            </DialogActions>
          </Dialog>
        }
      <Paper elevation={3} className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              data={props.data}
              rowCount={props.data.length}
            />
            <TableBody>
              {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell align="center" padding="none">{row.question ? <React.Fragment> {row.question} </React.Fragment> : "NULL" }</TableCell>
                      <TableCell align="center" padding="none">{row.options.length>0 ? <InfoIcon
                        onClick={()=>setData({modal_open:true,data:row})}  /> : "NULL"}</TableCell>
                      <TableCell align="center" padding="none">{row.optionBs.length>0 ? <InfoIcon onClick={()=>setData({modal_open:true,data:row})} /> : "NULL" }</TableCell>
                      <TableCell align="center" padding="none">{row.answers.length>0 ? <InfoIcon onClick={()=>setData({modal_open:true,data:row})}  /> : "NULL" }</TableCell>
                      <TableCell align="center" padding="none">{row.answer ? <React.Fragment> {row.answer} </React.Fragment> : "NULL" }</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
