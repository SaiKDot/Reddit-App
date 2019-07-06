import {USER_SELECTED, USER_EPOCH_CHANGED}  from '../actions/types'

const initial_state = {

	 selected_user:{}
}

export default (state = initial_state ,actions) => {
 

	switch(actions.type)
	{
		
		case USER_SELECTED :{
			 
			return {	...state,selected_user:actions.payload }
						
					 
					 
		} 
		break;
		 
		 case USER_EPOCH_CHANGED :{
		 	 
		// return {	...state,...state.selected_sub,...{'endEpoch':actions.payload} }
		return  {...state, selected_user: {...state.selected_user,endEpoch: actions.payload } }
		  
		 			 
		 } 
		 break;

		default: return state;

	}



}