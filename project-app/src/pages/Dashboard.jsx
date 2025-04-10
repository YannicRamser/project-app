import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>

            <div className="line"></div>
            <div className="row">
                <h3 className="titolo">Compiti</h3>
                <p className="media">media</p>
            </div>

            <div className="line"></div>
            <div className="row">
                <h3 className="titolo">Verifiche</h3>
                <p className="media">media</p>
            </div>

        </div>
    )
}