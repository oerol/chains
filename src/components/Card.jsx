import React, { Component } from "react";
import { position } from "caret-pos";
import { FcExpand } from "react-icons/fc";
import { BsArrowReturnRight } from "react-icons/bs";
import Axious from "axios";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* questions: JSON.parse(localStorage.getItem("myData")), */
      questions: [],
      counter: Number(localStorage.getItem("counter")),
      reviewCard: 0,
    };
  }

  /*   state = {
    questions: [
      {
        id: 1,
        question: "Would it matter to me?",
        answer: "It would.",
        status: 0,
      },
      {
        id: 2,
        question: "Would it matter to you?",
        answer: "It would not..",
        status: 0,
      },
      {
        id: 3,
        question: "Would it matter to us?",
        answer: "I don't know.",
        status: 0,
      },
    ],
    counter: 20,
  }; */

  render() {
    /*     document.addEventListener("keyup", (event) => {
      if (!this.props.reviewMode && event.key === "ArrowRight") {
        this.markCorrent();
      }
    }); */
    return (
      <React.Fragment>
        {this.state.questions.map((question, i) => {
          return (
            <div className="cardHolder" id={question.id + "holder"}>
              <div
                className="svgHolder"
                onClick={(e) => this.handleOnClick(question)}
              >
                <FcExpand />
              </div>
              <div
                key={question.id}
                id={question.id}
                className="card"
                contentEditable={this.props.editable}
                suppressContentEditableWarning={true}
                onKeyPress={(e) => this.handleKeyPress(e, question)}
                onKeyDown={(e) => this.handleKeyDown(e, question)}
                onKeyUp={(e) => this.handleKeyUp(e, question)}
              >
                {question.question}
              </div>
              <div className="answerHolder">
                <BsArrowReturnRight className="answerArrow" />
                <div
                  className="answerText"
                  contentEditable={this.props.editable}
                  suppressContentEditableWarning={true}
                  onKeyUp={(e) => this.handleKeyUp(e, question)}
                >
                  {question.answer}
                </div>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
  // should not use I GUESS
  componentDidMount() {
    document.addEventListener("keyup", (event) => {
      if (!this.props.reviewMode) {
        if (event.key === "ArrowRight") {
          this.markCorrent();
        } else if (event.key === "ArrowLeft") {
          this.markIncorrent();
        } else if (event.key === " ") {
          this.expandCardPointer();
        }
      }
    });

    this.getQuestions();
  }

  writeToDatabase = (question, answer) => {
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

  markIncorrent = () => {
    let mainElement = document.getElementById("mainContent");

    if (this.state.reviewCard < mainElement.children.length) {
      mainElement.children[this.state.reviewCard].style.backgroundColor =
        "#FE8F8F";
      this.moveCardPointer();

      let copyOfArray = [...this.state.questions];
      let copyOfQuestion = { ...copyOfArray[this.state.reviewCard] };
      copyOfQuestion.status++;
      copyOfArray[this.state.reviewCard] = copyOfQuestion;
      this.setState({
        reviewCard: this.state.reviewCard + 1,
        questions: copyOfArray,
      });
    } else {
      this.finishReview();
    }
  };

  markCorrent = () => {
    let mainElement = document.getElementById("mainContent");

    if (this.state.reviewCard < mainElement.children.length) {
      mainElement.children[this.state.reviewCard].style.backgroundColor =
        "#B1E693";
      this.moveCardPointer();

      let copyOfArray = [...this.state.questions];
      let copyOfQuestion = { ...copyOfArray[this.state.reviewCard] };
      copyOfQuestion.status++;
      copyOfArray[this.state.reviewCard] = copyOfQuestion;
      this.setState({
        reviewCard: this.state.reviewCard + 1,
        questions: copyOfArray,
      });
    } else {
      this.finishReview();
    }
  };

  moveCardPointer = () => {
    let cardPointerElement = document.getElementById("cardPointer");
    let mainElement = document.getElementById("mainContent");

    if (this.state.reviewCard < mainElement.children.length - 1) {
      cardPointerElement.style.marginTop = `${
        (this.state.reviewCard + 1) * 56
      }px`;
    } else {
      this.finishReview();
    }
  };

  expandCardPointer = () => {
    if (this.state.reviewCard < this.state.questions.length) {
      let holder = document
        .getElementById(
          this.state.questions[this.state.reviewCard].id + "holder"
        )
        .getElementsByClassName("svgHolder")[0].children[0];

      if (
        holder.style.transform === "" ||
        holder.style.transform === "rotate(-90deg)"
      ) {
        holder.style.transform = "rotate(0deg)";
        this.revealAnswer(true, this.state.questions[this.state.reviewCard].id);
      } else {
        holder.style.transform = "rotate(-90deg)";
        this.revealAnswer(
          false,
          this.state.questions[this.state.reviewCard].id
        );
      }
    }
  };

  /* handles svg holder onclick */
  handleOnClick = (question) => {
    let holder = document
      .getElementById(question.id + "holder")
      .getElementsByClassName("svgHolder")[0].children[0];
    if (
      holder.style.transform === "" ||
      holder.style.transform === "rotate(-90deg)"
    ) {
      holder.style.transform = "rotate(0deg)";
      this.revealAnswer(true, question.id);
    } else {
      holder.style.transform = "rotate(-90deg)";
      this.revealAnswer(false, question.id);
    }
  };

  revealAnswer = (b, questionId) => {
    let answerHolderElement = document
      .getElementById(questionId + "holder")
      .getElementsByClassName("answerHolder")[0];
    console.log(answerHolderElement.style.display);

    b
      ? (answerHolderElement.style.display = "flex")
      : (answerHolderElement.style.display = "none");
  };

  finishReview = () => {
    if (!document.getElementById("finishIndicator")) {
      let finishIndicator = document.createElement("p");
      let holder = document.getElementsByTagName("body")[0];
      finishIndicator.setAttribute("id", "finishIndicator");
      //  finishIndicator.classList.add("cardPointer");
      finishIndicator.textContent =
        "YOU ARE DONE! HEY SIRI, PLAY CONGRATULATIONS.. . . ";
      holder.appendChild(finishIndicator);
      finishIndicator.style.animation = "fade-in 2s";
    }

    this.saveReviewToLocalStorage();
  };

  handleKeyPress = (event, question) => {
    if (event.key === "Enter") {
      event.preventDefault();

      let elementPosition = this.state.questions.indexOf(question) + 1;
      let currentElement = document.getElementById(question.id);

      let textLength = currentElement.innerText.length;
      const caretPosition = position(currentElement).pos;
      console.log(caretPosition);
      console.log(textLength);

      if (caretPosition === textLength) {
        this.setState({ counter: this.state.counter + 1 });
        let newQuestion = {
          id: this.state.counter,
          question: "",
          answer: "",
          status: 0,
        };

        let copy = this.state.questions;
        copy.splice(elementPosition, 0, newQuestion);
        this.setState(
          {
            questions: copy,
          },
          () => this.moveCadet(newQuestion.id, "create")

          // this.moveCadet(newQuestion.id, "create")
        );
      } else {
        this.setState({ counter: this.state.counter + 1 });
        let currentText = currentElement.textContent;
        let cutText = currentText.substring(caretPosition, textLength);
        let newQuestion = {
          id: this.state.counter,
          question: cutText,
          answer: "",
          status: 0,
        };

        let currentElementText = currentElement.textContent.substring(
          0,
          caretPosition
        );
        currentElementText += "?";

        let copy = this.state.questions;
        copy.splice(elementPosition, 0, newQuestion);
        let currentPosition = copy.indexOf(question);
        copy[currentPosition].question = currentElementText;

        this.setState(
          {
            questions: copy,
          },
          () => this.moveCadet(newQuestion.id, "create-append")

          // this.moveCadet(newQuestion.id, "create")
        );
      }
    }
  };

  setCaret() {
    var el = document.getElementById("mainContent").lastChild;
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    el.focus();
  }

  handleKeyDown = (event, question) => {
    if (event.key === "ArrowUp") {
      let firstElement = document.getElementById("mainContent").firstChild;
      let currentElement = document.getElementById(question.id).parentNode;
      if (firstElement !== currentElement) {
        event.preventDefault();
        this.moveCadet(question.id, "up");
      }
    }
    if (event.key === "ArrowDown") {
      var lastElement = document.getElementById("mainContent").lastChild;
      var currentElement = document.getElementById(question.id).parentNode;
      if (lastElement !== currentElement) {
        event.preventDefault();
        this.moveCadet(question.id, "down");
      }
    }
    if (event.key === "Backspace") {
      const caretPosition = position(document.getElementById(question.id)); // { left: 15, top: 30, height: 20, pos: 15 }

      let firstElement = document.getElementById("mainContent").firstChild;
      let currentElement = document.getElementById(question.id).parentNode;
      if (caretPosition.pos === 0 && firstElement !== currentElement) {
        event.preventDefault();

        if (currentElement.innerText !== "") {
          this.moveTextToUpperCard(currentElement.innerText, currentElement);
        }
        this.moveCadet(question.id, "up");

        this.setState(
          {
            questions: this.state.questions.filter(
              (element) => element.id !== question.id
            ),
          },
          () => {
            return this.deleteFromLocalStorage(question);
          }
        );
      }
    }

    /* REVIEW MODE */
    /*   if (event.key === "ArrowRight") {
      let lastElement = document.getElementById("mainContent").lastChild;
      let currentElement = document.getElementById(question.id).parentNode;
      if (lastElement !== currentElement) {
        event.preventDefault();
        document.getElementById(
          "mainContent"
        ).children[0].style.backgroundColor = "green";
      }
    } */
  };

  handleKeyUp = (e, question) => {
    this.saveToLocalStorage(question);
    this.updateQuestion(
      question.id,
      question.question,
      question.answer,
      question.status
    );
  };
  saveToLocalStorage = (question) => {
    question.question = document.getElementById(question.id).innerText;
    question.answer = document
      .getElementById(question.id)
      .parentElement.getElementsByClassName(
        "answerHolder"
      )[0].lastChild.innerText;
    localStorage.setItem("myData", JSON.stringify(this.state.questions));
    localStorage.setItem("counter", this.state.counter);
  };

  deleteFromLocalStorage = (question) => {
    localStorage.setItem("myData", JSON.stringify(this.state.questions));
  };

  saveReviewToLocalStorage = () => {
    localStorage.setItem("myData", JSON.stringify(this.state.questions));
  };

  moveCadet = (id, direction) => {
    let el;
    var elsa = document.getElementById(id).parentNode;

    if (direction === "up") {
      el = elsa.previousElementSibling.children[1];
    } else if (direction === "down") {
      el = elsa.nextElementSibling.children[1];
    } else if (direction === "delete") {
      elsa = document.getElementById("i");
    } else if (direction === "create") {
      el = elsa.children[1];
      el.textContent = "?";
    } else if (direction === "create-append") {
      el = elsa.children[1];
      if (!el.textContent.includes("?")) {
        el.textContent += "?";
      }
    }

    var range = document.createRange();
    var sel = window.getSelection();
    el.textContent === "" || el.textContent.includes("?")
      ? range.setStart(el, 0)
      : range.setStart(el, 1);

    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  };
  /* Moves text to upper card, before deleting a card */
  moveTextToUpperCard = (text, currentElement) => {
    let previousElement = currentElement.previousSibling;
    let content = document.createTextNode(text);

    previousElement.lastChild.appendChild(content);
  };

  moveTextToLowerCard = (text, currentElement) => {};
}

export default Card;
