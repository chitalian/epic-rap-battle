import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Script from 'next/script'
import { useEffect, useState } from "react";

export default function Stage() {

  const [ activeSpeaker, setActiveSpeaker ] = useState("");
  const [ rapStart, setRapStart ] = useState(false);

  useEffect(() => {
    setActiveSpeaker("person2");
  }, []);

  return (
    <div>
      <Head>
        <title>AI Epic Rap Battles</title>
        <meta
          name="description"
          content="Generate an epic rap battle between anyone!"
        />
        {/* Load CSS */}
        <link href="/styles/stage.css" rel="stylesheet" />
        <link href="/styles/stick.css" rel="stylesheet" />
        <Script src="/scripts/smoke.js"></Script>
      </Head>
      <div>
        {/* <h1>Epic Rap Battle</h1> */}
        <Image id="stage" src={"/assets/stage1.jpeg"} alt="" width={1200} height={1200} />
        {/* <Image id="crowd" src={"/assets/crowd.png"} alt="" fill={true} /> */}
        <img id="crowd" src={"/assets/crowd.png"}/>
        {/* <Image id="crowd" src={"/assets/crowd.png"} alt="" height={500} width={1000} /> */}
        {/* <img id="person1" src={"/assets/stick_figure.png"}/> */}
        <div className="people">
        <div id="person1" className={`wrapper ${activeSpeaker === "person1" ? "active" : ""}`}>
              <div className="head"></div>
              <div className="torso"></div>
              <div className="leftarm"></div>
              <div className="rightarm"></div>
              <div className="leftleg"></div>
              <div className="leftfoot"></div>
              <div className="rightleg"></div>
              <div className="rightfoot"></div>
          </div>

          <div id="person2" className={`wrapper ${activeSpeaker === "person2" ? "active" : ""}`}>
              <div className="head"></div>
              <div className="torso"></div>
              <div className="leftarm"></div>
              <div className="rightarm"></div>
              <div className="leftleg"></div>
              <div className="leftfoot"></div>
              <div className="rightleg"></div>
              <div className="rightfoot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}