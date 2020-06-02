import React, { useEffect, useState, useContext } from 'react';
import SectionContext from '../../context/SectionContext';
import ArticleContext from '../../context/ArticleContext';
import SectionList from './SectionList';
import ArticleList from './ArticleList';

const SectionItem = ({ item, type }) => {
	const [sectionList, setSectionList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { getSectionsBySection } = useContext(SectionContext);
	const { getArticleList } = useContext(ArticleContext);

	useEffect(() => {
		setIsLoading(true);
		setSectionList([]);
		const article = async (sectionId) => {
			const result = await getArticleList({ query: { sectionId } });
			setSectionList(result);
			setIsLoading(false);
		};
		const config = async () => {
			const result = await getSectionsBySection(item._id, {});
			setSectionList(result);
			setIsLoading(false);
		};
		if (item.type === 3 || item.type === 2) {
			article(item._id);
		} else {
			config();
		}
	}, [getSectionsBySection, item, getArticleList]);

	return (
		<React.Fragment>
			<div id={item._id} className={type ? 'suffix-section' : 'section'}>
				<p style={{ fontWeight: 'bold', textAlign: 'center' }}>{item.title}</p>
				<p style={{ textAlign: 'center' }}>{item.name}</p>
			</div>
			{item.type === 3 || item.type === 2 ? (
				<ArticleList items={sectionList} type={1} />
			) : (
				<SectionList list={sectionList} />
			)}
			{isLoading && type && (
				<div style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}>
					<div className="loader">Loading...</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default SectionItem;
