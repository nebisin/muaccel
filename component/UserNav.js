import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthContext from 'context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const UserNav = () => {
	const router = useRouter();
	const { isLoggedIn, isLogging, userInfo } = useContext(AuthContext);

	return (
		<ul className="nav-list nav-list-right">
			{isLoggedIn ? (
				<React.Fragment>
					{userInfo && (
						<li>
							<button className="navlink-button">
								{userInfo.userName}
								<FontAwesomeIcon
									icon={faChevronDown}
									style={{
										fontSize: '14px',
										marginLeft: '5px',
									}}
								/>
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
