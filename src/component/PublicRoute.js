import { useAuth } from '../contexts/AuthContext';
import { Redirect, Route } from 'react-router-dom';

export default function PublicRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();
    return !currentUser ? <Route {...rest}>{(props) => <Component {...props} />}</Route> : <Redirect to="/" />;
}
