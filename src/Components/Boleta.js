import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

const fetchProduct = (setState, id) => {
	axios
		.get(`http://localhost:3001/pedido/cod/${id}`)
		.then((res) => {
			return res;
		})
		.then((res) => setState({...res, loading: false}))
		.catch((res) =>
			// ERROR HANDLEE REDUX MISS
			setState({...res.response})
		);
};

const Boleta = (props) => {
	const pedido = props.location.state.pedido;
	const [state, setState] = useState({loading: true});
	console.log('boleta');
	useEffect(() => {
		console.log(props.location.state.pedido, props.location);

		fetchProduct(setState, pedido);
	}, [pedido]);

	return state.loading === true ? (
		<p> loading </p>
	) : state.status && state.status === 200 ? (
		<div Style={'padding-bottom:80px'}>
			<div
				Style="
                        width: 1200px;
                        background: #fdfdfd;
                        margin: auto;
                        min-height: 800px;
                        margin-top: 20px;
                        padding: 50px;
                      "
			>
				<div
					Style="   vertical-align: top;
    border-bottom-width: 6px;
    border-bottom-color: #64dcc3;
    border-bottom-style: solid;
    padding: 0;
    font-weight: 600;"
				>
					<div
						Style="    display: flex;
    justify-content: space-between;
    font-size: 40px;
    font-weight: 800;
 "
					>
						<span>PEDIDO #{state.data.ID_PEDIDO}</span>
						<span>{new Date(state.data.FECHA).toLocaleString()}</span>
					</div>
					<span>ESTADO: {state.data.ESTADO} </span>
				</div>
				<div Style="min-height:300px">
					<div>{state.data.PRODUCTOS.map((e) => Item(e))}</div>
				</div>
				<div>
					<div
						Style="    display: flex;
    justify-content: space-between;
    font-size: 25px;
    margin-bottom: 15px;
    background: #eaeaea;"
					>
						<span>CARGO POR DESPACHO</span> <span> 0 </span>
					</div>
					<div
						Style="    display: flex;
    justify-content: space-between;
    font-size: 25px;
    margin-bottom: 15px;
    background: #eaeaea;"
					>
						<span> TOTAL A PAGAR </span>{' '}
						<span>
							{' '}
							USD{' '}
							{new Intl.NumberFormat('CLP', {
								style: 'currency',
								currency: 'CLP',
							}).format(state.data.PAGO)}
						</span>{' '}
					</div>
				</div>
				<div
					Style="    display: block;
								margin-bottom: 15px;
								background: #eaeaea;
								text-align: center;
								min-height: 200px;
								padding: 30px;
								"
				>
					<span
						style={{
							fontSize: '25px',
						}}
					>
						TIENDA
					</span>
					<br />
					<h4>
						{state.data.TIENDA.TITULO}
					</h4>
					<span
						style={{
							fontSize: '25px',
						}}
					>
						INFORMACION DEL CLIENTE
					</span>

					<div style={{display: 'block', marginTop: '2px', fontSize: '15px'}}>
					
						
								<strong>
									<span>DIRECCION: </span>
								</strong>
								<br />
								<span>{state.data.DIRECCION} </span> <br />
								<strong>
									<span>COMUNA:</span>
								</strong>
								<br />
								<span>{state.data.COMUNA_1} </span> <br />
						
						<strong>
							<span>RUT DEL RECEPTOR:</span>
						</strong>
						<br />
						<span>{state.data.RUT_RECEPTOR} </span> <br />
						<strong>
							<span>TELEFONO:</span>
						</strong>
						<br />
						<span>{state.data.TELEFONO} </span> <br />
					</div>
				</div>
				<div
					Style="    display: block;
    font-size: 25px;
    text-align:center;

    "
				>
					<span>Gracias por tu compra en  Verduderias Chile :)</span>
				</div>
			</div>
		</div>
	) : (
		<p>error ${state.status} </p>
	);
};

export default Boleta;

const Item = (product) => (
	<>
		<span style={{fontSize: '13px', color: '#ff7070'}}> </span>
		<div
			style={{
				marginTop: '5px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					width: '375px',
					fontSize: '11px',
				}}
			>
				<div style={{width: '120px', height: '120px'}}>
					<img
						style={{width: '120px', height: '120px'}}
						src={product.URL_IMAGEN}
						alt=""
					/>
				</div>
				<div>
					<div>
						<Link to={'/product/' + product.id}>
							<span style={{fontSize: '20px'}}>
								{product.NOMBRE.substr(0, 16) + '..'}
							</span>
						</Link>
					</div>

					<div>
						<p style={{fontSize: '15px'}}>
							{product.COUNT} x{' '}
							{new Intl.NumberFormat('CLP', {
								style: 'currency',
								currency: 'CLP',
							}).format(product.PRECIO_BASE)}{' '}
							{product.OFERTA > 0 ? (
								<span>- {product.OFERTA * 100}%</span>
							) : null}
						</p>
					</div>
				</div>
			</div>
			<span style={{fontSize: '20px', overflow: 'hidden'}}>
				${' '}
				{new Intl.NumberFormat('CLP', {
					style: 'currency',
					currency: 'CLP',
				}).format(product.PRECIO_BASE * (1 - product.OFERTA) * product.COUNT)}
			</span>
		</div>

		<div
			style={{
				justifyContent: 'space-between',
				display: 'flex',
				fontSize: '12px',
				color: 'grey',
			}}
		>
			<div></div>
		</div>
	</>
);
