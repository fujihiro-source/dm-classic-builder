import type { Card } from "@/types/card";

type CardItemProps = {
  card: Card;
  onAdd: () => void;
};

export default function CardItem(props: CardItemProps) {
  const { card, onAdd } = props;

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow">
      <div>
        <h2 className="text-2xl font-bold">{card.name}</h2>

        <p className="text-gray-600">
          文明：{card.civilization}　コスト：{card.cost}
        </p>
      </div>

      <button
        onClick={onAdd}
        className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        ＋追加
      </button>
    </div>
  );
}
