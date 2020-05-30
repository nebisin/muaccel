import React from 'react';
import Link from 'next/link';

const SideMostSearched = () => {
	return (
		<div className="side-card side-card-sticky">
			<h2 className="side-card-title">Sık Arananlar</h2>
			<ul className="side-list">
				<Link href="#">
					<a className="side-list-item">
						<li>Yetki Sözleşmesi</li>
					</a>
				</Link>
				<Link href="#">
					<a className="side-list-item">
						<li>Ceza Kanunu</li>
					</a>
				</Link>
				<Link href="#">
					<a className="side-list-item">
						<li>Hakimin reddi</li>
					</a>
				</Link>
				<Link href="#">
					<a className="side-list-item">
						<li>Sulh hukuk</li>
					</a>
				</Link>
			</ul>
		</div>
	);
};

export default SideMostSearched;
