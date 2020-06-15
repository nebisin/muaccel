import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGavel,
	faBookReader,
	faPeopleArrows,
} from '@fortawesome/free-solid-svg-icons';

const BottomBar = () => {
	return (
		<div className="bottom-bar">
			<div className="bottom-bar-container">
				<Link href="/mevzuat">
					<a className="bottom-bar-item">
						<FontAwesomeIcon icon={faGavel} className="bottom-bar-item-icon" />

						<div className="bottom-bar-item-text">Mevzuat</div>
					</a>
				</Link>
				<Link href="/blog">
					<a className="bottom-bar-item">
						<FontAwesomeIcon
							icon={faBookReader}
							className="bottom-bar-item-icon"
						/>
						<div className="bottom-bar-item-text">Blog</div>
					</a>
				</Link>
				<Link href="/meydan">
					<a className="bottom-bar-item">
						<FontAwesomeIcon
							icon={faPeopleArrows}
							className="bottom-bar-item-icon"
						/>
						<div className="bottom-bar-item-text">Meydan</div>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default BottomBar;
