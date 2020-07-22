import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faBold,
	faItalic,
	faUnderline,
} from '@fortawesome/free-solid-svg-icons';

const InlineButtons = ({currentStyle, toggleInlineStyle}) => {

	return (
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
				<FontAwesomeIcon icon={faUnderline} style={{ marginBottom: '-1px' }} />
			</span>
		</div>
	);
};

export default InlineButtons;
