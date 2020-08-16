import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import AuthContext from 'context/AuthContext';
import CreateBlogForm from 'component/blog/CreateBlogForm';
import BlogDrafts from 'component/blog/BlogDrafts';
import UserWidget from 'component/user/UserWidget';
import Footer from 'component/Footer';

const login = '/user/login?redirected=true';

const CreatePage = () => {
	const router = useRouter();
	const { isLoggedIn, userInfo } = useContext(AuthContext);

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));

		if (!storedData && !isLoggedIn) {
			router.push(login);
		}
	}, [isLoggedIn]);

	return (
		<React.Fragment>
			<Head>
				<title>Yazı Paylaşın | Muaccel Blog</title>
				<meta
					name="description"
					content="Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular tarafından
			yazılmış metinleri okuyun veya yazdıklarınızı paylaşın."
				/>
				<meta property="og:title" content="Muaccel Blog" />
				<meta
					property="og:description"
					content="Öğrenmenin en iyi yolu okumak ve yazmaktır. Hukukçular tarafından
			yazılmış metinleri okuyun veya yazdıklarınızı paylaşın."
				/>
				<meta
					property="og:image"
					content="https://www.muaccel.com/blog-hero-photo.jpg"
				/>
			</Head>
			<div className="blog-container">
				{isLoggedIn && (
					<div className="create-blog-container">
						<div className="create-blog-section">
							<h1 className="create-blog-title">
								<FontAwesomeIcon icon={faPen} className="sidebar-icon" />
								Yazı Paylaş
							</h1>
							<CreateBlogForm />
						</div>
						<aside className="create-blog-sidebar">
							<UserWidget user={userInfo} />
							{/*
														<BlogDrafts />

							*/}
						</aside>
					</div>
				)}
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default CreatePage;
