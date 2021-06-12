import Tienda from './Tienda';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Input, Form, FormGroup, FormFeedback} from 'reactstrap';
import {lengthAndCharacter} from '../../Sign/verify'
import {useHistory} from 'react-router-dom';

const Crear = props => {
    
    const [state,setState] = useState({
		OFERTA:0
	});
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
 <Form onSubmit={e =>CrearProducto( state, props.auth.token, setSuccessful , setError, e)}>
 <FormGroup>
				<Input
					invalid={ state && state.TITLE  && !lengthAndCharacter(state.TITLE,3, 60) ? true:false}
						
					type="text"
					className="form-control"
					placeholder="Titulo"
					name="TITLE"
					value={state.TITLE} 
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
					value={state.IMAGEN_URL} 
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
					name="VALOR"
					value={state.VALOR} 
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
				value="Crear Producto"
			/>        </Form>

            {error && error ? <p>{error}</p>:null}
 </div>
</Tienda>
)

}

export default Crear


const CrearProducto = (data,token, setSuccessful , setError , e) =>{
e.preventDefault()
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