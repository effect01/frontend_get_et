import React from 'react';
import {
	Card,
	CardBody,
	CardLink,
	CardTitle,
	CardSubtitle,
	Row,
} from 'reactstrap';
import {Link} from 'react-router-dom';
function Card2({url, product}) {
	return (
		<CardLink>
			{' '}
			<Link to={'/producto/' + url}>
				<Card id="card-product">
					<div>
						<img src={product.URL_IMAGEN} />
					</div>

					<CardBody>
						<Row style={{display: 'grid'}}>
							<CardTitle tag="h4">{product.NOMBRE}</CardTitle>
							<CardSubtitle tag="h6" className="mb-2 text-muted">
								Stock: {product.STOCK}
							</CardSubtitle>

							<h2>
							CLP ${product.PRECIO_BASE * (1 - product.OFERTA)}
							
							
							</h2>
							<div>
							{product.PRECIO_BASE !=
								product.PRECIO_BASE * (1 - product.OFERTA) ? (
									<>CLP $
										<strike>{ (product.PRECIO_BASE)}</strike>
										<p
											style={{
												textAlign: 'center',
												padding: 'auto',
												fontStyle: 'normal',
												color: 'white',
												background: 'red',
												width: '33px',
												height: '19px',
												marginLeft: '5px',
											}}
										>
											-{product.OFERTA * 100}%
										</p>{' '}
									</>
								) : null}
							</div>
						</Row>
					</CardBody>
				</Card>
			</Link>
		</CardLink>
	);
}

export default Card2;
