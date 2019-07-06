import React from 'react';
import {addTodDownload} from "../actions/download_action"; 
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
const ipcRenderer = require('electron').ipcRenderer;

import '../component_styles/downloadpage.css'


class DownloadPage extends React.Component {
 
	constructor(props)
	 {
	 	super(props)
	 	ipcRenderer.on('downloading', function (event, arg) {
	 		 
	 		  
	 		  props.addTodDownload(arg)
	 	    // dispatch({type:USER_INPUT_SUBMITTED,payload:arg})
	 	})

	 }

 renderDownloadList()
 {
 			 console.log(this.props)
 	      let downloadlist = this.props.downloads.map((val,key) => {
 	 		
 	 		return <h6 key={key}   sub={val} >File:  {val}  ----Downloaded</h6>

 	      });
 	      return downloadlist;
 }




	render() {
		 console.log(this.props.downloads)
		return (
			<div className="list">
				 { this.renderDownloadList()  }
				<svg className="arrow history--left" width="40" height="40" viewBox="0 0 24 24" onClick={() => this.props.history.push('/')} ><path d="M0 0h24v24h-24z" fill="none"/><path d="M20 11h-12.17l5.59-5.59-1.42-1.41-8 8 8 8 1.41-1.41-5.58-5.59h12.17v-2z"/></svg>
			</div>

		
		);
	}   

}

const mapStateToProps = state => {
  return {
    downloads : state.downloads.downloads,    
    
  }
}

export default withRouter(connect(mapStateToProps,{addTodDownload})(DownloadPage));
