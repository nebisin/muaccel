import Link from 'next/link';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGavel,
	faBookReader,
	faPeopleArrows,
	faLandmark,
} from '@fortawesome/free-solid-svg-icons';

const BottomBar = ({ active }) => {
	const router = useRouter();

	return (
		<div className="bottom-bar">
			<div className="bottom-bar-container">
				<Link href="/" as="/">
					<a className="bottom-bar-item">
						<FontAwesomeIcon
							icon={faLandmark}
							className={`bottom-bar-item-icon ${
								router.pathname === '/' && 'bottom-bar-item-icon-active'
							}`}
						/>

						<div className="bottom-bar-item-text">Anasayfa</div>
					</a>
				</Link>
				<Link href="/mevzuat" as="/mevzuat">
					<a className="bottom-bar-item">
						<FontAwesomeIcon
							icon={faGavel}
							className={`bottom-bar-item-icon ${
								router.pathname.search('/mevzuat') !== -1 &&
								'bottom-bar-item-icon-active'
							}`}
						/>
						<div className="bottom-bar-item-text">Mevzuat</div>
					</a>
				</Link>
				<Link href="/blog" as="/blog">
					<a className="bottom-bar-item">
						<FontAwesomeIcon
							icon={faBookReader}
							className={`bottom-bar-item-icon ${
								router.pathname.search('/blog') !== -1 &&
								'bottom-bar-item-icon-active'
							}`}
						/>
						<div className="bottom-bar-item-text">Blog</div>
					</a>
				</Link>
				<Link href="/meydan" as="/meydan">
					<a className="bottom-bar-item">
						<FontAwesomeIcon
							icon={faPeopleArrows}
							className={`bottom-bar-item-icon ${
								router.pathname.search('/meydan') !== -1 &&
								'bottom-bar-item-icon-active'
							}`}
						/>
						<div className="bottom-bar-item-text">Meydan</div>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default BottomBar;
