import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import mevzuatApi from '../../../../api/mevzuat';

import ActContext from '../../../../context/ActContext';
import SectionContext from '../../../../context/SectionContext';
import SectionItem from '../../../../component/mevzuat/SectionItem';
import Others from '../../../../component/mevzuat/Others';
import Sidebar from '../../../../component/mevzuat/Sidebar';

const ActRoute = ({ data }) => {
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
			const sections = await getSectionList(data._id, {
				$or: [{ type: 0 }, { type: 3 }],
			});
			setActInfo(data);
			setSuffixSections(sections);
			setIsLoading(false);
		};
		if (router.query.id) {
			getAct();
		}
	}, [data, getActById, getSectionList]);

	useEffect(() => {
        setPage(router.query.page)
    }, [router.query.page])

	return (
		<React.Fragment>
			<Head>
				<title>{data.name} | Muaccel Mevzuat</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content={`${data.title} sayılı ${data.name}`} />
			</Head>
			<div className="flex-container">
				<Sidebar
					type="act"
					id={router.query.id}
					actInfo={actInfo}
					sections={suffixSections}
					page={page}
				/>
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
		</React.Fragment>
	);
};

export async function getServerSideProps(context) {
	let id = context.params.id;

	const response = await mevzuatApi.get('/act', { params: { id } });
	const data = response.data;

	return { props: { data } };
}

export default ActRoute;
