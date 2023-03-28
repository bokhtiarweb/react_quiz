/* eslint-disable max-lines */
import { useEffect, useReducer, useState } from 'react';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';
import useQuestions from '../hooks/useQuestions';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';
import { useAuth } from '../../contexts/AuthContext';
import { getDatabase, ref, set } from 'firebase/database';

const initialState = null;
const reducer = (state, action) => {
    switch (action.type) {
        case 'falsequestions':
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                });
            });
            return action.value;
        case 'answers':
            const cloneQuestions = _.cloneDeep(state);
            cloneQuestions[action.questionId].options[action.optionIndex].checked = action.value;
            return cloneQuestions;
        default:
            return state;
    }
};

export default function Quiz() {
    const { id } = useParams();
    const { loading, error, questions } = useQuestions(id);
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [qna, dispatch] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();
    const history = useHistory();
    const { location } = history;
    const { state } = location;
    const { videoTitleFromUrl } = state;

    useEffect(() => {
        dispatch({
            type: 'falsequestions',
            value: questions
        });
    }, [questions]);

    function handleAnswerChange(e, index) {
        dispatch({
            type: 'answers',
            questionId: currentQuiz,
            optionIndex: index,
            value: e.target.checked
        });
    }

    //^ Handle when user click next button to get the next question
    function nextQuestion() {
        if (currentQuiz <= questions.length) {
            setCurrentQuiz((preState) => preState + 1);
        }
    }

    //^ Handle when user click prev button to get the prev question
    function prevQuestion() {
        if (currentQuiz >= 1 && currentQuiz <= questions.length) {
            setCurrentQuiz((preState) => preState - 1);
        }
    }

    //& Submit Quitz
    async function submit() {
        const { uid } = currentUser;

        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna
        });

        history.push({
            pathname: `/result/${id}`,
            state: {
                qna
            }
        });
    }

    //& Calculate percentage of progressbar
    const percentage = questions.length > 0 ? ((currentQuiz + 1) / questions.length) * 100 : 0;
    return (
        <>
            {loading && <div>Loading....</div>}
            {error && <div>There was an error</div>}
            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <h1>{qna[currentQuiz].title} </h1>
                    <h4>Question can have multiple answers</h4>
                    <Answers input options={qna[currentQuiz].options} handleChange={handleAnswerChange} />
                    <ProgressBar nextBtn={nextQuestion} prevBtn={prevQuestion} submit={submit} progress={percentage} />
                    <MiniPlayer id={id} title={videoTitleFromUrl} />
                </>
            )}
        </>
    );
}
