import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  async function createPrediction(formData: FormData) {
    'use server'

    console.log(formData)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={createPrediction} className="grid gap-4">
        <Input type="file" name="image" accept="image/*" className="border border-black"/>
        <Textarea name="prompt" className="border border-black"/>
        <Button>Crear</Button>
      </form>
    </main>
  );
}
