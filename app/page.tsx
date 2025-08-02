import { MathematicalExpressionParser } from "@/src/parser/MathematicalExpressionParser";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-6">
      <MathematicalExpressionParser />
    </main>
  );
}
