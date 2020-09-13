import NoteItem from 'component/user/NoteItem';

const NoteList = ({ notes }) => {
	return (
		<React.Fragment>
			{notes?.map((note) => (
				<NoteItem key={note._id} note={note} />
			))}
		</React.Fragment>
	);
};

export default NoteList;
