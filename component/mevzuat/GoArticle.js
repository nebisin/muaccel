import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import ArticleContext from 'context/ArticleContext';
import mevzuatApi from 'api/mevzuat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

const GoArticle = ({ id }) => {
	const [term, setTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [listLoading, setListLoading] = useState(false);
	const [articleList, setArticleList] = useState();
	const [focused, setFocused] = useState(false);
	const { getArticleByTitle } = useContext(ArticleContext);
	let router = useRouter();

	const getList = async (search, searchId) => {
		if (search != null && searchId != null) {
			try {
				setListLoading(true);
				const response = await mevzuatApi.post('/articles', {
					search: search,
					searchId: searchId,
				});
				setArticleList(response.data);
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
		getList(term, id);
	}, [id]);

	const handleChange = (event) => {
		setTerm(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		getList(term, id);
	};

	const handleSubmitAlternative = (event) => {
		event.preventDefault();
		if (!term) {
			alert('Bir madde numarası girmelisiniz!');
			return;
		}

		const getArticle = async () => {
			setIsLoading(true);
			try {
				const { article } = await getArticleByTitle(term, id);
				if (!article) {
					alert('Aradığınız madde bulunamadı!');
					setIsLoading(false);
					return;
				}
				router.push(
					'/mevzuat/[actName]/[id]/madde/[title]',
					`/mevzuat/${article.actId.name
						.replace(/\s/g, '-')
						.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
						article.actId._id
					}/madde/${article.title.replace(/\//g, '-')}`
				);
				setFocused(false);
				setIsLoading(false);
			} catch (e) {
				alert('Aradığınız madde bulunamadı!');
				setIsLoading(false);
				return;
			}
		};
		getArticle();
	};

	return (
		<React.Fragment>
			<div className="others-go">
				<button className="others-go-button" onClick={() => setFocused(true)}>
					Madde Bul
				</button>
			</div>
			{focused && (
				<React.Fragment>
					<div className="others-full">
						<div className="others-full-inside">
							<div className="others-full-insider">
								<div className="others-insider-top">
									<div className="others-insider-title">
										<h2>
											Maddeler{' '}
											{listLoading ? (
												<FontAwesomeIcon
													icon={faSpinner}
													className="login-spinner"
												/>
											) : (
												''
											)}
										</h2>
									</div>
									<div className="close-others-div">
										<FontAwesomeIcon
											icon={faTimes}
											className="close-others"
											onClick={() => setFocused(false)}
										/>
									</div>
								</div>
								<div className="others-go-form">
									<div className="others-form">
										<form onSubmit={handleSubmit} className="others-input">
											<input
												className="others-input-inside"
												type="search"
												placeholder="Madde Ara"
												value={term || ''}
												onChange={handleChange}
												disabled={isLoading}
											/>
										</form>
										<button
											className="others-button"
											disabled={isLoading}
											onClick={handleSubmitAlternative}
										>
											Git
										</button>
									</div>
								</div>
								{articleList && (
									<div className="article-text-list-container">
										<div className="article-text-list">
											<div className="article-text-list-left">
												<b>Numarası</b>
											</div>
											<div className="article-text-list-right">
												<b>Başlığı</b>
											</div>
										</div>
										{articleList.map((article) => (
											<Link
												href="/mevzuat/[actName]/[id]/madde/[title]"
												as={`/mevzuat/${article.actId.name
													.replace(/\s/g, '-')
													.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
													article.actId._id
												}/madde/${article.title.replace(/\//g, '-')}`}
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
										))}
									</div>
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
