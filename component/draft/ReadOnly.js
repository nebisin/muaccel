import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

const linkifyPlugin = createLinkifyPlugin();
const plugins = [linkifyPlugin];

const ReadOnly = ({editorState, setEditorState}) => {
    const notEditable = React.useRef(null);

    return (
        <Editor
        ref={notEditable}
        editorState={editorState}
        onChange={setEditorState}
        readOnly={true}
        editorKey="notEditable"
        plugins={plugins}
    />
    )
}

export default ReadOnly;