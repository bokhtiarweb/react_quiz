import Illustration from '../Illustration';
import Image from '../Image';
import imgPath from '../../assets/images/signup.svg';
import SignupForm from '../SignupForm';

export default function SingUp() {
    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration>
                    <Image imgPath={imgPath} text="SignUp Image" />
                </Illustration>
                <SignupForm />
            </div>
        </>
    );
}
