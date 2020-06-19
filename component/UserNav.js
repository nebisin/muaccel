import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthContext from 'context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faEnvelope } from '@fortawesome/free-regular-svg-icons';

const UserNav = () => {
	const router = useRouter();
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
										fontSize: '24px',
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
										fontSize: '24px',
										marginLeft: '5px',
									}}
								/>
								<FontAwesomeIcon
									icon={faChevronDown}
									className="nav-link-button-icon"
									style={{
										fontSize: '14px',
										marginLeft: '5px',
										marginBottom: '3px',
									}}
								/>
								<ul
									className="usernav-dropdown"
									onClick={(event) => event.stopPropagation()}
									style={{ display: `${dropdown ? 'block' : 'none'}` }}
								>
									<li>
										<p className='usernav-name'>{userInfo.userName}</p>
									</li>
									<li>
										<Link href="/user/profile/me">
											<a>Hesabım</a>
										</Link>
									</li>
									<li>
										<Link href="/user/profile/me">
											<a>Ayarlar</a>
										</Link>
									</li>
									<li>
										<Link href="/user/logout">
											<a>Çıkış Yap</a>
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
								<a
									className={`navlink sm-none ${
										router.pathname.search('/user/register') !== -1 &&
										'navlink-active'
									}`}
								>
									Üye Ol
								</a>
							</Link>
						</li>
						<li>
							<Link href="/user/login">
								<a
									className={`navlink ${
										router.pathname.search('/user/login') !== -1 &&
										'navlink-active'
									}`}
								>
									Giriş Yap
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
