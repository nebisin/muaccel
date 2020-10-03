import { useState, useEffect, useContext } from 'react';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';
import ArticleNote from 'component/mevzuat/ArticleNote';

const ArticleBottomNote = ({item}) => {
    const { isLoggedIn, isLogging, userInfo, token } = useContext(AuthContext);

	const [initialNote, setInitialNote] = useState();
	const [noteId, setNoteId] = useState();
	const [noteLoading, setNoteLoading] = useState(true);

	useEffect(() => {
		setInitialNote();
		const getNote = async () => {
			if (isLoggedIn) {
				setNoteLoading(true);
				const response = await mevzuatApi.get(
					`/note?articleId=${item._id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response?.data?.raw) {
					setInitialNote(response.data.raw);
					setNoteId(response.data._id);
				}
				setNoteLoading(false);
			} else {
				setNoteLoading(false);
			}
		};
		if (!isLogging) {
			getNote();
		}
	}, [isLoggedIn, userInfo, isLogging, item]);
	return (
		<React.Fragment>
			{!noteLoading ? (
					<ArticleNote
						articleId={item._id}
						initialNote={initialNote}
						noteId={noteId}
					/>
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
		</React.Fragment>
	);
};

export default ArticleBottomNote;