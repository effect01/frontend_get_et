import Tienda from './Tienda';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Input, FormGroup, FormFeedback} from 'reactstrap';

import {useHistory} from 'react-router-dom';

const Crear = props => {
    
    const [state,setState] = useState();
	const [error, setError] = useState(false);
	const [successful, setSuccessful] = useState(false);

	const history = useHistory();
    useEffect(()=>{
        setError(false);
        if(props.auth.profile && props.auth.profile ) setState({...state, TIENDA: props.auth.profile.ID});

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
    <Tienda props={props} index={2}>
     
 <div style={{    padding: '70px'}}>
 <h5>CREAR PRODUCTO</h5>
 <FormGroup>
				<Input
					type="text"
					className="form-control"
					placeholder="Titulo"
					name="TITLE"
					required
					onChange={onInputChange}
				/>
			</FormGroup>

            <FormGroup>
				<Input
					type="text"
					className="form-control"
					placeholder="URL imagen"
					name="IMAGEN_URL"
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
					required
					onChange={onInputChange}
				/>
			</FormGroup>

            <FormGroup>
				<Input
					type="text"
					className="form-control"
					placeholder="Valor"
					name="VALOR"
					required
					onChange={onInputChange}
				/>
			</FormGroup>

            <FormGroup>
				<Input
					type="text"
					className="form-control"
					placeholder="Oferta"
					name="OFERTA"
					required
					onChange={onInputChange}
				/>
			</FormGroup>
            <Input
            type="submit"
            onClick={() => CrearProducto( state, props.auth.token, setSuccessful , setError)}
				value="Crear Producto"
			/>
            {error && error ? <p>{error}</p>:null}
 </div>
</Tienda>
)

}

export default Crear


const CrearProducto = (data,token, setSuccessful , setError ) =>{

var config = {
  method: 'post',
  url: 'http://localhost:3001/PRODUCTOS',
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