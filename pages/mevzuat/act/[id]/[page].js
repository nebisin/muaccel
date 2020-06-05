import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import mevzuatApi from '../../../../api/mevzuat';

import ActContext from '../../../../context/ActContext';
import SectionContext from '../../../../context/SectionContext';
import SectionItem from '../../../../component/mevzuat/SectionItem';
import Others from '../../../../component/mevzuat/Others';
import Sidebar from '../../../../component/mevzuat/Sidebar';

const ActRoute = ({ data, sectionsData }) => {
	const router = useRouter();
	const [actInfo, setActInfo] = useState({});
	const [suffixSections, setSuffixSections] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		const getAct = () => {
			const sections = sectionsData.filter((item) => (
				item.type === 0 || item.type === 3
			))
			setActInfo(data);
			setSuffixSections(sections);
			setIsLoading(false);
		};
		if (router.query.id) {
			getAct();
		}
	}, [data, sectionsData, page ]);

	useEffect(() => {
		setPage(router.query.page);
	}, [router.query.page]);

	return (
		<React.Fragment>
			<Head>
				<title>{data.name} - {sectionsData[page].name} | Muaccel Mevzuat</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content={`${data.title} sayılı ${data.name}`}
				/>
			</Head>
			<div className="flex-container">
				<Sidebar
					type="act"
					id={router.query.id}
					actInfo={actInfo}
					sections={suffixSections}
					subSections={sectionsData}
					page={page}
				/>
				<section id="showcase">
					<div className="act-title">
						<p>{data.title} sayılı </p>
						<p>{data.name}</p>
					</div>
					{!isLoading ? (
						<React.Fragment>
							{suffixSections[page] ? (
								<React.Fragment>
									<Others
										sections={suffixSections}
										page={page}
										actId={actInfo._id}
									/>
									<div className="act">
										<SectionItem item={suffixSections[page]} sections={sectionsData} type={1} />
									</div>
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
		</React.Fragment>
	);
};

export async function getServerSideProps(context) {
	let id = context.params.id;

	const response = await mevzuatApi.get('/act', { params: { id } });
	const data = response.data;

	const sections = await mevzuatApi.post('/sections', {
		actId: id,
		type: {}
	});
	const sectionsData = sections.data;

	return { props: { data, sectionsData } };
}

export default ActRoute;
