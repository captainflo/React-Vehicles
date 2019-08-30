import { EDIT_RESERVATION, RESERVATION_ERROR, GET_MY_RESERVATION, GET_MY_RESERVATION_OF_MY_VEHICLE } from '../actions/types';
const INITIAL_STATE = {
    reservation: '',
    reservationOfMyVehicle: '',
    errorMessage: ''
};
export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case EDIT_RESERVATION:
            return {...state, reservation: action.payload};
        case GET_MY_RESERVATION:
            return {...state, reservation: action.payload};
        case RESERVATION_ERROR:
            return action.payload;
        case GET_MY_RESERVATION_OF_MY_VEHICLE:
            return {...state, reservationOfMyVehicle: action.payload};
        default:
            return state
    }
}