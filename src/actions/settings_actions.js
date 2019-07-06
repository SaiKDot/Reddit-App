import { IMGUR_CL_ID_CHANGED, IMGUR_CL_SEC_CHANGED,IMGUR_INFO_RECIEVED,IMGUR_SAVED,IMGUR_SAVED_SUCCESSS,IMGUR_SAVE_FAIL, IMGUR_RETRIEVED } from '../actions/types';
const ipcRenderer = require('electron').ipcRenderer;
const Store = require('electron-store');
const store = new Store({
	name: 'config',
	cwd: 'data'
});


export const  getclientid = (text) => {

	return async dispatch => {
	
	    dispatch({type:IMGUR_CL_ID_CHANGED, payload:text});

	}
	
}

export const getClientSecret = (text) => {
	return {type:IMGUR_CL_SEC_CHANGED,payload:text}
}

// export const recieveImgurInfo = dispatch => {

//  	ipcRenderer.on('imgur_get', (event, imgurInfo) => {
//  		dispatch({type:IMGUR_INFO_RECIEVED,payload:imgurInfo})
//      })
// }


export const  imgurFormSubmit = ({client_id,client_secret}) => {
	return async dispatch => {
         // dispatch a login request to update the state
        try {
        	    const imgur_info = {client_id:client_id,client_secret:client_secret}
        	    store.set('imgur_info', imgur_info);
        	    dispatch({type:IMGUR_SAVED, payload:imgur_info})
        	    dispatch({type:IMGUR_SAVED_SUCCESSS})
             	ipcRenderer.send('IMGUR_SAVED_SUCCESSS')
        } catch (err) { // When something goes wrong
        	dispatch({type:IMGUR_SAVE_FAIL,payload:err.message})
             
             
        }
    };
	 	
}

export const imgurSettingsExists = (ii) => {
	
	return {type:IMGUR_RETRIEVED,payload:ii}
} 

 