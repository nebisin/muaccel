import React, { useCallback, useState } from 'react';
import mevzuatApi from 'api/mevzuat';

const ArticleContext = React.createContext();

export const ArticleProvider = ({ children }) => {
	/*
	const [articlesData, setArticlesData] = useState([]);

	const addArticlesData = (article) => {
		if(article){
			let articles = articlesData;
			if(articles){
				const isExist = articles.find((item) => {
					return item._id === article._id;
				})
				console.log(isExist)
				if(isExist){
					return;
				}else {
					articles.push(article);
					setArticlesData(articles);
				}
			}else {
				articles.push(article);
				setArticlesData(articles);
			}
		}
	}
*/
	const getArticleList = useCallback(async ({ query, sort, limit, skip }) => {
		const response = await mevzuatApi.post('/articles', {
			query,
			sort,
			limit,
			skip,
		});
		return response.data;
	}, []);

	const getArticleById = async (id) => {
		if (id === null) {
			return null;
		}

		const response = await mevzuatApi.get('/article', { params: { id } });
		return response.data;
	};

	const getArticleByLocation = async (location, actId) => {
		if (!location || !actId) {
			return null;
		}

		const response = await mevzuatApi.get('/article', {
			params: { location: location, actId: actId },
		});
		return response.data;
	};

	const getArticleByTitle = async (title, actId) => {
		if (!title || !actId) {
			return null;
		}

		const response = await mevzuatApi.get('/article', {
			params: { title: title, actId: actId },
		});
		return response.data;
	};

	const searchArticle = async (term) => {
		if (!term) {
			return { error: 'Bir arama terimi girmelisiniz.' };
		}

		const response = await mevzuatApi.get('search/articles', {
			params: { term: term },
		});
		return response.data;
	};

	return (
		<ArticleContext.Provider
			value={{
				getArticleList,
				getArticleById,
				getArticleByLocation,
				getArticleByTitle,
				searchArticle,
			}}
		>
			{children}
		</ArticleContext.Provider>
	);
};

export default ArticleContext;
