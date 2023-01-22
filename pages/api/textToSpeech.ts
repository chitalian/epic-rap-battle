// Imports the Google Cloud client library
import * as texttospeech from "@google-cloud/text-to-speech";
import type { NextApiRequest, NextApiResponse } from "next";

// Import other required libraries
// Creates a client
const clientOpts = {
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
};

const client = new texttospeech.TextToSpeechClient(clientOpts);

const MaleVoice: texttospeech.protos.google.cloud.texttospeech.v1.IVoiceSelectionParams =
  {
    languageCode: "en-US",
    name: "en-US-Standard-B",
  };
const FemaleVoice: texttospeech.protos.google.cloud.texttospeech.v1.IVoiceSelectionParams =
  {
    languageCode: "en-US",
    name: "en-US-Standard-C",
  };

const DefaultAudioConfig: any = {
  audioEncoding: "MP3",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Construct the request
  const request: texttospeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
    {
      input: {
        text: req.body.text,
      },
      // Select the language and SSML voice gender (optional)
      //voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
      voice: req.body.gender === "Male" ? MaleVoice : FemaleVoice,
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
