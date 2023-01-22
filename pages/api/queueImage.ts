// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  jobId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const clientOpts = {
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
    projectId: process.env.GOOGLE_PROJECT_ID,
  };
  console.error("clientOpts", clientOpts);
  const prompt = req.body.prompt as string;

  console.log("Queueing image request", prompt);
  const url = "https://api.replicate.com/v1/predictions";
  const headers = {
    Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
    "Content-Type": "application/json",
  };
  const body = {
    version: "27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
    input: {
      prompt: `${prompt} profile picture, sunglasses, front view, high definition, 8k, rap album cover, monochrome profile photography, black and white`,
      negative_prompt:
        // credit - https://www.reddit.com/r/StableDiffusion/comments/zdbi1u/robot_selfies_redshift_diffusion_786/
        "nsfw, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpegartifacts, signature, watermark, username, blurry, bad feet ,cropped,poorly drawn hands,poorly drawn face,mutation,deformed,worst quality,low quality,normal quality,jpeg artifacts,signature,watermark,extra fingers,fewer digits,extra limbs,extra arms,extra legs,malformed limbs,fused fingers, too many fingers, long neck, cross-eyed",
    },
  };

  const replicateJobResponse = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const replicateJob = await replicateJobResponse.json();

  res.status(405).json({ jobId: replicateJob.id });
}
