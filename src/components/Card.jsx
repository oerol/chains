import React, { Component } from "react";
import { position } from "caret-pos";
import { FcExpand } from "react-icons/fc";
import { BsArrowReturnRight } from "react-icons/bs";
import database from "../database";
import algorithm from "../algorithm";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* questions: JSON.parse(localStorage.getItem("myData")), */
      questions: [],
      counter: 0,
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
  // should not use I GUESS

  componentDidUpdate(prevProps) {
    if (this.props.reviewMode !== prevProps.reviewMode) {
      console.log("pay");
      this.setState({ reviewCard: 0 });
    }
  }

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

    database.getQuestions(this.props.currentDeck).then((response) => {
      let numberOfQuestions = response.length;
      let highestValue = response[numberOfQuestions - 1].id + 1;
      this.setState({
        questions: response,
        counter: highestValue,
      });
    });
  }

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
            <div
              className={this.paintQuestionCard(question.status)}
              id={question.id + "holder"}
              key={i}
            >
              {console.log(typeof answerArray)}
              {/*               {answerArray.map((answer) => {
                return <div>ay</div>;
              })} */}
              <div
                key={i}
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
                  onKeyPress={(e) => this.answerHandleKeyPress(e, question)}
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
  paintQuestionCard = (status) => {
    console.log(status);
    let color;

    switch (status) {
      case 0:
        color = "card-status-0";
        break;
      case 1:
        color = "card-status-1";
        break;
      case 2:
        color = "card-status-2";
        break;
      case 3:
        color = "card-status-3";
        break;
      case 4:
        color = "card-status-4";
        break;
      case 5:
        color = "card-status-5";
        break;
      default:
        color = "";
    }
    let className = "cardHolder " + color;
    return className;
  };

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
  markIncorrent = () => {
    let mainElement = document.getElementById("mainContent");

    if (this.state.reviewCard < mainElement.children.length) {
      let copyOfArray = [...this.state.questions];
      let copyOfQuestion = { ...copyOfArray[this.state.reviewCard] };

      if (copyOfQuestion.status === 1) {
        mainElement.children[this.state.reviewCard].classList.add(
          "card-status-1"
        );
      } else if (copyOfQuestion.status < 5) {
        console.log("object");
        copyOfQuestion.status--;
        mainElement.children[this.state.reviewCard].classList.add(
          "card-status-" + copyOfQuestion.status
        );
      }
      this.moveCardPointer();

      copyOfArray[this.state.reviewCard] = copyOfQuestion;
      this.setState({
        reviewCard: this.state.reviewCard + 1,
        questions: copyOfArray,
      });
      if (this.state.reviewCard === mainElement.children.length) {
        this.finishReview();
      }
    }
  };

  markCorrent = () => {
    let mainElement = document.getElementById("mainContent");

    if (this.state.reviewCard < mainElement.children.length) {
      let copyOfArray = [...this.state.questions];
      let copyOfQuestion = { ...copyOfArray[this.state.reviewCard] };

      /* mainElement.children[this.state.reviewCard].style.backgroundColor =
      "#B1E693"; */

      if (copyOfQuestion.status < 5 - 1) {
        copyOfQuestion.status++;
        mainElement.children[this.state.reviewCard].classList.add(
          "card-status-" + copyOfQuestion.status
        );
      }

      this.moveCardPointer();

      console.log("POPPY: " + copyOfArray);
      console.log("rev: " + this.state.reviewCard);
      copyOfArray[this.state.reviewCard] = copyOfQuestion;
      this.setState({
        reviewCard: this.state.reviewCard + 1,
        questions: copyOfArray,
      });
      if (this.state.reviewCard === mainElement.children.length) {
        this.finishReview();
      }
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
      //  this.finishReview();
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
    let answerHolderElements = document
      .getElementById(questionId + "holder")
      .getElementsByClassName("answerHolder");

    for (let answer of answerHolderElements) {
      b ? (answer.style.display = "flex") : (answer.style.display = "none");
    }
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

    this.state.questions.forEach((question) => {
      database.updateQuestionStatus(question.id, question.status);
    });

    /* change nextReviewDate */
    algorithm.getNextLearningDate(this.props.currentDeck);
  };

  answerHandleKeyPress = (event, question) => {
    let answerElement = document
      .getElementById(question.id + "holder")
      .getElementsByClassName("answerHolder")[0];
    if (event.key === "Enter") {
      event.preventDefault();
      /*       let height = parseInt(
        window.getComputedStyle(answerElement).getPropertyValue("height"),
        10
      );

      answerElement.style.height = `${height + 20}px`; */

      /*       let content = document.createTextNode("• ");

      answerElement
        .getElementsByClassName("answerText")[0]
        .appendChild(content); */
    }
    if (
      answerElement.getElementsByClassName("answerText")[0].textContent
        .length === 55
    ) {
      console.log(
        answerElement.getElementsByClassName("answerText")[0].textContent.length
      );
      console.log(window.getSelection().type === "Caret");
      if (window.getSelection().type === "Caret") {
        event.preventDefault();
      }
    }
  };

  handleKeyPress = (event, question) => {
    if (event.key === "Enter") {
      event.preventDefault();

      let elementPosition = this.state.questions.indexOf(question) + 1;
      let currentElement = document.getElementById(question.id);

      let textLength = currentElement.innerText.length;
      const caretPosition = position(currentElement).pos;
      console.log(question);

      if (caretPosition === textLength) {
        this.setState({ counter: this.state.counter + 1 });
        let newQuestion = {
          id: this.state.counter,
          question: "?",
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
        database.writeToDatabase(
          this.props.currentDeck,
          newQuestion.question,
          newQuestion.answer
        );
      } else {
        this.setState({ counter: this.state.counter + 1 });
        let currentText = currentElement.textContent;
        let cutText = currentText.substring(caretPosition, textLength);

        let newQuestion = {
          id: this.state.counter,
          question: cutText,
          answer: "?",
          status: 0,
        };

        let currentElementText = currentElement.textContent.substring(
          0,
          caretPosition
        );
        currentElementText += "?";

        database.updateQuestion(
          question.id,
          currentElementText,
          question.answer,
          question.status
        );

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
        database.writeToDatabase(
          this.props.currentDeck,
          newQuestion.question,
          newQuestion.answer
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
        database.deleteQuestion(question.id);
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
    database.updateQuestion(
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

    previousElement.getElementsByClassName("card")[0].appendChild(content);
  };

  moveTextToLowerCard = (text, currentElement) => {};
}

export default Card;
