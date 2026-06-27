type Props = {
  selectedDeck: string;
};

export default function DeckList({ selectedDeck }: Props) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-bold text-black">デッキ一覧</h2>

      <button className="mb-3 w-full rounded bg-blue-600 py-2 text-white">
        ＋ 新規デッキ
      </button>

      <button
        className={`w-full rounded border p-3 text-left ${
          selectedDeck === "default" ? "border-blue-600 bg-blue-50" : "bg-white"
        }`}
      >
        マイデッキ
      </button>
    </div>
  );
}
