import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTwitter,
	faInstagram,
	faFacebook,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
	return (
		<footer>
			<div className="container">
				<div className="footer-list">
					<ul className="footer-list-left">
						<li>
							<Link href="/">
								<a>Kullanım Koşulları</a>
							</Link>
						</li>
						<li>
							<Link href="/">
								<a>Gizlilik Politikası</a>
							</Link>
						</li>
						<li>
							<Link href="/">
								<a>Yardım</a>
							</Link>
						</li>
					</ul>
					<ul className="footer-list-right">
						<li className="footer-list-right-but-text">
							<Link href="/">
								<a>İletişim</a>
							</Link>
						</li>
						<li>
							<a href="https://twitter.com/muaccelcom">
								<FontAwesomeIcon icon={faTwitter} />
							</a>
						</li>
						<li>
							<a href="https://twitter.com/muaccelcom">
								<FontAwesomeIcon icon={faFacebook} />
							</a>
						</li>
						<li>
							<a href="https://twitter.com/muaccelcom">
								<FontAwesomeIcon icon={faInstagram} />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
