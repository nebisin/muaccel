import { useState, useContext, useEffect } from 'react';
import {
	Editor,
	EditorState,
	convertToRaw,
	RichUtils,
	convertFromRaw,
} from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import mevzuatApi from 'api/mevzuat';
import AuthContext from 'context/AuthContext';

const ArticleNote = ({ articleId, initialNote, noteId }) => {
	const { token } = useContext(AuthContext);
	const [databaseCurrent, setDatabaseCurrent] = useState(initialNote);
	const [currentId, setCurrentId] = useState(noteId);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [saving, setSaving] = useState(false);
	const [deleting, setDeleting] = useState(false);
	var currentStyle = editorState.getCurrentInlineStyle();

	const noteEditor = React.useRef(null);

	const onChange = (newState) => {
		setEditorState(newState);
	};

	const handleKeyCommand = (command) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);

		if (newState) {
			onChange(newState);
			return 'handled';
		}

		return 'not-handled';
	};

	const toggleInlineStyle = (inlineStyle, e) => {
		e.preventDefault();
		onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	};

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
			<div className="article-note-container">
				<span
					className={`note-inline-button ${
						currentStyle.has('BOLD') && 'note-inline-button-active'
					}`}
					onMouseDown={(e) => toggleInlineStyle('BOLD', e)}
				>
					Kalın
				</span>
				<span
					className={`note-inline-button ${
						currentStyle.has('ITALIC') && 'note-inline-button-active'
					}`}
					onMouseDown={(e) => toggleInlineStyle('ITALIC', e)}
				>
					İtalik
				</span>
				<span
					className={`note-inline-button ${
						currentStyle.has('UNDERLINE') && 'note-inline-button-active'
					}`}
					onMouseDown={(e) => toggleInlineStyle('UNDERLINE', e)}
				>
					Altı Çizili
				</span>
				<div className="article-note-content">
					<Editor
						ref={noteEditor}
						editorState={editorState}
						onChange={setEditorState}
						handleKeyCommand={handleKeyCommand}
						placeholder="Kendiniz için bir not yazın..."
						editorKey="foobar"
					/>
				</div>
			</div>
			<div className="article-note-buttons">
				{databaseCurrent && (
					<button className="article-note-delete-button" onClick={deleteNote}>
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
	);
};

export default ArticleNote;
