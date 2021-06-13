import React ,{useEffect}from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';


import Sign from './Components/Sign/index';
import Navigation from './Components/Navigation.js';
import Footer from './Components/Footer.js';
import Tienda from './Components/User/Tienda/Productos';
import CrearProducto from './Components/User/Tienda/Crear';
import Pago from './Components/Pago';
import UpdateProducto from './Components/User/Tienda/Update';
// import Users from './Components/User/Users.js';
// import User from './Components/User/User.js';
import Products from './Components/Products/Products';
import Producto from './Components/Products/ProductDetails'
// import Home from './Components/Layout/Home.js';
// import Store from './Components/Stores/Store/Products';
// import Favorite from './Components/Profile/Favorite'
// import StoreFavorite from './Components/Profile/FavStores'
// import ListStore from './Components/Stores/ListStore';

// import About from './Components/Layout/AboutUs';
// import Contact from './Components/Layout/ContactUs'
import {
  signIn,
  signUp,
  signOut,
  signUpPopup,
  fetchAuth,
  
} from './store/actions/auth.actions';
import {
  deleteFavoriteProduct,
  addToFavorite,
  deleteFavoriteStore,
  addStoreToFavorite,
} from './store/actions/profile.action';

import {
  changeDelivery,
  minusNroToBuy,
  addToCart,
  deleteAItem,
  changeNroToBuy
} from './store/actions/cart.actions';

function App(props) {

// INIZIALATION
const {signIn, cart,initStateCart,loadCartCache ,deleteAItem,minusNroToBuy,changeNroToBuy, changeDelivery, signUp,addStoreToFavorite,addToCart,  signOut , auth ,deleteFavoriteStore ,fetchAuth, deleteFavoriteProduct , addProductToFavorite } = props;
// SETTING CACHE ? 

useEffect(async ()=>{

  if(auth.token === null || auth.token === undefined){
    if( localStorage.getItem('auth') ){
    
      const auth = await JSON.parse(localStorage.getItem('auth') ) ;
      fetchAuth(auth.profile.CORREO, auth.token);
      if(localStorage.getItem('cart-items')){
        const cacheItems = await JSON.parse(localStorage.getItem('cart-items') ) ;
        const cacheCount = await  parseInt( localStorage.getItem('cart-count'));
        const cacheTotal = await   parseInt(  localStorage.getItem('cart-total'));
       
        console.log(cart)
        
      loadCartCache(cacheItems, cacheCount, cacheTotal);
      }



      axios.defaults.headers.common =  {'Authorization': `Bearer ${auth.token}`}

    }
  }else{
    axios.defaults.headers.common =  {'Authorization': `Bearer ${auth.token}`}
  }
},[props.props])

  return (
    <div className="App">
  <Router>
{/* NAVEGADOR */}
<Navigation deleteAItem={deleteAItem} minusNroToBuy={minusNroToBuy} totalToBuy={cart.total} count={cart.count} changeNroToBuy={changeNroToBuy} changeDelivery={changeDelivery} addToCart={addToCart}signOut={signOut} cart={cart.items} auth={auth} /> 
  <div >
  {/* ROOOT */}
    <Route exact path='/' render={ () => <Redirect to={{  pathname: "/home"}}/>}    /> 
    {/* <Route exact path='/home' render={ () => <Home  />}   /> */}
    <Route path='/sign' render={ () => <Sign signIn={signIn} signUp={signUp} auth={auth} Redirect={Redirect}/>} />
    <Route path='/pago' exact render={ () => <Pago initStateCart={initStateCart} auth={auth} cart={cart} />} />

    {/* <Route exact path='/users' render={ () => <Users  />}   />
    <Route exact path='/user/:id' render={ () => <User  />}   /> */}
 <Route path='/user/tienda' render={ () => <Tienda auth={auth} />} />
 <Route path='/user/crear_producto' render={ () => <CrearProducto auth={auth} />} />
 <Route path='/user/update_producto/:id' render={ props => <UpdateProducto auth={auth} id={props.match.params.id} />} />
 <Route exact path='/productos' render={ _ =><Redirect to={{  pathname: "/productos/page-1"}}/>}/>
<Route exact path='/productos/page-:nro' render={ props => <Products  props={props} auth={auth} url={`http://localhost:3001/PRODUCTOS?`}  pagination={`&_start=${( 10*(props.match.params.nro-1)+1 )}&_limit=${10*(props.match.params.nro)}`} />}   />
   
 <Route  path='/producto/:id' render={ props => <Producto  props={props} addToCart={addToCart} cart={cart.items}  auth={auth}  deleteFavorite={deleteFavoriteProduct} addProductToFavorite={addProductToFavorite}/>}   />
   
   
 </div>   
{/* FOOTER */}
<Footer/> 

</Router>

    </div>
  );
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signIn: (username,password) => dispatch(signIn(username,password)),
    signUp: (newUser) => dispatch(signUp(newUser)),
    signOut: _ => dispatch(signOut()),
    signUpPopup: id => dispatch(signUpPopup(id)),
    initStateCart: _ => dispatch({type:'INIT_STATE_CART'}),
    fetchAuth: (id, token) => dispatch(fetchAuth(id,token)),
    addProductToFavorite: (iduser, idproduct)  => dispatch(addToFavorite(iduser, idproduct)),
    deleteFavoriteProduct: (iduser, idproduct)  => dispatch(deleteFavoriteProduct(iduser, idproduct)),
    deleteFavoriteStore: (iduser, idproduct)  => dispatch(deleteFavoriteStore(iduser, idproduct)),
    addStoreToFavorite: (iduser, idproduct)  => dispatch(addStoreToFavorite(iduser, idproduct)),
    addToCart: (items, product  , nroToBuy)  => dispatch(addToCart(items, product, nroToBuy)),
    changeDelivery:(items, product , newState ) => dispatch(changeDelivery(items, product, newState)),
    changeNroToBuy: (items, product , newState, idSubProduct ) => dispatch(changeNroToBuy(items, product, newState, idSubProduct)),
    minusNroToBuy : (items, product , idSubProduct ) => dispatch(minusNroToBuy(items, product, idSubProduct)),
    deleteAItem: (items, idSubProduct) => dispatch(deleteAItem(items, idSubProduct)),
    loadCartCache:  (  cacheItems,cacheCount,cacheTotal) => dispatch({ type: 'CACHE_CART_LOAD_SUCCESS',items: cacheItems,count: cacheCount,total: cacheTotal,}),

  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
