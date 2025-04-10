import React, {useState} from "react";
import Select from "react-select";
import {useLoaderData} from "react-router-dom";
import {Cookies} from "react-cookie";

export default function AddingFlashcards() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const userRole = useLoaderData().user.results.filter(user => user.id === userId)[0].ruolo

    if (userRole !== "docente") {
        window.location.href = "/";
    }

    let corsi = useLoaderData().corsi.results;
    let options = [];

    for (const corso of corsi) {
        options.push({ value: corso.id, label: corso.nome });
    }


    const [flashcards, setFlashcards] = useState([]);


    console.log(options);
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedValue(selectedOption);
    };

    return (
        <div style={{maxWidth: "500px", margin: "0 auto", padding: "1rem"}}>
            <h2>Aggiungi delle nuove Flashcards</h2>

            <Select
                value={selectedValue}
                onChange={handleChange}
                options={options}
                placeholder="Corso..."
            />

            <h1>AddingFlashcards works</h1>

            <div style={{display: "flex"}}>
                <div style={{ width: "250px"}}>
                    <h3>Fronte</h3>
                    <input type="text" id={"frontInput"} style={{ width: "250px"}}/>
                </div>
                <div style={{ width: "250px"}}>
                    <h3>Retro</h3>
                    <input type="text" id={"backInput"} style={{ width: "250px"}}/>
                </div>
            </div>

            <button onClick={() => {
                const frontInput = document.querySelector("#frontInput");
                const backInput = document.querySelector("#backInput");

                if (frontInput && backInput) {
                    const flashcard = {front: frontInput.value, back: backInput.value};
                    setFlashcards(prevFlashcards => [...prevFlashcards, flashcard]);
                    frontInput.value = "";
                    backInput.value = "";
                }
            }}>Save
            </button>

            <FlashcardList flashcards={flashcards} />
        </div>
    )
}

function FlashcardList({ flashcards }) {
    return (
        <div>
            {flashcards.map((flashcard, index) => (
                <Flashcard key={index} flashcard={flashcard} index={index} />
            ))}
        </div>
    );
}

function Flashcard({ flashcard, index }) {
    const [isFrontVisible, setIsFrontVisible] = useState(true);

    const toggleVisibility = () => {
        setIsFrontVisible(!isFrontVisible);
    };

    return (
        <div key={index} style={{ display: "flex", justifyContent: "space-between", border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
            <div style={{ display: isFrontVisible ? "block" : "none" }}>
                <h3>Fronte</h3>
                <p>{flashcard.front}</p>
            </div>
            <div style={{ display: !isFrontVisible ? "block" : "none" }}>
                <h3>Retro</h3>
                <p>{flashcard.back}</p>
            </div>

            <button onClick={toggleVisibility}>
                {isFrontVisible ? 'Show Answer' : 'Show Question'}
            </button>
        </div>
    );
}