import Axious from "axios";

const url = "http://localhost:3001/";
const urlCreateQuestion = url + "write";
const urlGetQuestions = url + "read";
const urlUpdateQuestion = url + "change";
const urlDeleteQuestion = url + "delete/";

const database = {
  writeToDatabase: function (question, answer) {
    Axious.post(urlCreateQuestion, {
      insertQuestion: question,
      insertAnswer: answer,
    }).then(() => {
      alert("wooback baby");
    });
  },
  getQuestions: function () {
    return Axious.get(urlGetQuestions).then((response) => response.data);
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
};

export default database;
