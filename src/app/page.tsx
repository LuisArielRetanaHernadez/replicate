import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  async function createPrediction(formData: FormData) {
    'use server'
    
    const prediction = fetch("https://replicate.com/api/predictions", {
      "headers": {
        "accept": "application/json",
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
      "referrer": "https://replicate.com/jagilley/controlnet-hough?input=http",
      "referrerPolicy": "same-origin",
      "body": "{\"input\":{\"eta\":0,\"image\":\"https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png\",\"scale\":9,\"prompt\":\"a cheerful modernist bedroom\",\"a_prompt\":\"best quality, extremely detailed\",\"n_prompt\":\"longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality\",\"ddim_steps\":20,\"num_samples\":\"1\",\"value_threshold\":0.1,\"image_resolution\":\"512\",\"detect_resolution\":512,\"distance_threshold\":0.1},\"is_training\":false,\"create_model\":\"0\",\"stream\":false,\"version\":\"854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b\"}",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(response => response.json());
    
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={createPrediction} className="grid gap-4">
        <Input type="file" name="image" accept="image/*" className="border border-black"/>
        <Textarea name="prompt" className="border border-black outline-none"/>
        <Button>Crear</Button>
      </form>
    </main>
  );
}
