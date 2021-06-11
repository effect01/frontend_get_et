import React, {useState, useEffect} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

const Tienda = props=> {
    const {index , children} = props;

    return (
        <div style={{minHeight:'600px'}}>
            <div Style='    width: 1400px;
    background: #eeeeee;
    min-height: 700px;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 80px;'>
                <div>
                <Nav Style='color: #318251;
    pointer-events: painted;
    cursor: pointer;
    background: #e4e4e4;'>
						<NavItem>
                        <Link to='/user/tienda' style={{color: '#51725e',     display: 'block',   padding: '.5rem 1rem ', background: index == 1 ? 'lightgrey' : null }} >
							{' '}
								Productos{' '}
							</Link>
						</NavItem>
						<NavItem>
							<Link  to='/user/crear_producto' style={{color: '#51725e',     display: 'block',   padding: '.5rem 1rem ', background: index == 2 ? 'lightgrey' : null }} >
								Crear producto
							</Link>
						</NavItem>
				
					</Nav>
                </div>
                    <div>
                        
               {children}

                    </div>

            </div>

        </div>
    )
}

export default Tienda