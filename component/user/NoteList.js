import FeedAds from 'component/ads/FeedAds';
import NoteItem from 'component/user/NoteItem';

const NoteList = ({ notes }) => {
	return (
		<React.Fragment>
			{notes?.map((note, index) => (
				<React.Fragment key={note._id}>
					{index === 1 || (index > 0 && Math.round(index / 3) === index / 3) ? (
						<FeedAds />
					) : (
						''
					)}
					<NoteItem note={note} />
				</React.Fragment>
			))}
		</React.Fragment>
	);
};

export default NoteList;
