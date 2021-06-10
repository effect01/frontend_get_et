import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Pedidos from './Pedidos';
const Index = (props) => {
	/// VAR
	const [state, setState] = useState({loading: true});
	const [error, setError] = useState(false);
	const [urlFinal, setUrlFinal] = useState();
    const [bodegueros, setBodegueros] = useState();
	const [list, setList] = useState([]);
    const [checkStock, setCheckStock] = useState(false);
	const [count, setCount] = useState(props.count);
	/// FUNCTIONS

	/// FETCH ITEMS, STATES
	useEffect(() => {
        console.log('cargar')
		fetchProducts(urlFinal, setState, setBodegueros, setError);
	}, [urlFinal]);
	useEffect(() => {
        console.log('hola')
		if (props.auth.profile && props.auth.profile.ROL_ID === 2){
			setUrlFinal(
				`http://localhost:3001/pedido/bycorreo/${props.auth.profile.CORREO}`
			)}else if(props.auth.profile && props.auth.profile.ROL_ID === 3){

                setUrlFinal(`http://localhost:3001/pedido/byvendedor/`)
            }else if(props.auth.profile && props.auth.profile.ROL_ID === 5){

                setUrlFinal(`http://localhost:3001/pedido/bodeguero/${props.auth.profile.ID}`)
            }else if(props.auth.profile && props.auth.profile.ROL_ID === 4){

                setUrlFinal(`http://localhost:3001/pedido/contador`)
            }

console.log(props.auth)
	}, [props]);
	/// RENDER
	return  state.loading === true ? (
		<p> loading </p>
	): error ? (
		<p> Error </p>
	) : state.status && state.status === 200 ? (
		<div
			Style="    width: 1200px;
            padding: 50px;
            background: #ececec;
            margin: auto;
            margin-top: 50px;"
		>
			<div id="">
				{typeof state.data === 'object' ? state.data.map((pedido) => (
					<Pedidos pedido={pedido} bodegueros={bodegueros.data}  auth={props.auth}></Pedidos>
				)): <p>
                    aun no tienes pedidos aun</p>}
			</div>
		</div>
	) : (
		<p>error ${state.status} </p>
	);
};

export default Index;

const fetchProducts = (urlFinal, setState, setBodega, setError) => {
	const url = axios.get(urlFinal)
    const bodegueros = axios.get('http://localhost:3001/bodega/')
        axios
        .all([url, bodegueros])
		.then(
			axios.spread(async (...responses) => {
            const resp = await responses[0]
            const bodega = await responses[1]
            console.log(bodega,resp)
			await setState({...resp, loading: false});
            await setBodega(bodega)
            
            setError(false)
			console.log(resp.data, resp);
		})
        )
		.catch( async (errors) => {
			// react on errors.
            setState({loading: true});
			setError(true);
			console.log(errors);
		})
};
