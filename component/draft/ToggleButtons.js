import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faListUl,
	faListOl,
} from '@fortawesome/free-solid-svg-icons';

const ToggleButtons = ({ blockType, toggleBlockStyle }) => {
	return (
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
					blockType === 'header-two' && 'note-inline-button-active'
				}`}
				onMouseDown={(e) => toggleBlockStyle('header-two', e)}
				style={{ fontWeight: 'bold' }}
			>
				H2
			</span>
			<span
				className={`note-inline-button ${
					blockType === 'header-three' && 'note-inline-button-active'
				}`}
				onMouseDown={(e) => toggleBlockStyle('header-three', e)}
				style={{ fontWeight: 'bold' }}
			>
				H3
			</span>
			<span
				className={`note-inline-button ${
					blockType === 'unordered-list-item' && 'note-inline-button-active'
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
	);
};

export default ToggleButtons;
