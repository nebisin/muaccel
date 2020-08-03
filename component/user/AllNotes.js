import { useEffect, useState } from 'react';

import NoteItem from 'component/user/NoteItem';
import mevzuatApi from 'api/mevzuat';

const AllNotes = ({ user, token }) => {
	const [notes, setNotes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const getAllNotes = async () => {
			setIsLoading(true);
			const response = await mevzuatApi.post(
				'/notes',
				{
					sort: { createdAt: -1 },
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
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
			{!isLoading ? (
				notes.length ? (
					notes.map((note) => <NoteItem key={note._id} note={note} />)
				) : (
					<div className="user-no-favorite">
						<div className="user-no-favorite-description">
							Henüz hiç not oluşturmamışsınız.
						</div>
						<div className="user-no-favorite-image-container">
							<img
								className="user-no-favorite-image"
								src="/nonote.png"
								alt="not"
							/>
						</div>
					</div>
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
