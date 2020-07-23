import { Editor, RichUtils, getDefaultKeyBinding, EditorState } from 'draft-js';
import InlineButtons from './InlineButtons';
import ToggleButtons from './ToggleButtons';

const Draft = ({ editorState, setEditorState }) => {
	const toggleInlineStyle = (inlineStyle, e) => {
		e.preventDefault();

		onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	};
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

	const toggleBlockStyle = (blockStyle, e) => {
		e.preventDefault();
		onChange(RichUtils.toggleBlockType(editorState, blockStyle));
	};

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

	return (
		<React.Fragment>
			<div className="article-note-content">
				<Editor
					ref={noteEditor}
					editorState={editorState}
					onChange={setEditorState}
					handleKeyCommand={handleKeyCommand}
					editorKey="foobar"
					keyBindingFn={_mapKeyToEditorCommand}
					handleReturn={handleReturn}
				/>
			</div>
			<div className="article-note-toggle-buttons">
				<ToggleButtons
					toggleBlockStyle={toggleBlockStyle}
					blockType={blockType}
				/>
				<InlineButtons
					currentStyle={currentStyle}
					toggleInlineStyle={toggleInlineStyle}
				/>
			</div>
		</React.Fragment>
	);
};

export default Draft;
