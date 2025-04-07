import {useLoaderData, useParams} from 'react-router-dom'
import "./Corso.css"

export async function getCorso() {
    // const corsoId = 1;
    const data = await ("localhost:3000/api/corso/" + 1)

    if (data.ok) {
        return data.result;
    } else {
        return null;
    }
}

export default function Corso() {

    // get data with name
    // set data to corsoInfo
    const corsoId = parseInt(useParams().corsoId);
    console.log("corsoId " + corsoId);
    const corsoInfo = useLoaderData().results.filter(checkId)[0];
    console.log(corsoInfo);

    function checkId(corso) {
        return corso.id === corsoId;
    }

    return (
        <div id="corso-container">
            {corsoInfo ? (
                <>
                    <h2>{corsoInfo.nome}, {corsoInfo.descrizione}</h2>
                    <div className="line"></div>

                    <p>Docente: {corsoInfo.docente}</p>
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