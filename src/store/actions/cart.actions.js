export const addToCart = (items, product, nroToBuy) => {
	return async (dispatch, getState) => {
		const cartItems = [];
		console.log(nroToBuy);
		await items.map((e) => {
			const objects = e;
			let productAlreadyInCart = false;

			objects.product.map((cp) => {
				// not same color / same size restricction

				if (cp.ID === product.ID) {
					console.log(cp, product);
					const newCant = cp.count + nroToBuy;
					cp.count = stockVeri(20, newCant);
					console.log(cp.count, newCant);
					productAlreadyInCart = true;
				}
			});
			// if is new article , add new item (product) to cart
			if (!productAlreadyInCart && objects.id === product.TIENDA.ID_TIENDA) {
				product = {...product, count: nroToBuy};
				//   dispatch({ type: NOTIFICATION_ADD_NEW_ITEM_CART, payload: { product } });
				objects.product.push({
					...product,
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
		if (items.filter((i) => i.id === product.TIENDA.ID_TIENDA)[0]) {
		} else {
			cartItems.push({
				id: product.TIENDA.ID_TIENDA,
				tienda: product.TIENDA.TITULO,
				product: [
					{
						...product,
						count: nroToBuy,
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
		
		console.log(items)
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
export const changeNroToBuy = (items, tienda, newState) => {
	return async (dispatch) => {
		const list = [];
		await items.map((i) => {
			if (i.id == tienda) {
				i.product.map((e) => {
					e.count = stockVeri(e.STOCK, newState);
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
export const minusNroToBuy = (items, tienda) => {
	return async (dispatch) => {
		const list = [];
		await items.map((i) => {
			if (i.id == tienda) {
				i.product.map((e) => {
					e.count -= 1;
					e.count = stockVeri(e.STOCK, e.count);
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
				const precios = i.product.map((o) => o.PRECIO_BASE * (1 -  (o.OFERTA ?? 0) ) * o.count );
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
export const deleteAItem = (items, ID) => {
	return async (dispatch) => {
		const list = [];
		await items.map((i) => {
			i.product.filter((e) => e.ID != ID);

			if (i.product.filter((e) => e.ID != ID).length === 0) {
			} else {
				i.product = i.product.filter((e) => e.ID != ID);
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
