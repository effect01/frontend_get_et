import {combineReducers} from 'redux';
import authReducer from './auth.js';
import notificationReducer from './notifications';
import cartReducers from './cart';

export default combineReducers({
	auth: authReducer,
    notifications: notificationReducer,
    cart: cartReducers,
});
