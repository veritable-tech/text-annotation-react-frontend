import React, { Component } from "react";
import { Button } from "react-bulma-components";
import { fromJS } from "immutable";

import Entries from "./Entries";

import "./App.scss";

const SERVER_ENDPOINT = "http://localhost:8666/";

async function getBatch() {
  const res = await fetch(SERVER_ENDPOINT + "batch/", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    credentials: "include"
  });
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
}

async function postBatch(batch) {
  const res = await fetch(SERVER_ENDPOINT + "batch/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    credentials: "include",
    body: JSON.stringify(batch)
  });
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: null,
      pairs: null
    };
    this.fetchBatch = this.fetchBatch.bind(this);
    this.submitBatch = this.submitBatch.bind(this);
  }

  async fetchBatch() {
    const res = await getBatch();
    const data = await res.json();
    const pairs = data.pairs.map(x => [
      x[0],
      x[1],
      x[2],
      x[3],
      Math.round(x[3] * 4) / 4
    ]);
    this.setState({
      page: data.page,
      pairs: fromJS(pairs)
    });
  }

  async submitBatch() {
    const payload = {
      page: this.state.page,
      pairs: this.state.pairs.map(x => [x.get(0), x.get(4)])
    };
    const res = await postBatch(payload);
    const data = await res.json();
    console.log(data);
    alert(`Submit Success: ${data.success} ${data.message}`);
  }

  changeScore = (i, score) => () => {
    this.setState({
      pairs: this.state.pairs.set(i, this.state.pairs.get(i).set(4, score))
    });
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <section className="section">
            <Button color="primary" onClick={this.fetchBatch}>
              Fetch Page
            </Button>
            {this.state.page !== null ? (
              <Button color="info" onClick={this.submitBatch}>
                Submit Changes
              </Button>
            ) : (
              ""
            )}
            {this.state.page !== null ? (
              <span className="subtitle">Page {this.state.page + 1}</span>
            ) : (
              ""
            )}
          </section>
          <Entries
            page={this.state.page}
            pairs={this.state.pairs}
            changeScore={this.changeScore}
          />
        </div>
      </section>
    );
  }
}

export default App;
