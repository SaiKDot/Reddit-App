import {FILE_DOWNLOADED } from '../actions/types'

const initial_state = {downloads:[]}

export default (state = initial_state ,actions) => {
 

	switch(actions.type)
	{
		
		case FILE_DOWNLOADED :{

			 
			return {	...state,downloads:[...state.downloads,actions.payload] }
						
					 
					 
		} 
		break;
 

		default: return state;

	}

}



