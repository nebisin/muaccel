import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import ArticleContext from 'context/ArticleContext';

const GoArticle = ({ id }) => {
	const [term, setTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { getArticleByTitle } = useContext(ArticleContext);
	let router = useRouter();

	const handleChange = (event) => {
		setTerm(event.target.value);
	};

	const handleSubmit = (event) => {
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
					}/madde/${article.title.replace(/\s/g, '-')}`
				);
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
		<form onSubmit={handleSubmit} className="others-form">
			<input
				className="others-input"
				type="search"
				placeholder="Madde"
				value={term || ''}
				onChange={handleChange}
				disabled={isLoading}
			/>
			<input
				className="others-button"
				type="submit"
				value="Git"
				disabled={isLoading}
			/>
		</form>
	);
};

export default GoArticle;
