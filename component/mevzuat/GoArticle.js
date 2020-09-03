import React, { useState, useEffect } from 'react';

import mevzuatApi from 'api/mevzuat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import FastArticles from './FastArticles';
import Contents from './Contents';

const GoArticle = ({ id, focused, setFocused }) => {
	const [listLoading, setListLoading] = useState(false);
	const [articleList, setArticleList] = useState();
	const [sectionList, setSectionList] = useState();
	const [currentSettings, setCurrentSettings] = useState('0');

	const getList = async (search, searchId) => {
		if (search != null && searchId != null) {
			try {
				setListLoading(true);
				const [articles, sections] = await Promise.all([
					mevzuatApi.post('/articles', {
						search: search,
						searchId: searchId,
						sort: { location: 1 },
					}),
					mevzuatApi.post('/sections', {
						actId: id,
						type: {},
					}),
				]);
				setArticleList(articles.data);
				setSectionList(sections.data);
				setListLoading(false);
			} catch (error) {
				setListLoading(false);
				console.log(
					'Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyiniz.'
				);
			}
		}
	};

	useEffect(() => {
		getList('', id);
	}, [id]);

	return (
		<React.Fragment>
			<div className="others-go">
				<button className="others-go-button" onClick={() => setFocused(true)}>
					İçindekiler
				</button>
			</div>
			{focused && (
				<React.Fragment>
					<div className="others-full">
						<div className="others-full-inside">
							<div className="others-full-insider others-full-insider-box">
								<div className="others-insider-top others-insider-top-box">
									<div className="others-insider-title">
										<div className="settings-navigations others-navigations-box">
											<ul style={{ marginBottom: '0 !important' }}>
												<li
													className={
														currentSettings === '0' ? 'active-nav' : ''
													}
													onClick={() => setCurrentSettings('0')}
												>
													Hızlı Erişim
												</li>
												<li
													className={
														currentSettings === '1' ? 'active-nav' : ''
													}
													onClick={() => setCurrentSettings('1')}
												>
													İçindekiler
												</li>
												{listLoading ? (
													<li>
														<FontAwesomeIcon
															icon={faSpinner}
															className="login-spinner"
														/>
													</li>
												) : (
													''
												)}
											</ul>
										</div>
									</div>
									<div className="close-others-div">
										<FontAwesomeIcon
											icon={faTimes}
											className="close-others"
											onClick={() => setFocused(false)}
										/>
									</div>
								</div>
								{currentSettings === '0' && (
									<FastArticles
										articleList={articleList}
										setFocused={setFocused}
										id={id}
										setListLoading={setListLoading}
									/>
								)}
								{currentSettings === '1' && (
									<Contents
										sectionList={sectionList}
										articleList={articleList}
										setFocused={setFocused}
										id={id}
									/>
								)}
							</div>
						</div>
					</div>
					<div
						className="others-go-blocker"
						onClick={() => setFocused(false)}
					></div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default GoArticle;
