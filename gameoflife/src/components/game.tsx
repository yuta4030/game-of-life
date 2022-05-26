import React from "react";
import CellDisplay from "../components/cell";
import { Cell, Grass, Empty } from "../components/cell";
import ControlePanel from "../components/controle_panel";
import styles from "../styles/Home.module.css";

export class Game extends React.Component {
  timer: NodeJS.Timer;
  height: number;
  width: number;
  state: {
    cells: Cell[][];
    isPlayed: boolean;
  };

  constructor(props: any) {
    super(props);
    this.timer;
    this.height = 20;
    this.width = 40;
    this.state = {
      cells: this.create2DArray(this.height, this.width, new Empty(this.props)),
      isPlayed: false,
    };
  }

  create2DArray = (N: number, M: number, cell: Cell): Cell[][] => {
    let array: Cell[][] = new Array();
    for (let r = 0; r < N; r++) {
      array[r] = new Array();
      for (let c = 0; c < M; c++) {
        array[r][c] = cell;
      }
    }
    return array;
  };

  handleClickCell = (height: number, width: number): void => {
    const cells = this.state.cells.slice();
    const cell =
      cells[height][width] instanceof Empty
        ? new Grass(this.props)
        : new Empty(this.props);

    cells[height][width] = cell;
    this.setState({
      cells: cells,
    });
  };

  next = (cell: Cell, neighbor_cell: Cell[]) => {
    return cell;
  };

  collectNeighborCells = (own_h: number, own_w: number, cells: any) => {
    let neighbor = [];
    for (let h = own_h - 1; h <= own_h + 1; h++) {
      for (let w = own_w - 1; w <= own_w + 1; w++) {
        if (own_h == h && own_w == w) {
          continue;
        }

        if (0 <= h && h < this.height && 0 <= w && w < this.width) {
          neighbor.push(cells[h][w]);
        } else {
          continue;
        }
      }
    }
    return neighbor;
  };

  calcNextGeneration = () => {
    const cells = this.state.cells.slice();

    let next_generation_cells = this.create2DArray(
      this.height,
      this.width,
      new Empty(this.props)
    );

    for (let h = 0; h < this.height; h++) {
      for (let w = 0; w < this.width; w++) {
        next_generation_cells[h][w] = this.next(
          cells[h][w],
          this.collectNeighborCells(h, w, cells)
        );
      }
    }
    console.log(next_generation_cells);

    this.setState({
      cells: next_generation_cells,
    });
  };

  handleClickControle = () => {
    let isPlayed = !this.state.isPlayed;

    this.setState({
      isPlayed: isPlayed,
    });

    if (isPlayed) {
      let cnt = 0;
      this.timer = setInterval(() => {
        console.log(cnt++);
        this.calcNextGeneration();
      }, 1000);
    } else {
      clearInterval(this.timer);
    }
  };

  render = () => {
    let displays = [];
    const height = this.state.cells.length;
    const width = this.state.cells[0].length;

    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        displays.push(
          <CellDisplay
            cell={this.state.cells[h][w]}
            onClick={() => this.handleClickCell(h, w)}
          />
        );
      }
    }
    return (
      <>
        <div className={styles.grid}>{displays}</div>
        <div className={styles.description}>
          <ControlePanel
            isPlayed={this.state.isPlayed}
            onClick={() => this.handleClickControle()}
          />
        </div>
      </>
    );
  };
}
