import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";


function Cell(props) {
  return (
    <button onClick={props.onClick}>
     {props.number ? "1" : "0"}
    </button>
  )
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(40).fill(false),
    };
  }

  handleClickCell(i) {
    const cells = this.state.cells.slice();
    cells[i] = !cells[i]
    this.setState({
      cells: cells,
    });
  }

  render() {
    var cell_list = []
    for(let i = 0; i < this.state.cells.length; i++){
      cell_list.push(
        <Cell 
          key={i}
          number={this.state.cells[i]}
          onClick={() => this.handleClickCell(i)}
        />
      )
    }
    return (
      <div className={styles.grid}>
        {cell_list}
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
