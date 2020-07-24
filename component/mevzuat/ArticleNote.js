import { useState, useContext, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import mevzuatApi from 'api/mevzuat';
import AuthContext from 'context/AuthContext';
import Draft from 'component/draft/Draft';

const ArticleNote = ({ articleId, initialNote, noteId }) => {
	const { token } = useContext(AuthContext);
	const [databaseCurrent, setDatabaseCurrent] = useState(initialNote);
	const [currentId, setCurrentId] = useState(noteId);
	const [editorState, setEditorState] = useState();
	const [saving, setSaving] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (databaseCurrent) {
			const rawContentFromStore = convertFromRaw(JSON.parse(databaseCurrent));
			setEditorState(EditorState.createWithContent(rawContentFromStore));
		} else {
			setEditorState(EditorState.createEmpty());
		}
	}, [databaseCurrent]);

	const createNote = async () => {
		let raw = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
		let plainText = editorState.getCurrentContent().getPlainText();
		let hasText = editorState.getCurrentContent().hasText();
		if (hasText && articleId) {
			setSaving(true);
			const response = await mevzuatApi.post(
				'/note',
				{
					raw: raw,
					plainText: plainText,
					articleId: articleId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setSaving(false);
			if (response?.data) {
				setDatabaseCurrent(raw);
				setCurrentId(response.data._id);
			} else {
				console.log(response.data.error);
			}
		}
	};

	const deleteNote = async () => {
		try {
			setDeleting(true);
			const response = await mevzuatApi.delete(`/note/${currentId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setDeleting(false);
			setCurrentId();
			setDatabaseCurrent();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			{editorState && (
				<React.Fragment>
					<h3 className="title">
						<FontAwesomeIcon icon={faStickyNote} className="sidebar-icon" />
						Not Alın
					</h3>
					<div className="article-note-container">
						<Draft editorState={editorState} setEditorState={setEditorState} />
					</div>
					<div className="article-note-buttons">
						{databaseCurrent && (
							<button
								className="article-note-delete-button"
								onClick={deleteNote}
							>
								{deleting ? (
									<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
								) : (
									'Sil'
								)}
							</button>
						)}
						<button
							disabled={!editorState.getCurrentContent().hasText()}
							className="article-note-create-button"
							onClick={createNote}
						>
							{saving ? (
								<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
							) : (
								'Kaydet'
							)}
						</button>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default ArticleNote;
