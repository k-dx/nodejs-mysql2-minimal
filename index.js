import { createServer } from 'http';
import express, { urlencoded } from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(urlencoded({ extended: true }));

// const config = {
//     waitForConnections: true,
//     connectionLimit: 10,
//     maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//     idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//     queueLimit: 0,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 0,
// };

const config = {
    connectionLimit: 5,
    connectTimeout: 10000, // 10 seconds
    waitForConnections: true, // Default: true
    queueLimit: 0, // Default: 0
    // port: 3306
};

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
console.log(process.env.DB_NAME);
console.log(process.env.DB_INSTANCE_HOST);

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_INSTANCE_HOST,
    ...config,
}).promise();

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/add", async (req, res) => {
    await pool.query(
        'INSERT INTO Elements (name) VALUES (?)', [42]
    );
    res.render('add');
})
app.get("/list", async (req, res) => {
    const [els] = await pool.query(
        'SELECT * FROM Elements'
    );
    const r = JSON.stringify(els);
    res.end(r);
});

const PORT = process.env.PORT || 3000;
createServer(app).listen(PORT);
console.log(`Server listening on http://localhost:${PORT}`);

