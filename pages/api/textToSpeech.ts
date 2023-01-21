// Imports the Google Cloud client library
import * as textToSpeech from '@google-cloud/text-to-speech'
import type { NextApiRequest, NextApiResponse } from "next";

// Import other required libraries
// Creates a client
const client = new textToSpeech.TextToSpeechClient()

export const DefaultAudioConfig: texttospeech.v1.IAudioConfig = {
    languageCode: 'en-US',
    name: "en-US-Wavenet-F"
}

export const DefaultVoice: texttospeech.v1.IVoiceSelectionParams = {
    audioEncoding: 'MP3'
}

export interface TTSRequest {
    text: string
    voice: texttospeech.v1.IVoiceSelectionParams
    audioConfig: texttospeech.v1.IAudioConfig
}

export interface TTSResponse {
    audioContent: string
}

export default async (req: NextApiRequest, res: NextApiResponse<TTSResponse>) => {
    // Construct the request
    const request = {
        input: {
            text: req.body.text
        },
        // Select the language and SSML voice gender (optional)
        //voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
        voice: req.body.voice,
        // Use WaveNet voice

        // select the type of audio encoding
        audioConfig: req.body.audioConfig,
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    const binaryAudioContent = response.audioContent;
    // convery the binary audio content to base64
    const base64AudioContent = Buffer.from(binaryAudioContent, 'binary').toString('base64');

    //  res.status(200).json({ file: `/tmp/${randomNum}.mp3`, audio: base64AudioContent })
    res.status(200).json({ 
        audioContent: base64AudioContent,
    })
}