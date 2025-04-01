import React from 'react';

const Login = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'center',
            height: '200px',
            gap: '10px',
            color: 'white',
        }}>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
                <div id="Login"
                     style={{display: 'flex', flexDirection: 'row', alignItems: 'left', gap: '5px'}}>
                    <h1>Username</h1>
                </div>
                <div id="CampoUsername"
                     style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <p>Username</p>
                    <input type="text" style={{padding: '5px', width: '300px'}}/>
                </div>
                <div id="Password"
                     style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <p>Password</p>
                    <input type="text" style={{padding: '5px', width: '300px'}}/>
                </div>
            </div>
            <button style={{padding: '5px 15px', cursor: 'pointer', alignContent: "left"}}>Login</button>
        </div>
    );
}

    export default Login;
