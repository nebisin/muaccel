import React from 'react';
import Link from 'next/link';

const ActItem = ({ item }) => {
	return (
		<Link
			href="/mevzuat/[actName]/[id]/[page]"
			as={`/mevzuat/${item.name
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
