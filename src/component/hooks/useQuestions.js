import { useState, useEffect } from 'react';
import { getDatabase, get, ref, query, orderByKey } from 'firebase/database';

export default function useQuestions(videoID) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchQuestions() {
            const db = getDatabase();
            const quizRef = ref(db, 'quiz/' + videoID + '/questions');
            const quizQuery = query(quizRef, orderByKey());

            try {
                setError(false);
                setLoading(true);

                const snapShort = await get(quizQuery);
                setLoading(false);

                if (snapShort.exists()) {
                    setQuestions((prevQuiz) => {
                        return [...prevQuiz, ...Object.values(snapShort.val())];
                    });
                }
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        fetchQuestions();
    }, [videoID]);

    return {
        loading,
        error,
        questions
    };
}
