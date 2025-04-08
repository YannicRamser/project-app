import React from 'react';
import {useLoaderData} from "react-router-dom";
import {Cookies, useCookies} from "react-cookie";

export async function getCorsi() {
    // const userId = cookies.get(corsoId);
    const cookies = new Cookies();
    const userId = cookies.get('userId');


    const [corsi] = await Promise.all([
        fetch(`http://localhost:3000/api/corso/partecipante/${userId}`).then(res => res.json())
    ])

    return {corsi}
}
function getRole() {
    return "docente"
}

const Home = () => {
    let infoCorsi = useLoaderData().corsi.results;

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
                <p>Docente: {corso.docente}</p>
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

export default Home;