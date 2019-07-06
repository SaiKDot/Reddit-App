import {SUBREDDIT_SELECTED, EPOCH_CHANGED} from '../actions/types'

const initial_state = {

	selected_sub:{
			 

		}
}

export default (state = initial_state ,actions) => {
 

	switch(actions.type)
	{
		
		case SUBREDDIT_SELECTED :{
			 
			return {	...state,selected_sub:actions.payload }
						
					 
					 
		} 
		break;
		 
		 case EPOCH_CHANGED :{
		 	 
		// return {	...state,...state.selected_sub,...{'endEpoch':actions.payload} }
		return  {...state, selected_sub: {...state.selected_sub,endEpoch: actions.payload } }
		  
		 			 
		 } 
		 break;

		default: return state;

	}



}


