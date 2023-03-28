/* eslint-disable jsx-a11y/alt-text */
import classes from '../styles/Card.module.css';

export default function Card({ title, id, noq }) {
    return (
        <>
            <div className={classes.card}>
                <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} text={title} />
                <p>#{title}</p>
                <div className={classes.qmeta}>
                    <p className={classes.p_left}>{noq} Questions</p>
                    <p className={classes.p_right}>Total poinst : {noq * 5}</p>
                </div>
            </div>
        </>
    );
}
