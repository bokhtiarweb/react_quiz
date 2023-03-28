/* eslint-disable jsx-a11y/img-redundant-alt */
import classes from '../styles/Summary.module.css';
import imgPath from '../assets/images/success.png';
import useFetch from './hooks/useFetch';
import { useMemo } from 'react';

export default function Summary({ score, noq }) {
    console.log('Hello Summary');
    const imageKey = useMemo(() => {
        if ((score / (noq * 5)) * 100 < 50) {
            return 'fail';
        } else if ((score / (noq * 5)) * 100 < 75) {
            return 'good';
        } else if ((score / (noq * 5)) * 100 < 100) {
            return 'nice';
        } else {
            return 'execellent';
        }
    }, [score, noq]);

    const { loading, error, result } = useFetch(`https://api.pexels.com/v1/search?query=${imageKey}&per_page=1`, 'GET', {
        Authorization: process.env.REACT_APP_PIXEL_API_KEY
    });

    const resutlImg = result ? result?.photos[0].src.medium : imgPath;

    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                {/* progress bar will be placed here */}
                <p className={classes.score}>
                    Your score is <br /> {score} out of {noq * 5}
                </p>
            </div>

            {loading && <div className={classes.badge}>loading...</div>}
            {error && <div className={classes.badge}>There was and error</div>}

            {!loading && !error && (
                <div className={classes.badge}>
                    <img src={resutlImg} alt="Success Image" />
                </div>
            )}
        </div>
    );
}
