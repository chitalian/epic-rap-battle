import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Page from "../modules/page";
import { Row } from "../modules/row";

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Epic Rap Battles</title>
        <meta
          name="description"
          content="Generate an epic rap battle between anyone!"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Page className="gap-4">
        <h1 className="text-xl w-full text-center">Epic Rap Battle</h1>
        {/* <Row className="gap-4 mx-auto max-w-lg">
          <img className="w-1/2" src={"/Justin.jpeg"} />
          <img className="w-1/2" src={"/Justin2.jpeg"} />
        </Row> */}
        <div className="flex gap-4 mx-auto max-w-lg sm:flex-row flex-col">
          <input className="rounded bg-transparent w-full border border-fuchsia-500" />
          <span className="w-full sm:min-w-fit text-center">vs</span>
          <input className="rounded bg-transparent w-full border border-fuchsia-500" />
        </div>
      </Page>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
