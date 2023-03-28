import Nav from './Nav';
import classes from '../styles/Layout.module.css';
export default function Layout({ children }) {
    return (
        <>
            <Nav />
            <div className={classes.main}>
                <div className={classes.container}>{children}</div>
            </div>
        </>
    );
}
