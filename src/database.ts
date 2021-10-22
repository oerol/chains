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

const urlCreateModule = url + "module/new";
const urlGetAllModules = url + "module/all";

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
  getDecks: function (moduleId: number) {
    return Axious.get(urlGetAllDecks, {
      params: {
        id: moduleId,
      },
    }).then((response) => response.data);
  },
  getDeck: function (id: number) {
    return Axious.get(urlGetDeck + id).then((response) => response.data);
  },
  createDeck: function (id: number, title: string, description: string) {
    return Axious.post(urlCreateDeck, {
      moduleId: id,
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
  createModule: function (title: string) {
    return Axious.post(urlCreateModule, {
      moduleTitle: title,
    }).then((response: any) => response.data);
  },
  getModules: function () {
    return Axious.get(urlGetAllModules).then((response) => response.data);
  },
};

export default database;
