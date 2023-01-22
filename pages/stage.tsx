import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from 'react';
import { fetchRapBattle } from "../lib/fetchRapBattle";
import { RapVerse } from "./api/getBattle";
import { fetchImage } from "../lib/fetchImage";
import { Conway, BehindBarz } from "../audio/track"
import Script from 'next/script'
import { gsap } from 'gsap';

async function loadInitialRap(leftName, rightName) {
  return await fetchRapBattle(
    {
      person1: {
        name: leftName,
        config: {
          rhyme: 1,
          creativity: 4,
          flaunting: 5,
          make_fun: 5,
          aggressiveness: 10,
        },
      },
      person2: {
        name: rightName,
        config: {
          rhyme: 1,
          creativity: 4,
          flaunting: 5,
          make_fun: 5,
          aggressiveness: 10,
        },
      },
      prevVerses: [],
    })
}

export default function Stage(props) {
  
  const [ activeSpeaker, setActiveSpeaker ] = useState("");
  const [ rapStart, setRapStart ] = useState(false);

  const speakerL = useRef(null);
  const speakerR = useRef(null);
  const isDocumentReady = useRef(false);

  useEffect(() => {
    if (!isDocumentReady.current) return;
    speakerL.current = document.querySelector('.speakerL');
    speakerR.current = document.querySelector('.speakerR');
    gsap.from([speakerL.current, speakerR.current], {
      duration: 0.3,
      scale: 1.1,
      yoyo: true,
      repeat: -1,
      ease: 'bounce.out',
    });
  }, [isDocumentReady]);

  useEffect(() => {
    if (document.readyState === 'complete') {
      isDocumentReady.current = true;
    }
  }, []);

  useEffect(() => {
    setActiveSpeaker("person1");
  }, []);

  const [leftName, setLeftName] = useState(props.leftName);
  const [rightName, setRightName] = useState(props.rightName);

  const [leftNameImage, setLeftNameImage] = useState("");
  const [rightNameImage, setRightNameImage] = useState("");

  const [rapVerses, setRapVerses] = useState<RapVerse[]>([]);

  const barzRef = useRef();
  const conwayRef = useRef();

  useEffect(() => {
    loadInitialRap(leftName, rightName).then(setRapVerses)
    fetchImage(leftName, setLeftNameImage, () => {})
    fetchImage(rightName, setRightNameImage, () => {})
  }, [])
  const allLoaded = leftName != "" && rightNameImage != "" && leftNameImage !="" && rightNameImage != "" && rapVerses.length > 0;

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
        
        <div className="speakerL">
          <img src="https://image.ibb.co/iFP8Lq/speaker1.png" alt="" />
        </div>

        <div className="speakerR">
          <img src="https://image.ibb.co/nt0hfq/speaker2.png" alt="" />
        </div>
      </div>

      <audio src={BehindBarz.uri} ref={barzRef}></audio>
      <audio src={Conway.uri} ref={conwayRef}></audio>
    </div>
  );
}