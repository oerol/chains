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

  const createModuleTable =
    "CREATE TABLE IF NOT EXISTS modules (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255))";
  connection.query(createModuleTable);

  const createDeckTable =
    "CREATE TABLE IF NOT EXISTS decks (id INT AUTO_INCREMENT PRIMARY KEY, module INT, title VARCHAR(255), description VARCHAR(255), dateCreated DATE, reviewStatus INT, nextReviewDate DATE)";
  connection.query(createDeckTable);

  const checkIfEmpty = "SELECT COUNT(*) AS rowCount FROM questions";
  connection.query(checkIfEmpty, (error, results) => {
    if (results[0].rowCount === 0) {
      console.log("Creating a base question..");
      const createEmptyQuestion =
        "INSERT INTO questions (deck, status, question, answer) VALUES (1,0,'Was könnte deine erste Frage sein?', 'Die Antwort befindet sich auf deiner Hand')";
      connection.query(createEmptyQuestion);
    }
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
  const insertDeck = req.body.insertDeck;
  const insertQuestion = req.body.insertQuestion;
  const insertAnswer = req.body.insertAnswer;
  const databaseInsert =
    "INSERT INTO questions (deck, status, question, answer) VALUES (?,?,?,?)";
  connection.query(
    databaseInsert,
    [insertDeck, 0, insertQuestion, insertAnswer],
    (err, result) => {
      console.log("Frage: ", insertQuestion, "wurde erstellt");
      if (err) console.log(err);
    }
  );
});

app.get("/read/:deckId", (req, res) => {
  const deckId = req.params.deckId;
  const databaseGet = "SELECT * FROM questions WHERE deck = ?";

  connection.query(databaseGet, deckId, (err, result) => {
    res.send(result);
    if (err) console.log(err);
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
      res.sendStatus(200);
      if (err) console.log(err);
    }
  );
});

app.delete("/delete/:questionId", (req, res) => {
  const deleteId = req.params.questionId;
  const databaseDelete = "DELETE FROM questions WHERE id = ?";

  connection.query(databaseDelete, deleteId, (err, result) => {
    res.sendStatus(200);

    console.log("Deleted question with the id of: " + deleteId);
    if (err) console.log(err);
  });
});

/* DECKS */

app.post("/deck/new", (req, res) => {
  const moduleId = req.body.moduleId;
  const deckTitle = req.body.deckTitle;
  const deckDescription = req.body.deckDescription;

  let today = new Date().toISOString().slice(0, 10);
  console.log(today);
  let createdDeckId = 1;

  const databaseInsert =
    "INSERT INTO decks (module, title, description, dateCreated, reviewStatus, nextReviewDate) VALUES (?,?,?,?,?,?)";
  connection.query(
    databaseInsert,
    [moduleId, deckTitle, deckDescription, today, 0, today],
    (err, result) => {
      res.send({
        id: result.insertId,
        module: moduleId,
        title: deckTitle,
        description: deckDescription,
        dateCreated: today,
        reviewStatus: 0,
        nextReviewDate: today,
      });
      createdDeckId = result.insertId;
      console.log("dame" + createdDeckId);

      const databaseEmptyQuestion =
        "INSERT INTO questions (deck, status, question, answer) VALUES (?,?,?,?)";
      connection.query(
        databaseEmptyQuestion,
        [createdDeckId, 0, "?", ""],
        (err, result) => {
          if (err) console.log(err);
        }
      );
      if (err) console.log(err);
    }
  );
});

app.post("/module/new", (req, res) => {
  const moduleTitle = req.body.moduleTitle;
  console.log(moduleTitle);

  const databaseInsert = "INSERT INTO modules (title) VALUES (?)";
  connection.query(databaseInsert, moduleTitle, (err, result) => {
    res.send({
      id: result.insertId,
      title: moduleTitle,
    });
    if (err) console.log(err);
  });
});

app.put("/deck/put", (req, res) => {
  const id = req.body.id;

  const newReviewDate = req.body.newReviewDate;
  const newStatus = req.body.newStatus;

  const databaseUpdate =
    "UPDATE decks SET nextReviewDate = ?, reviewStatus= ? WHERE id = ?";

  connection.query(
    databaseUpdate,
    [newReviewDate, newStatus, id],
    (err, result) => {
      console.log(
        "[DECK:UPDATE] id: " +
          id +
          " newReviewDate: " +
          newReviewDate +
          " newStatus" +
          newStatus
      );
      res.sendStatus(200);
      if (err) console.log(err);
    }
  );
});

app.get("/deck/all", (req, res) => {
  let param = req.query.id;
  console.log(param);
  connection.query(
    "SELECT * FROM decks WHERE module = (?)",
    param,
    (err, result) => {
      res.send(result);

      if (err) console.log(err);
    }
  );
});

app.get("/module/all", (req, res) => {
  connection.query("SELECT * FROM modules", (err, result) => {
    console.log("module/all");
    res.send(result);

    if (err) console.log(err);
  });
});

/* app.get("/deck/all", (req, res) => {
  connection.query("SELECT * FROM decks", (err, result) => {
    err ? console.log(err) : res.send(result);
  });
}); */

app.get("/deck/:deckId", (req, res) => {
  const deckId = req.params.deckId;

  connection.query(
    "SELECT * FROM decks WHERE id = ?",
    deckId,
    (err, result) => {
      res.send(result);
      if (err) console.log(err);
    }
  );
});

app.put("/card/updateStatus", (req, res) => {
  const id = req.body.id;
  const newStatus = req.body.newStatus;

  const databaseUpdate = "UPDATE questions SET status = ? WHERE id = ?";

  connection.query(databaseUpdate, [newStatus, id], (err, result) => {
    res.sendStatus(200);
    console.log("[CARD] Status of ID: " + id + " changed to: " + newStatus);
    if (err) console.log(err);
  });
});

app.listen(PORT, () => {
  console.log(`Server gestartet auf Port ${PORT}.`);
});
