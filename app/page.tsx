import { MathematicalExpressionParser } from "@/src/parser/MathematicalExpressionParser";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center p-6 bg-gray-100 p-6 min-h-[800px] w-full"
    >
      <MathematicalExpressionParser />
    </main>
  );
}
