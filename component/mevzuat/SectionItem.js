import React, { useEffect, useState, useContext } from 'react';
import SectionContext from '../../context/SectionContext';
import ArticleContext from '../../context/ArticleContext';
import SectionList from './SectionList';
import ArticleList from './ArticleList';

const SectionItem = ({ item }) => {
	const [sectionList, setSectionList] = useState([]);
	const { getSectionsBySection } = useContext(SectionContext);
	const { getArticleList } = useContext(ArticleContext);

	useEffect(() => {
		setSectionList([])
		const article = async (sectionId) => {
			const result = await getArticleList({ query: { sectionId } });
			setSectionList(result);
		};
		const config = async () => {
			const result = await getSectionsBySection(item._id, {});
			setSectionList(result);
		};
		if (item.type === 3 || item.type === 2) {
			article(item._id);
		} else {
			config();
		}
	}, [getSectionsBySection, item, getArticleList]);

	return (
		<React.Fragment>
			<div id={item._id}>
				<p style={{ fontWeight: 'bold', textAlign: 'center' }}>{item.title}</p>
				<p style={{ textAlign: 'center' }}>{item.name}</p>
			</div>
			{item.type === 3 || item.type === 2 ? (
				<ArticleList items={sectionList} />
			) : (
				<SectionList list={sectionList} />
			)}
		</React.Fragment>
	);
};

export default SectionItem;
