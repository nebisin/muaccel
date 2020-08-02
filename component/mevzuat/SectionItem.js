import React, { useEffect, useState, useContext } from 'react';
import ArticleContext from 'context/ArticleContext';
import SectionList from './SectionList';
import ArticleList from './ArticleList';
import ArticleHolder from './ArticleHolder';

const SectionItem = ({ item, type, sections }) => {
	const [sectionList, setSectionList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { getArticleList } = useContext(ArticleContext);

	useEffect(() => {
		setSectionList([]);
		const article = async (sectionId) => {
			setIsLoading(true);
			const result = await getArticleList({
				query: { sectionId },
				sort: { location: 1 },
			});
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
	}, [item, sections, getArticleList]);

	return (
		<React.Fragment>
			<div id={item._id} className={type ? 'suffix-section' : 'section'}>
				<p style={{ fontWeight: 500, textAlign: 'center' }}>{item.title}</p>
				<p style={{ textAlign: 'center' }}>{item.name}</p>
			</div>
			{item.type === 3 || item.type === 2 ? (
				<ArticleList items={sectionList} type={1} />
			) : (
				<SectionList list={sectionList} sections={sections} />
			)}
			{isLoading && (
				<ArticleHolder />
			)}
		</React.Fragment>
	);
};

export default SectionItem;
