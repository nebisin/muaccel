import { useEffect } from 'react';
import ContentSection from './ContentSection';

const Contents = ({
	articleList,
	setFocused,
	id,
	setListLoading,
	sectionList,
}) => {
	return (
		<div className="article-text-list-container article-text-list-container-fixed">
			{sectionList?.map(
				(item) =>
					(item.type === 0 || item.type === 3) && (
						<ContentSection
							articleList={articleList}
							sectionList={sectionList}
                            setFocused={setFocused}
                            item={item}
						/>
					)
			)}
		</div>
	);
};

export default Contents;
