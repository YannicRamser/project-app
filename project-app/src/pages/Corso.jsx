import {useLoaderData, useParams} from 'react-router-dom'
import "./Corso.css"
import {Cookies} from "react-cookie";
import React from "react";

export async function loader() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");

    if (cookies.get("userId") === null) {
        window.location.href = "/login";
    }

    const [corsi, user] = await Promise.all([
        fetch(`http://localhost:3000/api/corso/partecipante/${userId}`).then(res => res.json()),
        fetch("http://localhost:3000/api/users").then(res => res.json())
    ])

    return {corsi, user}
}

export default function Corso() {
    const corsoId = parseInt(useParams().corsoId)

    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const userRole = useLoaderData().user.results.filter(user => user.id === userId)[0].ruolo

    const corsoInfo = useLoaderData().corsi.results.filter(checkId)[0]
    const docente = useLoaderData().user.results.filter(user => user.id === corsoInfo.docente)[0];
    const corsoUsers = JSON.parse(corsoInfo.partecipanti);

    function checkId(corso) {
        return corso.id === corsoId;
    }

    function getUser(id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useLoaderData().user.results.filter(user => user.id === id)[0]
    }

    return (
        <div id="corso-container">
            {corsoInfo ? (
                <>
                    <h2>{corsoInfo.nome}, {corsoInfo.descrizione}</h2>
                    <h2>Home</h2>
                    {userRole === "docente" ? (
                        <button onClick={window.location.href = "/adding"}>+</button>
                    ) : null}
                    <div className="line"></div>

                    <p>Docente: {docente.nome} {docente.cognome}</p>
                    <p>Anno: {corsoInfo.anno}</p>

                    inserire il contenuto del corso qui

                    <div className="line"></div>
                    <h3>Partecipanti:</h3>

                    {corsoUsers ? (
                        corsoUsers.map((user) => {
                            const userData = getUser(user);
                            return <p key={userData.id}>{userData.nome} {userData.cognome}</p>;
                        })
                    ) : null}

                    {/*{infoCorsi ? (infoCorsi.map((corso, index) => (*/}
                    {/*        <div key={index}>*/}
                    {/*            <div className="home-corsoContainer">*/}
                    {/*                <a href={`/corso/${corso.id}`}>*/}
                    {/*                    <h2>{corso.nome}</h2>*/}
                    {/*                </a>*/}

                    {/*                <p>Anno: {corso.anno}</p>*/}
                    {/*                <p>Docente: {corso.docente}</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    ))*/}
                    {/*) : (*/}
                    {/*    <h1 style={{color: 'red'}}>Error nessun corso!</h1>*/}
                    {/*)}*/}
                </>
            ) : (
                <h1 style={{color: 'red'}}>Error: Corso not found!</h1>
            )}
        </div>
    )
}