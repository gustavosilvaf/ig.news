import styles from "../styles/home.module.scss";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Início | ig.news</title>
      </Head>
      <h2 className={styles.title}>Hello World</h2>
    </>
  );
}
