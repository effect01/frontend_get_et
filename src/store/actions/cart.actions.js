import {object} from 'prop-types';

export const addToCart = (items, product, subProductoId, nroToBuy) => {
	return async (dispatch, getState) => {
		const cartItems = [];
		await items.map((e) => {
			const objects = e;
			let productAlreadyInCart = false;
			let count = nroToBuy || 1;
			objects.product.map((cp) => {
				// looking for the same article
				if (cp.id === product.id && cp.subId === subProductoId) {
					cp.count += count;
					cp.count = stockVeri(
						cp.sub_productos.filter((i) => i.id === subProductoId)[0].Stock,
						cp.count
					);
					productAlreadyInCart = true;
				}
			});

			// if is new article , add new item (product) to cart
			if (
				!productAlreadyInCart &&
				objects.tienda === product.tienda.NomTienda
			) {
				product = {...product, count};
				//   dispatch({ type: NOTIFICATION_ADD_NEW_ITEM_CART, payload: { product } });
				objects.product.push({
					...product,
					count: count,
					subId: subProductoId,
					precio_base: product.sub_productos.filter(
						(i) => i.id === subProductoId
					)[0].Precio,
				});
			}

			//before store(tienda) map ended add  the articles in new list
			cartItems.push({
				id: objects.id,
				tienda: objects.tienda,
				product: objects.product,
				retiro: objects.retiro,
			});
		});

		/// if the cart is empty just create the first item
		if (items.filter((i) => i.tienda === product.tienda.NomTienda)[0]) {
		} else {
			cartItems.push({
				id: product.tienda.id,
				tienda: product.tienda.NomTienda,
				product: [
					{
						...product,
						count: nroToBuy,
						subId: subProductoId,
						precio_base: product.sub_productos.filter(
							(i) => i.id === subProductoId
						)[0].Precio,
					},
				],
				retiro: 'Gratis',
			});
		}

		dispatch({type: 'ADD_TO_CART', items: cartItems});
		dispatch(countTotal(cartItems));
	
	};
};
export const changeDelivery = (items, tienda, newState) => {
	return async (dispatch) => {
		const list = [];
		await items.map((i) => {
			if (i.id == tienda) {
				i.retiro = newState;
			}
			list.push({...i});
		});
		dispatch({type: 'CHANGE_RETIRO_ITEM_FROM_CART', items: list});
		dispatch(countTotal(list));
	};
};
export const changeNroToBuy = (items, tienda, newState, idSubProduct) => {
	return async (dispatch) => {
		const list = [];

		await items.map((i) => {
			console.log(idSubProduct, i, tienda);
			if (i.id == tienda) {
				i.product.map((e) => {
					if (e.subId == idSubProduct) {
						e.count = stockVeri(
							e.sub_productos.filter((i) => i.id === idSubProduct)[0].Stock,
							newState
						);
					}
				});
			}
			list.push({
				id: i.id,
				tienda: i.tienda,
				product: i.product,
				retiro: i.retiro,
			});
		});
		dispatch({type: 'CHANGE_STOCK_ITEM_FROM_CART', items: list});
		dispatch(countTotal(list));
	};
};
export const minusNroToBuy = (items, tienda, idSubProduct) => {
	return async (dispatch) => {
		const list = [];
		await items.map((i) => {
			if (i.id == tienda) {
				i.product.map((e) => {
					if (e.subId == idSubProduct) {
						e.count -= 1;
						e.count = stockVeri(
							e.sub_productos.filter((i) => i.id === idSubProduct)[0].Stock,
							e.count
						);
					}
				});
			}
			list.push({
				id: i.id,
				tienda: i.tienda,
				product: i.product,
				retiro: i.retiro,
			});
		});
		dispatch({type: 'SUBTRACT_TO_CART', items: list});
		dispatch(countTotal(list));
	};
};

const countTotal = (cartItems) => {
	return async (dispatch) => {
		if (cartItems.length > 0) {
			const reducer = (accumulator, currentValue) => accumulator + currentValue;
			const precios1 = cartItems.map((i) => {
				const precios = i.product.map((o) => o.precio_base * o.count);
				const sendCost = isNaN(i.retiro) ? 0 : parseInt(i.retiro);
				return precios.reduce(reducer, sendCost);
			});
			const articleToBuy = cartItems.map((i) => {
				return i.product.map((o) => o.count).reduce(reducer);
			});
			dispatch({
				type: 'CALCULATE_TOTAL_FROM_CART',
				total: precios1.reduce(reducer),
				count: articleToBuy.reduce(reducer),
			});
		} else {
			dispatch({type: 'CALCULATE_TOTAL_FROM_CART', total: 0, count: 0});
		}
	};
};

const stockVeri = (stock, nroToBuy) => {
	if (
		nroToBuy === '' ||
		parseInt(nroToBuy) < 1 ||
		nroToBuy === undefined ||
		nroToBuy == NaN
	) {
		return 1;
	} else if (
		parseInt(nroToBuy) > stock ||
		(parseInt(nroToBuy) > stock && parseInt(nroToBuy) > 99)
	) {
		return stock;
	} else if (parseInt(nroToBuy) > 99) {
		return 99;
	} else {
		return parseInt(nroToBuy);
	}
};
export const deleteAItem = (items, idSubProduct) => {
	return async (dispatch) => {
		const list = [];
		await items.map((i) => {
			console.log(idSubProduct, i);
			i.product.filter((e) => e.subId != idSubProduct);

			if (i.product.filter((e) => e.subId != idSubProduct).length === 0) {
			} else {
				i.product = i.product.filter((e) => e.subId != idSubProduct);
				list.push({
					id: i.id,
					tienda: i.tienda,
					product: i.product,
					retiro: i.retiro,
				});
			}

			console.log(list);
		});
		dispatch({type: 'REMOVE_FROM_CART', items: list});

		dispatch(countTotal(list));
	};
};


