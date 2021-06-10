import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {Input, FormGroup, FormFeedback} from 'reactstrap';
import axios from 'axios';

const Pedidos = ({pedido, bodegueros, auth}) => {
	const [state, setState] = useState({
		nrodespacho: pedido.ID_NRO_DESPACHO,
		id: null,
	});
	const [pagado, setPagado] = useState({
		id_pago: '',
		pagado: 0,
	});
	const [cancelado, setCancelado] = useState(false);
	const [asignado, setAsignado] = useState(false);
	const onInputChange = (e) => {
		setPagado({...pagado, [e.target.name]: e.target.value});
	};
	const onSelectChange = (e) => {
		setState({
			...state,
			[e.target.name]: parseInt(e.target.value),
		});
	};
	useEffect(() => {
		console.log(auth);
	});

	return (
		<div
			Style="display: flex;
        justify-content: space-between;
        padding: 20px;
        font-size: 20px;
        margin-bottom: 20px;
        background: #ffffffa6;"
		>
			<Link
				Style="
            color:#0096ff"
				to={{
					pathname: '/boleta',
					state: {pedido: pedido.ID},
				}}
			>
				#{pedido.ID}
			</Link>

			<div
				Style="
                display: block;
              font-size: 14px;"
			>
				{auth.profile.ROL_ID === 3
					? vendedorOption(
							state,
							asignado,
							cancelado,
							bodegueros,
							pedido,
							onSelectChange,
							asignarBodeguero,
							cancelarPedido,
							auth,
							setAsignado,
							setCancelado
					  )
					: auth.profile.ROL_ID == 5
					? bodegueroOption(
							asignado,
							cancelado,
							pedido,
							pedidoEnviado,
							cancelarPedido,
							auth,
							setAsignado,
							setCancelado
					  )
					: auth.profile.ROL_ID == 4
					? contadorOption(
							pagado,
							asignado,
							cancelado,
							pedido,
							onInputChange,
							confirmarPago,
							cancelarPedido,
							auth,
							setAsignado,
							setCancelado,
							terminarPedido
					  )
					: null}
				<strong>
					{pedido.ESTADO} {'  '}
				</strong>
				RUT RECEPTOR: {pedido.RUT_RECEPTOR}
				{'  '}
				FECHA: {new Date(pedido.FECHA).toLocaleString()}{' '}
			</div>
		</div>
	);
};

export default Pedidos;

const bodegueroOption = (
	asignado,
	cancelado,
	pedido,
	pedidoEnviado,
	cancelarPedido,
	auth,
	setAsignado,
	setCancelado
) => (
	<div>
		<button
			onClick={() => pedidoEnviado(pedido.ID, auth.token, setAsignado)}
			className="button-red"
			Style={
				pedido.ESTADO_1 === 'EV'
					? `
	 background-color: #bcc0c4;
    cursor: null;
    pointer-events: none;`
					: null
			}
		>
			PEDIDO LISTO{' '}
		</button>

		<button
			onClick={() => {
				cancelarPedido(pedido.ID, auth.token, setCancelado);
			}}
			className="button-red"
			Style="background:red"
		>
			Cancelar{' '}
		</button>

		{cancelado == true ? <span> Pedido cancelado con exito</span> : null}
		{asignado == true ? <span> Pedido validado con exito</span> : null}
	</div>
);

const vendedorOption = (
	state,
	asignado,
	cancelado,
	bodegueros,
	pedido,
	onSelectChange,
	asignarBodeguero,
	cancelarPedido,
	auth,
	setAsignado,
	setCancelado
) => (
	<div>
		<FormGroup>
			<Input
				Style=" width: 250px"
				onChange={onSelectChange}
				type="select"
				name="id"
			>
				<option value={0}>BODEGUERO</option>
				{bodegueros.map((e) => (
					<option value={e.ID}>{e.NOMBRE}</option>
				))}
			</Input>
		</FormGroup>
		<button
			onClick={() => asignarBodeguero(state, auth.token, setAsignado)}
			className="button-red"
		>
			ASIGNAR{' '}
		</button>
		<button
			onClick={() => {
				cancelarPedido(pedido.ID, auth.token, setCancelado);
			}}
			className="button-red"
			Style="background:red"
		>
			Cancelar{' '}
		</button>
		{cancelado == true ? <span> Pedido cancelado con exito</span> : null}
		{asignado == true ? <span> bodeguero asignado con exito</span> : null}
	</div>
);

const contadorOption = (
	state,
	asignado,
	cancelado,
	pedido,
	onInputChange,
	confirmarPago,
	cancelarPedido,
	auth,
	setAsignado,
	setCancelado,
	terminarPedido
) => (
	<div>
		{pedido.ESTADO_1 == 'EP' ? (
			<>
				<FormGroup>
					<FormGroup>
						<Input
							type="text"
							className="form-control"
							placeholder="Pagado"
							name="pagado"
							required
							onChange={onInputChange}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							type="text"
							className="form-control"
							placeholder="id pagado"
							name="id_pago"
							required
							onChange={onInputChange}
						/>
					</FormGroup>
				</FormGroup>
				<button
					onClick={() =>
						confirmarPago(state, pedido.ID, auth.token, setAsignado)
					}
					className="button-red"
				>
					ASIGNAR{' '}
				</button>
			
			</>
		) : (	<button
			onClick={() =>
				terminarPedido( pedido.ID, auth.token, setAsignado)
			}
			className="button-red"
		>
			FINALIZAR PEDIDO{' '}
		</button>)}

<button
					onClick={() => {
						cancelarPedido(pedido.ID, auth.token, setCancelado);
					}}
					className="button-red"
					Style="background:red"
				>
					Cancelar{' '}
				</button>
	{asignado == true ? <span> Operación realizada con exito</span> : null}
		{cancelado == true ? <span> Pedido cancelado confirmado con exito</span> : null}
	</div>
);

const confirmarPago = (state, id, token, setAsignado) => {
	const data = state;

	var config = {
		method: 'put',
		url: `http://localhost:3001/pedido/contador/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			console.log(response);
			if (response.data.rowsAffected == 1) {
				setAsignado(true);
			} else {
				setAsignado(false);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
};

const pedidoEnviado = (id, token, setAsignado) => {
	var config = {
		method: 'put',
		url: `http://localhost:3001/pedido/bodeguero/enviado/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	console.log(id, token);
	axios(config)
		.then(function (response) {
			console.log(response, id, token);
			if (response.data.rowsAffected == 1) {
				setAsignado(true);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
};

const asignarBodeguero = (state, token, setAsignado) => {
	const data = state;

	const config = {
		method: 'put',
		url: 'http://localhost:3001/pedido/bodeguero/',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: data,
	};

	axios(config)
		.then(function (response) {
			if (response.data.rowsAffected == 1) {
				setAsignado(true);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
};

const cancelarPedido = (id, token, setCancelado) => {
	var config = {
		method: 'put',
		url: `http://localhost:3001/pedido/cod/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	axios(config)
		.then(function (response) {
			if (response.data.rowsAffected == 1) {
				setCancelado(true);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
};
const terminarPedido = (id, token, setAsignado) => {
	var config = {
		method: 'put',
		url: `http://localhost:3001/pedido/terminar/${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	axios(config)
		.then(function (response) {
			console.log("hola ssss")
			if (response.data.rowsAffected == 1) {
				setAsignado(true);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
};
