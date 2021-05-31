import React, { Component } from 'react';
import axios from 'axios';
import {  Redirect} from 'react-router-dom';
import {
  Select,MenuItem,FormControl,Paper,InputLabel,Grid,TextField,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Nav from '../../dynnav'


import MultipleChoice from './Type/option_type';
import SAQ from './Type/saq_type';
import TF from './Type/true_false';
import Image from './Type/image-based';
import MTF from './Type/match-following';
import Coding from './Type/coding_type';
import Weq from './Type/write_equation';

export default class SetUpWindow extends Component {
  constructor()
  {
    super()
    this.state={
      question_type:'',
      username:'',
      loading:true,
      skill_name:'',
      level:'',
      redirectTo:'',
      course_id:'',
      home:'/etest/faculty',
      logout:'/etest/user/logout',
      login:'/etest/flogin',
      get:'/etest/user/',
      noti_route:true,
      nav_route: '/ework/user/fetchnav',
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount()
  {
    axios.get('/etest/user/')
    .then( res => {
          if (res.data.user) {
            this.setState({
                username:res.data.user.username,
            })
            this.fetchSkills();
          }
          else {
            this.setState({redirectTo:this.state.home})
          }
    });
  }

  fetchSkills=()=>{
    axios.get('/etest/user/fetch_skills')
    .then( res => {
      //console.log(res.data);
        this.setState({saved_skill:res.data,loading:false})
    })
    .catch( err => {
        this.setState({loading:false})
    });
  }
  setSkill=(e)=>{
    if(e === null)
    {

    }
    else
    {
      this.setState({skill_name:e.skill_name,course_id:e.course_id})
    }
  }

  render() {
    if(this.state.loading)
    {
      return(
        <div style={{textAlign:'center'}}>Loading....</div>
      )
    }
    else
    {
      if (this.state.redirectTo) {
           return <Redirect to={{ pathname: this.state.redirectTo }} />
       } else {
      const options = this.state.saved_skill.map(option => {
        const firstLetter = option.course_id[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });
      if(options.length  === 0)
      {
        return(
          <div>Oops !! You can not add questions...</div>
        )
      }
      else
      {
    return (
      <React.Fragment>
      <Nav noti_route={this.state.noti_route} login={this.state.login}
      home={ this.state.home} nav_route={this.state.nav_route} get={this.state.get}
      logout={this.state.logout}/>
      <br /><br /><br /><br />
          <Grid container>
            <Grid item xs={4} sm={4} style={{padding:'4px'}}>
               <Paper elevation={2} style={{padding:'20px'}}>
                   <Autocomplete
                     id="grouped-demo"
                     options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                     groupBy={option => option.firstLetter}
                     getOptionLabel={option => option.course_id+" ["+option.skill_name+"]"}
                     onChange={(event, value) => this.setSkill(value)}
                     style={{ width: '100%' }}
                     renderInput={params => (
                       <TextField {...params} label="Select Skill By Course Id" variant="outlined" fullWidth />
                     )}
                   />
               </Paper>
            </Grid>
            <Grid item xs={4} sm={4} style={{padding:'4px'}}>
                      <Paper elevation={2} style={{padding:'20px'}}>
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
                        </FormControl>
                      </Paper>
            </Grid>
            <Grid item xs={4} sm={4} style={{padding:'4px'}}>
            {(this.state.level && this.state.skill_name) &&
              <Paper elevation={3} style={{padding:'5px'}}>
                 <FormControl style={{width:'100%'}}>
                   <InputLabel id="type">Type of questions</InputLabel>
                     <Select
                       labelId="type"
                       id="type"
                       name="type" value={this.state.question_type} onChange={(e)=>this.setState({question_type:e.target.value})}
                     >
                     <MenuItem value="Choose From Options">Choose From Options</MenuItem>
                     <MenuItem value="Write Answers">Write Answers</MenuItem>
                     <MenuItem value="True-False">True-False</MenuItem>
                     <MenuItem value="Match the Following">Match the Following</MenuItem>
                     <MenuItem value="Write Equation">Write Equation</MenuItem>
                     <MenuItem value="Image Based">Image Based</MenuItem>
                     <MenuItem value="Coding Questions">Coding Questions</MenuItem>
                     </Select>
                  </FormControl>
               </Paper>
               }
            </Grid>
      </Grid>

       {this.state.question_type === 'Choose From Options' && <MultipleChoice state={this.state} />}
       {this.state.question_type === 'Write Answers' && <SAQ state={this.state} />}
       {this.state.question_type === 'True-False' && <TF state={this.state} />}
       {this.state.question_type === 'Match the Following' && <MTF state={this.state} />}
       {this.state.question_type === 'Write Equation' && <Weq state={this.state} />}
       {this.state.question_type === 'Image Based' && <Image state={this.state} />}
       {this.state.question_type === 'Coding Questions' && <Coding state={this.state} />}

      </React.Fragment>
    );
   }
   }
  }
  }
}
