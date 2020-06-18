import { useContext } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AuthContext from 'context/AuthContext';

const HeroButtons = () => {
	const { isLoggedIn, isLogging } = useContext(AuthContext);
	return (
		<div className="hero-buttons">
			{!isLoggedIn ? (
				<React.Fragment>
					<Link href="/user/register" as="/user/register">
						<a>
							<div className="register-button">
								{isLogging ? (
									<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
								) : (
									'Üye Ol'
								)}
							</div>
						</a>
					</Link>
					<Link href="/user/login" as="/user/login">
						<a>
							<div className="login-button">
								{isLogging ? (
									<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
								) : (
									'Giriş Yap'
								)}
							</div>
						</a>
					</Link>
				</React.Fragment>
			) : (
				<React.Fragment>
					<Link href="/user/profile/me" as="/user/profile/me">
						<a>
							<div className="register-button">
								{isLogging ? (
									<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
								) : (
									'Hesabım'
								)}
							</div>
						</a>
					</Link>
					<Link href="/user/logout" as="/user/logout">
						<a>
							<div className="login-button">
								{isLogging ? (
									<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
								) : (
									'Çıkış Yap'
								)}
							</div>
						</a>
					</Link>
				</React.Fragment>
			)}
		</div>
	);
};

export default HeroButtons;
