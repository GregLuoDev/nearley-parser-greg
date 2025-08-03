export function ParseError({ error }: { error: string }) {
  return (
    <>
      {error && (
        <div className="mt-6 w-full bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow">
          <b>Error:</b>
          <div data-testid="error" className="whitespace-pre-wrap" style={{fontFamily: 'monospace'}}>
            {error}
          </div>
        </div>
      )}
    </>
  );
}
