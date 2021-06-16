import React, {useState, useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import '../Css/AppStripe.css';
import {Input, FormGroup, DropdownItem, Dropdown} from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';
import {emailCharacter, lengthAndCharacter} from './Sign/verify';
import axios from 'axios';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
// Sign in to see examples pre-filled with your key.
const promise = loadStripe(
	'pk_test_51H60SzAAoXgYkt5VKFbUy7kgNSc912CvkY0E9p1Y9S6TuvZSqVn575bp093LKjfhJERb2XbsS9ifQaqJMqKDtemL00QMjLhloF'
);

const Pago = (props) => {
	const history = useHistory();
	const {cart, comunas, auth, changeDelivery} = props;
	const [checkBoton, setCheckBoton] = useState(false);
	const [error, setError] = useState(null);
	const [tipoRetiro, setRetiro] = useState(0);
	const [pedido, setPedido] = useState(false);
	const [tipoPago, setTipoPago] = useState('VISA');
	const [haveDescuento, setHaveDescuento] = useState(false);
	const [rediCount, setReCount] = useState(6);
	const [req, setReq] = useState({
		Usuario: 'javier@gmail.com',
		Descuento: 0,
		pedidoIngresado: false,
		MetodoPago: 'VISA',
		Despacho: {
			direccion: 'calle falsa 321',
			comuna: 1,
			rut_receptor: '21.255.979-7',
			telefono: 21321321,
			id_repartidor: null,
		},
		Carrito: {
			Items: [],
			Total: 0,
		},
	});
	const onInputChange = (e) => {
		setReq({...req, [e.target.name]: e.target.value});
	};
	const onInputChangeDespacho = (e) => {
		let valor = e.target.value;
		if (e.target.name == 'telefono') valor = parseInt(valor);

		setReq({
			...req,
			Despacho: {
				...req.Despacho,
				[e.target.name]: valor,
			},
		});
	};
	const onSelectChange = (e) => {
		setReq({
			...req,
			Despacho: {
				...req.Despacho,
				[e.target.name]: parseInt(e.target.value),
			},
		});
	};

	const verificador = (req) => {
		if (
			emailCharacter(req.Usuario) &&
			req.Despacho.rut_receptor.length < 13 &&
			req.Despacho.telefono > 9999999
		) {
			setError(null);
			if (tipoRetiro == 1 && req.Sede > 0) {
				if (tipoPago == 'VISA') {
					setCheckBoton(true);
				} else {
					crearPedido(setPedido, setError, req);
				}
			} else if (
				lengthAndCharacter(req.Despacho.direccion, 3, 36) &&
				req.Despacho.comuna > 0
			) {
				if (tipoPago == 'VISA') {
					setCheckBoton(true);
				} else {
					crearPedido(setPedido, setError, req);
				}
			} else {
				setError('Llene todos los campos  correctamente');
				setCheckBoton(false);
			}
		} else {
			setError('Llene todos los campos  correctamente');
			setCheckBoton(false);
		}
	};
	useEffect(() => {
		if ((pedido != false) & (pedido != undefined)) {
			setInterval(() => setReCount((prev) => prev - 1), 1000);
			clearInterval();
			console.log(pedido);
			setTimeout(
				() =>
					history.push({
						pathname: '/boleta',
						state: {pedido: pedido},
					}),
				5950
			);

			props.initStateCart();
		}
	}, [pedido]);
	useEffect(() => {
		setReq({
			...req,
			MetodoPago: tipoPago,
		});
	}, [tipoPago]);
	useEffect(() => {
		if (tipoRetiro === 0) {
			setReq({
				...req,
				Sede: null,
			});
		} else {
			setReq({
				...req,
				Despacho: {
					...req.Despacho,
					direccion: null,
					comuna: 1,
				},
			});
		}
	}, [tipoRetiro]);

	useEffect(() => {
		if (auth.token != null) {
			setHaveDescuento(true);
		}
	}, [auth, props]);
	useEffect(() => {
		setReq({...req, Descuento: 0.02});
	}, [haveDescuento]);
	useEffect(async () => {
		setReq({
			...req,
			Carrito: {
				Items: cart.items,
				Total: cart.total,
			},
		});
	}, [cart]);
	return (
		<div id="pago">
			<div alt="informacion">
				<div alt="despacho">
					<FormGroup>
						<Input
							type="text"
							className="form-control"
							placeholder="Direccion"
							name="direccion"
							required
							onChange={onInputChangeDespacho}
						/>
					</FormGroup>

					<FormGroup>
						<Input onChange={onSelectChange} type="select" name="comuna">
							<option value={0}>SELECCIONA TU COMUNA</option>)
							{comunas.map((e) => (
								<option value={e.ID}>{e.COMUNA}</option>
							))}
						</Input>
					</FormGroup>

					<FormGroup>
						<Input
							type="text"
							className="form-control"
							placeholder="Rut Receptor"
							name="rut_receptor"
							required
							onChange={onInputChangeDespacho}
						/>
					</FormGroup>

					<FormGroup>
						<Input
							type="text"
							className="form-control"
							placeholder="Telefono"
							name="telefono"
							required
							onChange={onInputChangeDespacho}
						/>
					</FormGroup>
				</div>
				<h5>Datos Usuario</h5>
				<FormGroup>
					<Input
						type="text"
						className="form-control"
						placeholder="Correo"
						name="Usuario"
						required
						onChange={onInputChange}
					/>
				</FormGroup>
				<h5>Tipo de pago</h5>
				<FormGroup>
					<Input
						onChange={(e) => setTipoPago(e.target.value)}
						type="select"
						name="despacho"
					>
						<option value={'VISA'}>TARJETA DEV</option>)
						<option value={'TRANSFERENCIA'}>TRANSFERENCIA</option>)
					</Input>
				</FormGroup>
				{tipoPago === 'TRANSFERENCIA' ? (
					<div style={{color: 'grey'}}>
						<span>
							Debe llegar al final del proceso de compras, apretando PAGAR en en
							el carrito y nuevamente PAGAR en la otra. En ese momento le dará
							el número de pedido de su orden (pre-boleta). Luego tendrá que
							depositar a la siguiente cuenta y comentar con el nro de pedido
							(tambien puede mandar un correo con el nro de pedido y boleta de
							pago):
						</span>
						<br />
						<strong>
							<span>BANCO:</span>
						</strong>
						<br />
						<span>BANCO XX </span>
						<br />
						<strong>
							<span>CUENTA:</span>
						</strong>
						<br />
						<span>XXX XXX XXX XXX </span> <br />
						<strong>
							<span>TIPO DE CUENTA:</span>
						</strong>
						<br />
						<span>TIPO XXX </span> <br />
					</div>
				) : null}
			</div>
			<div>
				<div alt="carrito">
					<div style={{maxHeight: '420px', overflowY: 'auto'}}>
						{cart.items.map((e) => Items(e, changeDelivery, cart))}
					</div>
					<div>
						{haveDescuento ? (
							<div>
								<span>
									Descuento aplicado por ser Usuario : {req.Descuento * 100}%
								</span>
							</div>
						) : null}

						<div
							style={{
								justifyContent: 'space-between',
								display: 'flex',
								fontSize: '30px',
								fontWeight: 800,
							}}
						>
							<span>Total a pagar :</span>{' '}
							<span> CLP ${(cart.total * (1 - req.Descuento ?? 0) ).toFixed(0)
								.replace(/\D/g, '')
								.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.') }</span>
						</div>
						{cart.total * (1 - req.Descuento) != cart.total ? (
							<div style={{textAlign: 'right'}}>
								{' '}
								<strike>
								CLP $<span style={{marginLeft: 'auto', fontStyle: 'italic'}}>
										{ cart.total.toFixed(0)
								.replace(/\D/g, '')
								.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')  }
									</span>
								</strike>
							</div>
						) : null}
					</div>
				</div>
				<div alt="pago">
					{checkBoton && checkBoton && tipoPago == 'VISA' ? (
						<Elements stripe={promise}>
							<CheckoutForm initStateCart={props.initStateCart} datos={req} />
						</Elements>
					) : (
						<>
							<button className="button-red" onClick={() => verificador(req)}>
								IR A PAGO{' '}
							</button>
							<p
								className={pedido ? 'result-message' : 'result-message hidden'}
							>
								Seras Redirecionado al detalle de tu compra, Donde podras ver el
								# de pedido en {rediCount}.
							</p>
						</>
					)}
					{error ? (
						<p
							style={{
								color: 'red',
								fontStyle: 'italic',
							}}
						>
							{error}
						</p>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Pago;

const crearPedido = async (setPedido, setError, datos) => {
	return await axios
		.post('http://localhost:3001/pedido/', {
			...datos,
		})
		.then((data) => {
			console.log(data + ' crear pedido');
			if (data.data.id_pedido) setPedido(data.data.id_pedido);
		})
		.catch((err) => {
			setError(`Payment failed BDA ${err}`);
		});
};

const Items = (cart, changeDelivery, cartOriginal) => {
	return (
		<>
			<span style={{fontSize: '13px', color: 'rgb(56 115 80)'}}>
				{cart.tienda}
			</span>

			{cart.product.map((product) => (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							width: '145px',
							fontSize: '11px',
						}}
					>
						<div style={{width: '40px', height: '40px', background: 'orange'}}>
							<img
								style={{width: '40px', height: '40px'}}
								src={product.URL_IMAGEN}
								alt=""
							/>
						</div>
						<div>
							<div>
								<Link to={'/producto/' + product.ID}>
									{product.NOMBRE.substr(0, 16) + '..'}
								</Link>
							</div>
						</div>
					</div>
					<div style={{display: 'block'}}>
						<span style={{overflow: 'hidden'}}>
							$
							{(product.PRECIO_BASE * (1 - product.OFERTA ?? 0) * product.count)
								.toFixed(0)
								.replace(/\D/g, '')
								.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')}
						</span>{' '}
						<br />
						{product.OFERTA > 0 ? (
							<strike>
								<span style={{overflow: 'hidden'}}>
									$
									{(product.PRECIO_BASE * product.count)
										.toFixed(0)
										.replace(/\D/g, '')
										.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')}
								</span>
							</strike>
						) : null}
					</div>
				</div>
			))}

			<div
				style={{
					justifyContent: 'space-between',
					display: 'flex',
					fontSize: '12px',
					color: 'grey',
				}}
			>
				<div>
					Tipo de envio
					<Input
						style={{width: 'fit-content'}}
						type="select"
						bsSize="sm"
						name="select"
						id="exampleSelect"
						onChange={(e) =>
							changeDelivery(cartOriginal.items, cart.id, e.target.value)
						}
					>
						<option value={'Gratis'} selected={cart.retiro === 'Gratis'}>
							Retiro
						</option>
						<option value={2000} selected={cart.retiro === 2000}>
							{' '}
							Despacho{' '}
						</option>
					</Input>
				</div>
				<span style={{marginTop: 'auto'}}> {cart.retiro} </span>
			</div>

			<DropdownItem divider />
		</>
	);
};
