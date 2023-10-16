import React, {useContext, useState} from 'react'
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const {darkMode,setDarkMode}=useContext(ThemeContext)  

    const handleSignup = (e)=>{
        e.preventDefault();
        axios.post("https://cinetrail-server.herokuapp.com/users/signup", {
            email, password, username
        })
        .then((res)=>{ 
            console.log(res);
            if(res.data.status === 409) {
                alert(
                    "Email already in use. Please sign up with a different email, or sign in."
                    );
            }else{
                setEmail("");
                setPassword("");
                setUsername("");
                setSignupSuccess(true);
            }
        })
        .catch(err=>console.log(err))
    }


  return (
    <div className={darkMode ? "signup-container" : "signup-container signup-light"} >
        <form onSubmit={handleSignup} className="signup-form">
        <div className="title-container">
            <h1>Sign up</h1>
            <p>Please fill in this form to create an account.</p>
        </div>
        <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                placeholder="Enter Email" 
                name="email" 
                required
                value={email}
                onChange={(e)=> setEmail(e.target.value)} 
            />
        </div>
        <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                placeholder="Enter Password" 
                name="password" 
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
        </div>
        <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input 
            type="text" 
            placeholder="Enter Username" 
            name="username" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required/>
        </div>
        <div className="button-container">
            <button type="reset" className="cancelbtn">Cancel</button>
            <button type="submit" className="signupbtn">Sign Up</button>
        </div>
        {signupSuccess ? <p className="success-message">Signed up successfully! <Link to={"/signin"}>Sign in</Link></p> : 
        <p className="signin-message">Already have an account? <Link to={"/signin"}>Sign in</Link></p>}
        
        </form>
    </div>
  )
}

export default Signup