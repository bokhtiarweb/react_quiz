/* eslint-disable max-lines */
import { useEffect, useState } from 'react';
import { getDatabase, get, orderByKey, query, ref, startAt, limitToFirst } from 'firebase/database';

export default function useVideoList(page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasmore] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            //& Database Related word
            const db = getDatabase();
            const videoRef = ref(db, 'videos');
            const videoQuery = query(videoRef, orderByKey(), startAt('' + page), limitToFirst(8));

            try {
                setError(false);
                setLoading(true);

                const snapShort = await get(videoQuery);
                setLoading(false);
                if (snapShort.exists()) {
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapShort.val())];
                    });
                } else {
                    setHasmore(false);
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }
        fetchVideos();
    }, [page]);

    return {
        loading,
        error,
        videos,
        hasMore
    };
}
