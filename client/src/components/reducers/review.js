import { GET_REVIEW, REVIEW_ERROR} from '../actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case GET_REVIEW:
            return action.payload;
        case REVIEW_ERROR:
            return action.payload;
        default:
            return state
    }
}