import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./register.css"
import axios from "axios";

export default function Register() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const password2 = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.current.value !== password2.current.value) {
            password2.current.setCustomValidity("Passwords do not match!");
        } else {
            const user = {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value
            }

            try {
                await axios.post("/auth/register/", user);
                navigate("/login");
            } catch(err) {
                console.log(err.response);
            }

        }
    }

  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h4  className="registerLogo">Kwitter</h4>
                <span className="registerDesc">Connect with people from around the world</span>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleSubmit}>
                    <input type="text" className="registerInput" required placeholder="Name" ref={name} />
                    <input type="text" className="registerInput" required placeholder="Email" ref={email} />
                    <input type="text" className="registerInput" required placeholder="Password" ref={password}/>
                    <input type="text" className="registerInput" required placeholder="Confirm Password" ref={password2} />
                    <button className="registerButton" type="submit">Sign Up</button>
                    
                    <hr />
                    <Link to={"/login"}><span className="registerExistingUser">Already have an account?</span></Link>
                </form>
            </div>
        </div>
    </div>
  )
}
