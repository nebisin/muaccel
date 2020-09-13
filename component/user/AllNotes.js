import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import NoteHolder from 'component/user/NoteHolder';
import NoteList from 'component/user/NoteList';
import mevzuatApi from 'api/mevzuat';

const AllNotes = ({ user, token }) => {
    const [notes, setNotes] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const getAllNotes = async (page) => {
        const response = await mevzuatApi.post(
            '/notes',
            {
                limit: 5,
                skip: (page - 1) * 5,
                sort: { createdAt: -1 },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.data) {
            if (response.data.length < 5) {
                setHasMore(false);
            }
            setNotes((notes) => notes.concat(response.data));
        }
    };
    return (
        <div className="all-notes user-favorite-container">
            <InfiniteScroll
                pageStart={0}
                loadMore={(page) => getAllNotes(page)}
                hasMore={hasMore}
                loader={
                    <React.Fragment key={0}>
                        <NoteHolder />
                        <NoteHolder />
                        <NoteHolder />
                    </React.Fragment>
                }
            >
                {notes.length ? (
                    <NoteList notes={notes} />
                ) : (
                    <React.Fragment>
                        {!hasMore && (
                            <div className="user-no-favorite">
                                <div className="user-no-favorite-description">
                                    Henüz hiç not oluşturmamışsınız.
                                </div>
                                <div className="user-no-favorite-image-container fade-in">
                                    <img
                                        className="user-no-favorite-image"
                                        src="/nonote.png"
                                        alt="not"
                                    />
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                )}
            </InfiniteScroll>
        </div>
    );
};

export default AllNotes;