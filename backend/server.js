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
}).promise();

// Cerca user da username e password
app.get("/api/login/:username/:password", async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    if (!username || !password) {
        return res.status(400).json({ success: false, id: null });
    }

    const query = "SELECT id FROM utenti WHERE username = ? AND password = ? LIMIT 1";
    try{
        const [results] = await db.query(query, [username, password])

        return res.json({
            success: true,
            id: results[0].id
        });
    } catch (err){
        return res.json({ success: false, id: null });
    }
});

// Cerca corso in base a id
app.get("/api/corso/:id", async (req, res) => {
    const corsoId = req.params.id;

    try{
        const [results] = await db.query("SELECT * FROM corsi WHERE id = ?", [corsoId])
        if (results.length === 0) {
            res.status(404).json({ error: "Corso non trovato" });
            return;
        }
        res.json({ results });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/corso/partecipante/:userId", async (req, res) => {
    const userId = `%${req.params.userId}%`;

    //Cosa fa di preciso questa query?
    const queryCorso = "SELECT * FROM corsi WHERE partecipanti LIKE ? OR docente = ?";
    try{
        const [results] = await db.query(queryCorso, [userId, req.params.userId])
        if (results.length === 0) {
            return res.status(404).json({ error: "Corso non trovato" });
        }
        res.json({ results });
    }catch(err){
        return res.status(500).json({ success: false, id: null, error: err.message });
    }
});

app.get("/api/users", async (req, res) => {
    const query = "SELECT id, nome, cognome, ruolo FROM utenti";
    try{
        const [results] = await db.query(query)
        if (results.length === 0) {
            return res.status(404).json({ error: "Corso non trovato" });
        }
        res.json({ results });
    } catch(err) {
        return res.status(500).json({ success: false, id: null, error: err.message });
    }
})

app.get("/api/user/corso/:corsoId",  async (req, res) => {
    const corsoId = req.params.corsoId;

    try{
        let array = []
        let [result] = await db.query("SELECT partecipanti FROM corsi WHERE id = ?", [corsoId])
        result = JSON.parse(result[0].partecipanti)

        if(result.length === 0){
            return res.status(404).json({error: "Corso non trovato"})
        }

        for(let p of result){
            const query = "SELECT nome, cognome FROM utenti WHERE id = ?";
            const [res] = await db.query(query, [p])
            console.log(res)
            array.push(res[0])
        }
        return res.json({ array });

    } catch(err){
        console.error(err)
        return res.status(404).json({error: "Corso non trovato"})
    }

})

app.get("/api/user/:userId", async (req, res) => {
    const userId = req.params.userId;

    try{
        const query = "SELECT nome, cognome FROM utenti WHERE id = ?";
        const [results] = await db.query(query, [userId])
        if (results.length === 0) {
            return res.status(404).json({ error: "Corso non trovato" });
        }

        res.json({ user: results[0] });
    } catch(err){
        return "error"
    }
})

app.get("/api/user/role/:userId", async (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT ruolo FROM utenti WHERE id = ? LIMIT 1";
    try {
        const [results] = await db.query(query, [userId])
        if (results.length === 0) {
            return res.status(404).json({ message: "Utente non trovato" });
        }
        res.json({ ruolo: results[0].ruolo });
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
});

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server in ascolto su http://localhost:'+PORT);
});