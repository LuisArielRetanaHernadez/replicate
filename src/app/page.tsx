'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useFormState, useFormStatus } from "react-dom";
import { createPrediction, getPrediction } from "@/actions";
import { Prediction } from "@/types";

const FormContent = () => {
  const { pending } = useFormStatus()
  return (
    <>
      <Input type="text" name="image"
        defaultValue='https://mueblescook.com.mx/wp-content/uploads/2020/10/Goal-Casaa2.gif'
        className="border border-black"/>
      <Textarea name="prompt" className="border border-black outline-none"/>
      <Button disabled={pending} type="submit">Crear</Button>
    </>
  )
}

export default function Home() {
  // arreglar la inicializacion del handleSubmit

  const handleSubmit = async (_state: Prediction, formData: FormData) => {
    let prediction = await createPrediction(formData)

    while(["starting", "processing"].includes(prediction.status)) {
      prediction = await getPrediction(prediction.id)
      console.log(prediction)
      await sleep(1000)
    }

    return prediction

  }

  const [state, formAction] = useFormState(handleSubmit, null)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        state?.output && <img src={state.output[0]} alt="output"/>
      }
      <form action={formAction} className="grid gap-4">
        {<FormContent />}
      </form>
    </main>
  );
}
