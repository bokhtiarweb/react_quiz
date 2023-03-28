import imgPath from '../../assets/images/login.svg';
import Illustration from '../Illustration';
import LoginForm from '../LoginForm';
import Image from '../Image';
export default function Login() {
    return (
        <div className="column">
            <Illustration>
                <Image imgPath={imgPath} text="LogIn Image" />
            </Illustration>
            <LoginForm />
        </div>
    );
}
