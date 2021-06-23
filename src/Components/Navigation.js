import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Dropdown,
	Row,
	Input,
	Col,
	Container,
} from 'reactstrap';
import axios from 'axios';

const Navigation = ({
	signOut,
	count,
	totalToBuy,
	auth,
	cart,
	addToCart,
	changeDelivery,
	changeNroToBuy,
	minusNroToBuy,
	deleteAItem,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [collProducts, setCollProducts] = useState('');
	const [cartTogle, setCartTogle] = useState(false);
	const [query, setQuery] = useState({Search: ''});
	const [suggested, setSuggested] = useState({data: []});
	const toggleNavbar = () => setCollapsed(!collapsed);
	const toggle = () => setIsOpen((prevState) => !prevState);
	const onInputChange = (e) => {
		setQuery({[e.target.name]: e.target.value});
	};

	useEffect(() => {
		loadSuggestion(query, setSuggested);
	}, [query, auth, cart]);

	return (
		<div>
			{/* COLLAPSER SECCION PRODUCTOS */}
			{collapseProducts(collProducts)}

			<Navbar className="navbar-black" expand="md">
				<NavbarBrand to="/"> LOGO </NavbarBrand>
				<NavbarToggler
					className="  navbar-toggler "
					onClick={toggleNavbar}
					navbar
				/>
				<Collapse isOpen={collapsed} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<Link className="nav-link" to="/home">
								INICIO
							</Link>
							<svg
								className="rect"
								height="2.5"
								width="50"
								dx="0px"
								fill="white"
							>
								<rect width="100" height="2.5" />
							</svg>
						</NavItem>

						<NavItem
							onMouseOver={() => {
								setCollProducts('active');
								setTimeout(function () {
									setCollProducts('');
								}, 1000);
							}}
						>
							<Link className="nav-link" to="/productos">
								PRODUCTOS
							</Link>
							<svg
								className="rect"
								height="2.5"
								width="50"
								dx="0px"
								fill="white"
							>
								<rect width="30" height="2.5" />
							</svg>
						</NavItem>

						<NavItem>
							<Link className="nav-link" to="/nosotros">
								NOSOTROS
							</Link>
							<svg
								className="rect"
								height="2.5"
								width="50"
								dx="0px"
								fill="white"
							>
								<rect width="30" height="2.5" />
							</svg>
						</NavItem>
						<NavItem>
							<Link className="nav-link" to="/contactanos">
								CONTACTANOS
							</Link>
							<svg
								className="rect"
								height="2.5"
								width="50"
								dx="0px"
								fill="white"
							>
								<rect width="30" height="2.5" />
							</svg>
						</NavItem>
						{auth.token && auth.token.length > 1
							? [
									menuUser(isOpen, toggle, signOut, auth),
									cartSvg(
										cart,
										deleteAItem,
										totalToBuy,
										count,
										addToCart,
										auth,
										changeDelivery,
										changeNroToBuy,
										minusNroToBuy,
										setCartTogle,
										cartTogle
									),
							  ]
							: loginButton()}
						{searcher(onInputChange, suggested)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};
export default Navigation;

const menuUser = (isOpen, toggle, signOut, auth) => (
	<Dropdown isOpen={isOpen} toggle={toggle}>
		<DropdownToggle nav style={{height: 'fit-content'}}>
			<div style={{height: '32px', display: 'flex'}}>
				<p
					style={{
						padding: 'auto',
						alignSelf: 'center',
						marginBottom: '0',
					}}
				>
					{auth.profile.NOMBRE.substring(0, 7)}
				</p>
			</div>
		</DropdownToggle>
		<DropdownMenu>

			<DropdownItem header>Mi Cuenta</DropdownItem>
			{auth.profile.ROL_ID === 2 ? (<Link to="/user/tienda">
				<DropdownItem>🚚 Tienda</DropdownItem>
			</Link>):null}
			

			<Link to="/user/pedidos">
				<DropdownItem>👜 Pedido</DropdownItem>
			</Link>
			<DropdownItem divider />
			<DropdownItem disabled>🔧Ajustes</DropdownItem>
			<DropdownItem onClick={signOut}>Cerrar Sesión</DropdownItem>
		</DropdownMenu>
	</Dropdown>
);

const loginButton = (_) => (
	<NavItem>
		<Link className="nav-link" to="/sign">
			<button className="button-red">Login </button>{' '}
		</Link>
	</NavItem>
);

const searcher = (onInputChange, suggested) => (
	<form class="ar">
		<div style={{height: '50px', display: 'flex'}}>
			<div class="black">
				<i class="icon-white">
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="search"
						class="svg-inline--fa fa-search fa-w-16 "
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path
							fill="currentColor"
							d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
						></path>
					</svg>
				</i>
			</div>
			<div id="navbar-searcher">
				<input
					name="Search"
					onChange={onInputChange}
					caret
					id="an"
					type="text"
					placeholder="Buscar..."
				/>

				{suggested.data && suggested.data.length ? (
					<DropdownMenu>
						{suggested.data.map((i) => (
							<Link to={'/product/' + i.id}>
								<DropdownItem>
									<h4 class="card-title">{i.NomProducto}</h4>
								</DropdownItem>
							</Link>
						))}
					</DropdownMenu>
				) : null}
			</div>
		</div>
	</form>
);

const collapseProducts = (collProducts) => (
	<div id="downShop" class={collProducts}>
		<Container style={{maxWidth: '60%'}}>
			<Col>{/* BANNE SIZES */}</Col>

			<svg width="1200" height="2.5" dx="0px" fill="white">
				<rect width="1100" height="2.5" />
			</svg>

			<Col>
				<Row>
					<Col>
						<h4>Libreria</h4>
						<ul>
							<li>
								<Link className="nav-link" to="/catalogo/Cuentos">
									Cuentos / Escolares
								</Link>
							</li>{' '}
							<li>
								<Link className="nav-link" to="/catalogo/Culto">
									Culto
								</Link>
							</li>
						</ul>
					</Col>
					<Col>
						<h4>Verdureria</h4>
						<ul>
							<li>
								<Link className="nav-link" to="/catalogo/Frutas">
									Frutas
								</Link>
							</li>{' '}
							<li>
								<Link className="nav-link" to="/catalogo/Verduras">
									Verduras
								</Link>
							</li>
						</ul>
					</Col>
					<Col>
						<h4>Almacen</h4>
						<ul>
							<li>
								<Link className="nav-link" to="/catalogo/Despensa">
									Despensa
								</Link>
							</li>
							<li>
								<Link className="nav-link" to="/catalogo/Snacks">
									Snacks
								</Link>
							</li>
						</ul>
					</Col>
					<Col>
						<h4>Otros</h4>
						<ul>
							<li>
								<Link className="nav-link" to="/catalogo/pasteleria">
									Pasteleria / Comida
								</Link>
							</li>
							<li>
								<Link className="nav-link" to="/catalogo/Tecnologia">
									Tecnologia
								</Link>
							</li>
							<li>
								<Link className="nav-link" to="/catalogo/tecnologia">
									Hogar
								</Link>
							</li>
						</ul>
					</Col>
				</Row>
			</Col>
		</Container>
	</div>
);

const cartSvg = (
	cart,
	deleteAItem,
	total,
	count,
	addToCart,
	auth,
	changeDelivery,
	changeNroToBuy,
	minusNroToBuy,
	setCartTogle,
	cartTogle
) => (
	<Dropdown id="cart">
		<div
			onClick={(e) => setCartTogle(!cartTogle)}
			style={{
				cursor: 'pointer',
				minWidth: '21px',
				minHeight: '21px',
				display: 'inline',
				margin: '18px',
				marginRight: '0',
				position: 'fixed',
				position: 'absolute',
				color: 'blue',
			}}
		>
			{count > 0 ? (
				<svg height="100" width="100">
					<circle cx="12" cy="13" r="9" fill="#52ff97" />
					<text x="12" y="14" text-anchor="middle" stroke="white" dy=".3em">
						{count}
					</text>
				</svg>
			) : null}
		</div>
		<div
			onClick={(e) => setCartTogle(!cartTogle)}
			style={{
				display: 'block',
				color: 'white',
				width: '40px',
				height: '35px',
				padding: '5px',
				fill: '#fff8f8',
				cursor: 'pointer',
				paddingTop: '3px',
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				id="Capa_1"
				x="0px"
				y="0px"
				Style={{color: 'inherit', fill: 'inherit'}}
				viewBox="0 0 446.843 446.843"
			>
				<g>
					<path d="M444.09,93.103c-2.698-3.699-7.006-5.888-11.584-5.888H109.92c-0.625,0-1.249,0.038-1.85,0.119l-13.276-38.27   c-1.376-3.958-4.406-7.113-8.3-8.646L19.586,14.134c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591   l60.768,23.872l74.381,214.399c-3.283,1.144-6.065,3.663-7.332,7.187l-21.506,59.739c-1.318,3.663-0.775,7.733,1.468,10.916   c2.24,3.183,5.883,5.078,9.773,5.078h11.044c-6.844,7.616-11.044,17.646-11.044,28.675c0,23.718,19.298,43.012,43.012,43.012   s43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.044-28.675h93.776c-6.847,7.616-11.048,17.646-11.048,28.675   c0,23.718,19.294,43.012,43.013,43.012c23.718,0,43.012-19.294,43.012-43.012c0-11.029-4.2-21.059-11.043-28.675h13.433   c6.599,0,11.947-5.349,11.947-11.948c0-6.599-5.349-11.947-11.947-11.947H143.647l13.319-36.996   c1.72,0.724,3.578,1.152,5.523,1.152h210.278c6.234,0,11.751-4.027,13.65-9.959l59.739-186.387   C447.557,101.567,446.788,96.802,444.09,93.103z M169.659,409.807c-10.543,0-19.116-8.573-19.116-19.116   s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117S180.202,409.807,169.659,409.807z M327.367,409.807   c-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117c10.542,0,19.116,8.574,19.116,19.117   S337.909,409.807,327.367,409.807z M402.52,148.149h-73.161V115.89h83.499L402.52,148.149z M381.453,213.861h-52.094v-37.038   h63.967L381.453,213.861z M234.571,213.861v-37.038h66.113v37.038H234.571z M300.684,242.538v31.064h-66.113v-31.064H300.684z    M139.115,176.823h66.784v37.038h-53.933L139.115,176.823z M234.571,148.149V115.89h66.113v32.259H234.571z M205.898,115.89v32.259   h-76.734l-11.191-32.259H205.898z M161.916,242.538h43.982v31.064h-33.206L161.916,242.538z M329.359,273.603v-31.064h42.909   l-9.955,31.064H329.359z" />
				</g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
			</svg>
		</div>

		<div className={cartTogle ? 'active' : ''}>
			<span style={{fontSize: '13px', color: 'grey'}}>Mi Carrito </span>
			<DropdownItem divider />

			<div style={{maxHeight: '500px', overflowY: 'auto'}}>
				{cart && cart.length > 0 ? (
					cart.map((i) =>
						Items(
							i,
							deleteAItem,
							minusNroToBuy,
							cart,
							addToCart,
							changeDelivery,
							changeNroToBuy
						)
					)
				) : (
					<p
						style={{
							fontSize: '11px',
							color: 'grey',
							textAlign: 'center',
							margin: 'auto',
						}}
					>
						lista vacia
					</p>
				)}
			</div>
			<DropdownItem divider />

			{total > 0 ? (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div>
						<strike>
							{' '}
							<span style={{color: 'gray'}}> </span>{' '}
						</strike>
						<h5>
							$
							{total
								.toFixed(0)
								.replace(/\D/g, '')
								.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')}
						</h5>
					</div>
					<Link
						onClick={() => setCartTogle(!cartTogle)}
						className="nav-link"
						to="/pago"
					>
						<h5 className="pay-button">PAGAR</h5>
					</Link>
				</div>
			) : null}
		</div>
	</Dropdown>
);

const Items = (
	cart,
	deleteAItem,
	minusNroToBuy,
	cartOriginal,
	addToCart,
	changeDelivery,
	changeNroToBuy
) => {
	return (
		<>
			<span style={{fontSize: '13px', color: 'rgb(56 115 80)'}}>
				{cart.tienda}
			</span>

			{cart.product.map((product) => (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							width: '145px',
							fontSize: '11px',
						}}
					>
						<div style={{width: '40px', height: '40px', background: 'orange'}}>
							<img
								style={{width: '40px', height: '40px'}}
								src={product.URL_IMAGEN}
								alt=""
							/>
							<button
								className="circle-botton-x"
								onClick={(_) => deleteAItem(cartOriginal, product.ID)}
							>
								<span style={{fontVariant: 'unicase'}}>x </span>
							</button>
						</div>
						<div>
							<div>
								<Link to={'/producto/' + product.ID}>
									{product.NOMBRE.substr(0, 16) + '..'}
								</Link>
							</div>

							<div>
								<button
									className="circle-botton"
									onClick={(_) =>
										minusNroToBuy(cartOriginal, cart.id, product.subId)
									}
								>
									<i>-</i>
								</button>
								<input
									onChange={async (e) => {
										await changeNroToBuy(
											cartOriginal,
											cart.id,
											e.target.value,
											product.subId
										);
									}}
									style={{width: '20px'}}
									value={product.count}
								/>
								<button
									className="circle-botton"
									onClick={(_) => addToCart(cartOriginal, product, 1)}
								>
									<i>+</i>
								</button>
							</div>
						</div>
					</div>

					<div style={{display: 'block'}}>
						<span style={{overflow: 'hidden'}}>
							$
							{(product.PRECIO_BASE * (1 - product.OFERTA ?? 0) * product.count)
								.toFixed(0)
								.replace(/\D/g, '')
								.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')}
						</span>{' '}
						<br />
						{product.OFERTA > 0 ? (
							<strike>
								<span style={{overflow: 'hidden'}}>
									$
									{(product.PRECIO_BASE * product.count)
										.toFixed(0)
										.replace(/\D/g, '')
										.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, '.')}
								</span>
							</strike>
						) : null}
					</div>
				</div>
			))}

			<div
				style={{
					justifyContent: 'space-between',
					display: 'flex',
					fontSize: '12px',
					color: 'grey',
				}}
			>
				<div>
					Tipo de envio
					<Input
						style={{width: 'fit-content'}}
						type="select"
						bsSize="sm"
						name="select"
						id="exampleSelect"
						onChange={(e) =>
							changeDelivery(cartOriginal, cart.id, e.target.value)
						}
					>
						<option value={'Gratis'} selected={cart.retiro === 'Gratis'}>
							Retiro
						</option>
						<option value={2000} selected={cart.retiro === 2000}>
							{' '}
							Despacho{' '}
						</option>
					</Input>
				</div>
				<span style={{marginTop: 'auto'}}> {cart.retiro} </span>
			</div>

			<DropdownItem divider />
		</>
	);
};

const loadSuggestion = (query, setSuggested) => {
	if (query.Search.length > 2) {
		axios
			.get(
				`http://localhost:1337/productos?_where[NomProducto_contains]=${query.Search}&_start=0&_limit=2`
			)
			.then((res) => {
				setSuggested({...res});
			})
			.catch((err) => console.error(err));
	} else {
		setSuggested({data: []});
	}
};
