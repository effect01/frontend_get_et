
import {Input, FormGroup, FormFeedback} from 'reactstrap';

import {lengthAndCharacter, equalString, cap} from './verify';

const SignIn = (onInputChange, password, LogReg, password2) => {
	return (
		<>
			<FormGroup>
				<Input
					type="text"
					className="form-control"
					placeholder="Email"
					name="email"
					required
					onChange={onInputChange}
				/>
			</FormGroup>

			<FormGroup>
				<Input
    
        
        valid={
          !LogReg && password && password.length > 0 ? true : null}
        invalid={
          !LogReg && password && password.length > 0
            ? lengthAndCharacter(password, 6, 16) && cap(password)
              ? false
              : true
            : null
        }
					type="password"
					name="password"
					autoComplete="current-password"
					className="form-control"
					placeholder="Contraseña"
					required
					onChange={onInputChange}
				/>

				<FormFeedback>
					{' '}
					Se requiere almenos 6 letras y una mayuscula
				</FormFeedback>
			</FormGroup>
			{LogReg ? null : (
				<FormGroup>
					<Input
						invalid={password &&	password.length > 0 && password2&&	password2.length > 0&& !equalString(password, password2) ? true:false}
						valid={
							password &&
							password.length > 0 &&
							equalString(password, password2)
								? true
								: false
						}
						type="password"
						name="password2"
						autoComplete="current-password"
						className="form-control"
						placeholder="Ingresa nuevamente la contraseña"
						required
						onChange={onInputChange}
					/>
					<FormFeedback> Ingrese la misma contraseña</FormFeedback>
				</FormGroup>
			)}

			{/* { LogReg ? null:

<div style={{ display:'flex',justifyContent: 'center', margin:'auto', marginBottom: '20px'}}>

 <Recaptcha
sitekey="6LeYq70ZAAAAADW7OZVfXqACOQzn3thesR_TSDYs"
render="explicit"
verifyCallback={this.verifyCallback}/> 
</div> } */}
			<Input
				type="submit"
				value={LogReg ? 'Inicia Sesión 😊' : 'Registrate Ahora!💕'}
			/>
		</>
	);
};

export default SignIn;
