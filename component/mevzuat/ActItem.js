import React from 'react';
import Link from 'next/link';

const ActItem = ({ item }) => {
	return (
		<Link
			href="/mevzuat/[actName]/[id]/[page]"
			as={`/mevzuat/${item.name
				.toLocaleLowerCase('tr')
				.replace(/ğ/gim, 'g')
				.replace(/ü/gim, 'u')
				.replace(/ş/gim, 's')
				.replace(/ı/gim, 'i')
				.replace(/ö/gim, 'o')
				.replace(/ç/gim, 'c')
				.replace(/\s/g, '-')
				.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${item._id}/0`}
		>
			<a
				className="card-deck-item"
				style={{
					backgroundColor: item.background,
				}}
			>
				<p className="card-deck-text">{item.name}</p>
			</a>
		</Link>
	);
};

export default ActItem;
