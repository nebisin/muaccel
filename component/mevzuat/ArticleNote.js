import { useState, useEffect } from 'react';
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';

const ArticleNote = () => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
    var currentStyle = editorState.getCurrentInlineStyle();
        
	const noteEditor = React.useRef(null);

	const focusEditor = () => {
		noteEditor.current.focus();
	};

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
		let raw = convertToRaw(editorState.getCurrentContent());
		console.log(raw);
	}, [editorState]);

	return (
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
	);
};

export default ArticleNote;
