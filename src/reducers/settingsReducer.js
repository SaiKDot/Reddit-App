import { IMGUR_CL_ID_CHANGED, IMGUR_CL_SEC_CHANGED,IMGUR_INFO_RECIEVED, IMGUR_SAVED,IMGUR_SAVED_SUCCESSS,IMGUR_RETRIEVED,IMGUR_SAVE_FAIL } from '../actions/types';

const intial_state = { imgur_client_id:'', imgur_client_secret:'',imgur_saved_successs:false,imgur_save_error:false,imgur_save_error_message:''}

export default (state = intial_state ,actions) => {
 

	switch(actions.type) {
		case IMGUR_CL_ID_CHANGED : 
		 
		return {
			...state, imgur_client_id:actions.payload
		};
		break;
		case IMGUR_CL_SEC_CHANGED :
		return {
			...state,imgur_client_secret:actions.payload
		} 
		case IMGUR_SAVED : return {
			...state,imgur_client_id:actions.payload.client_id,imgur_client_secret:actions.payload.client_secret,imgur_saved_successs:true
		}
		
		break;
		case IMGUR_SAVED_SUCCESSS : return {
			...state, imgur_saved_successs:true,imgur_save_error_message:''
		}
		break;
		case IMGUR_SAVE_FAIL : return {
			...state, imgur_save_error:true,imgur_saved_successs:false,imgur_save_error_message:actions.payload
		}
		break
		case IMGUR_RETRIEVED : return {
			...state,imgur_client_id:actions.payload.client_id,imgur_client_secret:actions.payload.client_secret
		 }
		 break;
		default:
		return state;
	}
}