import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

import ActContext from '../../../../context/ActContext';
import SectionContext from '../../../../context/SectionContext';
import SectionItem from '../../../../component/mevzuat/SectionItem';
import Others from '../../../../component/mevzuat/Others';
import Sidebar from '../../../../component/mevzuat/Sidebar';

const ActRoute = () => {
	const router = useRouter();
	const [actInfo, setActInfo] = useState({});
	const [suffixSections, setSuffixSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);

	const { getActById } = useContext(ActContext);
	const { getSectionList } = useContext(SectionContext);

	useEffect(() => {
		setIsLoading(true);
		const getAct = async (id) => {
			const act = await getActById(id);
			const sections = await getSectionList(act._id, {
				$or: [{ type: 0 }, { type: 3 }],
			});
			setActInfo(act);
			setSuffixSections(sections);
			setIsLoading(false);
		};
		if(router.query.id){
			getAct(router.query.id);

		}
	}, [router.query.id, getActById, getSectionList]);

	return (
			<div className="flex-container">
			<Sidebar type="act" id={router.query.id} actInfo={actInfo} sections={suffixSections} page={page} />
				<section id="showcase">
					{!isLoading ? (
						<React.Fragment>
							<div className="act-title">
								<p>
									{actInfo.title} sayılı {actInfo.name}
								</p>
							</div>
							{suffixSections[page] ? (
								<React.Fragment>
									<Others
										sections={suffixSections}
										page={page}
										actId={actInfo._id}
									/>
									<SectionItem item={suffixSections[page]} />
								</React.Fragment>
							) : (
								<div>Böyle bir bölüm bulunmuyor.</div>
							)}
						</React.Fragment>
					) : (
						<div
							style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}
						>
							<div className="loader">Loading...</div>
						</div>
					)}
				</section>
			</div>
	);
};

export default ActRoute;
