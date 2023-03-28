import classes from '../styles/MiniPlayer.module.css';
// import Image from './Image';
// import imgPath from '../assets/images/grid.jpg';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

export default function MiniPlayer({ id, title }) {
    const buttonRef = useRef();
    const [status, setStatus] = useState(false);
    const videoUrl = `https://youtube.com/watch?v=${id}`;

    function toggleMimiPlay() {
        if (!status) {
            buttonRef.current.classList.remove(classes.floatingBtn);
            setStatus(true);
        } else {
            buttonRef.current.classList.add(classes.floatingBtn);
            setStatus(false);
        }
    }
    return (
        <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={buttonRef} onClick={toggleMimiPlay}>
            <span className={`material-icons-outlined ${classes.open}`}> ▶ </span>
            <span className={`material-icons-outlined ${classes.close}`} onClick={toggleMimiPlay}>
                {' '}
                ❌{' '}
            </span>
            <ReactPlayer className={classes.player} url={videoUrl} width="300px" height="168px" playing={status} controls />
            <p>{title}</p>
        </div>
    );
}
