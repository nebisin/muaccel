import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { EditorState, convertFromRaw } from 'draft-js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';
import ReadOnly from 'component/draft/ReadOnly';

const NoteItem = ({ note }) => {
	const { token } = useContext(AuthContext);
	const [currentNote, setCurrentNote] = useState(note);
	const [removed, setRemoved] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [editorState, setEditorState] = useState();

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
		if (response.data?._id) {
			setDeleting(false);
			setCurrentNote(response.data);
		} else {
			console.log(response);
		}
	};

	return (
		<React.Fragment>
			{removed ? (
				<div className="user-note-delete-info">
					<p>
						Notunuz başarıyla silinmiştir.{' '}
						<span onMouseDown={createNote}>Geri al.</span>
					</p>
				</div>
			) : (
				editorState && (
					<div className="user-note">
						<div className="user-note-header">
							<Link
								href="/mevzuat/[actName]/[id]/madde/[title]"
								as={`/mevzuat/${note.article.actId.name
									.replace(/\s/g, '-')
									.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
									note.article.actId._id
								}/madde/${note.article.title.replace(/\s/g, '-')}`}
							>
								<a className="user-note-header-link">
									Madde {note.article.title} - {note.article.name}
								</a>
							</Link>
						</div>
						<div className="user-note-content">
							<ReadOnly
								editorState={editorState}
								setEditorState={setEditorState}
							/>
						</div>
						<div className="user-note-buttons">
							<button className="user-note-delete-button" onClick={deleteNote}>
								Sil
							</button>
							<div className="user-note-view-button">
								<Link
									href="/mevzuat/[actName]/[id]/madde/[title]"
									as={`/mevzuat/${note.article.actId.name
										.replace(/\s/g, '-')
										.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}/${
										note.article.actId._id
									}/madde/${note.article.title.replace(/\s/g, '-')}`}
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
				)
			)}
		</React.Fragment>
	);
};

export default NoteItem;
