import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import AuthContext from 'context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
			<li>
				<Link href="/mevzuat" as="/mevzuat">
					<a
						className={`navlink s-none ${
							router.pathname.search('/mevzuat') !== -1 && 'navlink-active'
						}`}
					>
						Mevzuat
					</a>
				</Link>
			</li>
			<li>
				<Link href="/blog" as="/blog">
					<a
						className={`navlink s-none ${
							router.pathname.search('/blog') !== -1 && 'navlink-active'
						}`}
					>
						Blog
					</a>
				</Link>
			</li>
			<li>
				<Link href="/meydan" as="/meydan">
					<a
						className={`navlink s-none ${
							router.pathname.search('/meydan') !== -1 && 'navlink-active'
						}`}
					>
						Meydan
					</a>
				</Link>
			</li>
			{isLoggedIn ? (
				<React.Fragment>
					{userInfo && (
						<li>
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
										fontSize: '27px',
									}}
								/>
								<ul
									className="usernav-dropdown"
									onClick={(event) => event.stopPropagation()}
									style={{ display: `${dropdown ? 'block' : 'none'}` }}
								>
									<li>
										<p className="usernav-name">{userInfo.name}</p>
									</li>
									<li>
										<Link href="/user/profile/me">
											<a onClick={() => setDropdown(false)}>Hesabım</a>
										</Link>
									</li>
									<li>
										<Link href="/user/profile/me">
											<a onClick={() => setDropdown(false)}>Ayarlar</a>
										</Link>
									</li>
									<li>
										<Link href="/user/logout">
											<a onClick={() => setDropdown(false)}>Çıkış Yap</a>
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
							<Link href="/user/login">
								<a className="navlink-button">
									<FontAwesomeIcon
										icon={faSignInAlt}
										className="nav-link-button-icon"
										style={{
											fontSize: '27px',
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
