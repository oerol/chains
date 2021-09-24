import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import Card from "./components/Card";
import ReviewButton from "./components/ReviewButton";

class App extends React.Component {
  state = {
    editable: "true",
  };
  render() {
    console.table("APP" + this.state.editable);

    return (
      <React.Fragment>
        <div id="mainContent">
          <Card editable={this.state.editable} />
        </div>

        <div onClick={this.handleOnClick}>
          <ReviewButton></ReviewButton>
        </div>
      </React.Fragment>
    );
  }

  handleOnClick = () => {
    this.setState((prevState) => ({
      editable: !prevState.editable,
    }));
    console.log(document.getElementsByTagName("body")[0].style.backgroundColor);
    document.getElementsByTagName("body")[0].classList.toggle("reviewMode");
  };
}

export default App;
