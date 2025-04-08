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
            return res.json({ success: false, id: null });
        }

        if (results.length > 0) {
            return res.json({
                success: true,
                id: results[0].id
            });
        } else {
            return res.json({ success: false, id: null });
        }
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

app.get("/api/users", (req, res) => {
    const query = "SELECT id, nome, cognome FROM utenti";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, id: null, error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Corso non trovato" });
        }

        res.json({ results });
    })
})

app.get("/api/user/corso/:corsoId", (req, res) => {
    const corsoId = req.params.corsoId;

    const query = "SELECT partecipanti FROM corsi WHERE id = ?";
    db.query(query, [corsoId], (err, results) => {
        if (err) {
            // return res.status(500).json({ success: false, id: null, error: err.message });
            return "prova"
        }
        if (results.length === 0) {
            return "Corso non trovato";
        }

        const array = JSON.parse(results[0].partecipanti);
        const userArray = []

        for (const userId of array) {
            const query = "SELECT nome, cognome FROM utenti WHERE id = ?";
            db.query(query, [userId], (err, user) => {
                if (err) {
                    return "error"
                }
                if (user.length === 0) {
                    return res.status(404).json({ error: "Corso non trovato" });
                }
                userArray.push(user);
            })
        }

        return res.json({ userArray });
    })
})

app.get("/api/user/:userId", (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT nome, cognome FROM utenti WHERE id = ?";
    db.query(query, [userId], (err, results) => {
        if (err) {
            return "error"
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Corso non trovato" });
        }

        res.json({ results });
    })
})

// ritorna ruolo utente da id
app.get("/api/user/role/:userId", (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT ruolo FROM utenti WHERE id = ? LIMIT 1";
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Utente non trovato" });
        }
        res.json({ ruolo: results[0].ruolo });
    });
});

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server in ascolto su http://localhost:3000');
});