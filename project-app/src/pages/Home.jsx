import React from 'react';
import Swr from "../Swr";

const infoCorsi = [
    {
        materia: "Economia",
        anno: "2024-25",
        docente: "Sciulli"
    },
    {
        materia: "Matematica",
        anno: "2024-25",
        docente: "Giudolin"
    }
]
const Home = () => {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Home</h2>
                <button>Non fa ancora nulla</button>
            </div>
            <div className="line"></div>

            <div id="home-corsiList"></div>
            {infoCorsi.map((corso, index) => (
                <div key={index}>
                    {/*<ListCorso materia={corso.Materia} anno={corso.Anno} docente={corso.Docente}/>*/}

                    <div className="home-corsoContainer">
                        <a href={`/corso/${corso.materia}`}>
                            <h2>{corso.materia}</h2>
                        </a>


                        <p>Anno: {corso.anno}</p>
                        <p>Docente: {corso.docente}</p>
                    </div>
                </div>
            ))}

            <Swr {..."all"}/>

        </div>
    );
};

export default Home;
