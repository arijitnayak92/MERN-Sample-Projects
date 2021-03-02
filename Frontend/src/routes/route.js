import React ,{useState,useContext} from  "react";
import {
  Router,
  Switch,
  Route,
  Redirect,Link,
} from "react-router-dom";
import history from './history'
import Main from '../components/main'
import Dash from '../components/dashboard'
import Prod from '../components/prod'

const NotFound=()=>{
  return <>Page Not Found !</>
}

const Routedetails=()=>{
  return(
    <>
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route path="/dash" render={() => <Dash />} />
        <Route exact path="/product" render={() => <Prod />} />
        <Route exact path="/product/:id" render={() => <Prod />} />
        <Route exact path="/not-found" component={NotFound} />
      </Switch>
    </Router>
    </>
  )
}

export default Routedetails;
