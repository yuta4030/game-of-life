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

function ControlePanel(props) {
  return (
    <button onClick={props.onClick}>
      {props.isPlayed ? "⏸" : "▶️️"}
    </button>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.timer
    this.state = {
      cells: Array(60).fill(false),
      isPlayed: false,
    };
  }

  handleClickCell(i) {
    const cells = this.state.cells.slice();
    cells[i] = !cells[i]
    this.setState({
      cells: cells,
    });
  }

  handleClickControle() {
    var isPlayed = this.state.isPlayed;
    isPlayed = !isPlayed

    this.setState({
      isPlayed: isPlayed,
    })

    if (isPlayed) {
      var cnt = 0
      this.timer = setInterval(() => {
        console.log(cnt++)
      }, 1000)
    } else {
      clearInterval(this.timer)
    }

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
      <>
      <div className={styles.grid}>
        {cell_list}
      </div>
      <div className={styles.description}>
        <ControlePanel 
          isPlayed={this.state.isPlayed}
          onClick={() => this.handleClickControle()}
        />
      </div>
      </>
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
