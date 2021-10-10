import Axious from "axios";

const database = {
  writeToDatabase: function (question, answer) {
    Axious.post("http://localhost:3001/write", {
      insertQuestion: question,
      insertAnswer: answer,
    }).then(() => {
      alert("wooback baby");
    });
  },
  getQuestions: function () {
    return Axious.get("http://localhost:3001/read").then(
      (response) => response.data
    );
  },
  updateQuestion: function (id, newQuestionText, newAnswerText, newStatus) {
    Axious.put("http://localhost:3001/change", {
      id: id,
      changedStatus: newStatus,
      changedQuestion: newQuestionText,
      changedAnswer: newAnswerText,
    });
  },
};

export default database;

/* writeToDatabase = (question, answer) => {
    Axious.post("http://localhost:3001/write", {
      insertQuestion: question,
      insertAnswer: answer,
    }).then(() => {
      alert("wooback baby");
    });
  };

  getQuestions = () => {
    Axious.get("http://localhost:3001/read").then((response) => {
      this.setState({ questions: response.data });
    });
  };

  updateQuestion = (id, newQuestionText, newAnswerText, newStatus) => {
    Axious.put("http://localhost:3001/change", {
      id: id,
      changedStatus: newStatus,
      changedQuestion: newQuestionText,
      changedAnswer: newAnswerText,
    });
  };
 */
