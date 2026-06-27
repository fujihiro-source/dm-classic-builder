import type { Deck } from "@/types";

type Props = {
  decks: Deck[];
  selectedDeckId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function DeckList({
  decks,
  selectedDeckId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
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
          <div
            key={deck.id}
            className={`rounded border p-3 transition ${
              selectedDeckId === deck.id
                ? "border-blue-600 bg-blue-50"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => onSelect(deck.id)}
                className="flex-1 text-left"
              >
                <div className="font-semibold text-black">{deck.name}</div>

                <div className="text-sm text-gray-500">
                  {deck.cards.length}枚
                </div>
              </button>

              <button
                onClick={() => onRename(deck.id)}
                className="ml-2 rounded px-2 py-1 hover:bg-gray-200"
                title="名前変更"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(deck.id)}
                className="ml-1 rounded px-2 py-1 hover:bg-red-100"
                title="削除"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
