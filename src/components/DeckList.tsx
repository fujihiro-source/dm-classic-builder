import type { Deck } from "@/types";

type Props = {
  decks: Deck[];
  selectedDeckId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
};

export default function DeckList({
  decks,
  selectedDeckId,
  onSelect,
  onCreate,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-bold text-black">デッキ一覧</h2>

      <button
        onClick={onCreate}
        className="mb-3 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
      >
        ＋ 新規デッキ
      </button>

      <div className="space-y-2">
        {decks.map((deck) => (
          <button
            key={deck.id}
            onClick={() => onSelect(deck.id)}
            className={`w-full rounded border p-3 text-left transition ${
              selectedDeckId === deck.id
                ? "border-blue-600 bg-blue-50"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="font-semibold text-black">{deck.name}</div>

            <div className="text-sm text-gray-500">{deck.cards.length}枚</div>
          </button>
        ))}
      </div>
    </div>
  );
}
