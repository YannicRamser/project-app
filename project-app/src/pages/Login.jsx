import React from 'react';
import './Login.css';
import {useNavigate } from 'react-router-dom';
import res from "assert";

function checkLogin(username, password) {
    fetch("http://localhost:3000/api/login/" + username + "/" + password).then(res => res.json())
    if (res.ok) {
        if (res.success === true) {
            //settare il cookie qui
            const userId = cookies.set('userId', );
            return true;
        } else {
            return false;
        }
    }
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
                    <p id="Risposta"> </p>
                    <button onClick={(pswd, user) => {

                        user = document.querySelector("#input-username").value;
                        pswd = document.querySelector("#input-password").value;

                        if (checkLogin(user, pswd)) {
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