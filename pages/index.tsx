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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="pt-10 text-6xl font-bold text-center">
        CHOOSE YOUR RAP BATTLE
      </h1>
      <div className="max-w-md flex flex-col gap-2 m-10">
        <input
          className="py-2 px-4 rounded bg-transparent w-full border border-fuchsia-500"
          value={name1}
          placeholder="Person 1"
          onChange={(e) => setName1(e.target.value)}
        />
        <p>
          {name1} vs {name2}
        </p>
        <input
          className="py-2 px-4 rounded bg-transparent w-full border border-fuchsia-500"
          value={name2}
          placeholder="Person 2"
          onChange={(e) => setName2(e.target.value)}
        />
        <button
          className="py-2 px-4 rounded bg-fuchsia-500 text-white"
          onClick={() => {
            setSessionStarted(true);
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
}
