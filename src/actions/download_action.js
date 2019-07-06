import {SUBREDDIT_SELECTED,EPOCH_CHANGED,USER_SELECTED,USER_EPOCH_CHANGED,FILE_DOWNLOADED} from '../actions/types'
import { ipcRenderer } from 'electron';




export const downloadSub = (sub) => {
 
	return  dispatch => {
		ipcRenderer.send('download.posts',{downloadType:'subreddit',downParam:sub})
	}
}


export const downloadUser = (user) => {
 
	return  dispatch => {
		 console.log('called download',user)
		 ipcRenderer.send('download.posts',{downloadType:'user',downParam:user})
	}
}


export const addTodDownload = (file) => {
	return {
		type:FILE_DOWNLOADED,
		payload:file
	}
}