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
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUJiu5WQvM2cIclkQ/2bjDXT+G2R4wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvOTBmYTVkMWQtMDFlNS00YjQxLWI5YTMtYjg1NTg5ZjRj
NTdjIFByb2plY3QgQ0EwHhcNMjQxMDI4MDYxNjM2WhcNMzQxMDI2MDYxNjM2WjA6
MTgwNgYDVQQDDC85MGZhNWQxZC0wMWU1LTRiNDEtYjlhMy1iODU1ODlmNGM1N2Mg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALaUjlCt
0AODwkuBtZNrW+GiyLnh9dvXucKiQuqEQQYse36bVK20mFTAQ4IPtZqFJ+ewtg7/
vuaBcbpUjO+ANZ6pwXYPS54LNVOZ4ZfLS9MqOiISfAlqdoiEr1fVJtBAglMPRQXV
N1WjWbBfCMjFyqBU0eVYZxtDX1ZRn63Q//EXpwZsut3vCavTFqBMIQB09DBdJK7v
KijQLdU/scwbRZzFCdLvvCvtvO+IZOqJTv8mOjtTPiXNkY+xMbPLG7dCjsGyhKHW
ar4lZF5zoABU+bdeIczq8qJ4+Ipc8ekiNLu2drnpvv69+UuoBDQa4PJoKQk+1/io
eRZvCp2ZsSTR1yrN0+LZepodork75oWYOtSxWMfaPxpY8lwzWlsYsVTdrL1FZF50
txzekuLlS+cM8P/T/xdRoO4NQ+RJ3drAugSdDTlLY4SldRIGNY20tPVL26b7Bh0T
EDDxahH3EXfge5tBtxclxN8Mzpf/kB7yyrokaPiJoB2GyOkugKopvm+30QIDAQAB
oz8wPTAdBgNVHQ4EFgQUoPNq6FIFdUe0tgRLgtzQCvdrtEMwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAFlcM7OuwMOp2pzr
p3A6Q+Z6zwc4dAor1+NRYm51+y54wrer4J5cE336JHJR+QfrTS7pIu/QJmZfa5C+
6lqMuPNnc1b1z66cYMAIdxw2VYBUV0EJ3dGL5nhb8UhTwM86wOLnL8aSs0SVkF3u
udsjUdnZijkHsvx7nArAZeZjmW1mUydbC+9MkJQ5DZcY+76VoIJwgE/KtB82LrDi
ONaESq6e4ftnATvFocsd/o4WbUl1kS4R54BmESh+rtYqiYKJBGe+NXvtnwkcxoez
zEidB1khz1SH+FqYTB8m1MBx4jhM1t5VePH1B6E7rYko61LPWIAunRFnCRY7v69n
pUlTfqhfqca9LHQhkKMewp/U47rw+tpCgt3oG5gLe9CVVF5xiaCn5YD94BNigv8X
ckr3/rqX4N/8gBJJwJItSa6zga1fpK0yG0NrTEikbt+HgNucedxFC1iHOigeV1AL
QjwRk7dbldG+lCyIyWOP0pOhpoNgXQSoa4sEEFJWkqUJudRD4g==
-----END CERTIFICATE-----`,
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

const addEvent = async (eventId, email, title, date, time, description) => {
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
    await client.query(`DELETE FROM events WHERE id = $1 AND email = $2;`, [
      eventId,
      email,
    ]);
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
  console.log(req.body);
  const { eventId, email, title, date, time, description } = req.body;
  addEvent(eventId, email, title, date, time, description);
  res.send("tested event endpoint");
});
app.post("/fetchevent", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const response = await fetchEvents(email);
  console.log(response);
  res.json(response);
});
app.post("/updateevent", async (req, res) => {
  console.log(req.body);
  const { email, eventId, title, date, time, description } = req.body;
  updateEvent(email, eventId, title, date, time, description);
  res.send("tested update endpoint");
});
app.post("/deleteevent", async (req, res) => {
  console.log("i am delete event " + req.body);
  const { email, eventId } = req.body;
  deleteEvent(email, eventId);
  res.send("tested endpoint");
});
// Set up the server to listen on port 2000
app.listen(2000, () => {
  console.log("Connected to the server on port 2000");
});
