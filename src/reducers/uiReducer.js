import { LEFT_TOGGLE, RIGHT_TOGGLE,OPEN_LEFT,OPEN_RIGHT } from '../actions/types';

const intial_state = { left_open:false, right_open:false,right_hide:false,left_hide:false }

export default (state = intial_state ,actions) => {
 

	switch(actions.type) {
		case LEFT_TOGGLE : 
		 
		return {
			...state,left_open:!state.left_open,right_hide:!state.right_hide
		};
		break;
		case RIGHT_TOGGLE :
		return {
			...state,right_open:!state.right_open,left_hide:!state.left_hide
		} 
		break;
		case OPEN_LEFT: 
		return {
			...state,right_open:false,left_hide:false,left_open:true,right_hide:true
		 }
		break;
		case OPEN_RIGHT:
		return {
			...state,right_open:true,left_hide:true,left_open:false,right_hide:false
		}
		default:
		return state
	}
}
  