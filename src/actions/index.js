import {USER_INPUT_CHANGED,USER_CHAR_ERROR,USER_FETCH_SUCCESS,USER_FETCH_ERROR,USER_INPUT_SUBMITTED,USERS_RETRIEVED,EPOCH_CHANGED,USER_EPOCH_CHANGED}  from '../actions/types';
import {SUB_INPUT_CHANGED, SUB_INPUT_SUBMITTED, SUBS_RETRIEVED} from '../actions/types';
 
import axios from 'axios';
import { ipcRenderer } from 'electron';
import * as moment from 'moment';


 
 
const Store = require('electron-store');
import _ from 'lodash';

const store = new Store({
	name: 'users',
	cwd: 'data'
});

const subrStore = new Store({
	name: 'subreddits',
	cwd:'data'
})

export const onUserChange = (user)  => {
const user_reg = /^[a-zA-Z0-9_.-]*$/; 
if (user_reg.test(user) == 1) {
	 
 return {
	 type: USER_INPUT_CHANGED,
	 payload: user
	}
} else {
		 return {
			 type: USER_CHAR_ERROR,
			  
			}
	console.log('action','not valid');
}
	
}
 

 

const getdat = (user,epoch) => {
	let res= {};
	const sub_url = `https://api.pushshift.io/reddit/search/submission/?subreddit=${user}&limit=300&sort=desc&before=${epoch}`;
	console.log('elZK',sub_url);
  return new Promise((resolve, reject) => {
    axios.get(sub_url)
    .then(response => {
    	let d = response.data.data;
    	let e = d[d.length - 1].created_utc;
    	console.log('e',e);
    	res.data = d;
    	res.epoch = e;
      return resolve(res)
    })
    .catch(error => {
      return reject(error.message)
    })
  })
}



 


export const submitUser = (user) => {		 
   user = { name:user,dateAdded: moment().format(), active:true,endEpoch:moment().format('MM-DD-YYYY')}
	 return dispatch => {
	 	ipcRenderer.send('user:submitted', user)
	 }
		
	 
	 
		
}
export const saveUser = (user) => {
	 console.log('em',user);
	 return dispatch => {
	 	dispatch({type:USER_INPUT_SUBMITTED,payload:user})
	 	ipcRenderer.send('leftPanel:Open','ping')
	 } 
}

export const retriveUsers = () => {
	
	return dispatch => {
		let users= store.get('users')
	    
	    if(users != undefined) {
	    	dispatch({type:USERS_RETRIEVED,payload:users})
	    }
	}
	
}

export const onSubchange = (sub)  => {
const sub_reg = /^[a-zA-Z0-9_.-]*$/; 
if (sub_reg.test(sub) == 1) {
	 
 return {
	 type: SUB_INPUT_CHANGED,
	 payload: sub
	}
} else {
		 return {
			 type: SUB_CHAR_ERROR,
			  
			}
	console.log('action','not valid');
}
	
}


export const submitSubreddit = (sub) => {	
 	 
  let subreddit = { name:sub,dateAdded: moment().format('MM-DD-YYYY'), active:true, }
   // console.log('submitted',subreddit);
	 return dispatch => {
	 	ipcRenderer.send('subreddit:submitted', subreddit)
	 }		
}
 
export const saveSubreddit = (sub) => {
	  
	 return dispatch => {
	 	dispatch({type:SUB_INPUT_SUBMITTED,payload:sub})
	 	ipcRenderer.send('rightPanel:Open','ping')
	 } 
}

export const retrieveSubreddits = () => {
	console.log('called');
	return dispatch => {
		let subs= subrStore.get('subreddits')
	    
	    if(subs != undefined) {
	    	dispatch({type:SUBS_RETRIEVED,payload:subs})
	    }
	}
	
}

export const subEpochChanged = (name,day) => {
        	
		 
		return dispatch => {
			let m =moment(day).format('MM-DD-YYYY')		
			dispatch({type:EPOCH_CHANGED, payload:m})
			ipcRenderer.send('epoch:changed',{name,m})
		
		}
}


export const userEpochChanged = (user,day) => {
        	
		 
		return dispatch => {
			 console.log({user})
			let m =moment(day).format('MM-DD-YYYY')		
			dispatch({type:USER_EPOCH_CHANGED, payload:m})
			ipcRenderer.send('userepoch:changed',{user,m})
		
		}
}




 