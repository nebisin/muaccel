import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import mevzuatApi from 'api/mevzuat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner, faGavel } from '@fortawesome/free-solid-svg-icons';
import FastArticles from 'component/mevzuat/FastArticles';
import Contents from 'component/mevzuat/Contents';
import Head from 'next/head';
import Footer from 'component/Footer';

const ActHome = ({ data, sectionsData, articleData, error }) => {
	const [listLoading, setListLoading] = useState(false);
	const [articleList, setArticleList] = useState(articleData);
	const [sectionList, setSectionList] = useState(sectionsData);
	const [suffixSections, setSuffixSections] = useState([]);
	const [currentSettings, setCurrentSettings] = useState('0');
	const [focused, setFocused] = useState(true);
	const router = useRouter();

	useEffect(() => {
		setArticleList(articleData);
		setSectionList(sectionsData);
	}, [articleData, sectionsData]);

	useEffect(() => {
		const getAct = () => {
			const sections = sectionsData.filter(
				(item) => item.type === 0 || item.type === 3
			);
			setSuffixSections(sections);
		};
		if (sectionsData) {
			getAct();
		}
	}, [sectionsData]);

	return (
		<React.Fragment>
			{data ? (
				<React.Fragment>
					<Head>
						<title>
							{data.title !== undefined ? `${data.title} sayılı ` : ''}
							{data.name} | Muaccel Mevzuat
						</title>
						<meta
							name="description"
							content={`${
								data.title !== undefined ? `${data.title} sayılı` : ''
							} ${data.name} (${
								data.shortName
							}). Muaccel Mevzuat: Temel mevzuata ulaşmanın pratik yolu... `}
						/>
						<meta
							name="keywords"
							content={`${data.shortName}${
								data.title !== undefined ? `, ${data.title} sayılı Kanun` : ''
							}, ${data.name}, Mevzuat, Muaccel`}
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
						<aside id="sidebar" className="h-none">
							<h1 className="title">
								<FontAwesomeIcon icon={faGavel} className="sidebar-icon" />
								Mevzuat
							</h1>
							{suffixSections.length && (
								<div className="side-card">
									<h2 className="side-card-title">{data.name}</h2>
									<ul className="side-list">
										{suffixSections.map((item, i) => {
											return (
												<Link
													href="/mevzuat/[actName]/[id]/[page]"
													as={`/mevzuat/${data.name
														.toLocaleLowerCase('tr')
														.replace(/ğ/gim, 'g')
														.replace(/ü/gim, 'u')
														.replace(/ş/gim, 's')
														.replace(/ı/gim, 'i')
														.replace(/ö/gim, 'o')
														.replace(/ç/gim, 'c')
														.replace(/\s/g, '-')
														.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
														data._id
													}/${i}`}
													shallow={true}
													key={item._id}
												>
													<a className="side-list-item">
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
							)}
						</aside>
						<section id="showcase">
							<div className="act-title">
								{data.title && <p>{data.title} sayılı </p>}
								<p>{data.name}</p>
							</div>
							<div
								className="others-full-insider"
								style={{ backgroundColor: '#f9fafa' }}
							>
								<div className="others-insider-top">
									<div className="others-insider-title">
										<div className="settings-navigations">
											<ul style={{ marginBottom: '0 !important' }}>
												<li
													className={
														currentSettings === '0' ? 'active-nav' : ''
													}
													onClick={() => setCurrentSettings('0')}
												>
													İçindekiler
												</li>
												<li
													className={
														currentSettings === '1' ? 'active-nav' : ''
													}
													onClick={() => setCurrentSettings('1')}
												>
													Hızlı Erişim
												</li>
												{listLoading ? (
													<li>
														<FontAwesomeIcon
															icon={faSpinner}
															className="login-spinner"
														/>
													</li>
												) : (
													''
												)}
											</ul>
										</div>
									</div>
								</div>
								{currentSettings === '1' && (
									<FastArticles
										articleList={articleList}
										setFocused={setFocused}
										id={router.query.id}
										setListLoading={setListLoading}
									/>
								)}
								{currentSettings === '0' && (
									<Contents
										sectionList={sectionList}
										articleList={articleList}
										setFocused={setFocused}
										id={router.query.id}
									/>
								)}
							</div>
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
	let articleData = null;
	let error = null;

	try {
		const [response, sections, articles] = await Promise.all([
			mevzuatApi.get('/act', { params: { id } }),
			mevzuatApi.post('/sections', {
				actId: id,
				type: {},
			}),
			mevzuatApi.post('/articles', {
				search: '',
				searchId: id,
				sort: { location: 1 },
			}),
		]);
		data = response.data;
		sectionsData = sections.data;
		articleData = articles.data;
	} catch (error) {
		error = error;
	}

	return {
		props: { data, sectionsData, articleData, error },
		unstable_revalidate: 1,
	};
}

export default ActHome;
