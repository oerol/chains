import Axious from "axios";

const url = "http://localhost:3001/";
const urlCreateQuestion = url + "write";
const urlGetQuestions = url + "read/";
const urlUpdateQuestion = url + "change";
const urlUpdateQuestionStatus = url + "card/updateStatus";
const urlDeleteQuestion = url + "delete/";

const urlCreateDeck = url + "deck/new";
const urlGetAllDecks = url + "deck/all";
const urlGetDeck = url + "deck/";
const urlUpdateDeck = url + "deck/put";

const database = {
  writeToDatabase: function (deck: number, question: string, answer: string) {
    Axious.post(urlCreateQuestion, {
      insertDeck: deck,
      insertQuestion: question,
      insertAnswer: answer,
    }).then(() => {
      alert("wooback baby");
    });
  },
  getQuestions: function (id: number) {
    return Axious.get(urlGetQuestions + id).then((response) => response.data);
  },
  updateQuestion: function (
    id: number,
    newQuestionText: string,
    newAnswerText: string,
    newStatus: number
  ) {
    Axious.put(urlUpdateQuestion, {
      id: id,
      changedStatus: newStatus,
      changedQuestion: newQuestionText,
      changedAnswer: newAnswerText,
    });
  },
  updateQuestionStatus: function (id: number, newStatus: number) {
    Axious.put(urlUpdateQuestionStatus, {
      id: id,
      newStatus: newStatus,
    });
  },
  deleteQuestion: function (id: number) {
    Axious.delete(urlDeleteQuestion + id);
  },
  getDecks: function () {
    return Axious.get(urlGetAllDecks).then((response) => response.data);
  },
  getDeck: function (id: number) {
    return Axious.get(urlGetDeck + id).then((response) => response.data);
  },
  createDeck: function (title: string, description: string) {
    return Axious.post(urlCreateDeck, {
      deckTitle: title,
      deckDescription: description,
    }).then((response: any) => response.data);
  },
  updateDeck: function (id: number, newReviewDate: string, newStatus: number) {
    Axious.put(urlUpdateDeck, {
      id: id,
      newReviewDate: newReviewDate,
      newStatus: newStatus,
    });
  },
};

export default database;
