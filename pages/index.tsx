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
        CHOOSE YOUR EPIC RAP BATTLE
      </h1>
      <div className="flex flex-col justify-between">
        <div className="max-w-md flex flex-col gap-2 m-10 items-center">
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
            className="py-2 px-4 rounded bg-fuchsia-500  w-full text-white"
            onClick={() => {
              setSessionStarted(true);
            }}
          >
            Generate
          </button>
          <div>{"(Does not work on mobile)"}</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div>Scale AI Hackathon project team</div>
          <div className="flex flex-row gap-10 text-blue-400 font-bold">
            <a href="https://twitter.com/calumbirdo">@calumbirdo</a>
            <a href="https://twitter.com/justinstorre">@justinstorre</a>
            <a href="https://twitter.com/KaelanMikowicz">@KaelanMikowicz</a>
            <a href="https://twitter.com/miguelace_">@miguelace_</a>
          </div>
        </div>
      </div>
    </div>
  );
}
