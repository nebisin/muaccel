import React from 'react';
import Link from 'next/link';

const SideMostSearched = () => {
	return (
		<div className="side-card side-card-sticky">
			<h2 className="side-card-title">Sık Arananlar</h2>
			<ul className="side-list">
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/tebligat">
					<a className="side-list-item">
						<li>Tebligat</li>
					</a>
				</Link>
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/konkordato">
					<a className="side-list-item">
						<li>Konkordato</li>
					</a>
				</Link>
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/tahkim">
					<a className="side-list-item">
						<li>Tahkim</li>
					</a>
				</Link>
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/arabuluculuk">
					<a className="side-list-item">
						<li>Arabuluculuk</li>
					</a>
				</Link>
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/temyiz">
				<a className="side-list-item">
					<li>Temyiz</li>
				</a>
			</Link>
			</ul>
		</div>
	);
};

export default SideMostSearched;
