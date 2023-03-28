/* eslint-disable max-lines */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useState } from 'react';
import Button from './Button';
import Form from './Form';
import TextInput from './TextInput';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const { logIn } = useAuth();
    const history = useHistory();

    //^SignUp Handleing
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await logIn(email, password);
            history.push('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('Fail to LogIn!');
        }
    }

    return (
        <Form style={{ height: '330px' }} onSubmit={handleSubmit}>
            <TextInput type="text" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" icon="📧" />
            <TextInput type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" icon="🔒" />

            <Button type="submit" disabled={loading}>
                <span>Submit Now</span>
            </Button>

            {error && <p className="error">{error}</p>}

            <div className="info">
                Don't have an account?<Link to="/signup">SignUp</Link> instead.
            </div>
        </Form>
    );
}
