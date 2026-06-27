import type { Card } from "@/types";

type Props = {
  deck: Card[];
};

export default function DeckStats({ deck }: Props) {
  const averageCost =
    deck.length === 0
      ? 0
      : (deck.reduce((sum, card) => sum + card.cost, 0) / deck.length).toFixed(
          1,
        );

  const civilizations = ["火", "水", "自然", "光", "闇"];

  return (
    <div className="mb-6 rounded-xl bg-gray-50 p-4">
      <h3 className="mb-4 text-lg font-bold text-black">デッキ分析</h3>

      <p className="mb-4 text-black">
        平均コスト：<strong>{averageCost}</strong>
      </p>

      <div className="space-y-2">
        {civilizations.map((civ) => {
          const count = deck.filter((card) => card.civilization === civ).length;

          return (
            <div key={civ} className="flex justify-between text-black">
              <span>{civ}</span>

              <span>{count}枚</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
