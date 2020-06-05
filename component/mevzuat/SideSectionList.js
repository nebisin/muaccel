import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import SectionContext from '../../context/SectionContext';

const SideSectionList = ({ actInfo, sections, page, subSections }) => {
	const [suffixSections, setSuffixSections] = useState([]);
	const [subSec, setSubSec] = useState([]);
	const { getSectionsBySection } = useContext(SectionContext);

	const scroll = (id, e) => {
		e.preventDefault();
		let el = document.getElementById(id);
		el.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	useEffect(() => {
		if (sections[page]) {
			setSuffixSections(sections);
		}
	}, [sections, page]);

	useEffect(() => {
		const getSubSections = async (id) => {
			setSubSec([]);
			const response = subSections.filter((item) => item.sectionId === id)
			setSubSec(response);
		};
		if (suffixSections[page]) {
			getSubSections(suffixSections[page]._id);
		}
	}, [suffixSections, getSectionsBySection, page, subSections]);

	if (!actInfo.name || !suffixSections[0]) {
		return (
			<div style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}>
				<div className="loader">Loading...</div>
			</div>
		);
	}
	return (
		<React.Fragment>
			<div className="side-card">
				<h2 className="side-card-title">{actInfo.name}</h2>
				<ul className="side-list">
					{sections.map((item, i) => {
						return (
							<Link
								href="/mevzuat/act/[id]/[page]"
								as={`/mevzuat/act/${item.actId}/${i}`}
								shallow={true}
								key={item._id}
							>
								<a
									className={`side-list-item ${
										i === parseInt(page) && 'side-list-item-selected'
									}`}
								>
									<li>
										<p>
											<b>{item.title}</b>
										</p>
										<p>{item.name}</p>
									</li>
								</a>
							</Link>
						);
					})}
				</ul>
			</div>
			{subSec[1] && (
				<div className="side-card side-card-sticky">
					<h2 className="side-card-title">{suffixSections[page].name}</h2>
					<ul className="side-list">
						{subSec.map((item) => (
							<div
								className="side-list-item likelink"
								key={item._id}
								onClick={(e) => scroll(item._id, e)}
							>
								<li>
									<p>
										<b>{item.title}</b>
									</p>
									<p>{item.name}</p>
								</li>
							</div>
						))}
					</ul>
				</div>
			)}
		</React.Fragment>
	);
};

export default SideSectionList;
