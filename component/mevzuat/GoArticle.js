import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import ArticleContext from 'context/ArticleContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const GoArticle = ({ id }) => {
	const [term, setTerm] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [focused, setFocused] = useState(false);
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
					}/madde/${article.title.replace(/\//g, '-')}`
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
								<div>
									<h2>Maddeler</h2>
									<FontAwesomeIcon
										icon={faTimes}
										className="close-others"
										onClick={() => setFocused(false)}
									/>
								</div>
								<div className="others-go-form">
									<form onSubmit={handleSubmit} className="others-form">
										<input
											className="others-input"
											type="search"
											placeholder="Madde Ara"
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
								</div>
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
	/*
	return (
		<div className={`others-go ${focused && 'others-go-focused'}`}>
			<form onSubmit={handleSubmit} className="others-form">
				<input
					className="others-input"
					type="search"
					placeholder="Madde"
					value={term || ''}
					onChange={handleChange}
					disabled={isLoading}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>
				<input
					className="others-button"
					type="submit"
					value="Git"
					disabled={isLoading}
				/>
			</form>
		</div>
	);
*/
};

export default GoArticle;
