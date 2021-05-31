import { Grid, Paper } from '@material-ui/core';
import React, { Component } from 'react';
import Choice from './Choice Based/choice';
import Random from './RandomCombo/random';



export default class componentName extends Component {
  constructor()
  {
    super()
    this.state={
      isChecked:0,
      active:0,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount()
  {
    if(this.props.refer_data.question_setup)
    {
      this.setState({active:this.props.refer_data.question_setup})
    }
  }
  handleComp = (e) =>{
    this.setState({
      isChecked: e,
    })
    if (this.state.active === e) {
      this.setState({active : null})
    } else {
      this.setState({active : e})
    }
  }

  color =(position) =>{
    if (this.state.active === position) {
        return "#f73378";
      }
      return "#9e9e9e";
  }

  render() {

    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={2} sm={2} lg={4} xl={4} md={4}/>
          <Grid container item xs={8} sm={8} lg={4} xl={4} md={4} spacing={1}>
            <Grid item xs={6} sm={6}>
              <Paper  style={{backgroundColor:this.color(0),textAlign:'center',color:'white',padding:'8px',cursor:'pointer'}}
              onClick={(e)=>{this.handleComp(0)}}>Random Layout</Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper style={{backgroundColor:this.color(1),textAlign:'center',padding:'8px',color:'white',cursor:'pointer'}}
              onClick={(e)=>{this.handleComp(1)}}>SetUp Layout</Paper>
            </Grid>
          </Grid>
          <Grid item xs={2} sm={2} lg={4} xl={4} md={4} />
        </Grid>
        {this.state.active === 0 ?
           <Random props_data={this.props.props_data} username={this.props.username} fetch={this.props.fetch} refer_data={this.props.refer_data} question_setup={this.state.active} />
           :
           <Choice props_data={this.props.props_data} username={this.props.username} fetch={this.props.fetch} refer_data={this.props.refer_data} question_setup={this.state.active} />
        }
      </React.Fragment>
    );
  }
}
