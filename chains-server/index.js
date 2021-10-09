const express = require("express");
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
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

app.listen(PORT, () => {
  console.log(`Server gestartet auf Port ${PORT}.`);
});
