import React from 'react';
import Link from 'next/link';

const SideCategories = () => {
	return (
		<div className="side-card">
			<h2 className="side-card-title">Kategoriler</h2>
			<ul className="side-list">
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/0">
					<a className="side-list-item">
						<li>Medenî Usul ve İcra-İflâs Hukuku</li>
					</a>
				</Link>
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/1">
					<a className="side-list-item">
						<li>İş ve Sosyal Güvenlik Hukuku</li>
					</a>
				</Link>
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/2">
					<a className="side-list-item">
						<li>Medeni Hukuk</li>
					</a>
				</Link>
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/3">
					<a className="side-list-item">
						<li>Ceza ve Ceza Muhakemesi Hukuku</li>
					</a>
				</Link>
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/4">
				<a className="side-list-item">
					<li>Milletlerarası Özel Hukuk ve Usul Hukuku</li>
				</a>
			</Link>
			</ul>
		</div>
	);
};

export default SideCategories;
