import { config } from "dotenv";
import express from "express";
import mysql from "mysql2";
import cors from "cors";

config();
const app = express();
app.use(cors());
app.use(express.json());

// Connessione al database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "flexibleduck5072",
    database: "project_app"
});

db.connect((err) => {
    if (err) {
        console.error("Errore di connessione al DB:", err);
        return;
    }
    console.log("Connesso a MySQL");
});

// Cerca user da username e password
app.get("/api/login", (req, res) => {
    const { username, password } = req.query;

    if (!username || !password) {
        return res.status(400).json({ success: false, id: null, message: "Username e password richiesti" });
    }

    // Controllo nella tabella Studenti
    const queryStudente = "SELECT id FROM studenti WHERE username = ? AND password = ? LIMIT 1";
    db.query(queryStudente, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, id: null, error: err.message });
        }

        if (results.length > 0) {
            return res.json({ success: true, id: results[0].id, ruolo: "studente" });
        }

        // Se non trovato in studenti, cerca nei docenti
        const queryDocente = "SELECT id FROM docenti WHERE username = ? AND password = ? LIMIT 1";
        db.query(queryDocente, [username, password], (err2, results2) => {
            if (err2) {
                return res.status(500).json({ success: false, id: null, error: err2.message });
            }

            if (results2.length > 0) {
                return res.json({ success: true, id: results2[0].id, ruolo: "docente" });
            } else {
                return res.status(401).json({ success: false, id: null, message: "Credenziali non valide" });
            }
        });
    });
});

// Cerca corso in base a id
app.get("/api/corso/:id", (req, res) => {
    const corsoId = req.params.id;
    db.query("SELECT nome FROM Materie WHERE id = ?", [corsoId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Corso non trovato" });
            return;
        }
        res.json({ nome: results[0].nome });
    });
});

// Cerca user da username e password
app.get("/api/corso/studente/:studenteid", (req, res) => {
    const { studenteid } = req.query;

    if (!studenteid) {
        return res.status(400).json({ success: false, id: null, message: "Id studente richiesto" });
    }

    const queryCorso = "SELECT materia_id FROM studentimaterie WHERE studente_id = ?";
    db.query(queryCorso, [studenteid], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, id: null, error: err.message });
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Corso non trovato" });
            return;
        }
        res.json({ nome: results[0].nome });
    });
});

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server in ascolto su http://localhost:3000');
});