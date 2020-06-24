import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import AuthContext from 'context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faEnvelope } from '@fortawesome/free-regular-svg-icons';

const UserNav = () => {
	const { isLoggedIn, isLogging, userInfo } = useContext(AuthContext);
	const [dropdown, setDropdown] = useState(false);

	useEffect(() => {
		window.addEventListener('click', function (event) {
			setDropdown(false);
		});
	}, []);

	return (
		<ul className="nav-list nav-list-right">
			{isLoggedIn ? (
				<React.Fragment>
					{userInfo && (
						<li>
							<button className="navlink-button">
								<FontAwesomeIcon
									icon={faEnvelope}
									style={{
										fontSize: '22px',
										marginLeft: '5px',
									}}
								/>
							</button>
							<button
								className="navlink-button"
								onClick={(event) => {
									setDropdown(!dropdown);
									event.stopPropagation();
								}}
							>
								<FontAwesomeIcon
									icon={faUserCircle}
									className="nav-link-button-icon"
									style={{
										fontSize: '22px',
										marginLeft: '5px',
									}}
								/>
								<ul
									className="usernav-dropdown"
									onClick={(event) => event.stopPropagation()}
									style={{ display: `${dropdown ? 'block' : 'none'}` }}
								>
									<li>
										<p className="usernav-name">{userInfo.userName}</p>
									</li>
									<li>
										<Link href="/user/profile/me">
											<a onClick={() => setDropdown(false)} >Hesabım</a>
										</Link>
									</li>
									<li>
										<Link href="/user/profile/me">
											<a onClick={() => setDropdown(false)} >Ayarlar</a>
										</Link>
									</li>
									<li>
										<Link href="/user/logout">
											<a onClick={() => setDropdown(false)} >Çıkış Yap</a>
										</Link>
									</li>
								</ul>
							</button>
						</li>
					)}
				</React.Fragment>
			) : (
				!isLogging && (
					<React.Fragment>
						<li>
							<Link href="/user/register">
								<a className="navlink-button">
									<FontAwesomeIcon
										icon={faUserPlus}
										className="nav-link-button-icon"
										style={{
											fontSize: '20px',
											marginLeft: '5px',
										}}
									/>
								</a>
							</Link>
							<Link href="/user/login">
								<a className="navlink-button">
									<FontAwesomeIcon
										icon={faSignInAlt}
										className="nav-link-button-icon"
										style={{
											fontSize: '20px',
											marginLeft: '5px',
										}}
									/>
								</a>
							</Link>
						</li>
					</React.Fragment>
				)
			)}
		</ul>
	);
};

export default UserNav;
