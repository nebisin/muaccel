import React from 'react';
import SectionItem from './SectionItem';

const SectionList = ({ list }) => {
	return (
		<React.Fragment>
			{list.map((item) => (
				<SectionItem key={item._id} item={item} />
			))}
		</React.Fragment>
	);
};

export default SectionList;
