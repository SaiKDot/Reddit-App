import { USER_INPUT_CHANGED,USER_CHAR_ERROR,USER_INPUT_SUBMITTED,USERS_RETRIEVED , USER_REMOVED } from '../actions/types';

const intial_state = { reddit_user:'', user_fetch_error:false,users:[],duplicateItem:false}

export default (state = intial_state ,actions) => {
 

	switch(actions.type) {
		case USER_INPUT_CHANGED : return {
			...state,reddit_user:actions.payload
		}
		break;

		case USER_INPUT_SUBMITTED : 
		 
			let obj = state.users.find((val) => {
			  return val.name === actions.payload.name;
			});
			if (obj) {
				 console.log('dup');
			  return {...state, duplicateItem: true };
			} else {

				 
			   return {...state,users: [...state.users, actions.payload],duplicateItem:false};
			  
			}
	    break;
	    case USERS_RETRIEVED : return {
				...state, users:actions.payload
	    }
		 
		case USER_REMOVED: 
		console.log(actions.payload)
		return {
			...state,
			users: state.users.filter(user => user.name !== actions.payload)
		}  
		  
 
		 
		break;
		default:
				return state;
	}
}