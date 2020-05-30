import React from 'react';
import Link from 'next/link';

const ActItem = ({ item }) => {
	return (
		<Link href="/mevzuat/act/[id]" as={`/mevzuat/act/${item._id}`} >
			<a
				className="card-deck-item"
				style={{
					backgroundColor: item.background,
					borderColor: item.background,
				}}
			>
				<p className="card-deck-text">{item.name}</p>
			</a>
		</Link>
	);
};

export default ActItem;
