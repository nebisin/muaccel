import { useState, useContext } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Draft from 'component/draft/Draft';

const CreateBlogForm = () => {
	const { token } = useContext(AuthContext);

	const [title, setTitle] = useState('');
	const [titleError, setTitleError] = useState('');
	const [abstract, setAbstract] = useState('');
	const [abstractError, setAbstractError] = useState('');
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [contentError, setContentError] = useState('');
	const [publishing, setPublishing] = useState(false);
	const [saving, setSaving] = useState(false);
	const [generalError, setGeneralError] = useState('');

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
			document.getElementById('title').focus();
			document
				.getElementById('title')
				.scrollIntoView({ behavior: 'smooth', block: 'center' });
			isOK = false;
		} else {
			setTitleError('');
		}

		if (!abstract) {
			setAbstractError('Bir özet girmelisiniz!');
			if (isOK) {
				document.getElementById('abstract').focus();
				document
					.getElementById('abstract')
					.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
			isOK = false;
		} else {
			setAbstractError('');
		}

		let hasText = editorState.getCurrentContent().hasText();

		if (!hasText) {
			setContentError('Bir metin girmelisiniz!');
			if (isOK) {
				document.getElementById('content').focus();
				document
					.getElementById('content')
					.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
			isOK = false;
		} else {
			setContentError('');
		}

		return isOK;
	};

	const publishBlog = async (event) => {
		event.preventDefault();
		const isOK = checkPublish();
		if (!isOK) return;
		let content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
		let plainText = editorState.getCurrentContent().getPlainText();
		setPublishing(true);
		try {
			const response = await mevzuatApi.post(
				'/blog/publish',
				{
					title,
					abstract,
					content,
					plainText,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setGeneralError('');
		} catch (error) {
			console.log(error);
			setGeneralError(
				'Bir şeyler ters gitti! Lütfen daha sonra tekrar deneyiniz.'
			);
			let el = document.documentElement;
			el.scrollIntoView({ behavior: 'smooth' });
		}

		setPublishing(false);
	};

	const saveDraft = async (event) => {
		event.preventDefault();
		const isOK = checkPublish();
		if (!isOK) return;

		setSaving(true);

		let content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
		let plainText = editorState.getCurrentContent().getPlainText();

		try {
			const response = await mevzuatApi.post(
				'/blog/draft',
				{
					title,
					abstract,
					content,
					plainText,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setGeneralError('');
		} catch (error) {
			console.log(error);
			setGeneralError(
				'Bir şeyler ters gitti! Lütfen daha sonra tekrar deneyiniz.'
			);
			let el = document.documentElement;
			el.scrollIntoView({ behavior: 'smooth' });
		}
		setSaving(false);
	};

	return (
		<form onSubmit={() => {}}>
			<div className="error">{generalError}</div>
			<div className="title-create-form">
				<label htmlFor="title">
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
				<label htmlFor="abstract">
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
			<div className="content-create-form" id="content">
				<Draft editorState={editorState} setEditorState={setEditorState} />
			</div>
			<div className="error">{contentError}</div>
			<div className="create-form-buttons">
				<button className="create-form-draft-button" onClick={saveDraft}>
					{saving ? (
						<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
					) : (
						'Kaydet'
					)}
				</button>
				<button className="create-form-submit-button" onClick={publishBlog}>
					{publishing ? (
						<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
					) : (
						'Yayınla'
					)}
				</button>
			</div>
		</form>
	);
};

export default CreateBlogForm;
