import { GET_MY_VEHICLE, GET_VEHICLE_CITY } from '../actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case GET_MY_VEHICLE:
            return action.payload || false;
        case GET_VEHICLE_CITY:
            return action.payload;
        default:
            return state
    }
}