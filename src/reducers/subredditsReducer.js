import {SUB_INPUT_CHANGED, SUB_INPUT_SUBMITTED, SUBS_RETRIEVED, SUBREDDIT_REMOVED} from '../actions/types';

const intial_state = { subreddit:'', sub_fetch_error:false,subs:[],duplicateItemSub:false}


export default (state = intial_state ,actions) => {
 

	switch(actions.type)
	{
		
		case SUB_INPUT_CHANGED : return {
				...state,subreddit:actions.payload
		}

		break;
		case SUB_INPUT_SUBMITTED : 
		 
			let obj = state.subs.find((val) => {
			  return val.name === actions.payload.name;
			});
			if (obj) {
				 console.log('dup');
			  return {...state, duplicateItemSub: true };
			} else {

				 
			   return {...state,subs: [...state.subs, actions.payload],duplicateItemSub:false};
			  
			}
	    break;
	    case SUBS_RETRIEVED: return {
	    	...state, subs:actions.payload
	    }
	    break;
		case SUBREDDIT_REMOVED : return {
			...state,
				subs: state.subs.filter(sub => sub.name !== actions.payload)
		}
		break;
		default: return state

	}



}