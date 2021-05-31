import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Switch } from 'react-router-dom' //don't need to specify localhost url in axios http address'
import './index.css';


ReactDOM.render(
	<BrowserRouter>
    <Switch>
    	<App />
    </Switch>
	</BrowserRouter>,
	document.getElementById('root')
)
