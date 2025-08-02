import { ChangeEvent } from "react";

type Props = {
  value: string;
  handleChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  parse: () => void;
};

export function InputBoxAndParseButton({
  value,
  handleChangeValue,
  handleKeyDown,
  parse,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-xl mx-auto mt-6">
      <input
        type="text"
        value={value}
        placeholder="Type your mathematical expression"
        onChange={handleChangeValue}
        className="flex-1 w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        data-testid="input"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={parse}
        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
        data-testid="parser-button"
      >
        Parse
      </button>
    </div>
  );
}
