import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";


function Cell(props) {
  return (
    <button onClick={props.onClick} className={props.is_alive ? styles.alive : styles.dead}></button>
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
      cells: this.create2DArray(20, 40, false),
      isPlayed: false,
    };
  }

  create2DArray(N, M, value) {
    const val = value !== void 0 ? value : 0;
    const array = []
    for(let r=0; r<N; r++) {
      array[r] = []
      for(let c=0; c<M; c++) {
        array[r][c] = val;
      }
    }
    return array;
  };

  handleClickCell({height, width}) {
    const cells = this.state.cells.slice()
    cells[height][width] = !cells[height][width]
    this.setState({
      cells: cells,
    });
  }

  isAlive(own_cell, neighbor_cell) {
    let alive_cells = neighbor_cell.filter((value) => {return value == true})
    if(own_cell){
      if (alive_cells.length <= 1) {
        return false
      }
      if (alive_cells.length == 2 || alive_cells.length == 3) {
        return true
      }
      if (alive_cells.length >= 4) {
        return false
      }
    }else{
      if (alive_cells.length == 3) {
        return true
      } 
    }
    return false
  }

  collectNeighborCells({own_h, own_w, cells}) {
    const height = cells.length
    const width = cells[0].length
    
    let neighbor = []
    for(let h = own_h - 1; h <= own_h + 1; h++) {
      for(let w = own_w - 1; w <= own_w + 1; w++) {
        if (own_h == h && own_w == w) {
          continue
        }

        if ((0 <= h && h < height) && (0 <= w && w < width)) {
          neighbor.push(cells[h][w])
        }else{
          continue
        }
      }
    }
    return neighbor
  }

  calcNextGeneration() {
    const cells = this.state.cells.slice()
    const height = cells.length
    const width = cells[0].length

    let next_generation_cells = this.create2DArray(height, width, false)

    for(let h = 0; h < height; h++){
      for(let w = 0; w < width; w++){
        next_generation_cells[h][w] = this.isAlive(
          cells[h][w],
          this.collectNeighborCells({own_h: h, own_w: w, cells: cells}),
        )
      }
    }
    console.log(next_generation_cells)

    this.setState({
      cells: next_generation_cells,
    });
  }

  handleClickControle() {
    let isPlayed = !this.state.isPlayed

    this.setState({
      isPlayed: isPlayed,
    })

    if (isPlayed) {
      let cnt = 0
      this.timer = setInterval(() => {
        console.log(cnt++)
        this.calcNextGeneration()
      }, 1000)
    } else {
      clearInterval(this.timer)
    }
  }

  render() {
    let cell_list = []
    const height = this.state.cells.length
    const width = this.state.cells[0].length

    for(let h = 0; h < height; h++){
      for(let w = 0; w < width; w++){
        cell_list.push(
          <Cell 
            key={h * width + w}
            is_alive={this.state.cells[h][w]}
            onClick={() => this.handleClickCell({height: h, width: w})}
          />
        )
      }
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
        <title>Game of life</title>
        <meta name="description" content="game of life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Game of life</h1>
        <Game />
      </main>
    </div>
  );
}
