import { useState, useContext, useEffect } from 'react';
import {
	Editor,
	EditorState,
	convertToRaw,
	RichUtils,
	convertFromRaw,
	getDefaultKeyBinding,
} from 'draft-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSpinner,
	faBold,
	faItalic,
	faUnderline,
	faListUl,
	faListOl,
} from '@fortawesome/free-solid-svg-icons';
import mevzuatApi from 'api/mevzuat';
import AuthContext from 'context/AuthContext';

const ArticleNote = ({ articleId, initialNote, noteId }) => {
	const { token } = useContext(AuthContext);
	const [databaseCurrent, setDatabaseCurrent] = useState(initialNote);
	const [currentId, setCurrentId] = useState(noteId);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [saving, setSaving] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(editorState.getSelection().getStartKey())
		.getType();
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

	const toggleBlockStyle = (blockStyle, e) => {
		e.preventDefault();
		onChange(RichUtils.toggleBlockType(editorState, blockStyle));
	};

	useEffect(() => {
		if (databaseCurrent) {
			const rawContentFromStore = convertFromRaw(JSON.parse(databaseCurrent));
			setEditorState(EditorState.createWithContent(rawContentFromStore));
		} else {
			setEditorState(EditorState.createEmpty());
		}
	}, [databaseCurrent]);

	const _mapKeyToEditorCommand = (e) => {
		if (e.keyCode === 9 /* TAB */) {
			const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
			if (newEditorState !== editorState) {
				onChange(newEditorState);
			}
			return;
		} else if (e.keyCode === 8) {
			const block = getSelectedBlock(editorState);

			if (isEmptyListItem(block)) {
				handleReturnForListItem(block);
				return 'handled';
			}
		}
		return getDefaultKeyBinding(e);
	};

	const getSelectedBlock = (editorState) => {
		const selection = editorState.getSelection();
		const contentState = editorState.getCurrentContent();
		const blockStartKey = selection.getStartKey();

		return contentState.getBlockMap().get(blockStartKey);
	};

	const isEmptyListItem = (block) => {
		const text = block.getText();
		const hasEmptyText = text.length === 0;
		const blockType = block.getType();
		const isListItemBlock =
			blockType === 'unordered-list-item' || blockType === 'ordered-list-item';

		return isListItemBlock && hasEmptyText;
	};

	const handleReturn = (e) => {
		const block = getSelectedBlock(editorState);

		if (isEmptyListItem(block)) {
			handleReturnForListItem(block);
			return 'handled';
		}

		return 'not-handled';
	};

	const handleReturnForListItem = (block) => {
		const depth = block.getDepth();
		if (depth > 0) {
			onChange(decreaseBlockDepth(block, editorState));
		} else if (depth === 0) {
			onChange(changeBlockType(editorState));
		}
	};

	const decreaseBlockDepth = (block, editorState) => {
		const blockKey = block.getKey();
		const depth = block.getDepth();
		const newBlock = block.set('depth', depth - 1);
		const contentState = editorState.getCurrentContent();
		const blockMap = contentState.getBlockMap();
		const newBlockMap = blockMap.set(blockKey, newBlock);
		return EditorState.push(
			editorState,
			contentState.merge({ blockMap: newBlockMap }),
			'adjust-depth'
		);
	};

	const changeBlockType = (editorState) =>
		EditorState.push(
			editorState,
			RichUtils.tryToRemoveBlockStyle(editorState),
			'change-block-type'
		);

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
				<div className="article-note-toggle-buttons">
					<div className="article-block-button-group">
						<span
							className={`note-inline-button ${
								blockType === 'header-one' && 'note-inline-button-active'
							}`}
							onMouseDown={(e) => toggleBlockStyle('header-one', e)}
							style={{ fontWeight: 'bold' }}
						>
							H1
						</span>
						<span
							className={`note-inline-button ${
								blockType === 'header-three' && 'note-inline-button-active'
							}`}
							onMouseDown={(e) => toggleBlockStyle('header-three', e)}
							style={{ fontWeight: 'bold' }}
						>
							H2
						</span>
						<span
							className={`note-inline-button ${
								blockType === 'header-four' && 'note-inline-button-active'
							}`}
							onMouseDown={(e) => toggleBlockStyle('header-four', e)}
							style={{ fontWeight: 'bold' }}
						>
							H3
						</span>
						<span
							className={`note-inline-button ${
								blockType === 'unordered-list-item' &&
								'note-inline-button-active'
							}`}
							onMouseDown={(e) => toggleBlockStyle('unordered-list-item', e)}
						>
							<FontAwesomeIcon icon={faListUl} />
						</span>
						<span
							className={`note-inline-button ${
								blockType === 'ordered-list-item' && 'note-inline-button-active'
							}`}
							onMouseDown={(e) => toggleBlockStyle('ordered-list-item', e)}
						>
							<FontAwesomeIcon icon={faListOl} />
						</span>
					</div>
					<div className="article-inline-button-group">
						<span
							className={`note-inline-button ${
								currentStyle.has('BOLD') && 'note-inline-button-active'
							}`}
							onMouseDown={(e) => toggleInlineStyle('BOLD', e)}
						>
							<FontAwesomeIcon icon={faBold} />
						</span>
						<span
							className={`note-inline-button ${
								currentStyle.has('ITALIC') && 'note-inline-button-active'
							}`}
							onMouseDown={(e) => toggleInlineStyle('ITALIC', e)}
						>
							<FontAwesomeIcon icon={faItalic} />
						</span>
						<span
							className={`note-inline-button ${
								currentStyle.has('UNDERLINE') && 'note-inline-button-active'
							}`}
							onMouseDown={(e) => toggleInlineStyle('UNDERLINE', e)}
						>
							<FontAwesomeIcon
								icon={faUnderline}
								style={{ marginBottom: '-1px' }}
							/>
						</span>
					</div>
				</div>
				<div className="article-note-content">
					<Editor
						ref={noteEditor}
						editorState={editorState}
						onChange={setEditorState}
						handleKeyCommand={handleKeyCommand}
						placeholder="Kendiniz için bir not yazın..."
						editorKey="foobar"
						keyBindingFn={_mapKeyToEditorCommand}
						handleReturn={handleReturn}
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
