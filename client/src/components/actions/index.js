import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, FETCH_USER } from './types';

export const signup = (formProps, callback)=> async dispatch =>{
    try{
        const response = await axios.post('http://localhost:3001/signup', formProps);
    dispatch({type: AUTH_USER, payload: response.data.token});
    localStorage.setItem('token', response.data.token);
    callback(); /* history callback */
    } catch (e){
        dispatch({type: AUTH_ERROR, payload: "Email in use"});
    }
};

export const signin = (formProps, callback)=> async dispatch =>{
    try{
        const response = await axios.post('http://localhost:3001/signin', formProps);
    dispatch({type: AUTH_USER, payload: response.data.token});
    localStorage.setItem('token', response.data.token);
    callback(); /* history callback */
    } catch (e){
        dispatch({type: AUTH_ERROR, payload: "Invalid login credentials"});
    }
};

export const fetchUser = ()=> async dispatch=>{
    const res = await axios.get("/api/current_user");
    dispatch({type: FETCH_USER, payload: res.data})
}

export const signout = ()=>{
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
}


