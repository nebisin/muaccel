import React from 'react';
import Link from 'next/link';

const SideCategories = ({ id }) => {
	return (
		<div className="side-card">
			<h2 className="side-card-title">Kategoriler</h2>
			<ul className="side-list">
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/0">
					<a
						className={`side-list-item ${
							id === '0' && 'side-list-item-selected'
						}`}
					>
						<li>Medenî Usul ve İcra-İflâs Hukuku</li>
					</a>
				</Link>
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/1">
					<a
						className={`side-list-item ${
							id === '1' && 'side-list-item-selected'
						}`}
					>
						{' '}
						<li>İş ve Sosyal Güvenlik Hukuku</li>
					</a>
				</Link>
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/2">
					<a
						className={`side-list-item ${
							id === '2' && 'side-list-item-selected'
						}`}
					>
						{' '}
						<li>Medeni Hukuk</li>
					</a>
				</Link>
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/3">
					<a
						className={`side-list-item ${
							id === '3' && 'side-list-item-selected'
						}`}
					>
						{' '}
						<li>Ceza ve Ceza Muhakemesi Hukuku</li>
					</a>
				</Link>
				<Link href="/mevzuat/categories/[id]" as="/mevzuat/categories/4">
					<a
						className={`side-list-item ${
							id === '4' && 'side-list-item-selected'
						}`}
					>
						{' '}
						<li>Milletlerarası Özel Hukuk ve Usul Hukuku</li>
					</a>
				</Link>
			</ul>
		</div>
	);
};

export default SideCategories;
