import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Page from "../modules/page";
import { Row } from "../modules/row";
import React, { createRef } from "react";

class Home extends React.Component {
  private conwayRef = createRef<HTMLAudioElement>();
  private barzRef = createRef<HTMLAudioElement>();

  constructor(props) {
    super(props);
  }

  playAudio = () => {
    this.conwayRef.current.play();
  };

  render() {
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
        <audio src="/tracks/behindbarz.m4a" ref={this.barzRef}></audio>
        <audio src="/tracks/conway.m4a" ref={this.conwayRef}></audio>
        <input type="button" value="Play Audio" onClick={this.playAudio} />
      </div>
    );
  }
}

export default Home;
