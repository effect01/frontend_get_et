import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {Input, FormGroup, FormFeedback} from 'reactstrap';
import axios from 'axios';

const Pedidos = ({pedido, auth}) => {
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
					state: {pedido: pedido.ID_PEDIDO},
				}}
			>
				#{pedido.ID_PEDIDO}
			</Link>

			<div
				Style="
                display: block;
              font-size: 14px;"
			>
				{auth.profile.ROL_ID === 2
					? vendedorOption(
							asignado,
							cancelado,
							pedido,
							onSelectChange,
							auth,
							setAsignado,
							setCancelado,
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


const vendedorOption = (
	asignado,
	cancelado,
	pedido,
	auth,
	setAsignado,
	setCancelado,
) => (
	<div>
		<button
			onClick={() => {
				terminarPedido(pedido.ID_PEDIDO, auth.token, setAsignado);
			}}
			className="button-red"
		>
			Terminado{' '}</button>

	<button
			onClick={() => {
				pedidoEnviado(pedido.ID_PEDIDO, auth.token, setAsignado);
			}}
			className="button-red"
		>
			Enviado{' '}</button>
		<button
			onClick={() => {
				cancelarPedido(pedido.ID_PEDIDO, auth.token, setCancelado);
			}}
			className="button-red"
			Style="background:red"
		>
			Cancelar{' '}
		</button>
		{cancelado == true ? <span> Pedido cancelado con exito</span> : null}
		{asignado == true ? <span>  Estado Cambiado con exito</span> : null}
	</div>
);



const pedidoEnviado = (id, token, setAsignado) => {
	var config = {
		method: 'put',
		url: `http://localhost:3001/pedido/enviado/${id}`,
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
