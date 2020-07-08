import { combineReducers } from 'redux';

import auth from './authStore';

const creatRootReducer = combineReducers({
    //add imported reducer
    auth,
});

export default creatRootReducer;