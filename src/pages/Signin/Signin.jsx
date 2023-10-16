import axios from 'axios'
import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import '../Signup/Signup.css'


function Signin() {
    const {darkMode,setDarkMode}=useContext(ThemeContext)  
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [warning, setWarning] = useState("")

    const {user, setUser, token, setToken} = useContext(UserContext);

    const handleSignIn = (e) => {
        e.preventDefault();

        axios.post("https://cinetrail-server.herokuapp.com/users/login", {
            email, password
        })
        .then((res)=>{ 
            console.log(res);
            if(res.data.message === "Email does not exist") {
               setWarning("Email not found. Please try another or sign up.");
            }else{
                setUser(res.data);
                setToken(res.data.token);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                localStorage.setItem("token", res.data.token);
                navigate("/");
            }
        })
        .catch(err=>console.log(err));

    }

  return (
    <div className={darkMode ? "signup-container" : "signup-container signup-light"}>
        <form className="signup-form" onSubmit={handleSignIn}>
        <div className="title-container">
            <h1>Sign in</h1>
            <p>Please fill in this form to create an account.</p>
        </div>
        <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                placeholder="Enter Email" 
                name="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
            />
        </div>
        <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                placeholder="Enter Password" 
                name="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
            />
        </div>
        
        <div className="button-container">
            <button type="reset" className="cancelbtn">Cancel</button>
            <button type="submit" className="signupbtn">Sign In</button>
        </div>
         
        <p className="signin-message">Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
        <p>{warning}</p>
        </form>
    </div>
  )
}

export default Signin