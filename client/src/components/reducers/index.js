import { combineReducers } from 'redux';
import auth from './auth';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';

export default combineReducers({
    auth: auth,
    form: formReducer,
    users: userReducer
});