import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";


const Cell = (props: any): JSX.Element => {
  return (
    <button onClick={props.onClick} className={props.is_alive ? styles.alive : styles.dead}></button>
  )
}

const ControlePanel = (props: any): JSX.Element => {
  return (
    <button onClick={props.onClick}>
      {props.isPlayed ? "⏸" : "▶️️"}
    </button>
  )
}


class Glass extends React.Component {
  breedingRateByNeibhor: number
  breedingRateByOwn: number

  constructor(props: any) {
    super(props);
    this.breedingRateByOwn = 0.5
    this.breedingRateByNeibhor = 0.3
  }
}

class Game extends React.Component {

  timer: NodeJS.Timer
  height: number
  width: number
  state: {
    cells: Glass[][] | boolean[][],
    isPlayed: boolean,
  }

  constructor(props: any) {
    super(props);
    this.timer
    this.height = 20
    this.width = 40
    this.state = {
      cells: this.create2DArray(this.height, this.width, false),
      isPlayed: false,
    };
  }

  create2DArray = (N: number, M: number, value: boolean) => {
    const val = value !== void 0 ? value : false;
    let array: boolean[][] = new Array();
    for (let r = 0; r < N; r++) {
      array[r] = new Array();
      for (let c = 0; c < M; c++) {
        array[r][c] = val;
      }
    }
    return array;
  };

  handleClickCell = (height: number, width: number) => {
    const cells = this.state.cells.slice()
    cells[height][width] = new Glass(this.props)
    this.setState({
      cells: cells,
    });
  }

  isAlive = (own_cell: any , neighbor_cell: Glass[]) => {
    let alive_cells: Glass[] = neighbor_cell.filter((value) => { return value != null })
    if (own_cell) {
      if (Math.random() < own_cell.breedingRateByOwn) {
        return own_cell;
      }
    }
    for (const cell of alive_cells) {
      if (Math.random() < cell.breedingRateByNeibhor) {
        return cell;
      }
    }
    return false;
  }

  collectNeighborCells = (own_h: number, own_w: number, cells: any) => {
    let neighbor = []
    for (let h = own_h - 1; h <= own_h + 1; h++) {
      for (let w = own_w - 1; w <= own_w + 1; w++) {
        if (own_h == h && own_w == w) {
          continue
        }

        if ((0 <= h && h < this.height) && (0 <= w && w < this.width)) {
          neighbor.push(cells[h][w])
        } else {
          continue
        }
      }
    }
    return neighbor
  }

  calcNextGeneration = () => {
    const cells = this.state.cells.slice()

    let next_generation_cells = this.create2DArray(this.height, this.width, false)

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        next_generation_cells[h][w] = this.isAlive(
          cells[h][w],
          this.collectNeighborCells(h, w, cells),
        )
      }
    }
    console.log(next_generation_cells)

    this.setState({
      cells: next_generation_cells,
    });
  }

  handleClickControle = () => {
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

  render = () => {
    let cell_list = []
    const height = this.state.cells.length
    const width = this.state.cells[0].length

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        cell_list.push(
          <Cell
            key={h * width + w}
            is_alive={this.state.cells[h][w]}
            onClick={() => this.handleClickCell(h, w)}
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

const biotope = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>biotope</title>
        <meta name="description" content="biotope" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Biotope</h1>
        <Game />
      </main>
    </div>
  );
}

export default biotope
