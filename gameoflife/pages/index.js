import React from "react";
import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>game of life portal</title>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>portal</h1>
                <Link href="/gameoflife">
                    <a>gameoflife</a>
                </Link>
            </main>
        </div>
    )
}