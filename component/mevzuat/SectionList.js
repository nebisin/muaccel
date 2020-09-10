import React from 'react';
import SectionItem from './SectionItem';

const SectionList = ({ list, sections, articles }) => {
	return (
		<React.Fragment>
			{list.map((item) => (
				<SectionItem key={item._id} item={item} sections={sections} articles={articles} />
			))}
		</React.Fragment>
	);
};

export default SectionList;
