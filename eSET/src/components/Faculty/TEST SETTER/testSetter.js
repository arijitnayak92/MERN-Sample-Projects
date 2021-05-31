import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import QuestionWindow from './questionWindow';



export default class SetUpWindow extends Component {
  constructor()
  {
    super()
    this.state={
      type:'',
      username:'',
      layout:'',
    }
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
       <Typography align="center" variant="h5">Setup Seat Environment</Typography><br />
         <Grid container spacing={2} style={{padding:'15px'}}>
             <Grid item sm={6} xs={6} lg={6} xl={6} md={6}>
                <Paper elevation={3} style={{padding:'5px'}}>
                   <FormControl style={{width:'100%'}}>
                     <InputLabel id="type">Type of Seat Arrangement</InputLabel>
                       <Select
                         labelId="type"
                         id="type"
                         name="type" value={this.state.type} onChange={(e)=>this.setState({type:e.target.value})}
                       >
                       <MenuItem value="Only MCQ">Arrangement For Larger Community</MenuItem>
                       <MenuItem value="Only SAQ">Arrangement For Schools</MenuItem>
                       <MenuItem value="Only Coding Type">Arrangement For Colleges</MenuItem>
                       <MenuItem value="Mix Question">Random Set</MenuItem>
                       </Select>
                    </FormControl>
                 </Paper>
             </Grid>
             <Grid item sm={6} xs={6} lg={6} xl={6} md={6}>
               {this.state.type &&
                 <React.Fragment>
                     {this.state.type === ('Only MCQ' || 'Only SAQ' || 'Only Coding Type') ?
                       <Paper elevation={3} style={{padding:'5px'}}>
                         <FormControl style={{width:'100%'}}>
                           <InputLabel id="layout">Choose a Layout for the arrangement</InputLabel>
                             <Select
                               labelId="layout"
                               id="layout"
                               name="layout" value={this.state.layout} onChange={(e)=>this.setState({layout:e.target.value})}
                             >
                             <MenuItem value="one">Automate The Layout</MenuItem>
                             <MenuItem value="random">Custom Data Iput</MenuItem>
                             </Select>
                          </FormControl>
                       </Paper>
                        :
                        <React.Fragment>
                        </React.Fragment>
                     }
                 </React.Fragment>
               }
             </Grid>
         </Grid>
         {this.state.type &&
           <React.Fragment>
               {/* {this.state.type === ('Only MCQ' || 'Only SAQ' || 'Only Coding Type') ?
                   <React.Fragment>
                     {this.state.layout &&
                       <QuestionWindow type={this.state.type} username={this.props.state.username} props_data={this.props}
                        layout={this.state.layout} />
                     }
                   </React.Fragment>
                  : */}
                  <React.Fragment>
                    <QuestionWindow type={this.state.type}  username={this.props.state.username}  props_data={this.props}
                     layout={'random'} />
                  </React.Fragment>
               {/* } */}
           </React.Fragment>
         }
      </React.Fragment>
    );
  }
}
