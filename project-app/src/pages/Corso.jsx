import {useParams} from 'react-router-dom'
import "./Corso.css"

export default function Corso() {
    const corsoId = useParams().corsoName;

    const infoCorsi = [
        {
            id: "abc123",
            materia: "Economia",
            descrizione: "prova test",
            anno: "2024-25",
            docente: "Sciulli"
        },
        {
            id: "bcd234",
            materia: "Matematica",
            descrizione: "prova test",
            anno: "2024-25",
            docente: "Giudolin"
        }
    ]

    // get data with name
    // set data to corsoInfo
    const corsoInfo = infoCorsi.find(corso => corso.id === corsoId)

    return (
        <div id="corso-container">


            {corsoInfo ? (
                <>
                    <h2>{corsoInfo.materia}, {corsoInfo.descrizione}</h2>
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