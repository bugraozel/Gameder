// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Veritabanı bağlantısı
const db = new sqlite3.Database('./data/gamerchord.db');

// Veritabanı tablolarını oluşturma
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        age INTEGER,
        gender TEXT,
        city TEXT,
        game TEXT,
        toxic_level INTEGER,
        email TEXT
    )`);
});

// Kullanıcı oluşturma endpoint'i
app.post('/create-user', (req, res) => {
    const { username, password, age, gender, city, game, toxic_level, email } = req.body;
    db.run(`INSERT INTO users (username, password, age, gender, city, game, toxic_level, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [username, password, age, gender, city, game, toxic_level, email],
        function(err) {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
});

// Kullanıcı giriş endpoint'i
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, user) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'Geçersiz kullanıcı adı veya şifre' });
        }
        res.json({ success: true, user });
    });
});

// Kullanıcı profil bilgilerini getirme endpoint'i
app.get('/get-profile/:id', (req, res) => {
    const userId = req.params.id;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(user);
    });
});

// Kullanıcı profil güncelleme endpoint'i
app.put('/update-profile/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password, email, city, age } = req.body;
    db.run(`UPDATE users SET username = ?, password = ?, email = ?, city = ?, age = ? WHERE id = ?`,
        [username, password, email, city, age, userId],
        function(err) {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.json({ message: 'Profile updated successfully' });
        });
});

// Kullanıcı silme endpoint'i
app.delete('/delete-user/:id', (req, res) => {
    const userId = req.params.id;
    db.run(`DELETE FROM users WHERE id = ?`, [userId], function(err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// Kullanıcı önerme endpoint'i
app.get('/recommend-users', (req, res) => {
    const { game, city, age_range, gender } = req.query;
    let query = `SELECT * FROM users WHERE game = ?`;
    let params = [game];

    if (city) {
        query += ` AND city = ?`;
        params.push(city);
    }

    if (age_range) {
        const [minAge, maxAge] = age_range.split('-').map(Number);
        query += ` AND age BETWEEN ? AND ?`;
        params.push(minAge, maxAge);
    }

    if (gender) {
        query += ` AND gender = ?`;
        params.push(gender);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
