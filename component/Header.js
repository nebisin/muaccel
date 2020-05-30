import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
var logo = require('../sitelogo.png')

const Header = () => {
	const [isSideOpen, setIsSideOpen] = useState(false);
	let toggler;
	isSideOpen &&
		(toggler = {
			backgroundColor: '#f2f2f2',
		});
	return (
		<div className="fixed-top">
			<nav
				className="navbar navbar-light shadow-sm"
				style={{ backgroundColor: 'white' }}
			>
				<NavLink to="/" className="navbar-brand" >
					<img src={logo} alt="" style={{height:'32px'}} />
				</NavLink>
				<button
					className="navbar-toggler d-block d-lg-none"
					onClick={() => setIsSideOpen(!isSideOpen)}
					style={toggler}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
			</nav>
			{isSideOpen && (
				<div className="d-block d-lg-none" style={{maxWidth: '300px', right: 0, position: 'absolute'}}>
					<ul className="list-group" style={{backgroundColor: 'white'}}>
						<li className="list-group-item list-group-item-action">
							Medenî Usul ve İcra-İflâs Hukuku
						</li>
						<li className="list-group-item list-group-item-action">
							İş ve Sosyal Güvenlik Hukuku
						</li>
						<li className="list-group-item list-group-item-action">
							Medeni Hukuk
						</li>
						<li className="list-group-item list-group-item-action">
							Ceza ve Ceza Muhakemesi Hukuku
						</li>
						<li className="list-group-item list-group-item-action">
							Ticaret Hukuku
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Header;
