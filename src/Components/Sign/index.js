import React, {Component} from 'react';
import {
  Collapse,
  Row,
  CardBody,
  Col,
  Card,
  Alert,
  Container,
  FormGroup,
  Form,
} from 'reactstrap';
import {Transition} from 'react-transition-group';
import Register from './signUp';
import Login from './signIn';

import SocialButton from './SocialButton'

const handleSocialLogin = (user) => {
  console.log(user)
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

export default class Sign extends Component {
  state = {
    email: null,
    password: null,
    password2: null,
    firstName: null,
    lastName: null,
    LogReg: true,
    Error: this.props.auth.err,
    verCatch: false,
  };
  onInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSelectChange = (e) => {
    this.setState({[e.target.name]: e.target.selectedIndex});
  };

  onSubmit = async (e) => {
    e.preventDefault();

    if(this.state.LogReg){
      this.props.signIn(this.state.email, this.state.password);
    }else{
      this.props.signUp(this.state);
    }
  }
componentDidUpdate(prevProps){
  if(prevProps.auth.err !== this.props.auth.err){
    if( this.props.auth.err === 'signup_success'){this.setState({LogReg:true})}
    else{
      this.setState({ Error: this.props.auth.err })
    }
   
     }
 

}


 
  render() {
    ///////////////////////// the loading state is "end" and then show the error (this fix the transition)
    // if(!this.state.Error && !this.state.LogReg && this.props.auth.authError){
    // 	this.setState({ Error: true});
    // }
	const nav =(
		<Container>
		<Row style={{display: 'flex', margin: 'auto'}}>
		  <Col
			className="col-sm"
			style={{
			  cursor: this.state.LogReg ? '' : 'pointer',
			  color: !this.state.LogReg ? 'grey' : 'black',
			}}
			onClick={() => this.setState({LogReg: true})}
		  >
			<h4>Iniciar sesión</h4>{' '}
		  </Col>
		  <Col
			className="col-sm"
			style={{
			  cursor: this.state.LogReg ? 'pointer' : '',
			  color: this.state.LogReg ? 'grey' : 'black',
			}}
			onClick={() => this.setState({LogReg: false})}
		  >
			<h4>Registrarse</h4>
		  </Col>
		</Row>
	  </Container>

	)
   const {Redirect}= this.props;
   if(this.props.auth && this.props.auth.length > 1 ) {
     console.log('hola')
     return <Redirect to='/'/>
    }
   
    return this.props.auth.token && this.props.auth.token.length > 1  ? <Redirect to='/'/>:(

      <div className="background-sign">
        <Card
          className="card"
          style={{width: '700px', margin: 'auto'}} >
          <CardBody style={{margin: '20px'}}>
      		{nav}
            <FormGroup></FormGroup>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                {/* REGISTER PARAMS */}
                {this.state.LogReg
                  ? null
                  : Register(
                      this.onInputChange,
                      this.state.firstName,
                      this.state.lastName,
                    
                    )}
                {/* LOGIN PARAMS */}
                {Login(
                  this.onInputChange,
                  this.state.password,
                  this.state.LogReg,
                  this.state.password2
                )}
              </FormGroup>
            </Form>

            {/* ERRORS*/}
            <Transition in={ this.state.Error } timeout={150}>
              <Collapse isOpen={ this.state.Error }>
                <Alert style={{marginTop: '1rem'}} color="danger">
                  <CardBody class="alert alert-primary" role="alert">
                      { this.state.Error } 
                  </CardBody>
                </Alert>
              </Collapse>
            </Transition>
            {/*  */}

            <h5>o inicia con  </h5>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem',
                width: '10rem',
                margin: 'auto',
              }}
            >
              <img
                id="google"
                onClick={e => this.props.signUpPopup(e.target.id)}
                src="https://cdn.windowsreport.com/wp-content/uploads/2016/10/Google-icon.jpg"
                style={{
                  width: '30px',
                  height: '30px',
                  color: 'black',
                  marginTop: 'auto',
                  cursor: 'pointer',
                }}
              />
 <SocialButton
      provider='google'
      appId='625542756535-aba93ef5stdnffef8hmmuku9lr63fmeq.apps.googleusercontent.com'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >  
    </SocialButton>
              <img
                id="TWITTER-login"
                onClick={this.signUpPopup}
                src="https://blog.bitmex.com/wp-content/uploads/2018/10/kisspng-social-media-iphone-organization-logo-twitter-5abe3024502f30.2043853815224136043284.jpg"
                style={{
                  width: '30px',
                  height: '30px',
                  color: 'black',
                  marginTop: 'auto',
                  cursor: 'pointer',
                }}
              />
            </div>
            {/* <button id='btnSignOut'  className="btn btn-danger" onClick={this.props.signOut} > 
					signOUT
					</button> */}
            {this.state.LogReg ? <a href="#"> Olvidaste tu contraseña? </a> : null}
          </CardBody>
        </Card>
      </div>
    );
  }
}
