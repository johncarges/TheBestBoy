import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Welcome from "./components/Welcome";

export default function LoginSignup(props) {



    return (
        <div className='welcome-page-container'>
            <div className='welcome-page-auth-forms'>
                <LoginForm/>
                <hr className='welcome-page-hline'/>
                <SignUpForm/>
            </div>
            <Welcome />
        </div>
    )


}