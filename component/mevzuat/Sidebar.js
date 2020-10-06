import React from 'react';
import SearchBar from './SearchBar';
import SideMostSearched from './SideMostSearched';
import SideCategories from './SideCategories';
import SideArticleList from './SideArticleList';
import SideSectionList from './SideSectionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGavel } from '@fortawesome/free-solid-svg-icons';
import SidebarAds from 'component/ads/SidebarAds';

const Sidebar = ({ type, id, art, actInfo, sections, page, subSections }) => {
	return (
		<aside id="sidebar" className="h-none">
			<h1 className="title">
				<FontAwesomeIcon icon={faGavel} className="sidebar-icon" />
				Mevzuat
			</h1>
			{type === 'home' || type === 'search' || type === 'category' ? (
				<React.Fragment>
					<SideCategories id={id} />
					<SidebarAds refer={id} />
					<SideMostSearched />
				</React.Fragment>
			) : (
				<React.Fragment>
					<SearchBar />
				</React.Fragment>
			)}
			{type === 'article' && (
				<React.Fragment>
					<SideArticleList art={art} id={id} />
				</React.Fragment>
			)}
			{type === 'act' && (
				<React.Fragment>
					<SidebarAds refer={page} />
					<SideSectionList
						id={id}
						actInfo={actInfo}
						sections={sections}
						page={page}
						subSections={subSections}
					/>
				</React.Fragment>
			)}
		</aside>
	);
};

export default Sidebar;
