import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-form">
                <div id="login-Title">
                    <h1>Login</h1>
                </div>
                <div id="login-CampoUsername" className="input-field">
                    <p>Username</p>
                    <input type="text" />
                </div>
                <div id="login-Password" className="input-field">
                    <p>Password</p>
                    <input type="password" />
                </div>
                <div className="login-button-container">
                    <button>Login</button>
                </div>
            </div>
        </div>
    );
};
export default Login;