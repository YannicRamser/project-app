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
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Errore di connessione al DB:", err);
        return;
    }
    console.log("Connesso a MySQL");
});

// Cerca user da username e password
app.get("/api/login/:username/:password", (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    if (!username || !password) {
        return res.status(400).json({ success: false, id: null });
    }

    const query = "SELECT id FROM utenti WHERE username = ? AND password = ? LIMIT 1";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, id: null });
        }

        if (results.length > 0) {
            return res.json({
                success: true,
                id: results[0].id
            });
        } else {
            return res.status(401).json({ success: false, id: null });
        }
    });
});

// Aggiungi un nuovo compito
app.post("/api/compito/add", (req, res) => {
    const { nome, descrizione, deadline, corso_id } = req.body;

    if (!nome || !descrizione || !deadline || !corso_id) {
        return res.status(400).json({ success: false, message: "Dati mancanti" });
    }

    const query = "INSERT INTO compiti (nome, descrizione, deadline, corso_id) VALUES (?, ?, ?, ?)";
    db.query(query, [nome, descrizione, deadline, corso_id], (err, result) => {
        if (err) {
            console.error("Errore durante l'inserimento del compito:", err);
            return res.status(500).json({ success: false, message: "Errore del server" });
        }

        res.status(201).json({ success: true, message: "Compito aggiunto con successo", compitoId: result.insertId });
    });
});


// Cerca corso in base a id
app.get("/api/corso/:id", (req, res) => {
    const corsoId = req.params.id;
    db.query("SELECT * FROM corsi WHERE id = ?", [corsoId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: "Corso non trovato" });
            return;
        }
        res.json({ results });
    });
});


app.get("/api/corso/partecipante/:userId", (req, res) => {
    const userId = `%${req.params.userId}%`;

    const queryCorso = "SELECT * FROM corsi WHERE partecipanti LIKE ? OR docente = ?";
    db.query(queryCorso, [userId, req.params.userId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, id: null, error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Corso non trovato" });
        }

        res.json({ results });
    });
});

app.get("/api/utenti", (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT nome, cognome FROM utenti";
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, id: null, error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Corso non trovato" });
        }

        res.json({ results });
    })
})

app.get("/api/partecipante/:userId", (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT nome, cognome FROM partecipante WHERE id = ?";
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, id: null, error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Corso non trovato" });
        }

        res.json({ results });
    })
})

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server in ascolto su http://localhost:3000');
});