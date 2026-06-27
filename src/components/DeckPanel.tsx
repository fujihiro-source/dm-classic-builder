import type { Card } from "@/types";

type DeckPanelProps = {
  deck: Card[];
  removeCard: (name: string) => void;
  clearDeck: () => void;
};

export default function DeckPanel({
  deck,
  removeCard,
  clearDeck,
}: DeckPanelProps) {
  return (
    <div className="mt-10 rounded-xl bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">
          現在のデッキ（{deck.length}枚）
        </h2>

        <button
          onClick={clearDeck}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          デッキを空にする
        </button>
      </div>

      {deck.length === 0 ? (
        <p className="text-gray-500">まだカードがありません。</p>
      ) : (
        <div className="space-y-2">
          {Object.entries(
            deck.reduce((acc: Record<string, number>, card) => {
              acc[card.name] = (acc[card.name] || 0) + 1;
              return acc;
            }, {}),
          ).map(([name, count]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded border p-3"
            >
              <span className="text-black">{name}</span>

              <div className="flex items-center gap-4">
                <span className="text-black">×{count}</span>

                <button
                  onClick={() => removeCard(name)}
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                >
                  −
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
