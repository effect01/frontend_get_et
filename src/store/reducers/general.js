const initState = {
	comunas: [],
};
export default function (state = initState, action) {
	switch (action.type) {
		case 'CARGAR_COMUNAS_SUCCESS':
			return {...state, comunas: action.items};
		case 'CARGAR_COMUNAS_ERROR':
			return {...state, error: action.err};
		default:
			return state;
	}
}
