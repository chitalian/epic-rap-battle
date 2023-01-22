import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { fetchRapBattle } from "../lib/fetchRapBattle";
import { Person, RapVerse } from "./api/getBattle";
import { fetchImage } from "../lib/fetchImage";
import { Conway, BehindBarz, bpmToSeconds } from "../audio/track";
import Script from "next/script";
import { Router, useRouter } from "next/router";
import { TTS } from "../lib/fetchTTS";
import { gsap } from 'gsap';

const MAX_VERSUS = 3;

async function getRapBattle(leftName, rightName, prevVerses?: RapVerse[]) {
  return await fetchRapBattle({
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
    prevVerses,
  });
}

export default function Stage({
  leftName,
  rightName,
}: {
  leftName: string;
  rightName: string;
}) {
  const [activeSpeaker, setActiveSpeaker] = useState("");
  const [rapStart, setRapStart] = useState(false);

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

  const [leftNameImage, setLeftNameImage] = useState("");
  const [rightNameImage, setRightNameImage] = useState("");

  const [rapVerses, setRapVerses] = useState<RapVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const [caption, setCaption] = useState("");

  const barzRef = useRef<HTMLAudioElement>();
  const conwayRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (!isSetup) {
      setIsSetup(true);
      console.log("HIIIIII");
    } else {
      getRapBattle(leftName, rightName).then((verse) => {
        setRapVerses([...rapVerses, verse]);
      });
      fetchImage(leftName, setLeftNameImage, () => {});
      fetchImage(rightName, setRightNameImage, () => {});
      console.log("PLAYING AUDIO");
      barzRef.current.volume = 0.3;
      barzRef.current.play();
      console.log("PLAYING BARZ", barzRef);
      TTS(
        "Hello everyone! Thank you for visiting our Scale AI Hackathon project! Welcome to the stage, " +
          leftName +
          " and " +
          rightName,
        "Male"
      ).then((audio) => {
        audio.play();

        // event when audio compeletes
        audio.addEventListener("ended", () => {
          setIntroDone(true);
        });
      });
    }
  }, [isSetup, leftName, rightName]);
  console.log("RAP VERSSES", rapVerses);
  const allLoaded = rapVerses.length > 0 && introDone;

  useEffect(() => {
    async function doAudio(person: Person) {
      return TTS(person.rap, person.gender).then((audio) => {
        audio.play();
        return new Promise((resolve) => {
          console.log("started playing");
          audio.addEventListener("ended", () => {
            console.log("AUDIO ENDED");
            resolve(undefined);
          });
        });
      });
    }
    async function mainRap() {
      console.log();
      if (allLoaded) {
        setActiveSpeaker("person1");
        setCaption(rapVerses[rapVerses.length - 1].person1.rap);
        await doAudio(rapVerses[rapVerses.length - 1].person1);

        setActiveSpeaker("person2");
        setCaption(rapVerses[rapVerses.length - 1].person2.rap);
        await doAudio(rapVerses[rapVerses.length - 1].person2);
        if (rapVerses.length < MAX_VERSUS) {
          getRapBattle(leftName, rightName, rapVerses).then((verse) => {
            setRapVerses([...rapVerses, verse]);
          });
        }
      }
    }
    if (introDone) {
      console.log("ALL LOADED");
      mainRap();
    }
  }, [introDone, rapVerses]);
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-script-component-in-head */}
      <Head>
        <title>AI Epic Rap Battles</title>
        <meta
          name="description"
          content="Generate an epic rap battle between anyone!"
        />
        {/* Load CSS */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/styles/stage.css" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link href="/styles/stick.css" rel="stylesheet" />
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Sedgwick+Ave"/>
        <Script src="/scripts/smoke.js"></Script>
      </Head>
      <div>
        {/* <h1>Epic Rap Battle</h1> */}
        <Image
          id="stage"
          src={"/assets/stage1.jpeg"}
          alt=""
          width={1200}
          height={1200}
        />
        {/* <Image id="crowd" src={"/assets/crowd.png"} alt="" fill={true} /> */}
        <img id="crowd" src={"/assets/crowd.png"} />
        {/* <Image id="crowd" src={"/assets/crowd.png"} alt="" height={500} width={1000} /> */}
        {/* <img id="person1" src={"/assets/stick_figure.png"}/> */}
        <div className="people">
          <div
            id="person1"
            className={`wrapper ${activeSpeaker === "person1" ? "active" : ""}`}
          >
            <div
              className="head"
              style={{
                backgroundImage: `url('${leftNameImage}')`,
                backgroundSize: "cover",
                animationDuration: `${bpmToSeconds(BehindBarz.bpm) / 2}s`,
                animationName: 'rock-right'
              }}
            ></div>
            <div className="torso"></div>
            <div className="leftarm" style={{animationDuration: `${bpmToSeconds(BehindBarz.bpm)}s`}}></div>
            <div className="rightarm" style={{animationDuration: `${bpmToSeconds(BehindBarz.bpm)}s`}}></div>
            <div className="leftleg"></div>
            <div className="leftfoot"></div>
            <div className="rightleg"></div>
            <div className="rightfoot"></div>
          </div>

          <div
            id="person2"
            className={`wrapper ${activeSpeaker === "person2" ? "active" : ""}`}
          >
            <div
              className="head"
              style={{
                backgroundImage: `url('${rightNameImage}')`,
                backgroundSize: "cover",
                animationDuration: `${bpmToSeconds(BehindBarz.bpm) / 2}s`,
                animationName: 'rock-left'
              }}
            ></div>
            <div className="torso"></div>
            <div className="leftarm" style={{animationDuration: `${bpmToSeconds(BehindBarz.bpm)}s`}}></div>
            <div className="rightarm" style={{animationDuration: `${bpmToSeconds(BehindBarz.bpm)}s`}}></div>
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

        <div className="caption-container">
          <p className="caption">{caption}</p>
        </div>
      </div>
      <audio src={BehindBarz.uri} ref={barzRef}></audio>
      <audio src={Conway.uri} ref={conwayRef}></audio>
    </div>
  );
}
