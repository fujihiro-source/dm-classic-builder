import type { Card } from "@/types/card";

type CardItemProps = {
  card: Card;
  onAdd: () => void;
};

const civilizationColor: Record<string, string> = {
  火: "bg-red-100 text-red-700",
  水: "bg-blue-100 text-blue-700",
  自然: "bg-green-100 text-green-700",
  光: "bg-yellow-100 text-yellow-700",
  闇: "bg-purple-100 text-purple-700",
};

export default function CardItem({ card, onAdd }: CardItemProps) {
  return (
    <div className="flex items-center gap-6 rounded-2xl bg-white p-5 shadow transition hover:shadow-lg">
      {/* 仮画像 */}
      <div className="flex h-28 w-20 items-center justify-center rounded-lg bg-gray-200 text-3xl">
        🃏
      </div>

      {/* カード情報 */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-black">{card.name}</h2>

        <div className="mt-2 flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-sm font-bold ${
              civilizationColor[card.civilization]
            }`}
          >
            {card.civilization}
          </span>

          <span className="text-gray-600">コスト {card.cost}</span>
        </div>
      </div>

      {/* ボタン */}
      <button
        onClick={onAdd}
        className="rounded-lg bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
      >
        ＋追加
      </button>
    </div>
  );
}
