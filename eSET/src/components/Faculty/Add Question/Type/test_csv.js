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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMcq=this.handleMcq.bind(this)
    this.handleTrueFalse=this.handleTrueFalse.bind(this)
    this.handleOneWord=this.handleOneWord.bind(this)
    this.handleMatch=this.handleMatch.bind(this)
    this.handleShortLong=this.handleShortLong.bind(this)


  }
  handleSubmit(event) {
    event.preventDefault()
    var s = this.state.latex
    console.log(s)
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

  // MCQ
  handleMcq(data,fileInfo){
console.log(data);
console.log(fileInfo);
      this.setState({
          mcq:data,
      })
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

      <EditableMathField
        latex={this.state.latex} // Initial latex value for the input field
        onChange={mathField => {
            this.setState({ latex: mathField.latex() })
        }}
      />
        <Button fullWidth
        style={{backgroundColor:'#009688',color:'white'}}
        onClick={this.handleSubmit}>Login</Button>

        <p>Mcq</p>

        <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.handleMcq} />

        <p>True False</p>

        <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.handleTrueFalse} />

        <p>One Word</p>

        <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.handleOneWord} />

        <p>Match</p>

        <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.handleMatch} />

        <p>Short And Long</p>

        <CSVReader parserOptions={this.papaparseOptions} onFileLoaded={this.handleShortLong} />



        </React.Fragment>

    )
  }
}
