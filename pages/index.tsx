import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Page from "../modules/page";
import { Row } from "../modules/row";
import { useState } from "react";
import { useRouter } from "next/router";
import Stage from "./stage";

export default function Home() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  if (sessionStarted) {
    return <Stage leftName={name1} rightName={name2} />;
  }

  return (
    <div className="max-w-md flex flex-col gap-2 m-10">
      <input
        className="rounded bg-transparent w-full border border-fuchsia-500"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
      />
      <input
        className="rounded bg-transparent w-full border border-fuchsia-500"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
      />
      <p>
        {name1} vs {name2}
      </p>
      <button
        className="rounded bg-fuchsia-500 text-white"
        onClick={() => {
          setSessionStarted(true);
        }}
      >
        Generate
      </button>
    </div>
  );
}
