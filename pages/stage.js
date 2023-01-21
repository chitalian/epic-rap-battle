import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
export default function Stage() {
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
      </Head>
      <div>
        {/* <h1>Epic Rap Battle</h1> */}
        <Image id="stage" src={"/assets/stage1.jpeg"} alt="" width={1200} height={1200} />
        {/* <Image id="crowd" src={"/assets/crowd.png"} alt="" fill={true} /> */}
        <img id="crowd" src={"/assets/crowd.png"}/>
        {/* <Image id="crowd" src={"/assets/crowd.png"} alt="" height={500} width={1000} /> */}
        {/* <img id="person1" src={"/assets/stick_figure.png"}/> */}
        <div className="people">
          <div class="wrapper">
              <div class="head"></div>
              <div class="torso"></div>
              <div class="leftarm"></div>
              <div class="rightarm"></div>
              <div class="leftleg"></div>
              <div class="leftfoot"></div>
              <div class="rightleg"></div>
              <div class="rightfoot"></div>
          </div>

          <div class="wrapper">
              <div class="head"></div>
              <div class="torso"></div>
              <div class="leftarm"></div>
              <div class="rightarm"></div>
              <div class="leftleg"></div>
              <div class="leftfoot"></div>
              <div class="rightleg"></div>
              <div class="rightfoot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}