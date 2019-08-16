import { combineReducers } from 'redux';
import auth from './auth';
import vehicle from './vehicle';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: auth,
    form: formReducer,
    vehicles: vehicle
});