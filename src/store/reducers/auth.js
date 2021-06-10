const initState = {
	token: null,
	profile: null,
	err: '',
};

const authReducer = (state = initState, action = {}) => {
	switch (action.type) {
		case 'SIGNIN_SUCCESS':
			const list = {
				...state,
				token: action.token,
				profile: action.profile,
			};
			localStorage.setItem('auth', JSON.stringify(list));
			return {
				...state,
				token: action.token,
				profile: action.profile,
			};
		case 'SIGNUP_SUCCESS':
			
			return {
				...state,
				profile: action.profile,
				err: 'signup_success'
			};
		case 'SEND_RECOVERPW_SUCCESS':
			return {
				...state,
			};
		case 'SIGNOUT_SUCCESS':
			localStorage.removeItem('auth');
			return {
			...initState,
			};

		case 'FETCH_SUCCESS':
			return {
				...state, 
				token:action.token ,
				profile: action.profile 
			};
		// ERR
		case 'SIGNUP_ERROR':
			return {
				...state,
				err: action.err
			};
		case 'SIGNIN_ERROR':
			return {
				...state,
				err: action.err,
			};
		case 'ERROR_PROFILE':
			return {
				...state,
				err: action.err,
			};

		default:
			return {...state};
	}
};

export default authReducer;
