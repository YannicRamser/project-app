import React from 'react';
import {useLoaderData} from "react-router-dom";
import {Cookies} from "react-cookie";
import {getCookie} from "./Login.jsx";


export default function Home() {
    let infoCorsi = useLoaderData().corsi.results;

    const userId = getCookie()

    function getRole() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useLoaderData().user.results.filter(user => user.id === userId)[0].ruolo
    }

    function getDocente(id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useLoaderData().user.results.filter(user => user.id === id)[0]
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Home</h2>
                {getRole() === "docente" ? (
                    <button>Non fa ancora nulla</button>
                ) : null}
            </div>
            <div className="line"></div>

            <div id="home-corsiList"></div>
            {infoCorsi ? (infoCorsi.map((corso, index) => (
                            <div key={index}>
                                <div className="home-corsoContainer">
                                    <a href={`/corso/${corso.id}`}>
                                        <h2>{corso.nome}</h2>
                                    </a>

                                    <p>Anno: {corso.anno}</p>
                                    <p>Docente: {getDocente(corso.docente).nome} {getDocente(corso.docente).cognome}</p>
                                </div>
                            </div>
                        )
                    )
                ) :
                (
                    <h1 style={{color: 'red'}}>Error nessun corso!</h1>
                )
            }
        </div>
    )
        ;
};