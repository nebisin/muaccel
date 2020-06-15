import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGavel,
	faBookReader,
	faPeopleArrows,
	faLandmark,
} from '@fortawesome/free-solid-svg-icons';

const BottomBar = ({ active }) => {
	return (
		<div className="bottom-bar">
			<div className="bottom-bar-container">
				<Link href="/" as="/">
					<a className="bottom-bar-item">
						<FontAwesomeIcon
							icon={faLandmark}
							className={`bottom-bar-item-icon ${
								active === 0 && 'bottom-bar-item-icon-active'
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
								active === 1 && 'bottom-bar-item-icon-active'
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
								active === 2 && 'bottom-bar-item-icon-active'
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
								active === 3 && 'bottom-bar-item-icon-active'
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
