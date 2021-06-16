import React, {useState, useEffect} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
export default function CheckoutForm({datos, initStateCart}) {
	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState();
	const [disabled, setDisabled] = useState(true);
	const [paymentIntent, setPayload] = useState();
	const [pedido, setPedido] = useState(null);
	const [clientSecret, setClientSecret] = useState('');
	const [rediCount, setReCount] = useState(6);
	const stripe = useStripe();
	const elements = useElements();
	const history = useHistory();
	useEffect(async () => {
		// Create PaymentIntent as soon as the page loads
		await crearPago(setClientSecret, setError, datos);

	}, []);

	useEffect(
		async (_) => {
			console.log(paymentIntent + ' pedido ' + clientSecret);
			if(paymentIntent != undefined)
			{const confirmacion = await axios
				.post('http://localhost:3001/pedido/' + clientSecret, paymentIntent)
				.catch((e) => setError(e));
			console.log(confirmacion);}
		},
		[paymentIntent]
	);

	const cardStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	};

	const handleChange = async (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};
	const sendBoleta = (pedido) => {
		initStateCart();
		clearTimeout();

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
		clearTimeout();
	};
	useEffect(
		(e) => {
			if (succeeded) sendBoleta(pedido);
		},
		[succeeded]
	);

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		await crearPedido(setPedido, setError, datos, clientSecret);
		setProcessing(true);

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
			},
		});
		console.log(payload);
		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`);
			setProcessing(false);
		} else {
			// si el pedido se ha pagado. marcar pedido como pagado y crear boleta
			console.log(payload);
			setPayload(payload);
			setError(null);
			setProcessing(false);
			setSucceeded(true);
		}
	};

	return (
		<form id="payment-form">

			<CardElement
				id="card-element"
				options={cardStyle}
				onChange={handleChange}
			/>

			<button
				onClick={(e) => handleSubmit(e)}
				disabled={processing || disabled || succeeded}
				id="submit"
			>
				<span id="button-text">
					{processing ? (
						<div className="spinner" id="spinner"></div>
					) : (
						'Pagar Ahora'
					)}
				</span>
			</button>
		{/* {	<p className={succeeded ? 'result-message' : 'result-message hidden'}>
				Seras Redirecionado al detalle de tu compra, Donde podras ver el # de pedido 
				en {rediCount}.
			</p>
			
			} */}

			{/* Show any error that happens when processing the payment */}
			{error && (
				<div className="card-error" role="alert">
					{error}
				</div>
			)}
			{/* Show a success message upon completion */}
			<p className={succeeded ? 'result-message' : 'result-message hidden'}>
				Pago realizado con exito , resultados :
				<a href={`https://dashboard.stripe.com/test/payments`}>
					{' '}
					Stripe dashboard.
				</a>{' '}
				Seras Redirecionado al detalle de tu compra en {rediCount}
			</p>

		</form>
	);
}

const crearPedido = async (setPedido, setError, datos, clientSecret) =>{
	datos= { ...datos,clientSecret}
	return await axios
		.post('http://localhost:3001/pedido/', {
			...datos,
		})
		.then((data) => {
			console.log(data);
			setPedido(data.data.id_pedido);
		})
		.catch((err) => {
			setError(`Payment failed BDA ${err}`);
		});}

const crearPago = async (setClientSecret, setError, datos) =>{
	return await axios
		.post('http://localhost:3001/payment', {
			...datos,
		})
		.then((data) => {
			console.log(data);
			setClientSecret(data.data.client_secret);
		})
		.catch((err) => {
			setError(`Payment failed BDA ${err}`);
		});}








// let resp = await axios
// 	.post('http://localhost:3001/pedido/', {
// 		...datos,
// 		pedidoIngresado: clientSecret,
// 		pedido: pedido,
// 	})
// 	.then((res) => {
// 		return res;
// 	})
// 	.then((data) => {
// 		setClientSecret(data.data.clientSecret);
// 		return data;
// 	})
// 	.catch((err) => {
// 		setError(`Payment failed BDA ${err}`);
// 		setClientSecret('');
// 	});
// if (
// 	resp &&
// 	resp.data.id_pedido != 0 &&
// 	resp.data.id_pedido != undefined
// ) {
// 	setPedido(resp.data.id_pedido);
// }
// console.log(resp, clientSecret, pedido);
