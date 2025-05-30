import './Header.css'
import {Cookies} from "react-cookie";

const cookies = new Cookies();

export default function Header() {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    return (
        <>
            <div id="header-container">
                <a href="/" id="header-logo-link">
                    <img src="/Ameti_Logo_sfumature.png" alt="Ameti" id="header-title"/>
                </a>

                <div id="header-icons">
                    <div id="header-navBar">
                        <h2 id="header-navIcon"><a href="/">Home</a></h2>
                        <h2 id="header-navIcon"><a href="/dashboard">Dashboard</a></h2>
                    </div>

                    {cookies.get("userId") !== undefined ? (
                        <img
                            id="header-settings"
                            src="/settings-icon.png"
                            width={40}
                            height={40}
                            alt="Settings"
                            onClick={async () => {
                                const exit = window.confirm("Vuoi uscire dal sito?");
                                if (exit) {
                                    cookies.remove("userId");
                                    await delay(500);
                                    window.location.href = "/login";
                                }
                            }}
                        />
                    ) : (
                        <a href="/login" style={{color: 'black'}}>
                            <h2 style={{marginRight: 20}}>Login</h2>
                        </a>
                    )}
                </div>

            </div>
            <div className="line"/>
        </>
    )

}