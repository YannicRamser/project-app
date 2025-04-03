import React from 'react';
import './Login.css';
import {useNavigate } from 'react-router-dom';

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
                    <p id="Risposta"> </p>
                    <button onClick={(pswd, username) => {

                        username = document.querySelector("#input-username").value;
                        pswd = document.querySelector("#input-password").value;
                        if (pswd === "1234" && username === "username") {
                            navigate("/");
                        } else {
                            let text = "Username o password sono errati";
                            document.getElementById("Risposta").innerHTML = text;
                        }
                    }}>Login
                    </button>

                </div>
            </div>
        </div>
    );
};
export default Login;