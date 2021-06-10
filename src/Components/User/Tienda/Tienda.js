import React, {useState, useEffect} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
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
							<NavLink Style='color: #51725e;' isSelect={index == 1 ? 'true' : 'false'}>
								{' '}
								Productos{' '}
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink Style='color: #51725e;'  isSelect={index == 2 ? 'true' : 'false'}>
								Crear producto
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink Style='color: #51725e;'   isSelect={index == 3 ? 'true' : 'false'}>
								Acerca de{' '}
							</NavLink>
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