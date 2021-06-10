import axios from 'axios';
import {fetchAuth} from '../actions/auth.actions';

export const addToFavorite = (auth, id_producto) => {
	let productsAlreadyAdded = auth.profile.Favorito.map((i) => i);
	productsAlreadyAdded = [...productsAlreadyAdded, id_producto];

	return async (dispatch, getState) => {
		axios
			.put(
				'http://localhost:1337/users/' + auth.profile.id,
				{	Favorito: productsAlreadyAdded,}	)
			.then((res) => {
				dispatch({
					type: 'FAV_ADDED',
					response: res,
				});
				dispatch(fetchAuth(auth.profile.id, auth.token));
			})
			.catch((err) => {
				dispatch({
					type: 'ERR_FAV_REQUEST',
					err,
				});
			});
	};
};
export const addStoreToFavorite = (auth, id_store) => {
	let itemsAlreadyAdded = auth.profile.tienda_favoritas.map((i) => i);
	itemsAlreadyAdded = [...itemsAlreadyAdded, id_store];
	return async (dispatch, getState) => {
		axios
			.put('http://localhost:1337/users/' + auth.profile.id, {
				tienda_favoritas: itemsAlreadyAdded,
			})
			.then((res) => {
				dispatch({
					type: 'FAV_ADDED',
					response: res,
				});
				dispatch(fetchAuth(auth.profile.id, auth.token));
			})
			.catch((err) => {
				dispatch({
					type: 'ERR_FAV_REQUEST',
					err,
				});
			});
	};
};

export const deleteFavoriteProduct = (auth, id_producto) => {
	let productsAlreadyAdded = auth.profile.Favorito.map((i) => i).filter(
		(i) => i.id != id_producto
	);

	return async (dispatch, getState) => {
		axios
			.put('http://localhost:1337/users/' + auth.profile.id, {
				Favorito: productsAlreadyAdded,
			})
			.then(async (res) => {
				await dispatch({
					type: 'FAV_ITEM_DELETED',
					response: res,
				});
				dispatch(fetchAuth(auth.profile.id, auth.token));
			})
			.catch((err) => {
				dispatch({
					type: 'ERR_FAV_REQUEST',
					err,
				});
			});
	};
};

export const deleteFavoriteStore = (auth, id_tienda) => {
	let productsAlreadyAdded = auth.profile.tienda_favoritas
		.map((i) => i)
		.filter((i) => i.id != id_tienda);
	console.log(productsAlreadyAdded);
	return async (dispatch, getState) => {
		axios
			.put('http://localhost:1337/users/' + auth.profile.id, {
				tienda_favoritas: productsAlreadyAdded,
			})
			.then(async (res) => {
				await dispatch({
					type: 'FAV_ITEM_DELETED',
					response: res,
				});
				dispatch(fetchAuth(auth.profile.id, auth.token));
			})
			.catch((err) => {
				dispatch({
					type: 'ERR_FAV_REQUEST',
					err,
				});
			});
	};
};
