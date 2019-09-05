import { GET_REVIEW, REVIEW_ERROR} from '../actions/types';
const INITIAL_STATE = {
    review:'',
    error:''
};
export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case GET_REVIEW:
            return {...state , review: action.payload };
        case REVIEW_ERROR:
            return  {...state , error: action.payload };
        default:
            return state
    }
}