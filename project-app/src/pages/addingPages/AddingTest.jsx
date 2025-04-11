import {useLoaderData} from "react-router-dom";
import React, {useState} from "react";
import Select from "react-select";
import AddingCompito from "./AddingCompito.jsx";
import {Cookies} from "react-cookie";

export default function AddingTest() {
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const userRole = useLoaderData().user.results.filter(user => user.id === userId)[0].ruolo

    if (userRole !== "docente") {
        window.location.href = "/";
    }

    let corsi = useLoaderData().corsi.results;
    let options = []

    let questionTypes = [
        {value: "dAperta", label: "Domanda aperta"},
        {value: "dCompletamento", label: "Domanda a completamento"},
        {value: "dScelta", label: "Domanda con scelte"},
        {value: "dVF", label: "Domanda Vero/Falso"}
    ]
    for (const corso of corsi) {
        options.push({value: corso.id, label: corso.nome});
    }

    const [dAperta, setDAperta] = useState([]);
    const [dCompletamento, setDCompletamento] = useState([]);
    const [dScelta, setDScelta] = useState([]);
    const [dVF, setDVF] = useState([]);
    const [selectedCorso, setSelectedCorso] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const handleChangeCorso = (selectedOption) => {
        setSelectedCorso(selectedOption);
    };
    const handleChangeType = (selectedOption) => {
        setSelectedType(selectedOption);
    };

    function addAperta(question) {
        setDAperta(prevDAperta => [...prevDAperta, question]);
    }
    function addCompletamento(question) {
        setDCompletamento(prevDCompletamento => [...prevDCompletamento, question]);
    }
    function addScelta(question) {
        setDScelta(prevDScelta => [...prevDScelta, question]);
    }
    function addVF(question) {
        setDVF(prevDVF => [...prevDVF, question]);
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
                    <textarea id={"dApertaInput"} style={{minHeight: "50px", minWidth: "100%", maxWidth: "100%"}} />

                    <button onClick={() => {
                        const question = document.querySelector("#dApertaInput");

                        if (question) {
                            addAperta(question.value);
                            question.value = "";
                        }
                    }}>Salva
                    </button>
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
                    }}>Salva
                    </button>
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
                    }}>Salva
                    </button>
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
                    }}>Salva
                    </button>
                </div>
            ) : null}

            <div className={"line"} style={{marginTop: "20px"}}></div>

            <QuestionList questions={[dAperta, dCompletamento, dScelta, dVF]}/>
        </div>
    )
}

function QuestionList({questions}) {
    console.log("Questions prop:", questions);

    return (
        <div>
            {questions[0].map((exercise, index) => (
                <QuestionAperta key={index} exercise={exercise} index={index}/>
            ))}


            {questions[1].map((exercise, index) => (
                <QuestionComp key={index} exercise={exercise} index={index}/>
            ))}
            {questions[2].map((exercise, index) => (
                <QuestionScelta key={index} exercise={exercise} index={index}/>
            ))}
            {questions[3].map((exercise, index) => (
                <QuestionVF key={index} exercise={exercise} index={index}/>
            ))}
        </div>
    );
}

function QuestionAperta({exercise}) {
    return (
        <>
            <h4>{exercise}</h4>
            <textarea style={{minHeight: "100px", minWidth: "100%", maxWidth: "100%"}} />
        </>
    );
}

function QuestionComp({exercise}) {
    return (
        <>
            <h4>Completa la frase</h4>
            <div style={{display: "flex"}}>
                <p>{exercise.part1}</p>
                <div style={{margin: "auto 5px"}}>
                    <input type="text"/>
                </div>
                <p>{exercise.part2}</p>
            </div>
        </>

    );
}

function QuestionScelta({exercise}) {
    return (
        <>
            <h4>{exercise.question}</h4>

            <div style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <input type="checkbox" id="answer1" name="answer1"/>
                    <label htmlFor={"answer1"}>{exercise.answer1}</label>
                </div>
                <div>
                    <input type="checkbox" id="answer2" name="answer2"/>
                    <label htmlFor={"answer2"}>{exercise.answer2}</label>
                </div>
                <div>
                    <input type="checkbox" id="answer3" name="answer3"/>
                    <label htmlFor={"answer3"}>{exercise.answer3}</label>
                </div>
                <div>
                    <input type="checkbox" id="answer4" name="answer4"/>
                    <label htmlFor={"answer4"}>{exercise.answer4}</label>
                </div>
            </div>
        </>
    );
}

function QuestionVF({exercise}) {
    return (
        <>
            <h4>{exercise}</h4>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <input id={"veroInput"} type="checkbox" value={"Vero"}/>
                    <label htmlFor="veroInput">Vero</label>
                </div>
                <div>
                    <input id={"falsoInput"} type="checkbox" value={"Falso"}/>
                    <label htmlFor="falsoInput">Falso</label>
                </div>
            </div>
        </>
    )
        ;
}