import './Header.css'

export default function Header() {
    return (
        <>
            <div id="header-container">
                <h1 id="header-title">Ameti</h1>

                <div id="header-icons">
                    <div id="header-navBar">
                        <h2 id="header-navIcon"><a href="/">Home</a></h2>
                        <h2 id="header-navIcon"><a href="/dashboard">Dashboard</a></h2>
                    </div>

                    <img id="header-settings" src="../assets/settings-icon.png" width={40} height={40} alt="Settings"/>
                </div>

            </div>
            <div className="line"/>
        </>
    )

}