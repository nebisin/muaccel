import React, { useCallback } from 'react';
import mevzuatApi from 'api/mevzuat';

const ActContext = React.createContext();

export const ActProvider = ({ children }) => {
	const getActList = useCallback(async (props) => {
		const { query, sort, limit, skip } = props;
		const acts = await mevzuatApi.post(`/acts`, { query, sort, limit, skip });
		return acts.data;
	}, []);

	const getActById = async (id) => {
		if (id === null) {
			return null;
		}
		const response = await mevzuatApi.get('/act', { params: { id } });
		return response.data;
	};

	const searchAct = async (term) => {
		if (!term) {
			return { error: 'Bir arama terimi girmelisiniz.' };
		}

		const response = await mevzuatApi.get('search/acts', {
			params: { term: term },
		});
		return response.data;
	};

	return (
		<ActContext.Provider value={{ getActList, getActById, searchAct }}>
			{children}
		</ActContext.Provider>
	);
};

export default ActContext;
