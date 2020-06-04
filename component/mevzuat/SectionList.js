import React from 'react';
import SectionItem from './SectionItem';

const SectionList = ({ list, sections }) => {
	return (
		<React.Fragment>
			{list.map((item) => (
				<SectionItem key={item._id} item={item} sections={sections} />
			))}
		</React.Fragment>
	);
};

export default SectionList;
