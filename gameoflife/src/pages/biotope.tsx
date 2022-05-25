import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {Game} from "../components/game"



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
