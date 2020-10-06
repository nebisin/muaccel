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
		setArticle(art);
	}, [art]);

	useEffect(() => {
		setIsLoading(true);
		const currentArticle = async () => {
			if (art.sectionId) {
				const section = await getSectionInfo(art.sectionId);
				setSectionInfo(section);
			}
		};
		currentArticle();
	}, [art.sectionId]);

	useEffect(() => {
		const listOfSection = async (sectionId) => {
			const result = await getArticleList({
				query: { sectionId },
				sort: { location: 1 },
			});
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
				<React.Fragment>
					<SidebarAds refer={art} />
					<div className="side-card">
						<h2 className="side-card-title">{sectionInfo.name}</h2>
						<ul className="side-list">
							{articleList.map((a) => {
								return (
									<Link
										href="/mevzuat/[actName]/[id]/madde/[title]"
										as={`/mevzuat/${a.actId.name
											.toLocaleLowerCase('tr')
											.replace(/ğ/gim, 'g')
											.replace(/ü/gim, 'u')
											.replace(/ş/gim, 's')
											.replace(/ı/gim, 'i')
											.replace(/ö/gim, 'o')
											.replace(/ç/gim, 'c')
											.replace(/\s/g, '-')
											.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
											a.actId._id
										}/madde/${a.title.replace(/\//g, '-')}`}
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
				</React.Fragment>
			) : (
				<React.Fragment>
					<SidebarAds refer={art} />
					<div className="side-card">
						<div style={{ width: 'auto', display: 'flex' }}>
							<div className="loader">Loading...</div>
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default SideArticleList;
