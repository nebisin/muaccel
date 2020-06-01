import React from 'react';
import mevzuatApi from '../api/mevzuat';

const SectionContext = React.createContext();

export const SectionProvider = ({ children }) => {
	const getSectionList = async (id, type) => {
		const response = await mevzuatApi.post('/sections', {
			actId: id,
			type: type,
		});

		return response.data;
	};

	const getSectionsBySection = async (id, type) => {
		const response = await mevzuatApi.post('/sections', {
			sectionId: id,
			type: type,
		});

		return response.data;
	};

	const getSectionInfo = async (id) => {
		if (id === null) {
			return null;
		}

		const response = await mevzuatApi.get('/section', { params: { id } });
		return response.data;
	};

	return (
		<SectionContext.Provider
			value={{ getSectionList, getSectionsBySection, getSectionInfo }}
		>
			{children}
		</SectionContext.Provider>
	);
};

export default SectionContext;
