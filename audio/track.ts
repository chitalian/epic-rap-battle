export interface Marker {
  name: string;
  time: number; // seconds as a floating point, from track start
}

export interface Track {
  uri: string;
  markers: Array<Marker>;
  bpm: number;
}

export const BehindBarz: Track = {
  uri: "./tracks/behindbarz.m4a",
  markers: [],
  bpm: 85,
};

export const Conway: Track = {
  uri: "./tracks/conway.m4a",
  markers: [],
  bpm: 146,
};
