import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthContext from 'context/AuthContext';

const UserNav = () => {
	const router = useRouter();
	const { isLoggedIn, isLogging } = useContext(AuthContext);

	return (
		<ul className="nav-list nav-list-right">
			{isLoggedIn ? (
				<React.Fragment>
					<li>
						<Link href="/user/profile/me">
							<a
								className={`navlink s-none ${
									router.pathname.search('/user/profile/me') !== -1 &&
									'navlink-active'
								}`}
							>
								Hesabım
							</a>
						</Link>
					</li>
					<li>
						<Link href="/user/logout">
							<a
								className={`navlink sm-none ${
									router.pathname.search('/user/logout') !== -1 &&
									'navlink-active'
								}`}
							>
								Çıkış Yap
							</a>
						</Link>
					</li>
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
									className={`navlink s-none ${
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
