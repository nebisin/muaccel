import { useContext } from 'react';
import TimeStamp from 'component/TimeStamp';
import AuthContext from 'context/AuthContext';

const AuthorPreview = ({ data }) => {
	const { isLoggedIn, isLogging } = useContext(AuthContext);

	return (
		<div className="author-preview">
			<a className="author-preview-logo"></a>
			<div className="author-preview-name">
				<div className="author-preview-displayname">
					<a>
						{data.author.name} (@{data.author.userName})
					</a>
				</div>

				<div className="author-preview-timestamp">
					<a>
						<TimeStamp date={data.createdAt} /> yazıldı.
					</a>
				</div>
			</div>
			{isLoggedIn && <button className="follow-button">Takip Et</button>}
		</div>
	);
};

export default AuthorPreview;
