import {SUBREDDIT_SELECTED,EPOCH_CHANGED,USER_SELECTED,USER_EPOCH_CHANGED,SUBREDDIT_REMOVED,USER_REMOVED} from '../actions/types'


export const setSelectedSub = (sub) => {
	 return  {
	 type: SUBREDDIT_SELECTED,
	 payload: sub
	}
}

export const setSelectedUser = (sub) => {
	 return  {
	 type: USER_SELECTED,
	 payload: sub
	}
}

export const removeSubreddit = (sub) => {
	return {
		type: SUBREDDIT_REMOVED,
		payload:sub.name
	}	
}


export const removeUser = (user) => {
	 console.log('sd')
	return {
		type: USER_REMOVED,
		payload:user.name
	}
}