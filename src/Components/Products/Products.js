import Card2 from './Card';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {CardBody, Input} from 'reactstrap';
import {Paginations} from '../Paginations';

const Products = (props) => {
	/// VAR
	const [state, setState] = useState({loading: true});
	const [list, setList] = useState([]);
	const [error, setError] = useState(false);
	const [checkStock, setCheckStock] = useState(false);
	const [urlFinal, setUrlFinal] = useState(props.url + props.pagination);
	
	
	const [count, setCount] = useState(props.count);
	/// FUNCTIONS

	/// FETCH ITEMS, STATES
	useEffect(() => {
		fetchProducts(urlFinal, setState, setList, props, setError, setCheckStock);
	}, [urlFinal]);
	useEffect(() => {
		setUrlFinal(props.url + props.pagination);
	}, [props]);
	/// RENDER
	return checkStock ? (
		<p style={{textAlign: 'center', fontSize: '30px', margin: '50px'}}>
			Lo siento no hay articulos en esta categoria :({' '}
		</p>
	) : error ? (
		<p> Error </p>
	) : state.loading === true ? (
		<p> loading </p>
	) : state.status && state.status === 200 ? (
		<CardBody style={{marginTop: '50px'}} id="products">
			<div>
				<div
					id="container-product"
					className="justify-content-center aling-items-center"
				>
					{state.data.map((product) => (
						<Card2
							url={product.ID}
							product={product}
						/>
					))}
				</div>
				{Paginations(
					list,
					props.props.location.pathname.substr(
						0,
						props.props.location.pathname.length - 1
					),
					props.props.match.params.nro
				)}
			</div>
		</CardBody>
	) : (
		<p>error ${state.status} </p>
	);
};

export default Products;

const fetchProducts = (
	urlFinal,
	setState,
	setList,
	props,
	setError,
	setCheckStock
) => {
	const requestOne = axios.get(urlFinal);
	const requestTwo = axios.get(
		props.url.substr(0, props.url.length - 1) + '/count'
	);
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
				responseOne.data = await responseOne.data.slice(0, 10);
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
			})
		)
		.catch((errors) => {
			// react on errors.
			setError(true);
			console.log(errors);
		});
};
