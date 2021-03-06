import {useParams} from 'react-router-dom';
import {Card, CardBody, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ReactDOMServer from 'react-dom/server'

function Product(props) {
	const {id} = useParams();
	const [state, setState] = useState({loading: true});
	const [nroBuy, setNroBuy] = useState(1);
	const [popoverOpen, setPopoverOpen] = useState(false);

	useEffect(() => {
		setState({...state, loading: true});
		console.log(props.cart);
		fetchProduct(setState, id);
	}, [id]);

	useEffect(() => {
		if (state.status && state.status === 200 && nroBuy > state.data.STOCK) {
			setNroBuy(state.data.STOCK);
		}
	}, [state, id]);

	const clickEvent= e =>{
		setPopoverOpen(false);
	}

	return state.loading === true ? (
		<p> loading </p>
	) : state.status && state.status === 200 ? (
		<div id="product-page">
			<Card onClick={(e) => clickEvent(e)}>
				<div 
										 >
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
						<a>
							<h6>Vendido por:</h6>
							<div  			 style={{display: 'flex'}}>
								<img src={state.data.TIENDA.URL_IMAGEN} alt="" />
						
						{Direccion(state,setPopoverOpen,Popover , popoverOpen)}


							</div>{' '}
						</a>{' '}
						*
					</div>
					<div 	
					

					 id="product-interaction">
						<div>
							<h2>CLP ${state.data.PRECIO_BASE * (1 - state.data.OFERTA)}</h2>
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
										<strike>CLP $ {state.data.PRECIO_BASE}</strike>
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

const Direccion = (state,setPopoverOpen,Popover , popoverOpen ) =>
(		<div id='titulo-tienda'>
	<h4  >{state.data.TIENDA.TITULO}</h4>{' '}
	<span>
	<span
		onMouseOver={(_) => setPopoverOpen(true)}
		id="Popover-1"
	>
		{state.data.TIENDA.DIRECCION}
	</span>

<Popover
		placement={'DIRECCION'}
		isOpen={popoverOpen}
		target={'Popover-1'}
	
	>
		<PopoverHeader>Popover Title</PopoverHeader>
		<PopoverBody>
			Sed posuere consectetur est at lobortis. Aenean eu leo
			quam. Pellentesque ornare sem lacinia quam venenatis
			vestibulum.
		</PopoverBody>
	</Popover>



</span>	</div>
)