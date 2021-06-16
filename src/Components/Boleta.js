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
	const pedido = props.location.state.pedido ;
	const [state, setState] = useState({loading: true});
	console.log('boleta')
	useEffect(() => {
		console.log(props.location.state.pedido , props.location   );

		
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
					<span>
						ESTADO:{' '}
						{state.data.ESTADO }{' '}
					</span>
				</div>
				<div Style="min-height:300px">		
					<div>
						{state.data.PRODUCTOS.map((e) => Item(e))}
					</div>
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
							USD {' '}
							{ (state.data.PAGO.toFixed(0).replace(/\D/g, '')
								.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')) }

						</span>{' '}

					
					</div>
					{state.data.PAGADO > 0 ?(<div
						Style="    display: flex;
    justify-content: space-between;
    font-size: 25px;
    margin-bottom: 15px;
    background: #eaeaea;"
					>
						<span> PAGADO </span>{' '}
						<span>
							{' '}
							USD ${' '}
							{new Intl.NumberFormat('us-US').format(
								state.data.PAGADO.toString().substr(
									0,
									state.data.PAGADO.toString().length - 2
								)
							) +
								`.` +
								state.data.PAGADO.toString().substr(
									state.data.PAGADO.toString().length - 2,
									state.data.PAGADO.toString().length
								)}{' '}
						</span>{' '}
					</div>):null}



					</div>
				<div Style="    display: block;
								margin-bottom: 15px;
								background: #eaeaea;
								text-align: center;
								min-height: 200px;
								padding: 30px;
								"	>
						<span style={{ 
								fontSize: '25px' }} >TIPO DE PAGO</span><br />

						<span style={{ marginTop: '2px', fontSize:'15px'}}> {state.data.METODO_DE_PAGO} </span><br />

						{ state.data.METODO_DE_PAGO === 'TRANSFERENCIA'? (
					
						<div style={{color:'grey'}}>

						
							<span>
							Debe llegar al final del proceso de compras, apretando PAGAR en en el carrito y nuevamente PAGAR en la otra. En ese momento le dará el número de pedido de su orden (pre-boleta). Luego tendrá que depositar a la siguiente cuenta y comentar con el nro de pedido (tambien puede mandar un correo con el nro de pedido y boleta de pago): 
							</span>
							<br />
							<strong><span>BANCO:</span></strong>
							<br />
							<span>BANCO XX </span> 
							<br />
							<strong><span>CUENTA:</span></strong>
							<br />
							<span>XXX XXX XXX XXX </span> <br />
							<strong><span>TIPO DE CUENTA:</span></strong>
							<br />
							<span>TIPO XXX </span> <br /></div>
			
						):null}

					<span style={{ 
								fontSize: '25px' }} >INFORMACION DE {state.data.TIPO_DESPACHO}</span>
					
					<div style={{display: 'block', marginTop: '2px', fontSize:'15px'}}>
				
					{	
					state.data.TIPO_DESPACHO === 'DESPACHO'?(<>
					<strong>
							<span>DIRECCION: </span>
						</strong>
						
						 <br />
						<span>{state.data.DIRECCION} </span> <br />
						<strong><span>COMUNA:</span></strong>
						<br />
						<span>{state.data.COMUNA_1} </span> <br />
						</>
						):(<>
							<strong><span>SEDE DE RETIRO:</span></strong>
							<br />
							<span>{state.data.SEDE} </span> <br />		</>
						)
}


					
						<strong><span>RUT DEL RECEPTOR:</span></strong>
						<br />
						<span>{state.data.RUT_RECEPTOR} </span> <br />
						<strong><span>TELEFONO:</span></strong>
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
					<span>Gracias por tu compra en Music Pro :)</span>
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
							{product.PRECIO_BASE.toFixed(0)
								.replace(/\D/g, '')
								.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')} {' '}
							{product.OFERTA > 0 ? (
								<span>- {product.OFERTA * 100}%</span>
							) : null}
						</p>
					</div>
				</div>
			</div>
			<span style={{fontSize: '20px', overflow: 'hidden'}}>
				${' '}
				{(product.PRECIO_BASE * (1 - product.OFERTA) * product.COUNT)
					.toFixed(0)
					.replace(/\D/g, '')
					.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')}
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
