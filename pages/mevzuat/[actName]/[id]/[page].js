import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import mevzuatApi from 'api/mevzuat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import SectionItem from 'component/mevzuat/SectionItem';
import Others from 'component/mevzuat/Others';
import Sidebar from 'component/mevzuat/Sidebar';
import Footer from 'component/Footer';

const ActRoute = ({ data, sectionsData, error }) => {
	const router = useRouter();
	const [actInfo, setActInfo] = useState(data);
	const [suffixSections, setSuffixSections] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		const getAct = () => {
			const sections = sectionsData.filter(
				(item) => item.type === 0 || item.type === 3
			);
			setActInfo(data);
			setSuffixSections(sections);
			setIsLoading(false);
		};
		if (router.query.id) {
			getAct();
		}
	}, [data, sectionsData, page]);

	useEffect(() => {
		setPage(router.query.page);
	}, [router.query.page]);

	return (
		<React.Fragment>
			{data ? (
				<React.Fragment>
					<Head>
						<title>
							{data.name}{' '}
							{sectionsData[page] && ` - ${sectionsData[page].name}`} | Muaccel
							Mevzuat
						</title>
						<meta
							name="description"
							content={`${data.title !== undefined ? `${data.title} sayılı` : ''} ${data.name} (${data.shortName}) - ${
								sectionsData[page] && `${sectionsData[page].name}`
							}. Muaccel Mevzuat: Temel mevzuata ulaşmanın pratik yolu... `}
						/>
						<meta
							name="keywords"
							content={`${data.shortName}${data.title !== undefined ? `, ${data.title} sayılı Kanun` : ''}, ${
								data.name
							}, ${
								sectionsData[page] && `${sectionsData[page].name}`
							}, Mevzuat, Muaccel`}
						/>
						<meta property="og:description" content={`${data.name}`} />
						<meta
							property="og:title"
							content={`${data.name} | Muaccel Mevzuat`}
						/>
						<meta
							property="og:image"
							content="https://www.muaccel.com/mevzuatog.jpg"
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
								{data.title && <p>{data.title} sayılı </p>}
								<p>{data.name}</p>
							</div>
							{!isLoading ? (
								<React.Fragment>
									{suffixSections[page] ? (
										<React.Fragment>
											<Others
												sections={suffixSections}
												page={page}
												actId={actInfo}
											/>
											<div className="act">
												<SectionItem
													item={suffixSections[page]}
													sections={sectionsData}
													type={1}
												/>
											</div>
										</React.Fragment>
									) : (
										<div>Böyle bir bölüm bulunmuyor.</div>
									)}
								</React.Fragment>
							) : (
								<div
									style={{
										width: 'auto',
										display: 'flex',
										marginBottom: '20px',
									}}
								>
									<div className="loader">Loading...</div>
								</div>
							)}
							<Footer />
						</section>
					</div>
				</React.Fragment>
			) : (
				<div className="loading-container">
					<img className="splash-logo" src="/sitelogo.svg" alt="logo" />
					<FontAwesomeIcon icon={faSpinner} className="splash-spinner" />
				</div>
			)}
		</React.Fragment>
	);
};

export async function getStaticPaths() {
	return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
	let id = params.id;
	let data = null;
	let sectionsData = null;
	let error = null;

	try {
		const [response, sections] = await Promise.all([
			mevzuatApi.get('/act', { params: { id } }),
			mevzuatApi.post('/sections', {
				actId: id,
				type: {},
			}),
		]);
		data = response.data;
		sectionsData = sections.data;
	} catch (error) {
		error = error;
	}

	return { props: { data, sectionsData, error }, unstable_revalidate: 60 };
}

export default ActRoute;
