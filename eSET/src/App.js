import pink from '@material-ui/core/colors/pink';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminPanel from './components/Admin/admin_panel';
import CoAdmin from './components/Admin/co-admin-validate';
import Question from './components/Faculty/Add Question/add_questions';
import Dash from './components/Faculty/Dashboard/dash';
import Faculty from './components/Faculty/flogin';
import Student from './components/Student/slogin';
import TestLayout from './components/Student/TEST/testlayout';
import Initial from './Navigator';



class App extends Component {
  constructor() {
    super()
    this.state = {
      themeType:'light',
    }
  }

changeTheme=()=>{
  if(this.state.themeType ==='dark')
  {
    this.setState({themeType:'light'})
  }
  else {
    this.setState({themeType:'dark'})
  }
}
  render() {
    let THEME = createMuiTheme({
      palette:{
        primary:{
          light: "#7986cb",
          main: "#3f51b5",
          dark: "#303f9f"
        },
        secondary:{
          light:pink[500],
          main:pink[500],
          dark:pink[500],
        },
        type:this.state.themeType
      },
      typography: {
      "fontFamily": "Play",
      }
});
THEME = responsiveFontSizes(THEME);

    return (
      <MuiThemeProvider theme={THEME}>
      <CssBaseline />

      <React.Fragment>
      <Switch>
        <Route exact path="/" render={() =>
            <Initial
          />}
        />
        <Route exact path="/etest/faculty" render={() =>
            <Faculty
          />}
        />
        <Route exact path="/etest/student" render={() =>
            <Student
          />}
        />
        <Route path="/etest/dashboard" render={() =>
            <Dash
          />}
        />
        <Route path="/etest/test" render={() =>
            <TestLayout
          />}
        />
        <Route path="/etest/add_question" render={() =>
            <Question
          />}
        />
        <Route path="/etest/admin" render={() =>
            <AdminPanel
          />}
        />
        <Route path="/etest/valid_campus_admin" render={() =>
            <CoAdmin
          />}
        />
      </Switch>

      <div style={{position:'fixed',bottom: 0,left: 0,padding:'10px'}} onClick={this.changeTheme} >
            {this.state.themeType ==='dark' ? <Brightness3Icon /> : <Brightness5Icon /> }
         </div>
      </React.Fragment>
      </MuiThemeProvider>

    );
  }
}

export default App;
