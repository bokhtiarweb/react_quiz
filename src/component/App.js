/* eslint-disable max-lines */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Quiz from './pages/Quiz';
import Home from './pages/Home';
import SingUp from './pages/SignUp';
import '../styles/App.css';
import Login from './pages/Login';
import Result from './pages/Result';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { AuthProvider } from '../contexts/AuthContext';

const App = () => {
    return (
        <div className="app">
            <Router>
                <AuthProvider>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <PublicRoute exact path="/signup" component={SingUp} />
                            <PublicRoute exact path="/login" component={Login} />
                            <PrivateRoute exact path="/quiz/:id" component={Quiz} />
                            <PrivateRoute exact path="/result/:id" component={Result} />
                        </Switch>
                    </Layout>
                </AuthProvider>
            </Router>
        </div>
    );
};

export default App;
