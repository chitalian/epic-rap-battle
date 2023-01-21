// Imports the Google Cloud client library
import * as texttospeech from "@google-cloud/text-to-speech";
import type { NextApiRequest, NextApiResponse } from "next";

// Import other required libraries
// Creates a client
const client = new texttospeech.TextToSpeechClient();

export const DefaultVoice: any = {
  languageCode: "en-US",
  ssmlGender: "FEMALE",
};

export const DefaultAudioConfig: any = {
  audioEncoding: "MP3",
};

export interface TTSRequest {
  text: string;
  voice: any;
  audioConfig: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Construct the request
  const request = {
    input: {
      text: req.body.text,
    },
    // Select the language and SSML voice gender (optional)
    //voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
    voice: DefaultVoice,
    // Use WaveNet voice

    // select the type of audio encoding
    audioConfig: DefaultAudioConfig,
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  const binaryAudioContent = response.audioContent as any;
  res.status(200).json({
    audioContent: binaryAudioContent,
  });
}
