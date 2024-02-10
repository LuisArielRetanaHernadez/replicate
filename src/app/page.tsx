'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { unstable_noStore as notStore } from "next/cache";
import { useFormState } from "react-dom";
import { createPrediction } from "@/actions";

export default function Home() {
  const [state, formAction] = useFormState(createPrediction, null)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={formAction} className="grid gap-4">
        <Input type="text" name="image"
          defaultValue='https://mueblescook.com.mx/wp-content/uploads/2020/10/Goal-Casaa2.gif'
         className="border border-black"/>
        <Textarea name="prompt" className="border border-black outline-none"/>
        <Button type="submit">Crear</Button>
      </form>
    </main>
  );
}
