

import {Input, FormGroup, FormFeedback} from 'reactstrap';
import axios from 'axios';
import React, {useState, useEffect} from 'react';


const Producto  =  props=> {
    const  { producto , index, auth} = props;
    const e =  producto;
    console.log(e , index)
	const [error, setError] = useState();
    
	const [successful, setSuccessful] = useState();
	const [stock, setStock] = useState();
	const onInputChange = (e) => {
		setStock(e.target.value);
	};
    return(
        <div
        style={{
            justifyContent: 'space-between',
            background: index % 2 == 0 ? 'aliceblue' : 'gainsboro',
            display: 'flex',
            padding: '30px',
            alignItems: 'center',
        }}
    >
        <span>
            {e.NOMBRE} stock: {e.STOCK}{' '}
        </span>
        <div Style="  display: flex; ">
            <div
                Style="    justifyContent: center;
        alignContent: center;
        textAlign: center;
        alignItems: center;
                                display: flex; 
        "
            >
                <p Style="margin:auto;">Agregar stock:</p>
                <FormGroup Style="margin-bottom: 0rem ;  margin-right: 1rem; width: 120px;">
                    <Input
                        type="number"
                        className="form-control"
                        placeholder="00"
                        name="firstName"
                        required
                        onChange={onInputChange}
                    />
                    <FormFeedback>
                        {' '}
                        El nombre de usuario debe tener más de 3 letras y menos de
                        16
                    </FormFeedback>
                </FormGroup>

                <div
                    Style="
            margin: 0;
            background-color: #a7dbff;
            border: 0px;
            border-radius: 4rem;
            padding: 20px;
            padding-top: 7px;
            padding-bottom: 7px;
            pointerEvents: painted;
            cursor: pointer;
            
            transition: 0.3s ease-in-out all;"
                    onClick={() => agregarStockProducto(
                        stock,
                        e.ID,
                        setError,
                        setSuccessful
                    )}
                >
                    Añadir
                </div>
            </div>{' '}
            <div
                Style="
            margin: 0;
            background-color: #a7ffa9;
            border: 0px;
            border-radius: 4rem;
            padding: 20px;
            padding-top: 7px;
            
            padding-bottom: 7px;
            pointerEvents: painted;
            cursor: pointer;
            
            margin-left: 25px;
            transition: 0.3s ease-in-out all;"
            >
                Modificar
            </div>
            <div
                Style="
            background-color: #e26b66;
            border: 0px;
            border-radius: 4rem;
            padding: 20px;
            padding-top: 7px;
            margin: 0;
            padding-bottom: 7px;
            pointerEvents: painted;
            cursor: pointer;
            margin-left: 25px;
            transition: 0.3s ease-in-out all;"
           
           onClick={()=>  eliminarProducto( e.ID, auth.token, setError, setSuccessful)}
           >
                Eliminar
            </div>
            {successful && successful ? (
                <p   Style="
                margin:auto; 
                margin-left: 10px"
                    >Operacion realizado con exito</p>
            ) : null}
            {error && error === true ? (
                <p
                    Style="
            margin:auto; 
            margin-left: 10px"
                >
                    {' '}
                    Algo ha salido mal intentalo denuevo :({' '}
                </p>
            ) : null}
        </div>
    </div>

    )
}

export default Producto


const eliminarProducto = ( id, token, setError, setSuccessful) => {

    console.log(id)
var config = {
    method: 'delete',
    url: `http://localhost:3001/productos/${id}`,
    headers: { 
      'Authorization': `Bearer ${token}`
    }
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
};

const modificarProducto = () => {};

const agregarStockProducto = (data, id, setError, setSuccessful) => {
	var config = {
		method: 'post',
		url: `http://localhost:3001/stock/${id}`,
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
            "cantidad":data
        }
	};

	axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data.cantidad));
			setSuccessful(true);
			setError(false);
		})
		.catch(function (error) {
			setError(true);
			console.log(error);
		});
};
