import React, { Component } from "react";
import { Button } from "react-bulma-components";

const Entry = props => {
  return (
    <div className="columns">
      <div className="column">{props.row.get(1)}</div>
      <div className="column">{props.row.get(2)}</div>
      <div className="column">
        <Button
          className={props.row.get(4) === 0 ? "is-dark" : "is-light"}
          onClick={props.changeScore(props.idx, 0)}
          disabled={props.row.get(4) === 0}
        >
          1
        </Button>
        <Button
          className={props.row.get(4) === 0.25 ? "is-dark" : "is-light"}
          onClick={props.changeScore(props.idx, 0.25)}
          disabled={props.row.get(4) === 0.25}
        >
          2
        </Button>
        <Button
          className={props.row.get(4) === 0.5 ? "is-dark" : "is-light"}
          onClick={props.changeScore(props.idx, 0.5)}
          disabled={props.row.get(4) === 0.5}
        >
          3
        </Button>
        <Button
          className={props.row.get(4) === 0.75 ? "is-dark" : "is-light"}
          onClick={props.changeScore(props.idx, 0.75)}
          disabled={props.row.get(4) === 0.75}
        >
          4
        </Button>
        <Button
          className={props.row.get(4) === 1 ? "is-dark" : "is-light"}
          onClick={props.changeScore(props.idx, 1)}
          disabled={props.row.get(4) === 1}
        >
          5
        </Button>
        <br />
        <span>({props.row.get(3).toFixed(4)})</span>
      </div>
    </div>
  );
};

class Entries extends Component {
  render() {
    if (this.props.pairs === null) {
      return <div></div>;
    }
    return this.props.pairs.map((value, idx) => (
      <Entry
        row={value}
        idx={idx}
        key={idx}
        changeScore={this.props.changeScore}
      />
    ));
  }
}

export default Entries;
