import Axious from "axios";

const url = "http://localhost:3001/";
const urlCreateQuestion = url + "write";
const urlGetQuestions = url + "read/";
const urlUpdateQuestion = url + "change";
const urlDeleteQuestion = url + "delete/";

const urlCreateDeck = url + "deck/new";
const urlGetAllDecks = url + "deck/all";

const database = {
  writeToDatabase: function (question, answer) {
    Axious.post(urlCreateQuestion, {
      insertQuestion: question,
      insertAnswer: answer,
    }).then(() => {
      alert("wooback baby");
    });
  },
  getQuestions: function (id) {
    return Axious.get(urlGetQuestions + id).then((response) => response.data);
  },
  updateQuestion: function (id, newQuestionText, newAnswerText, newStatus) {
    Axious.put(urlUpdateQuestion, {
      id: id,
      changedStatus: newStatus,
      changedQuestion: newQuestionText,
      changedAnswer: newAnswerText,
    });
  },
  deleteQuestion: function (id) {
    Axious.delete(urlDeleteQuestion + id);
  },
  getDecks: function () {
    return Axious.get(urlGetAllDecks).then((response) => response.data);
  },
  createDeck: function (title, description) {
    Axious.post(urlCreateDeck, {
      deckTitle: title,
      deckDescription: description,
    });
  },
};

export default database;
