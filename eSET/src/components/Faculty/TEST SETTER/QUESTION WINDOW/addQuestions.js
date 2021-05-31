import { AppBar, Tab, Tabs } from '@material-ui/core';
import React, { Component } from 'react';
import CurrentWindow from './Current Test/current_window';
import StudentsResult from './Student Result/student_result';


export default class Questions extends Component {
  constructor()
  {
    super()
    this.state={
      value:0,
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount()
  {

  }
  render() {

    return (
      <React.Fragment>
        <AppBar position="static" color="default">
         <Tabs
           value={this.state.value}
           indicatorColor="primary"
           textColor="primary"
           variant="fullWidth"
           aria-label="full width tabs example"
         >
           <Tab label="Setup Layout For Current Pattern" onClick={(e)=>this.setState({value:0})}  />
           <Tab label="Associated Attende For Current Layout" onClick={(e)=>this.setState({value:1})} />
         </Tabs>
        </AppBar><br />
        {this.state.value === 0 ?
          <CurrentWindow props_data={this.props.props_data} username={this.props.username} fetch={this.props.fetch} refer_data={this.props.refer_data} />
          :
          <StudentsResult username={this.props.username}  fetch={this.props.fetch}  props_data={this.props.props_data}  />
        }
      </React.Fragment>
    );
  }
}
