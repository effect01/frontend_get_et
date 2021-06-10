import {lengthAndCharacter,cap } from './verify';
import {Input, FormGroup, FormFeedback} from 'reactstrap';
const SignUp = (onInputChange, firstName, lastName) => {
  return (
    <div>
      <FormGroup>
        <Input
          invalid={firstName && firstName.length > 0 ? lengthAndCharacter(firstName, 3, 16) ? false:true:null}
          valid={firstName && firstName.length > 0 ? true : null}
          type="text"
          className="form-control"
          placeholder="Nombre del usuario"
          name="firstName"
          required
          onChange={onInputChange}
        />
        <FormFeedback>
          {' '}
          El nombre de usuario debe tener más de 3 letras y menos de 16
        </FormFeedback>
      </FormGroup>

      <FormGroup>
        <Input
          invalid={lastName && lastName.length > 0 ? lengthAndCharacter(lastName, 3, 16) ? false:true:null}
          valid={lastName && lastName.length > 0 ? true : null}
          type="text"
          className="form-control"
          placeholder="Apellido paterno del usuario"
          name="lastName"
          required
          onChange={onInputChange}
        />
        <FormFeedback>
          {' '}
          El apellido de usuario debe tener más de 3 letras y menos de 16
        </FormFeedback>
      </FormGroup>





    </div>
  );
};
export default SignUp;
