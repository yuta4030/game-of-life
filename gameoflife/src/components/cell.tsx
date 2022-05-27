import React from "react";
import styles from "../styles/Home.module.css";

export interface Cell {
  name: string;
  style: string;
  next(neighbor_cells: Cell[]): Cell;
}

export class Grass extends React.Component implements Cell {
  name: string = "grass";
  style: string = styles.grass;
  breedingRateByNeibhor: number = 0.3;
  breedingRate: number = 0.5;

  constructor(props: any) {
    super(props);
  }

  next(neighbor_cells: Cell[]): Cell {
    if (this.breedingRate > Math.random()) {
      return this;
    }
    return new Empty(this.props);
  }

  is_spread(): boolean {
    return this.breedingRateByNeibhor > Math.random();
  }
}

export class Empty extends React.Component implements Cell {
  name: string = "";
  style: string = styles.empty;

  constructor(props: any) {
    super(props);
  }

  next(neighbor_cells: Cell[]): Cell {
    for (let cell of neighbor_cells) {
      if (cell instanceof Grass && cell.is_spread()) {
        return new Grass(this.props);
      }
    }
    return new Empty(this.props);
  }
}

const CellDisplay: React.FC<{
  cell: Cell;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}> = ({ cell, onClick }) => {
  return (
    <>
      <button onClick={onClick} className={cell.style}></button>
    </>
  );
};

export default CellDisplay;
