/**
 * Returns an AudioElement with the text converted to speech
 * 
 * @example ```js
 * let firstVerse = rap.person1.rap;
        let secondVerse = rap.person2.rap;
        TTS(
          "Introducing " +
            rap.person1.name +
            " versus " +
            rap.person2.name +
            " GO!" +
            firstVerse +
            secondVerse
        )
          .then((audio) => {
            audio.play();
          })
          .catch((err) => {
            console.log(err);
          });
          ```
 * 
 *
 * @param text - text to convert to speech
 * @returns Promise<HTMLAudioElement> - Audio element with the text converted to speech
 **/
export function TTS(text: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    fetchTTS(
      text,
      (data) => {
        const b64 = Buffer.from(data).toString("base64");
        const audio = new Audio("data:audio/mpeg;base64," + b64);
        resolve(audio);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
}
function fetchTTS(
  text: string,
  onSuccess: (data: any) => void,
  onError: (error: string) => void
) {
  fetch("/api/textToSpeech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        onError(data.error);
      } else {
        onSuccess(data.audioContent.data);
      }
    })
    .catch((err) => {
      onError(err);
    });
}
