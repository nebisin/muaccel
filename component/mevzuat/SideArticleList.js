import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import ArticleContext from 'context/ArticleContext.js';
import SectionContext from 'context/SectionContext';
const SideArticleList = ({ id, art }) => {
	const [article, setArticle] = useState({});
	const [articleList, setArticleList] = useState([]);
	const [sectionInfo, setSectionInfo] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const { getArticleById, getArticleList } = useContext(ArticleContext);
	const { getSectionInfo } = useContext(SectionContext);

	useEffect(() => {
		setIsLoading(true);
		const currentArticle = async () => {
			if (art.sectionId) {
				const section = await getSectionInfo(art.sectionId);
				setSectionInfo(section);
				setArticle(art);
			}
		};
		currentArticle();
	}, [getArticleById, getSectionInfo, art, id]);

	useEffect(() => {
		const listOfSection = async (sectionId) => {
			const result = await getArticleList({ query: { sectionId }, sort: {location: 1} });
			setArticleList(result);
			setIsLoading(false);
		};
		if (article.sectionId) {
			listOfSection(article.sectionId);
		}
	}, [article, getArticleList]);

	return (
		<React.Fragment>
			{!isLoading ? (
				<div className="side-card">
					<h2 className="side-card-title">{sectionInfo.name}</h2>
					<ul className="side-list">
						{articleList.map((a) => {
							return (
								<Link
									href="/mevzuat/madde/[id]"
									as={`/mevzuat/madde/${a._id}`}
									key={a._id}
								>
									<a
										className={`side-list-item ${
											a._id === article._id && 'side-list-item-selected'
										}`}
									>
										<li>
											<p>
												<b>Madde {a.title}</b>
											</p>
											<p>{a.name}</p>
										</li>
									</a>
								</Link>
							);
						})}
					</ul>
				</div>
			) : (
				<div style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}>
					<div className="loader">Loading...</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default SideArticleList;
