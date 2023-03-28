/* eslint-disable max-lines */
import Summary from '../Summary';
import Analysis from '../Analysis';
import { useHistory, useParams } from 'react-router-dom';
import useAnswers from '../hooks/useAnswers';
import _ from 'lodash';

export default function Result() {
    const { id } = useParams();
    const { location } = useHistory();
    const { state } = location;
    const { qna } = state;

    const { loading, error, answers } = useAnswers(id);

    const calculate = () => {
        let score = 0;

        answers.forEach((question, index1) => {
            let correctIndexes = [],
                checkedIndexes = [];

            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2);
                if (qna[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            });
            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score += 5;
            }
        });

        return score;
    };

    const useScore = calculate();

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was something wrong</div>}
            {answers && answers.length > 0 && (
                <>
                    <Summary score={useScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}
        </>
    );
}
