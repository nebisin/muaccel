import React, { useEffect, useState, useContext } from 'react';
import ArticleContext from 'context/ArticleContext';
import SectionList from './SectionList';
import ArticleList from './ArticleList';
import ArticleHolder from './ArticleHolder';

const SectionItem = ({ item, type, sections, articles }) => {
	const [sectionList, setSectionList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	useEffect(() => {
		setSectionList([]);
		const article = (sectionId) => {
			setIsLoading(true);
			if(!articles) return;
			const result = articles.filter((i) => i.sectionId === sectionId);
			setSectionList(result);
			setIsLoading(false);
		};
		const config = async () => {
			if (!sections) {
				return;
			}
			const result = sections.filter((i) => i.sectionId === item._id);
			setSectionList(result);
		};
		if (item.type === 3 || item.type === 2) {
			article(item._id);
		} else {
			config();
		}
	}, [item, sections, articles]);

	return (
		<React.Fragment>
			<div id={item._id} className={type ? 'suffix-section' : 'section'}>
				<p style={{ fontWeight: 'bold', textAlign: 'center' }}>{item.title}</p>
				<p style={{ textAlign: 'center' }}>{item.name}</p>
			</div>
			{item.type === 3 || item.type === 2 ? (
				<ArticleList items={sectionList} type={1} />
			) : (
				<SectionList list={sectionList} sections={sections} articles={articles} />
			)}
			{isLoading && (
				<ArticleHolder />
			)}
		</React.Fragment>
	);
};

export default SectionItem;
