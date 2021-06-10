import Tienda from './Tienda';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Producto from './Producto';

const Productos = (props) => {
	const [state, setState] = useState({loading: true});
	const [list, setList] = useState();
	const [error, setError] = useState();
	const [checkStock, setCheckStock] = useState(false);
	const [urlFinal, setUrlFinal] = useState();

	/// FUNCTIONS


	/// FETCH ITEMS, STATES
	useEffect(() => {
		fetchProducts(urlFinal, setState, setList, setError, setCheckStock);
	}, [urlFinal]);

	useEffect(() => {
		if (props.auth.profile != null)
			setUrlFinal(
				'http://localhost:3001/productos/tienda/' + props.auth.profile.ID
			);
	}, [props.auth]);

	return (
		<Tienda props={props} index={1}>
			{state && state.status === 200
				? state.data.map(  (e, index) => <Producto auth={props.auth}producto={e} index={index}/>
				  )
				: null}
		</Tienda>
	);
};

export default Productos;

const fetchProducts = (
	urlFinal,
	setState,
	setList,
	setError,
	setCheckStock
) => {
	const requestOne = axios.get(urlFinal);
	const requestTwo = axios.get(urlFinal + '/count');
	axios
		.all([requestOne, requestTwo])
		.then(
			axios.spread(async (...responses) => {
				console.log(responses);
				const responseOne = responses[0];
				const responseTwo = responses[1];
				if (responseTwo.data.COUNT === 0) {
					return setCheckStock(true);
				}

				setState({...responseOne, loading: false});

				console.log(responseTwo.data.COUNT, responseTwo.data, responseOne);
				let listita = [];
				for (
					let index = 0;
					index < Math.ceil(responseTwo.data.COUNT / 10);
					index++
				) {
					listita.push(index + 1);
				}
				setList(listita);
				setError(false);
			})
		)
		.catch((errors) => {
			// react on errors.
			setError(true);
			console.log(errors);
		});
};
