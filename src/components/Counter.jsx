import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"],
  };

  render() {
    return (
      <React.Fragment>
        <span>{this.formatCount()}</span>
        <button onClick={this.handleIncrementList}>Erhöhen</button>
        {this.renderTags()}
      </React.Fragment>
    );
  }

  // Eine normale Funktion würde kein this akzeptieren
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleIncrementList = () => {
    this.setState({ tags: [...this.state.tags, "nig"] });
  };

  renderTags() {
    if (this.state.tags.length === 0) {
      return <span>le nulle</span>;
    }
    return (
      <ul>
        {this.state.tags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>
    );
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Null ;)" : count;
  }
}

export default Counter;
