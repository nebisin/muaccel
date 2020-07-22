import { useState } from 'react';
import { EditorState } from 'draft-js';

import Draft from 'component/draft/Draft';

const CreateBlogForm = () => {
	const [title, setTitle] = useState('');
	const [titleError, setTitleError] = useState('');
	const [abstract, setAbstract] = useState('');
	const [abstractError, setAbstractError] = useState('');
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const _handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const _handleAbstractChange = (event) => {
		setAbstract(event.target.value);
	};

	const checkPublish = () => {
		let isOK = true;
		if (!title) {
			setTitleError('Bir başlık girmelisiniz!');
			document.getElementById("title").focus();
			document.getElementById("title").scrollIntoView({ behavior: 'smooth', block: 'center' });
			isOK = false;
		} else {
			setTitleError('');
		}

		if (!abstract) {
			setAbstractError('Bir özet girmelisiniz!');
			if(isOK){
				document.getElementById("abstract").focus();
				document.getElementById("abstract").scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
			isOK = false;
		} else {
			setAbstractError('');
		}

		return isOK;
	};

	const publishBlog = async (event) => {
		event.preventDefault();
		const isOK = checkPublish();
		if (!isOK) {
			console.log('hata');
			return;
		}

		console.log('Gönderildi');
	};

	const saveDraft = () => {};

	return (
		<form onSubmit={() => {}}>
			<div className="title-create-form">
				<label for="title">
					<p className="create-form-label">Başlık</p>
				</label>
				<input
					id="title"
					type="text"
					maxLength="140"
					name="title"
					value={title}
					onChange={_handleTitleChange}
				/>
				<div className="title-create-form-length">{title.length}/140</div>
			</div>
			<div className="error">{titleError}</div>
			<div className="abstract-create-form">
				<label for="abstract">
					<p className="create-form-label">Özet</p>
				</label>
				<textarea
					id="abstract"
					maxLength="900"
					name="abstract"
					value={abstract}
					onChange={_handleAbstractChange}
				></textarea>
				<div className="abstract-create-form-length">{abstract.length}/900</div>
			</div>
			<div className="error">{abstractError}</div>
			<p className="create-form-label">Metin</p>
			<div className="content-create-form">
				<Draft editorState={editorState} setEditorState={setEditorState} />
			</div>
			<div className="create-form-buttons">
				<button className="create-form-draft-button" onClick={saveDraft}>
					Kaydet
				</button>
				<button className="create-form-submit-button" onClick={publishBlog}>
					Yayınla
				</button>
			</div>
		</form>
	);
};

export default CreateBlogForm;
