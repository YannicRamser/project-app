import {useLoaderData, useParams} from 'react-router-dom'
import "./Corso.css"

export async function loader(/**{params}*/) {
    const corsoId = params.corsoId;
    const userId = cookies.get(corsoId);

    const [corsi, user] = await Promise.all([
        fetch("http://localhost:3000/api/corso/partecipante/1").then(res => res.json()),
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

    return (
        <div id="corso-container">
            {corsoInfo ? (
                <>
                    <h2>{corsoInfo.nome}, {corsoInfo.descrizione}</h2>
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