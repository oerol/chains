import React, { Component } from "react";
import { position, offset, Offset } from "caret-pos";

class Card extends Component {
  state = {
    questions: JSON.parse(localStorage.getItem("myData")),
    counter: Number(localStorage.getItem("counter")),
  };
  /*   state = {
    questions: [
      {
        id: 1,
        question: "Would it matter to me?",
      },
      {
        id: 2,
        question: "Would it matter to you?",
      },
      {
        id: 3,
        question: "Would it matter to us?",
      },
    ],
    counter: 20,
  }; */
  render() {
    return (
      <React.Fragment>
        {this.state.questions.map((question) => {
          return (
            <div
              key={question.id}
              id={question.id}
              className="card"
              contentEditable={true}
              suppressContentEditableWarning={true}
              onKeyPress={(e) => this.handleKeyPress(e, question)}
              onKeyDown={(e) => this.handleKeyDown(e, question)}
              onKeyUp={(e) => this.handleKeyUp(e, question)}
            >
              {question.question}
            </div>
          );
        })}
      </React.Fragment>
    );
  }

  handleKeyPress = (event, question) => {
    if (event.key === "Enter") {
      event.preventDefault();

      this.setState({ counter: this.state.counter + 1 });
      let newQuestion = {
        id: this.state.counter,
        question: "",
      };

      this.setState(
        { questions: [...this.state.questions, newQuestion] },
        this.setCaret
      );
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
      if (question.id - 1 !== 0) {
        event.preventDefault();
        this.moveCadet(question.id, "up");
      }
    }
    if (event.key === "ArrowDown") {
      var lastElement = document.getElementById("mainContent").lastChild;
      var currentElement = document.getElementById(question.id);
      if (lastElement !== currentElement) {
        event.preventDefault();
        this.moveCadet(question.id, "down");
      }
    }
  };

  handleKeyUp = (e, question) => {
    if (e.key === "Backspace") {
      const caretPosition = position(document.getElementById(question.id)); // { left: 15, top: 30, height: 20, pos: 15 }
      console.log(caretPosition);

      let firstElement = document.getElementById("mainContent").firstChild;
      let currentElement = document.getElementById(question.id);
      if (caretPosition.pos === 0 && firstElement !== currentElement) {
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
    this.saveToLocalStorage(question);
  };
  saveToLocalStorage = (question) => {
    question.question = document.getElementById(question.id).innerText;
    localStorage.setItem("myData", JSON.stringify(this.state.questions));
    localStorage.setItem("counter", this.state.counter);
  };

  deleteFromLocalStorage = (question) => {
    localStorage.setItem("myData", JSON.stringify(this.state.questions));
  };

  moveCadet = (id, direction) => {
    let el;
    var elsa = document.getElementById(id);

    if (direction === "up") {
      el = elsa.previousElementSibling;
    } else if (direction === "down") {
      console.log(direction);
      el = elsa.nextElementSibling;
    } else if (direction === "delete") {
      elsa = document.getElementById("i");
    }

    var range = document.createRange();
    var sel = window.getSelection();

    el.textContent === "" ? range.setStart(el, 0) : range.setStart(el, 1);

    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  };
}

export default Card;
