import { IAst } from "../type";

export function ASTView({ ast }: { ast: IAst | null }) {
  if (!ast) return null;

  return (
    <pre className="mt-6 bg-gray-100 rounded text-sm overflow-x-auto text-black">
      <b>AST:</b>
      <div data-testid="ast">{JSON.stringify(ast, null, 4)}</div>
    </pre>
  );
}
