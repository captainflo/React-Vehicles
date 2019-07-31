import { combineReducers } from 'redux';
import auth from './auth';
import authReducer from './authReducers';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';

export default combineReducers({
    auth: auth,
    authReducer: authReducer,
    form: formReducer,
    users: userReducer
});