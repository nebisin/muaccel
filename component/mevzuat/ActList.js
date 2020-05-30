import React from 'react';
import ActItem from './ActItem';

const ActList = ({ items }) => {
	return (
		<div className="card-deck">
			{items.map((item) => (
				<ActItem key={item._id} item={item} />
			))}
		</div>
	);
};

export default ActList;

// Linklerden her biri ActItem olacak.
