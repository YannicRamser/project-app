import React from 'react';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import {Cookies} from "react-cookie";

async function checkLogin(username, password) {
    return await fetch("http://localhost:3000/api/login/" + username + "/" + password)
        .then(res => {
            if (!res.ok) {
                return false
            }
            return res.json()
        })
        .then(data => {
            if (data.success) {
                console.log("login success", data);
                const cookies = new Cookies();
                cookies.set('userId', data.id);
                return true
            } else {
                console.log("login error", data);
                return false;
            }
        })
}

const Login = () => {
    const navigate = useNavigate();
    return (

        <div className="login-container">
            <div className="login-form">
                <div id="login-Title">
                    <h1>Login</h1>

                    <p id="Risposta"></p>

                </div>
                <div id="login-Username" className="input-field">
                    <p>Username</p>
                    <input id="input-username" type="text"/>
                </div>
                <div id="login-Password" className="input-field">
                    <p>Password</p>
                    <input id="input-password" type="password"/>

                </div>
                <div className="login-button-container">
                    <p id="Risposta"></p>
                    <button onClick={async (pswd, user) => {

                        user = document.querySelector("#input-username").value;
                        pswd = document.querySelector("#input-password").value;

                        await checkLogin(user, pswd).then(res => {
                            if (res) {
                                navigate("/");
                            } else {
                                let text = "Username o password sono errati";
                                document.getElementById("Risposta").innerHTML = text;
                            }
                        })


                    }}>Login
                    </button>

                </div>
            </div>
        </div>);
};
export default Login;