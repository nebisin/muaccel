import Link from 'next/link';

const ContentSection = ({ sectionList, articleList, setFocused, item }) => {
	return (
		<React.Fragment>
			<div className="content-section">
				<p>{item.title}</p>
				<p>{item.name}</p>
			</div>
			{item.type === 3 || item.type === 2 ? (
				<React.Fragment>
					{articleList.map(
						(article) =>
							article.sectionId === item._id && (
								<React.Fragment>
									{article.suffixTitle && <p style={{fontSize: '14px', fontWeight: 'bold', whiteSpace: 'pre-line'}}>{article.suffixTitle}</p>}
									<Link
										href="/mevzuat/[actName]/[id]/madde/[title]"
										as={`/mevzuat/${article.actId.name
											.replace(/\s/g, '-')
											.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
											article.actId._id
										}/madde/${article.title.replace(/\//g, '-')}`}
										prefetch={false}
										key={article._id}
									>
										<a>
											<div
												className="article-text-list"
												onClick={() => setFocused(false)}
											>
												<div className="article-text-list-left">
													Madde {article.title}
												</div>
												<div className="article-text-list-right">
													{article.name}
												</div>
											</div>
										</a>
									</Link>
								</React.Fragment>
							)
					)}
				</React.Fragment>
			) : (
				<React.Fragment>
					{sectionList.map(
						(i) =>
							item._id === i.sectionId && (
								<ContentSection
									sectionList={sectionList}
									articleList={articleList}
									setFocused={setFocused}
									item={i}
								/>
							)
					)}
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default ContentSection;
