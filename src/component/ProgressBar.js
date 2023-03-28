import { useRef, useState } from 'react';
import classes from '../styles/ProgressBar.module.css';
import Button from './Button';

export default function ProgressBar({ nextBtn, prevBtn, submit, progress }) {
    const [tooltip, setTooltip] = useState(false);
    const tooltipRef = useRef();

    function toggleTooltip() {
        if (tooltip) {
            setTooltip(false);
            tooltipRef.current.style.display = 'none';
        } else {
            setTooltip(true);
            tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
            tooltipRef.current.style.display = 'block';
        }
    }
    return (
        <>
            <div className={classes.progressBar}>
                <div className={classes.backButton} onClick={prevBtn}>
                    <span className="classes.material - icons - outlined">⬅</span>
                </div>
                <div className={classes.rangeArea}>
                    <div className={classes.tooltip} ref={tooltipRef}>
                        {progress}% Cimplete!
                    </div>
                    <div className={classes.rangeBody}>
                        <div className={classes.progress} style={{ width: `${progress}%` }} onMouseOver={toggleTooltip} onMouseOut={toggleTooltip}></div>
                    </div>
                </div>
                <Button onClick={progress === 100 ? submit : nextBtn} className={`${classes.next} ${classes.quizbtn}`}>
                    <span className="classes.material - icons - outlined">{progress === 100 ? 'Submit Quiz' : 'Next Question'}</span>
                    <span>➡</span>
                </Button>
            </div>
        </>
    );
}
