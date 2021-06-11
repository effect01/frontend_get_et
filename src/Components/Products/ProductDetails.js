import {useParams} from 'react-router-dom';
import {Card, CardBody} from 'reactstrap';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Product(props) {
	const {id} = useParams();
	const [state, setState] = useState({loading: true});
	const [subProductoId, setSubProduct] = useState(1);
	const [nroBuy, setNroBuy] = useState(1);
	useEffect(() => {
		fetchProduct(setSubProduct, setState, id, props);
	}, []);
	useEffect(() => {
		setState({...state, loading: true});

		fetchProduct(setState, id);
	}, [id]);

	useEffect(() => {
		if (state.status && state.status === 200 && nroBuy > state.data.STOCK) {
			setNroBuy(state.data.STOCK);
		}
	}, [state, id]);

	return state.loading === true ? (
		<p> loading </p>
	) : state.status && state.status === 200 ? (
		<div id="product-page">
			<Card>
				<div>
					<div>
						<img src={state.data.URL_IMAGEN} alt="" />
					</div>

					<div></div>
				</div>
				<div>
					<div id="product-information">
						<div>
							<h2>{state.data.NOMBRE}</h2>
						</div>
						<div style={{display: 'block'}}>
							Marca:<h2>{state.data.MARCA}</h2>{' '}
						</div>
						<div style={{display: 'block'}}>
							Modelo:<h4>{state.data.MODELO}</h4>{' '}
						</div>
					</div>
					<div id="product-interaction">
						<div>
							<h2>
								{ props.fnMoneda(state.data.PRECIO_BASE * (1 - state.data.OFERTA))}
									
							</h2>
							<h5
								style={{
									color: 'grey',
									marginBotton: '15px',
									fontStyle: 'italic',
								}}
							>
								{' '}
								{state.data.OFERTA > 0 ? (
									<>
										<strike>
											{ props.fnMoneda( state.data.PRECIO_BASE)}
										</strike>
									</>
								) : null}
							</h5>
						</div>
						<div></div>
						<div>
							<div>
								<div>
									<button
										onClick={(_) =>
											nroBuy != 1 ? setNroBuy(nroBuy - 1) : setNroBuy(1)
										}
									>
										<i>-</i>
									</button>
									<span>{nroBuy}</span>
									<button
										onClick={(_) =>
											state.data.STOCK >= nroBuy + 1
												? setNroBuy(nroBuy + 1)
												: setNroBuy(nroBuy)
										}
									>
										<i>+</i>
									</button>
								</div>
								<p>{state.data.STOCK} Disponibles</p>
							</div>
							<div>
								<div
									onClick={(_) =>
										props.addToCart(props.cart, state.data, nroBuy)
									}
									className="add-item-to-card"
								>
									<h6>COMPRAR</h6>
								</div>
							</div>
						</div>
					</div>
					<div></div>
				</div>
			</Card>
			<Card>
				<CardBody></CardBody>
			</Card>
		</div>
	) : (
		<p>error ${state.status} </p>
	);
}

export default Product;

const fetchProduct = (setState, id) => {
	axios
		.get(`http://localhost:3001/productos/${id}`)
		.then((res) => {
			return res;
		})
		.then((res) => setState({...res, loading: false}))
		.catch((res) =>
			// ERROR HANDLEE REDUX MISS
			setState({...res.response})
		);
};
