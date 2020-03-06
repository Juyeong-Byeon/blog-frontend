import {createAction,handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
import *as authAPI from '../lib/api/auth';
import createRequestSaga,{createRequestActionTypes} from '../lib/createRequestSaga';

const TEMP_SET_USER='user/TEMP_SST_USER';
const LOGOUT='user/LOGOUT';

const [CHECK,CHECK_SUCCESS,CHECK_FAILURE]=createRequestActionTypes('user/CHECK');

export const tempSetUser=createAction(TEMP_SET_USER,user=>user);
export const check=createAction(CHECK);
export const logout=createAction(LOGOUT);

const checkSaga=createRequestSaga(CHECK,authAPI.check);

function checkFailureSaga(){
    try{
        localStorage.removeItem('user');

    }catch(e){
        console.log('localStorage is notWorking');
    }
}

export function *userSaga(){
    yield takeLatest(CHECK,checkSaga);
    yield takeLatest(CHECK_FAILURE,checkFailureSaga);
};

const initialState={
    user:null,
    checkError:null
};

export default handleActions({
    
    [TEMP_SET_USER]:(state,{payload:user})=>({
        ...state,
        user,
    }),
    [CHECK_SUCCESS]:(state,{payload:user})=>({
        ...state,
        user,
        checkError:null
    }),
    [CHECK_FAILURE]:(state,{payload:error})=>({
        ...state,
        user:null,
        checkError:error
    }),
    [LOGOUT]:(state)=>({
        ...state,
        user:null,
    }),
},initialState);





