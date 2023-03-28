/* eslint-disable jsx-a11y/img-redundant-alt */
import classes from '../styles/Nav.module.css';
import imgPath from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function Nav() {
    const { currentUser, logOut } = useAuth();
    return (
        <>
            <nav className={classes.nav}>
                <ul className={classes.menu}>
                    <li className={`${classes.left_item} li_item`}>
                        <Link to="/" className={classes.brand}>
                            <img src={imgPath} alt="Hello Image" />
                            <h3>Home - React App</h3>
                        </Link>
                    </li>
                    <li className={`${classes.right_itm} li_item`}>
                        <div className={classes.account}>
                            {currentUser ? (
                                <>
                                    <span className={`${classes.user}`}>😀</span>
                                    <span className={classes.account_title}>{currentUser.displayName}</span>
                                    <span style={{ cursor: 'pointer', fontWeight: 'bolder', fontSoze: '20px' }} className={classes.mtop} title="LogOut" onClick={logOut}>
                                        💢{/* ↻ */}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup"> SignUp </Link>
                                    <Link className={classes.lst} to="/login">
                                        {' '}
                                        Login{' '}
                                    </Link>
                                </>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}
