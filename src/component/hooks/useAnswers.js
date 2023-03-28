import { getDatabase, orderByKey, query, ref, get } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useAnswers(videoID) {
    const [loading, setLoading] = useState(true);
    const [error, setErrro] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        async function fetchResult() {
            const db = getDatabase();
            const answerRed = ref(db, 'answers/' + videoID + '/questions');
            const answerQuery = query(answerRed, orderByKey());

            try {
                setLoading(true);
                setErrro(false);
                const snapShort = await get(answerQuery);
                setLoading(false);
                if (snapShort.exists()) {
                    setAnswers((prevState) => {
                        return [...prevState, ...Object.values(snapShort.val())];
                    });
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setErrro(true);
            }
        }
        fetchResult();
    }, [videoID]);

    return {
        loading,
        error,
        answers
    };
}
