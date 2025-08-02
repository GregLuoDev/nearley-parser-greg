type Props = { error: string; syntaxError: string };

export function ParseError({ error, syntaxError }: Props) {
  return (
    <>
      {error && (
        <div className="mt-6 w-full bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 shadow whitespace-pre-line">
          <b>Error:</b> <div data-testid="error">{error}</div>
          {syntaxError && (
            <div className="whitespace-pre mt-4">{syntaxError}</div>
          )}
        </div>
      )}
    </>
  );
}
