import {useLoaderData} from "react-router-dom";
import React, {useState} from "react";
import Select from "react-select";
import AddingCompito from "./AddingCompito.jsx";

export default function AddingTest() {
    console.log(useLoaderData());
    let corsi = useLoaderData().corsi.results;
    let options = []

    let questionTypes = [
        {value: "dAperta", label: "Domanda aperta"},
        {value: "dCompletamento", label: "Domanda a completamento"},
        {value: "dScelta", label: "Domanda con scelte"},
        {value: "dVF", label: "Domanda Vero/Falso"}
    ]

    let questions = {
        dAperta: [],
        dCompletamento: [],
        dScelta: [],
        dVF: []
    };

    for (const corso of corsi) {
        options.push({ value: corso.id, label: corso.nome });
    }

    const [selectedCorso, setSelectedCorso] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const handleChangeCorso = (selectedOption) => {
        setSelectedCorso(selectedOption);
    };
    const handleChangeType = (selectedOption) => {
        setSelectedType(selectedOption);
    };

    function addAperta(question) {
        questions.dAperta.push(question);
        console.log(questions);
    }
    function addCompletamento(question) {
        questions.dCompletamento.push(question);
        console.log(questions);
    }
    function addScelta(question) {
        questions.dScelta.push(question);
        console.log(questions);
    }
    function addVF(question) {
        questions.dVF.push(question);
        console.log(questions);
    }

    return (
        <div style={{maxWidth: "500px", margin: "0 auto", padding: "1rem"}}>
            <Select
                value={selectedCorso}
                onChange={handleChangeCorso}
                options={options}
                placeholder="Corso"
            />
            <Select
                value={selectedType}
                onChange={handleChangeType}
                options={questionTypes}
                placeholder="Tipo di domanda"
            />

            {selectedType && selectedType.value === "dAperta" ? (
                <div>
                    <p>Domanda: </p>
                    <input type="text" id={"dApertaInput"}/>

                    <button onClick={() => {
                        const question = document.querySelector("#dApertaInput");

                        if (question) {
                            addAperta(question.value);
                            question.value = "";
                        }
                    }}>Salva</button>
                </div>
            ) : null}
            {selectedType && selectedType.value === "dCompletamento" ? (
                <div>
                    <p>Domanda prima parte: </p>
                    <input type="text" id={"parte1Input"}/>
                    <p>Domanda seconda parte: </p>
                    <input type="text" id={"parte2Input"}/>

                    <button onClick={() => {
                        const part1 = document.querySelector("#parte1Input");
                        const part2 = document.querySelector("#parte2Input");

                        const question = {
                            part1: part1.value,
                            part2: part2.value
                        };

                        if (question) {
                            addCompletamento(question);
                            part1.value = "";
                            part2.value = "";
                        }
                    }}>Salva</button>
                </div>
            ) : null}
            {selectedType && selectedType.value === "dScelta" ? (
                <div>
                    <p>Domanda: </p>
                    <input type="text" id={"questionInput"}/>

                    <p>Prima risposta: </p>
                    <input type="text" id={"answer1Input"}/>
                    <p>Seconda risposta: </p>
                    <input type="text" id={"answer2Input"}/>
                    <p>Terza risposta: </p>
                    <input type="text" id={"answer3Input"}/>
                    <p>Quarta risposta: </p>
                    <input type="text" id={"answer4Input"}/>

                    <button onClick={() => {
                        const questionInput = document.querySelector("#questionInput");
                        const answer1 = document.querySelector("#answer1Input");
                        const answer2 = document.querySelector("#answer2Input");
                        const answer3 = document.querySelector("#answer3Input");
                        const answer4 = document.querySelector("#answer4Input");

                        const question = {
                            question: questionInput.value,
                            answer1: answer1.value,
                            answer2: answer2.value,
                            answer3: answer3.value,
                            answer4: answer4.value,
                        };

                        if (question) {
                            addScelta(question);
                            questionInput.value = "";
                            answer1.value = "";
                            answer2.value = "";
                            answer3.value = "";
                            answer4.value = "";
                        }
                    }}>Salva</button>
                </div>
            ) : null}
            {selectedType && selectedType.value === "dVF" ? (
                <div>
                    <p>Domanda: </p>
                    <input type="text" id={"dVFInput"}/>

                    <button onClick={() => {
                        const question = document.querySelector("#dVFInput");

                        if (question) {
                            addVF(question.value);
                            question.value = "";
                        }
                    }}>Salva</button>
                </div>
            ) : null}

            <QuestionList questions={questions} />
        </div>
    )
}

function QuestionList({ questions }) {
    return (
        <div>
            {questions.dAperta.map((exercise, index) => (
                <QuestionAperta key={index} exercise={exercise} index={index} />
            ))}
            {questions.dCompletamento.map((exercise, index) => (
                <QuestionComp key={index} exercise={exercise} index={index} />
            ))}
            {questions.dScelta.map((exercise, index) => (
                <QuestionScelta key={index} exercise={exercise} index={index} />
            ))}
            {questions.dVF.map((exercise, index) => (
                <QuestionVF key={index} exercise={exercise} index={index} />
            ))}
        </div>
    );
}

function QuestionAperta({ exercise }) {
    return (
        <>
            <p>{exercise.question}</p>
            <input type="text"/>
        </>
    );
}

function QuestionComp({ exercise }) {
    return (
        <>
            <p>{exercise.part1}</p>
            <input type="text"/>
            <p>{exercise.part2}</p>
        </>
    );
}

function QuestionScelta({ exercise }) {
    return (
        <>
            <p>{exercise.question}</p>

            <input type="checkbox" id="answer1" name="answer1" />
            <label htmlFor={"answer1"}>{exercise.answer1}</label>

            <input type="checkbox" id="answer2" name="answer2" />
            <label htmlFor={"answer2"}>{exercise.answer2}</label>

            <input type="checkbox" id="answer3" name="answer3" />
            <label htmlFor={"answer3"}>{exercise.answer3}</label>

            <input type="checkbox" id="answer4" name="answer4" />
            <label htmlFor={"answer4"}>{exercise.answer4}</label>
        </>
    );
}

function QuestionVF({ exercise }) {
    return (
        <>
            <p>{exercise.question}</p>
            <input type="text"/>
        </>
    );
}