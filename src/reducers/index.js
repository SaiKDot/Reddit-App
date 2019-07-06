import { combineReducers } from 'redux';

 import uiReducer from './uiReducer';
  import settingsReducer from './settingsReducer';
 import userReducer from './userReducer';
 import subredditsReducer from './subredditsReducer';
 import subredditoptionsReducer from './subredditoptionsReducer'
 import userOptionsReducer from './userOptionsReducer'
 import DownloadsReducer from './DownloadsReducer'
export  default combineReducers({
	uis: uiReducer,
	settings: settingsReducer,
	users:userReducer,
	subreddits:subredditsReducer,
	suboptions:subredditoptionsReducer,
	useroptions:userOptionsReducer,
	downloads:DownloadsReducer
})