import React, {useState} from "react";
import {useLoaderData} from "react-router-dom";
import Select from "react-select";

export default function AddingFile() {
    let corsi = useLoaderData().corsi.results;
    let options = [];
    let files = [];

    for (const corso of corsi) {
        options.push({value: corso.id, label: corso.nome});
    }

    const [selectedCorso, setSelectedCorso] = useState(null);

    const handleChangeCorso = (selectedCorso) => {
        setSelectedCorso(selectedCorso);
    };

    function handleAddingFile(file) {
        files.push(file);
    }


    return (
        <div style={{maxWidth: "500px", margin: "0 auto", padding: "1rem"}}>
            <Select
                value={selectedCorso}
                onChange={handleChangeCorso}
                options={options}
                placeholder="Corso"
            />

            <h2>Aggiungi un nuovo file</h2>

            <input id={"fileInput"} type="file"/>

            <button onClick={() => {
                const document = document.querySelector("#fileInput");

                const file = { corsoId: selectedCorso.id, file: file };

                handleAddingFile(file);
            }}>Salva</button>
        </div>
    )
}