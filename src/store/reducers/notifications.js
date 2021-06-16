const initState = {};
export default function (state = initState, action) {
	switch (action.type) {
		case 'FAV_ADDED':
			return {
				...state,
				title_message: 'Producto añadido a favorito',
			};
		case 'FAV_PRODUCT_DELETED':
			return {
				...state,
				title_message: 'Producto eliminado de favorito',
			};

		case 'ERR_FAV_REQUEST':
			return {
				...state,
				title_message: 'Producto no se puede añadir',
				err: action.err,
			};
		default:
			return state;
	}
}
