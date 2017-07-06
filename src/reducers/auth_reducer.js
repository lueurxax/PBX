/**
 * Created by xax on 23.02.2017.
 */
import {AUTH_USER,UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from '../actions/types';

export default function (state = {},action) {
    switch (action.type){
        case AUTH_USER:
            return {...state, error:'', authenticated: true};
        case  UNAUTH_USER:
            return {...state, authenticated: false,message:''};
        case  AUTH_ERROR:
            console.log(action.payload);
            return {...state, error: action.payload};
        case FETCH_MESSAGE:
            return {...state, message: action.payload}
    }
    return state;
}