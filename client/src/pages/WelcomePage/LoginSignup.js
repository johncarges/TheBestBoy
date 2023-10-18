import LoginForm from "./authforms/LoginForm";
import SignUpForm from "./authforms/SignUpForm";

export default function LoginSignup(props) {



    return (
        <div className='welcome-page-container'>
            <div className='welcome-page-auth-forms'>
                <LoginForm/>
                <SignUpForm/>
            </div>
            <div className='welcome-page-information'>
                <h1>Welcome!</h1>
            </div>
        </div>
    )


}