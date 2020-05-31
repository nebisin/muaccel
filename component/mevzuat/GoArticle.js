import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import ArticleContext from '../../context/ArticleContext';

const GoArticle = ({ id }) => {
	const [term, setTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { getArticleByLocation } = useContext(ArticleContext);
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
				const {article} = await getArticleByLocation(term, id);
				if (!article) {
					alert('Aradığınız madde bulunamadı!');
					setIsLoading(false);
					return;
				}
				router.push('/mevzuat/article/[id]', `/mevzuat/article/${article._id}`);
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
				placeholder="Maddeye Git"
				value={term || ''}
				onChange={handleChange}
				disabled={isLoading}
			/>
			<input
				className="others-button s-none"
				type="submit"
				value="Git"
				disabled={isLoading}
			/>
		</form>
	);
};

export default GoArticle;
