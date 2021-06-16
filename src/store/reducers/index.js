import {combineReducers} from 'redux';
import authReducer from './auth.js';
import notificationReducer from './notifications';
import cartReducers from './cart';
import generalReducers from './general';

export default combineReducers({
	auth: authReducer,
    notifications: notificationReducer,
    cart: cartReducers,
    general: generalReducers,
});
