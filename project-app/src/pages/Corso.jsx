import { useParams } from 'react-router-dom'
import "./Corso.css"

export default function Corso() {
    const corsoName = useParams().corsoName;

    // get data with name
    // set data to corsoInfo
    const corsoInfo = ["Corso", "Prova prova"]

    return (
        <div id="corso-container">
            <h2>{corsoInfo[0]}, {corsoInfo[1]}</h2>
            <div className="line"></div>

            <p>Path variable: {corsoName}</p>


            inserire il contenuto del corso qui

            <div className="line"></div>

            inserire i partecipanti del corso qui
        </div>
    )
}