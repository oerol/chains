const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "express_database",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected!");
  var sql =
    "CREATE TABLE IF NOT EXISTS questions (id INT AUTO_INCREMENT PRIMARY KEY, deck INT, status INT, question VARCHAR(255), answer VARCHAR(255))";
  connection.query(sql, function (error) {
    if (error) throw error;
  });
});

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Server hier.. Bitte helfen Sie mir.. Ich sterbe.." });
  connection.connect();

  connection.query(
    "SELECT 1 + 1 AS solution",
    function (error, results, fields) {
      if (error) throw error;
      console.log("The solution is: ", results[0].solution);
    }
  );

  connection.end();
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/write", (req, res) => {
  const insertQuestion = req.body.insertQuestion;
  const insertAnswer = req.body.insertAnswer;
  const databaseInsert =
    "INSERT INTO questions (deck, status, question, answer) VALUES (?,?,?,?)";
  connection.query(
    databaseInsert,
    [1, 0, insertQuestion, insertAnswer],
    (err, result) => {
      console.log(result);
    }
  );
});

app.get("/read", (req, res) => {
  connection.query("SELECT * FROM questions", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/change", (req, res) => {
  const id = req.body.id;

  const changedQuestion = req.body.changedQuestion;
  const changedAnswer = req.body.changedAnswer;
  const changedStatus = req.body.changedStatus;

  const databaseUpdate =
    "UPDATE questions SET status = ?, question= ?, answer = ? WHERE id = ?";

  connection.query(
    databaseUpdate,
    [changedStatus, changedQuestion, changedAnswer, id],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server gestartet auf Port ${PORT}.`);
});
