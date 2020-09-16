import { useState, useEffect, useContext } from 'react';
import AuthContext from 'context/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import UpdateBlogDraft from 'component/blog/UpdateBlogDraft';
import BlogDrafts from 'component/blog/BlogDrafts';
import UserWidget from 'component/user/UserWidget';
import Footer from 'component/Footer';
import mevzuatApi from 'api/mevzuat';

const login = '/user/login?redirected=true';

const DraftIndex = () => {
	const router = useRouter();
	const { id } = router.query;
	const { isLoggedIn, userInfo, token } = useContext(AuthContext);
	const [draft, setDraft] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const getDraft = async (id, token) => {
		try {
			const response = await mevzuatApi.post(
				'/blog/drafts/' + id,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data) {
				setDraft(response.data);
			}else {
                router.push('/blog/create');
            }
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			router.push('/blog/create');
			setIsLoading(false);
		}
	};

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));

		if (!storedData && !isLoggedIn) {
			router.push(login);
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (token && id) {
			setIsLoading(true);
			getDraft(id, token);
		}
	}, [token, id]);

	if (isLoading || !draft) {
		return (
			<div
				style={{
					width: 'auto',
					display: 'flex',
					marginBottom: '20px',
				}}
			>
				<div className="loader">Loading...</div>
			</div>
		);
	} else {
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
								<UpdateBlogDraft item={draft} type="draft" />
							</div>
							<aside className="create-blog-sidebar">
								<UserWidget user={userInfo} id={userInfo.id} />
								<BlogDrafts currentId={draft._id} />
							</aside>
						</div>
					)}
					<Footer />
				</div>
			</React.Fragment>
		);
	}
};

export default DraftIndex;
