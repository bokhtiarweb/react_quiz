/* eslint-disable max-lines */
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

export default function SignupForm() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');
    const [agree, setAggre] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const { signUp } = useAuth();
    const history = useHistory();

    //^SignUp Handleing
    async function handleSubmit(e) {
        e.preventDefault();

        //& Do validation
        if (password !== conformPassword) {
            return setError('Password not match!');
        }

        try {
            setError('');
            setLoading(true);
            await signUp(email, password, userName);
            history.push('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('Fail to create an account!');
        }
    }

    return (
        <Form style={{ height: '500px' }} onSubmit={handleSubmit}>
            <TextInput type="text" required value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Name" icon="🧑" />
            <TextInput type="text" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" icon="📧" />
            <TextInput type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Passward" icon="🔒" />
            <TextInput type="password" required value={conformPassword} onChange={(e) => setConformPassword(e.target.value)} placeholder="Conform Passward" icon="🔐" />
            <Checkbox required text="&nbsp;I agree to the Terms &amp; Conditions" value={agree} onChange={(e) => setAggre(e.target.value)} />
            <Button disabled={loading} type="submit">
                <span>Submit now</span>
            </Button>
            {error && <p className="error">{error}</p>}
            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );
}
