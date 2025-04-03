import './Header.css'

export default function Header() {
    return (
        <>
            <div id="header-container">
                <a href="/" id="header-logo-link">
                    <img src="/Ameti_Logo_sfumature.png" alt="Ameti" id="header-title" />
                </a>

                <div id="header-icons">
                    <div id="header-navBar">
                        <h2 id="header-navIcon"><a href="/">Home</a></h2>
                        <h2 id="header-navIcon"><a href="/dashboard">Dashboard</a></h2>
                    </div>

                    <img id="header-settings" src="/settings-icon.png" width={40} height={40} alt="Settings"/>
                </div>

            </div>
            <div className="line"/>
        </>
    )

}