import {useLoaderData, useParams} from 'react-router-dom'
import "./Corso.css"
import {Cookies} from "react-cookie";
import React from "react";

export async function loader() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");

    const [corsi, user] = await Promise.all([
        fetch(`http://localhost:3000/api/corso/partecipante/${userId}`).then(res => res.json()),
        fetch("http://localhost:3000/api/utenti").then(res => res.json())
    ])

    return {corsi, user}
}

export default function Corso() {
    const corsoId = parseInt(useParams().corsoId)

    console.log(useLoaderData())

    const corsoInfo = useLoaderData().corsi.results.filter(checkId)[0]
    console.log(corsoInfo)

    const docente = useLoaderData().user.results.filter(user => user.id === 1)[0];
    console.log(docente)

    function checkId(corso) {
        return corso.id === corsoId;
    }

    function getRole() {
        return "docente";
    }
    return (
        <div id="corso-container">
            {corsoInfo ? (
                <>
                    <h2>{corsoInfo.nome}, {corsoInfo.descrizione}</h2>
                    <h2>Home</h2>
                    {getRole() === "docente" ? (
                        <button>Non fa ancora nulla</button>
                    ) : null}
                    <div className="line"></div>

                    <p>Docente: {docente.nome} {docente.cognome}</p>
                    <p>Anno: {corsoInfo.anno}</p>

                    inserire il contenuto del corso qui

                    <div className="line"></div>

                    inserire i partecipanti del corso qui
                </>
            ) : (
                <h1 style={{color: 'red'}}>Error: Corso not found!</h1>
            )}
        </div>
    )
}