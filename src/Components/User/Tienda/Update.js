import Tienda from './Tienda';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Input, Form, FormGroup, FormFeedback} from 'reactstrap';
import {lengthAndCharacter} from '../../Sign/verify'
import {useHistory} from 'react-router-dom';

const Update = props => {
    
    const [state,setState] = useState({
		OFERTA:0
	});
	const [error, setError] = useState(false);
	const [successful, setSuccessful] = useState(false);

	const history = useHistory();
    useEffect(()=>{
        setError(false);
        if(props.auth.profile && props.auth.profile )fetchProduct(setState,props.id, props.auth.profile.ID);

    },[props])
    useEffect(()=>{
        if(error === false && successful){ history.push({
            pathname: '/user/tienda',
        })}

    },[successful])
    const onInputChange = (e) => {


        setState({...state,[e.target.name]: e.target.value});
      };
    
return(
    <Tienda props={props} index={3}>
     
 <div style={{    padding: '70px'}}>
 <h5>MODIFICAR PRODUCTO</h5>
 <Form onSubmit={()=>UpdateProducto( state, props.id , props.auth.token, setSuccessful , setError)}>
 <FormGroup>
				<Input
					invalid={ state && state.NOMBRE  && !lengthAndCharacter(state.NOMBRE,3, 60) ? true:false}
						
					type="text"
					className="form-control"
					placeholder="Titulo"
					name="NOMBRE"
					value={state.NOMBRE} 
					required
					onChange={onInputChange}
				/>
			</FormGroup>

            <FormGroup>
				<Input
					type="text"
					className="form-control"
					placeholder="URL imagen"
					name="URL_IMAGEN"
					value={state.URL_IMAGEN} 
					required
					onChange={onInputChange}
				/>
			</FormGroup>

            <FormGroup>
				<Input
					type="text"
					className="form-control"
					placeholder="Descripción"
					name="DESCRIPCION"
					value={state.DESCRIPCION} 
					onChange={onInputChange}
				/>
			</FormGroup>

            <FormGroup>
				<Input
					type="number"
					className="form-control"
					placeholder="Valor"
					name="PRECIO_BASE"
					value={state.PRECIO_BASE} 
					required
					onChange={onInputChange}
				/>
			</FormGroup>

            <FormGroup>
				<Input
					type="number"
					className="form-control"
					placeholder="Oferta"
					name="OFERTA"
					value={state.OFERTA} 
					required
					onChange={onInputChange}
				/>
			</FormGroup>
            <Input
            type="submit"
				value="Modificar"
			/>        </Form>

            {error && error ? <p>{error}</p>:null}
 </div>
</Tienda>
)

}

export default Update





const UpdateProducto = (data, id , token, setSuccessful , setError ) =>{

    var config = {
        method: 'put',
        url: `http://localhost:3001/PRODUCTOS/${id}`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setSuccessful(true);
      setError(false);
    })
    .catch(function (error) {
      setError(true);
      setSuccessful(false);
      console.log(error);
    });
    
    }


    const fetchProduct = (setState, id, id_tienda) => {
        axios
            .get(`http://localhost:3001/productos/${id}`)
            .then((res) => {
                return res;
            })
            .then((res) => setState({...res.data, TIENDA:id_tienda,loading: false}))
            .catch((res) =>
                // ERROR HANDLEE REDUX MISS
                setState({...res.response})
            );
    };
    