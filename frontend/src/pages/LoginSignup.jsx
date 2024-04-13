import React, { useState } from 'react'
import './css/LoginSignup.css'


const LoginSignup = () => {

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => {
            responseData = data;
        }).catch(err => {
            console.log(err);
        });
        if (responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors);
        }
    };

    const signUp = async () => {

        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => {
            responseData = data;
        }).catch(err => {
            console.log(err);
        });
        if (responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            window.location.replace("/");
        }else{
            alert(responseData.errors);
        }

    };



    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name="name" value={formData.name} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}

                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Your Email' />

                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => { state === "Login" ? login() : signUp() }}>Continue</button>
                {state === "Login" ? <p className='loginsignup-login'>Creating account? <span onClick={() => { setState("Sign Up") }}>Sign Up Here</span></p> : <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id='' />
                    <p>By continuing, I agree to the terms of use and privacy policy</p>
                </div>
            </div>

        </div>
    )
}

export default LoginSignup