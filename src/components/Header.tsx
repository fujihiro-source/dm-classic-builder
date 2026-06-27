import Link from "next/link";

type Props = {
  onCreateDeck?: () => void;
};

export default function Header({ onCreateDeck }: Props) {
  return (
    <header className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold">DM Classic Builder</h1>

          <p className="mt-2 text-blue-100">
            クラシックデュエマ デッキ作成ツール
          </p>
        </div>

        <nav>
          <button
            onClick={onCreateDeck}
            className="rounded-lg bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            ＋ 新規デッキ
          </button>
        </nav>
      </div>
    </header>
  );
}
