import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <Input type="file" name="image" accept="image/*"/>
        <Textarea name="prompt"/>
        <Button>Crear</Button>
      </form>
    </main>
  );
}
