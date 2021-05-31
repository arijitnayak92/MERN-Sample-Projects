import React from 'react'
import { addStyles, EditableMathField } from 'react-mathquill'
import
{Dialog,Button,Grid,DialogActions,
  Divider,DialogContent,DialogTitle,
  Snackbar,Zoom,TextField
} from '@material-ui/core';
import ReactFileReader from 'react-file-reader';
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert';
import CSVReader from 'react-csv-reader'



addStyles()
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default class Math extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      latex: '',
      data:'',
      mcq:'',
      truefalse:'',
      oneword:'',
      match:'',
      shortlong:'',
      snack_open:false,
      alert_type:'',
      snack_msg:'',
      flag:'',
    }
    this.handleMcq=this.handleMcq.bind(this)
    this.handleTrueFalse=this.handleTrueFalse.bind(this)
    this.handleOneWord=this.handleOneWord.bind(this)
    this.handleMatch=this.handleMatch.bind(this)
    this.handleShortLong=this.handleShortLong.bind(this)
  }

    papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(/\W/g, '_')
  }

  setData=(data,fileInfo)=>{
    this.setState({
        data:data,
    })
  }
  submit=()=>{
    //console.log(this.state);
    if(this.props.action ==='option_type')
    {
          let total =0;
            for(var i=0;i<this.state.data.length;i++)
            {
              console.log(this.state.data[i]);
                if(!(this.state.data[i].question) || !(this.state.data[i].answer))
                {
                  return ;
                }
                else {
                  let count=0;
                  for(var j=1;j<=this.state.data[i].no_of_option;j++)
                  {
                    if(this.state.data[i]['option'+j])
                    {
                      count++;
                    }
                  }
                  if(count ===  this.state.data[i].no_of_option)
                  {
                    total++;
                  }
                }
            }
            if(total ===  this.state.data.length)
            {
              for(var m=0;m<this.state.data.length;m++)
              {
                let data = [];
                for(var k=1;k<=this.state.data[m].no_of_option;k++)
                {
                  data.push(this.state.data[m]['option'+k]);
                }
                let dataset={
                  skill_name:this.props.state.skill_name,
                  course_id:this.props.state.course_id,
                  username: this.props.username,
                  level:this.props.state.level,
                  mark:1,
                  question_type:this.props.state.question_type,
                  question: this.state.data[m].question,
                  no_of_option: this.state.data[m].no_of_option,
                  options:data,
                  answer: this.state.data[m].answer,
                }
                //console.log(dataset);
                this.props.onFormSubmit(dataset);
              }
            }
            else {
              this.setState({
                  snack_open:true,
                  snack_msg:"Error in dataset !!",
                  alert_type:'error',
              });
            }
    }
    else {

    }
}


  handleMcq(data){

    for(var i=0;i<this.state.mcq.length;i++){
        axios.post('/user/mcq_upload', {
            question: this.state.mcq[i].question,
            option1: this.state.mcq[i].option1,
            option2: this.state.mcq[i].option2,
            option3: this.state.mcq[i].option3,
            option4: this.state.mcq[i].option4,
            answer: this.state.mcq[i].answer,
        })
        .then(response => {
            if(response.status===200){
                if(response.data.emsg)
                {
                    this.setState({
                        snack_open:true,
                        snack_msg:response.data.emsg,
                        alert_type:'info',
                    })
              }
                else if(response.data==='ok')
                {
                    this.setState({
                            verify_modal:true,
                    })
                }
                else if(response.data.succ)
                {
                    this.setState({
                        snack_open:true,
                        snack_msg:"Successfully Uploaded ",
                        alert_type:'success',
                    });
                }
            }
        }).catch(error => {
        this.setState({
              snack_open:true,
              snack_msg:'Something Went Wrong !!',
              alert_type:'error',
          })
        })
    }
  }

// TrueFalse
  handleTrueFalse(data,fileInfo){

    this.setState({
        truefalse:data,
    })
  for(var i=0;i<this.state.truefalse.length;i++){
      axios.post('/user/truefalse_upload', {
          question: this.state.truefalse[i].question,
          option1: this.state.truefalse[i].option1,
          option2: this.state.truefalse[i].option2,
          answer: this.state.truefalse[i].answer,
      })
      .then(response => {
          if(response.status===200){
              if(response.data.emsg)
              {
                  this.setState({
                      snack_open:true,
                      snack_msg:response.data.emsg,
                      alert_type:'info',
                  })
            }
              else if(response.data==='ok')
              {
                  this.setState({
                          verify_modal:true,
                  })
              }
              else if(response.data.succ)
              {
                  this.setState({
                      snack_open:true,
                      snack_msg:"Successfully Uploaded ",
                      alert_type:'success',
                  });
              }
          }
      }).catch(error => {
      this.setState({
            snack_open:true,
            snack_msg:'Something Went Wrong !!',
            alert_type:'error',
        })
      })
  }
}

// OneWord

handleOneWord(data,fileInfo){

  this.setState({
      oneword:data,
  })
for(var i=0;i<this.state.oneword.length;i++){
    axios.post('/user/oneword_upload', {
        question: this.state.oneword[i].question,
        answer: this.state.oneword[i].answer,
    })
    .then(response => {
        if(response.status===200){
            if(response.data.emsg)
            {
                this.setState({
                    snack_open:true,
                    snack_msg:response.data.emsg,
                    alert_type:'info',
                })
          }
            else if(response.data==='ok')
            {
                this.setState({
                        verify_modal:true,
                })
            }
            else if(response.data.succ)
            {
                this.setState({
                    snack_open:true,
                    snack_msg:"Successfully Uploaded ",
                    alert_type:'success',
                });
            }
        }
    }).catch(error => {
    this.setState({
          snack_open:true,
          snack_msg:'Something Went Wrong !!',
          alert_type:'error',
      })
    })
}
}

// Match The Following
handleMatch(data,fileInfo){

  this.setState({
      match:data,
  })
for(var i=0;i<this.state.match.length;i++){
    axios.post('/user/match_upload', {
        left1: this.state.match[i].left1,
        left2: this.state.match[i].left2,
        left3: this.state.match[i].left3,
        left4: this.state.match[i].left4,
        left5: this.state.match[i].left5,
        right1: this.state.match[i].right1,
        right2: this.state.match[i].right2,
        right3: this.state.match[i].right3,
        right4: this.state.match[i].right4,
        right5: this.state.match[i].right5,
        answer1: this.state.match[i].answer1,
        answer2: this.state.match[i].answer2,
        answer3: this.state.match[i].answer3,
        answer4: this.state.match[i].answer4,
        answer5: this.state.match[i].answer5,
    })
    .then(response => {
        if(response.status===200){
            if(response.data.emsg)
            {
                this.setState({
                    snack_open:true,
                    snack_msg:response.data.emsg,
                    alert_type:'info',
                })
          }
            else if(response.data==='ok')
            {
                this.setState({
                        verify_modal:true,
                })
            }
            else if(response.data.succ)
            {
                this.setState({
                    snack_open:true,
                    snack_msg:"Successfully Uploaded ",
                    alert_type:'success',
                });
            }
        }
    }).catch(error => {
    this.setState({
          snack_open:true,
          snack_msg:'Something Went Wrong !!',
          alert_type:'error',
      })
    })
}
}

// Short and long

handleShortLong(data,fileInfo){

  this.setState({
      shortlong:data,
  })
for(var i=0;i<this.state.shortlong.length;i++){
    axios.post('/user/shortlong_upload', {
        question: this.state.shortlong[i].question,
    })
    .then(response => {
        if(response.status===200){
            if(response.data.emsg)
            {
                this.setState({
                    snack_open:true,
                    snack_msg:response.data.emsg,
                    alert_type:'info',
                })
          }
            else if(response.data==='ok')
            {
                this.setState({
                        verify_modal:true,
                })
            }
            else if(response.data.succ)
            {
                this.setState({
                    snack_open:true,
                    snack_msg:"Successfully Uploaded ",
                    alert_type:'success',
                });
            }
        }
    }).catch(error => {
    this.setState({
          snack_open:true,
          snack_msg:'Something Went Wrong !!',
          alert_type:'error',
      })
    })
}
}





  render() {
    return (
        <React.Fragment>
        <Snackbar
		        open={this.state.snack_open} autoHideDuration={2000}
		        onClose={()=>this.setState({snack_open:false})}>
			    <Alert onClose={()=>this.setState({snack_open:false})}
			    severity={this.state.alert_type}>
				{this.state.snack_msg}
			    </Alert>
		        </Snackbar>

            <Dialog
              open={this.props.open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">CSV File Upload</DialogTitle>
              <DialogContent>
                {this.props.action  === 'option_type' &&
                 <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.setData} />
                }
                {this.props.action  === 'true_false' &&
                <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.setData} />
                }
                {this.props.action  === 'one_word' &&
                <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.setData} />
                }
                {this.props.action  === 'match_following' &&
                <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.setData} />
                }

                {this.props.action  === 'short_long' &&
                <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.setData} />
                }
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>this.setState({confirm:false,options:''})} color="primary">
                  Disagree
                </Button>
                <Button color="primary" autoFocus onClick={this.submit}>
                  Upload
                </Button>
              </DialogActions>
            </Dialog>
        </React.Fragment>

    )
  }
}
