const express = require("express");
const cors = require("cors");
const fs = require("fs");
const pg = require("pg");
require("dotenv").config();
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Database configuration
const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./ca.pem").toString(),
    },
};

// Create a new PostgreSQL client
const client = new pg.Client(config);

// Connect to the database
client.connect((err) => {
    if (err) throw err;
    console.log("Connected to PostgreSQL database");
    client.query("SELECT VERSION()", [], (err, result) => {
        if (err) throw err;
        console.log("PostgreSQL version:", result.rows[0].version);
    });
});

const createUsersTable = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
             id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                photo VARCHAR(100)
            );
        `;
        await client.query(createTableQuery);
        console.log("Users table created successfully");
    } catch (err) {
        console.error("Error creating users table:", err.stack);
    }
};
createUsersTable();
const createEventsTable = async () => {
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,     
            email VARCHAR(100),
            title VARCHAR(100),
            date VARCHAR(50),
            time VARCHAR(50),
            description VARCHAR(255)
        );
      `;
        await client.query(createTableQuery);
        console.log("Events table created successfully");
    } catch (err) {
        console.error("Error creating events table:", err.stack);
    }
};

createEventsTable();
const insertUser = async (uname, uemail, uphoto) => {
    try {
        // Insert user
        const userResult = await client.query(
            `
            INSERT INTO users (name, email,photo) VALUES ($1,$2,$3)
            RETURNING id;
            
        `,
            [uname, uemail, uphoto]
        );

        console.log("User and record inserted successfully");
    } catch (err) {
        console.error("Error inserting user and record:", err.stack);
    }
};

const addEvent = async (eventId,email, title, date, time, description) => {
    try {
        // Insert user
        const userResult = await client.query(
            `
              INSERT INTO events (id,email, title, date, time, description) VALUES ($1,$2,$3,$4,$5,$6)
              RETURNING id;
              
          `,
            [eventId, email, title, date, time, description]
        );

        console.log("User and record inserted successfully");
    } catch (err) {
        console.error("Error inserting user and record:", err.stack);
    }
};

const fetchEvents = async (user) => {
    try {
        const events = await client.query(
            `SELECT * FROM events WHERE email = $1;`,
            [user]
        );
        console.log("Fetched events:", events.rows);
        return events.rows;
    } catch (err) {
        console.error("Error fetching events:", err.stack);
    }
};
const updateEvent = async (email, eventId, title, date, time, description) => {
    try {
        await client.query(
            `UPDATE events SET title = $1, date = $2, time = $3, description = $4 WHERE id = $5 AND email= $6;`,
            [title, date, time, description, eventId, email]
        );
        console.log("Event updated successfully");
    } catch (err) {
        console.error("Error updating event:", err.stack);
    }
};

const deleteEvent = async (email, eventId) => {
    try {
        await client.query(
            `DELETE FROM events WHERE id = $1 AND email = $2;`,
            [eventId, email]
        );
        console.log("Event deleted successfully");
    } catch (err) {
        console.error("Error deleting event:", err.stack);
    }
};

app.post("/login", async (req, res) => {
    const { name, email, photo } = req.body;
    insertUser(name, email, photo);
    res.send("tested endpoint");
});
app.post("/addevent", async (req, res) => {
    const { eventId,email, title, date, time, description } = req.body;
    addEvent( eventId,email, title, date, time, description);
    res.send("tested event endpoint");
});
app.post("/fetchevent", async (req, res) => {
    const { email } = req.body;
   fetchEvents(email);
    res.send("tested fetch endpoint");
});
app.post("/updateevent", async (req, res) => {
    const { email, eventId, title, date, time, description} = req.body;
    updateEvent(email, eventId, title, date, time, description);
    res.send("tested endpoint");
});
app.post("/deleteevent", async (req, res) => {
    const { email, eventId } = req.body;
    deleteEvent(email, eventId);
    res.send("tested endpoint");
});
// Set up the server to listen on port 2000
app.listen(2000, () => {
    console.log("Connected to the server on port 2000");
});
