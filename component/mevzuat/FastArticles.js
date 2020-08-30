import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import mevzuatApi from 'api/mevzuat';

import ArticleContext from 'context/ArticleContext';

const FastArticles = ({ articleList, setFocused, id, setListLoading }) => {
	const [list, setList] = useState();
	const [term, setTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	let router = useRouter();

	const { getArticleByTitle } = useContext(ArticleContext);

	useEffect(() => {
		setList(articleList);
	}, [articleList])

    const getList = async (search, searchId) => {
		if (search != null && searchId != null) {
			try {
				setListLoading(true);
				const response = await mevzuatApi.post('/articles', {
					search: search,
					searchId: searchId,
					sort: { location: 1 },
				});
				setList(response.data);
				setListLoading(false);
			} catch (error) {
				setListLoading(false);
				console.log(
					'Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyiniz.'
				);
			}
		}
    };
    
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
					alert('Aradığınız madde numarası bulunamadı!');
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
			{list && (
				<div className="article-text-list-container">
					<div className="article-text-list">
						<div className="article-text-list-left">
							<b>Numarası</b>
						</div>
						<div className="article-text-list-right">
							<b>Başlığı</b>
						</div>
					</div>
					{list.map((article) => (
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
									<div className="article-text-list-right">{article.name}</div>
								</div>
							</a>
						</Link>
					))}
				</div>
			)}
		</React.Fragment>
	);
};

export default FastArticles;
