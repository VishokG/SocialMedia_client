import { useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./login.css"

export default function Login() {
    const email = useRef();
    const password = useRef();
    const k = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await loginCall({
            email: email.current.value,
            password: password.current.value
        }, k.dispatch);
    }

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h4  className="loginLogo">Kwitter</h4>
                <span className="loginDesc">Connect with people from around the world</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input type="email" required className="loginInput" placeholder="Email" ref={email} />
                    <input type="password" required className="loginInput" placeholder="Password" ref={password} />
                    <button className="loginButton">Log In</button>
                    <span className="loginForgot">Forgot Password</span>
                    <hr />
                    <Link className="loginRegisterLink" to={"/register"}><button className="loginRegister">Create a New Account</button></Link>
                </form>
            </div>
        </div>
    </div>
  )
}
