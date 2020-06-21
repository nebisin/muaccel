import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';

const NoteItem = ({ note }) => {
	const { token } = useContext(AuthContext);
	const [currentNote, setCurrentNote] = useState(note)
	const [removed, setRemoved] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const notEditable = React.useRef(null);

	useEffect(() => {
		if (currentNote?.raw) {
			const rawContentFromStore = convertFromRaw(JSON.parse(currentNote.raw));
			setEditorState(EditorState.createWithContent(rawContentFromStore));
		}
	}, [currentNote]);

	const deleteNote = async () => {
		try {
			setDeleting(true);
			const response = await mevzuatApi.delete(`/note/${currentNote._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setDeleting(false);
			setRemoved(true);
		} catch (error) {
			console.log(error);
		}
	};

	const createNote = async () => {
		setRemoved(false);
		setDeleting(true);
		const response = await mevzuatApi.post(
			'/note',
			{
				raw: currentNote.raw,
				plainText: currentNote.plainText,
				articleId: currentNote.article,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if(response.data?._id){
			setDeleting(false);
			setCurrentNote(response.data)
		}else {
			console.log(response)
		}
	};

	return (
		<React.Fragment>
			{removed ? (
				<div className="user-note-delete-info">
					<p>
						Notunuz başarıyla silinmiştir. <span onMouseDown={createNote}>Geri al.</span>
					</p>
				</div>
			) : (
				<div className="user-note">
					<div className="user-note-header">
						<Link
							href="/mevzuat/madde/[id]"
							as={`/mevzuat/madde/${note.article._id}`}
						>
							<a className="user-note-header-link">
								Madde {note.article.title} - {note.article.name}
							</a>
						</Link>
					</div>
					<div className="user-note-content">
						<Editor
							ref={notEditable}
							editorState={editorState}
							readOnly={true}
							editorKey="notEditable"
						/>
					</div>
					<div className="user-note-buttons">
						<button className="user-note-delete-button" onClick={deleteNote}>
							Sil
						</button>
						<div className="user-note-view-button">
							<Link
								href="/mevzuat/madde/[id]"
								as={`/mevzuat/madde/${note.article._id}`}
							>
								<a>Görüntüle</a>
							</Link>
						</div>
					</div>
					<div
						className={
							deleting ? `user-note-deleting-on` : 'user-note-deleting-off'
						}
					>
						<FontAwesomeIcon
							icon={faSpinner}
							className="user-note-delete-spinner"
						/>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default NoteItem;
