import React from "react";
import styles from "../styles/Home.module.css";


export class Glass extends React.Component {
  breedingRateByNeibhor: number
  breedingRateByOwn: number

  constructor(props: any) {
    super(props);
    this.breedingRateByOwn = 0.5
    this.breedingRateByNeibhor = 0.3
  }
}

const Cell: React.FC<{
    isAlive: Glass | boolean,
    onClick:  (event: React.MouseEvent<HTMLInputElement>) => void,
}> = ({
    isAlive,
    onClick,
}) => {
  return (
    <>
      <button onClick={onClick} className={isAlive ? styles.alive : styles.dead}></button>
    </>
  )
}

export default Cell;
