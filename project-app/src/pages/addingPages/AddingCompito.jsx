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
            <h3>Aggiungi un nuovo compito</h3>
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
                const title = document.querySelector("#compitoTitle");
                const desc = document.querySelector("#compitoDesc");
                const deadline = document.querySelector("#compitoDeadline");

                // const question = document.querySelector("#dApertaInput"

                const exercise = { nome: title.value, descrizione: desc.value, deadline: deadline.value, corsoId: selectedCorso.id };

                if (exercise) {
                    handleAddingCompito(exercise);
                    title.value = "";
                    desc.value = "";
                    deadline.value = "";
                }
            }}>Salva</button>
        </div>
    );
}