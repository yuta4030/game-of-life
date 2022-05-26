import React from "react";
import styles from "../styles/Home.module.css";


export interface Cell {
  name: string;
  style: string;
}

export class Grass extends React.Component implements Cell {
  name: string = "grass";
  style: string = styles.grass;
  breedingRateByNeibhor: number = 0.5;
  breedingRateByOwn: number = 0.3;

  constructor(props: any) {
    super(props);
  }
}

export class Empty extends React.Component implements Cell {
  name: string = ""
  style: string = styles.empty;

  constructor(props: any) {
    super(props);
  }
}

const CellDisplay: React.FC<{
  cell: Cell;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}> = ({ cell, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={cell.style}
      ></button>
    </>
  );
};

export default CellDisplay;
