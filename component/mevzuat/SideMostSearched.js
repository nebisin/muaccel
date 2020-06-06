import React from 'react';
import Link from 'next/link';

const SideMostSearched = () => {
	return (
		<div className="side-card side-card-sticky">
			<h2 className="side-card-title">Önerilen Aramalar</h2>
			<ul className="side-list side-list-sticky">
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/elektronik tebligat">
					<a className="side-list-item">
						<li>Elektronik Tebligat</li>
					</a>
				</Link>
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/konkordatonun feshi">
					<a className="side-list-item">
						<li>Konkordatonun Feshi</li>
					</a>
				</Link>
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/tahkim">
					<a className="side-list-item">
						<li>Tahkim</li>
					</a>
				</Link>
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/kötüniyetle istinaf">
					<a className="side-list-item">
						<li>Kötüniyetle İstinaf</li>
					</a>
				</Link>
				<Link href="/mevzuat/search/[term]" as="/mevzuat/search/geçersiz fesih">
				<a className="side-list-item">
					<li>Geçersiz fesih</li>
				</a>
			</Link>
			</ul>
		</div>
	);
};

export default SideMostSearched;
