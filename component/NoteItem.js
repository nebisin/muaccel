import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const NoteItem = ({ note }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const notEditable = React.useRef(null);

	useEffect(() => {
		if (note?.raw) {
			const rawContentFromStore = convertFromRaw(JSON.parse(note.raw));
			setEditorState(EditorState.createWithContent(rawContentFromStore));
		}
	}, [note]);

	return (
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
		</div>
	);
};

export default NoteItem;
