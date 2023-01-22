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
import { gsap } from "gsap";

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
      gsap.from([speakerL.current, speakerR.current], {
        duration: bpmToSeconds(BehindBarz.bpm) / 2,
        scale: 1.1,
        yoyo: true,
        repeat: -1,
        ease: "bounce.out",
      });
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
  const [person1Lines, setPerson1Lines] = useState<string[]>([]);
  const [person2Lines, setPerson2Lines] = useState<string[]>([]);

  useEffect(() => {
    async function doAudio(audio: HTMLAudioElement) {
      audio.play();
      return new Promise((resolve) => {
        console.log("started playing");
        audio.addEventListener("ended", () => {
          console.log("AUDIO ENDED");
          resolve(undefined);
        });
      });
    }
    async function mainRap() {
      console.log();
      if (allLoaded) {
        setActiveSpeaker("person1");
        const person1 = rapVerses[rapVerses.length - 1].person1;
        const person2 = rapVerses[rapVerses.length - 1].person2;
        const person1Lines = person1.rap.split("\n");
        const person2Lines = person2.rap.split("\n");
        const person1Audios = await Promise.all(
          person1Lines.map((line) => TTS(line, person1.gender))
        );
        const person2Audios = await Promise.all(
          person2Lines.map((line) => TTS(line, person2.gender))
        );

        // loop through each line and play audio
        for (let i = 0; i < person1Lines.length; i++) {
          setPerson1Lines((prev) => [...prev, person1Lines[i]]);
          await doAudio(person1Audios[i]);
        }
        setActiveSpeaker("person2");
        for (let i = 0; i < person2Lines.length; i++) {
          setPerson2Lines((prev) => [...prev, person2Lines[i]]);
          await doAudio(person2Audios[i]);
        }
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

  const hasCaption = caption != "";

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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Sedgwick+Ave"
        />
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
                animationName: "rock-right",
              }}
            ></div>
            <div className="torso"></div>
            <div
              className="leftarm"
              style={{ animationDuration: `${bpmToSeconds(BehindBarz.bpm)}s` }}
            ></div>
            <div
              className="rightarm"
              style={{ animationDuration: `${bpmToSeconds(BehindBarz.bpm)}s` }}
            ></div>
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
                animationName: "rock-left",
              }}
            ></div>
            <div className="torso"></div>
            <div
              className="leftarm"
              style={{ animationDuration: `${bpmToSeconds(BehindBarz.bpm)}s` }}
            ></div>
            <div
              className="rightarm"
              style={{ animationDuration: `${bpmToSeconds(BehindBarz.bpm)}s` }}
            ></div>
            <div className="leftleg"></div>
            <div className="leftfoot"></div>
            <div className="rightleg"></div>
            <div className="rightfoot"></div>
          </div>
        </div>

        <div className="speakerL" ref={speakerL}>
          <img src="https://image.ibb.co/iFP8Lq/speaker1.png" alt="" />
        </div>

        <div className="speakerR" ref={speakerR}>
          <img src="https://image.ibb.co/nt0hfq/speaker2.png" alt="" />
        </div>

        {activeSpeaker === "person1" && (
          <div className="lightL">
            <img src="https://image.ibb.co/f6Hv0q/lightL.png" alt="" />
          </div>
        )}

        {activeSpeaker === "person2" && (
          <div className="lightR">
            <img src="https://image.ibb.co/j6Lhfq/lightR.png" alt="" />
          </div>
        )}

        <div className="caption-container">
          <div className="flex flex-row max-w-3xl justify-between w-full">
            <div className="flex flex-col  max-w-md">
              <p className="z-10 text-md text-gray-200 whitespace-pre-wrap">
                {
                  // grab the last 8 liens for person 1
                  person1Lines
                    .slice(
                      Math.max(person1Lines.length - 8, 0),
                      person1Lines.length - 1
                    )
                    .join("\n")
                }
              </p>
              <p className="z-10 text-md text-blue-400 whitespace-pre-wrap">
                {person1Lines.length > 0 && (
                  <>{person1Lines[person1Lines.length - 1]}</>
                )}
              </p>
            </div>
            <div className="flex flex-col max-w-md">
              <p className="z-10 text-md text-gray-200  whitespace-pre-wrap">
                {
                  // grab the last 8 liens for person 1
                  person2Lines
                    .slice(
                      Math.max(person2Lines.length - 8, 0),
                      person2Lines.length - 1
                    )
                    .join("\n")
                }
              </p>
              <p className="z-10 text-md text-red-400 whitespace-pre-wrap">
                {person2Lines.length > 0 && (
                  <>{person2Lines[person2Lines.length - 1]}</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <audio src={BehindBarz.uri} ref={barzRef}></audio>
      <audio src={Conway.uri} ref={conwayRef}></audio>
    </div>
  );
}
