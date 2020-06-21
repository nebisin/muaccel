import { useEffect, useState } from 'react';

import NoteItem from 'component/user/NoteItem';
import mevzuatApi from 'api/mevzuat';

const AllNotes = ({ user, token }) => {
	const [notes, setNotes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getAllNotes = async () => {
			setIsLoading(true);
			const response = await mevzuatApi.get('/notes', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setIsLoading(false);
			if (response.data) {
				setNotes(response.data);
			}
		};
		if (user) {
			getAllNotes();
		}
	}, [user, token]);
	return (
        <div className="all-notes">
            <h2 className="account-header">Notlarım:</h2>
            <br />
			{!isLoading ? (
				notes.length ? (
					notes.map((note) => <NoteItem key={note._id} note={note} />)
				) : (
					<div>Hiç not bulunamadı.</div>
				)
			) : (
				<div style={{ width: 'auto', display: 'flex', marginBottom: '20px' }}>
					<div className="loader">Loading...</div>
				</div>
			)}
		</div>
	);
};

export default AllNotes;
