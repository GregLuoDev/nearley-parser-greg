export function ParseResult({ result }: { result: boolean | number | undefined }) {
  return (
    <>
      {(result === true || result === false) && (
        <div className="mt-6 bg-green-100  border border-green-300 rounded-lg px-4 py-3 shadow">
          <span className="text-black">Parsing Result:</span>{" "}
          <b
            className={`${result ? "text-green-800" : "text-red-800"}`}
            data-testid="result"
          >
            {result?.toString()}
          </b>
        </div>
      )}
    </>
  );
}
