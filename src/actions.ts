'use server'

import { unstable_noStore as notStore } from "next/cache";
import { Prediction } from "./types"

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function createPrediction(_state: null | Prediction, formData: FormData): Promise<Prediction> {
  'use server'
  notStore()

  console.log('dates ', formData)
  let prediction = await fetch("https://replicate.com/api/predictions", {
    headers: {
      accept: "application/json",
      "accept-language": "es-419,es;q=0.7",
      "content-type": "application/json",
      "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Brave\";v=\"121\", \"Chromium\";v=\"121\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "x-csrftoken": "0H8HON8m9YTEloInN1qE9NKnZqrTNS4F"
    },
    referrer: "https://replicate.com/jagilley/controlnet-hough?input=http",
    referrerPolicy: "same-origin",
    body: JSON.stringify({
      input: {
        et: 0,
        image: formData.get('image') as string,
        scale: 9,
        prompt: formData.get('prompt') as string,
        a_prompt: "best quality, extremely detailed",
        n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        ddim_steps: 20,
        num_samples: "1",
        value_threshold: 0.1,
        image_resolution: "512",
        detect_resolution: "512",
        distance_threshold: 0.1
      },
      is_training: false,
      create_model: "0",
      stream: false,
      version: "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b"
    }

    ),
    method: "POST",
    mode: "cors",
    credentials: "include"
  }).then(response => response.json() as Promise<Prediction>);

  while(['starting', 'processing'].includes(prediction.status)) {
    prediction = await fetch("https://replicate.com/api/predictions/" + prediction.id, {
      headers: {
        accept: "*/*",
        "accept-language": "es-419,es;q=0.8",
        "sec-ch-ua": '"Not_A Brand";v="99", "Brave";v="121", "Chromium";v="121"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1"
      },
      referrer: "https://replicate.com/jagilley/controlnet-hough?input=http",
      referrerPolicy: "same-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include"
    }).then(responde => responde.json() as Promise<Prediction>);

    await sleep(4000)
  }

  return prediction
  
}