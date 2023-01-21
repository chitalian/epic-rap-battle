export function fetchImage(
  prompt: string,
  onSuccess: (url: string) => void,
  onError: (error: string) => void
) {
  fetch("/api/queueImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.jobId) {
        const jobId = data.jobId;
        let retries = 12;
        const interval = setInterval(() => {
          fetch("/api/imageResult", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jobId,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.url) {
                clearInterval(interval);
                onSuccess(data.url);
              }
            })
            .catch((err) => {
              clearInterval(interval);
              onError(err);
            });
          retries--;
          if (retries === 0) {
            clearInterval(interval);
            onError("Timed out");
          }
        }, 500);
      } else {
        onError(data.error);
      }
    })
    .catch((err) => {
      onError(err);
    });
}
