import React, {Component} from 'react';
import { BrowserRouter,HashRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";

import Panels from "./Panels";
import AddUserForm from './AddUserForm';
import AddSubredditForm from './AddSubredditForm';
import ImgurPage from './ImgurPage';
import DownloadPage from './DownloadPage'



import {imgurSettingsExists} from '../actions/settings_actions';

const Store = require('electron-store');
const config_data = new Store({
  name: 'config',
  cwd: 'data'
});

const ipcRenderer = require('electron').ipcRenderer;


const PageTwo = () => {
	return   'Page 2'  ;
}


class App extends Component {
	componentDidMount()
	{
		let imgur_info = config_data.get('imgur_info')
		if(imgur_info !== undefined) {
		  
		  this.props.imgurSettingsExists(imgur_info) 
		}  
	}
render() {
	return (
	 <div>
	 	<HashRouter>
	 	<div>
	 		<Route path="/" exact component={Panels}/>
	 		<Route path="/adduser" component={AddUserForm}/>
	 		<Route path="/imgur-settings" component={ImgurPage}/>
	 		<Route path="/addsubreddit" component={AddSubredditForm}/>
	 		<Route path="/download" component={DownloadPage}/>
	 	</div>
	 	</HashRouter>
	 </div>
	);
}   

}		

export default connect(null,{imgurSettingsExists})(App);
 