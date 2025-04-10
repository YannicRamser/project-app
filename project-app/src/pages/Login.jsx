import React from 'react';
import './Login.css';
import {Cookies} from "react-cookie";

export function getCookie() {
    const cookies = new Cookies();
    return cookies.get("userId");
}

async function checkLogin(username, password) {
    const response = await fetch("http://localhost:3000/api/login/" + username + "/" + password)
        .then(res => res.json())

    console.log(response.success);
    if (response.success === true) {
        console.log("logged in");

        const cookies = new Cookies();
        cookies.set('userId', response.id);
        return true;
    }
    return false;
}

const Login = () => {
    return (

        <div className="login-container">
            <div className="login-form">
                <div id="login-Title">
                    <h1>Login</h1>
                    <p id="Risposta"></p>
                </div>
                <div id="login-Username" className="input-field">
                    <p>Username</p>
                    <input id="input-username" className={"login-input"} type="text"/>
                </div>
                <div id="login-Password" className="input-field">
                    <p>Password</p>
                    <input id="input-password" className={"login-input"} type="password"/>
                </div>
                <div className="login-button-container">
                    <p id="Risposta"></p>
                    <button onClick={async (user, pswd) => {

                        user = document.querySelector("#input-username").value;
                        pswd = document.querySelector("#input-password").value;

                        if (user && pswd) {
                            if (await checkLogin(user, pswd) === true) {
                                window.location.href = "/";
                            } else {
                                let text = "Username o password sono errati";
                                document.getElementById("Risposta").innerHTML = text;
                            }
                        } else {
                            let text = "Username o password mancanti";
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