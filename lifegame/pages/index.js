import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

function Cell(props) {
  return (<button>{props.value ? "1": "0"}</button>)
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isAlive: false,
    };
  }

  render() {
    return (
      <div className={styles.grid}>
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
        <Cell value={this.state.isAlive} />
      </div>
    );
  }
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Life Game</title>
        <meta name="description" content="life game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Life Game</h1>
        <Game />
      </main>
    </div>
  );
}
