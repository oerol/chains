import React, { Component } from "react";
import { position, offset, Offset } from "caret-pos";
import { FcExpand } from "react-icons/fc";
import { MdExpandMore } from "react-icons/md";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: JSON.parse(localStorage.getItem("myData")),
      counter: Number(localStorage.getItem("counter")),
    };
  }

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
            </div>
          );
        })}
      </React.Fragment>
    );
  }
  handleOnClick = (question) => {
    let holder = document.getElementById(question.id + "holder").children[0]
      .children[0];
    if (
      holder.style.transform === "" ||
      holder.style.transform === "rotate(-90deg)"
    ) {
      holder.style.transform = "rotate(0deg)";
    } else {
      holder.style.transform = "rotate(-90deg)";
    }
  };

  handleKeyPress = (event, question) => {
    if (event.key === "Enter") {
      let elementPosition = this.state.questions.indexOf(question) + 1;
      event.preventDefault();

      this.setState({ counter: this.state.counter + 1 });
      let newQuestion = {
        id: this.state.counter,
        question: "",
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
      console.log(caretPosition);

      let firstElement = document.getElementById("mainContent").firstChild;
      let currentElement = document.getElementById(question.id).parentNode;
      if (caretPosition.pos === 0 && firstElement !== currentElement) {
        event.preventDefault();
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
  };

  handleKeyUp = (e, question) => {
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
    var elsa = document.getElementById(id).parentNode;

    if (direction === "up") {
      el = elsa.previousElementSibling.children[1];
    } else if (direction === "down") {
      console.log(direction);
      el = elsa.nextElementSibling.children[1];
    } else if (direction === "delete") {
      elsa = document.getElementById("i");
    } else if (direction === "create") {
      el = elsa.children[1];
    }

    var range = document.createRange();
    var sel = window.getSelection();
    console.log(elsa);
    el.textContent === "" ? range.setStart(el, 0) : range.setStart(el, 1);

    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  };
}

export default Card;
