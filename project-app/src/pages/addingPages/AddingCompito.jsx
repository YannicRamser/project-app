import React, {useState} from "react";
import {useLoaderData} from "react-router-dom";
import Select from "react-select";

export default function AddingCompito() {
    let corsi = useLoaderData().corsi.results;
    let options = [];
    let compiti = [];

    for (const corso of corsi) {
        options.push({value: corso.id, label: corso.nome});
    }

    const [selectedCorso, setSelectedCorso] = useState(null);

    const handleChangeCorso = (selectedCorso) => {
        setSelectedCorso(selectedCorso);
    };

    function handleAddingCompito(exercise) {
        compiti.push(exercise);
    }

    return (
        <div style={{maxWidth: "500px", margin: "0 auto", padding: "1rem"}}>
            <h2>Aggiungi un nuovo compito</h2>
            <Select
                value={selectedCorso}
                onChange={handleChangeCorso}
                options={options}
                placeholder="Corso"
            />

            <p>Titolo:</p>
            <input id={"compitoTitle"} type="text"/>

            <p>Descrizione:</p>
            <textarea id={"compitoDesc"} style={{minHeight: "200px", minWidth: "100%", maxWidth: "100%"}} />

            <p>Deadline:</p>
            <input id={"compitoDeadline"} type="datetime-local"/>

            <button onClick={() => {
                const title = document.querySelector("#compitoTitle").value;
                const desc = document.querySelector("#compitoDesc").value;
                const deadline = document.querySelector("#compitoDeadline").value;

                const exercise = { nome: title, descrizione: desc, deadline: deadline, corsoId: selectedCorso.id };

                handleAddingCompito(exercise);
            }}>Salva</button>
        </div>
    );
}