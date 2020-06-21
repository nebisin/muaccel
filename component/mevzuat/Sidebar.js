import React from 'react';
import SearchBar from './SearchBar';
import SideMostSearched from './SideMostSearched';
import SideCategories from './SideCategories';
import SideArticleList from './SideArticleList';
import SideSectionList from './SideSectionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGavel,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ type, id, art, actInfo, sections, page, subSections }) => {
	return (
		<aside id="sidebar" className="h-none">
			<h2 className="title">
				<FontAwesomeIcon
					icon={faGavel}
					className='sidebar-icon'
				/>
				Mevzuat
			</h2>
			{type === 'home' || type === 'search' || type === 'category' ? (
				<React.Fragment>
					<SideCategories id={id} />
					<SideMostSearched />
				</React.Fragment>
			) : (
				<SearchBar />
			)}
			{type === 'article' && <SideArticleList art={art} id={id} />}
			{type === 'act' && (
				<SideSectionList
					id={id}
					actInfo={actInfo}
					sections={sections}
					page={page}
					subSections={subSections}
				/>
			)}
		</aside>
	);
};

export default Sidebar;
