import Answers from './Answers';
import classes from '../styles/Question.module.css';
export default function Question({ answers = [] }) {
    return answers.map((answer, index) => (
        <div className={classes.question} key={index}>
            <div className={classes.qtitle}>
                <span className="material-icons-outlined"> ❔ </span>
                {answer.title}
            </div>
            <Answers input={false} options={answer.options} />
        </div>
    ));
}
