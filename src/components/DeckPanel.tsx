"use client";

import type { Card } from "@/types";

type Props = {
  deck: Card[];
  onAdd: (card: Card) => void;
  onRemove: (name: string) => void;
};

export default function DeckPanel({ deck, onAdd, onRemove }: Props) {
  // =====================
  // スタック化
  // =====================
  const stack: Record<string, { card: Card; count: number }> = {};

  deck.forEach((card) => {
    if (!stack[card.name]) {
      stack[card.name] = { card, count: 0 };
    }
    stack[card.name].count += 1;
  });

  const list = Object.values(stack);

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      {/* 枚数 */}
      <div className="mb-3 font-bold text-black">
        デッキ：{deck.length} / 40枚
      </div>

      {/* =====================
          スタック表示
      ===================== */}
      <div className="space-y-2">
        {list.map(({ card, count }) => {
          const canAdd = count < 4;

          return (
            <div
              key={card.name}
              className="flex items-center justify-between border-b py-2"
            >
              {/* 左：カード情報 */}
              <div className="flex items-center gap-2 text-sm text-black">
                <div className="w-8 h-10 bg-gray-200 rounded" />

                <span>{card.name}</span>

                <span className="text-gray-500">×{count}</span>
              </div>

              {/* =====================
                  右：ボタン（逆配置）
              ===================== */}
              <div className="flex items-center gap-2 w-[70px] justify-end">
                {/* ＋（左側に変更） */}
                <button
                  onClick={() => canAdd && onAdd(card)}
                  disabled={!canAdd}
                  className={`font-bold px-2 ${
                    canAdd
                      ? "text-blue-500"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                >
                  ＋
                </button>

                {/* −（右側） */}
                <button
                  onClick={() => onRemove(card.name)}
                  className="text-red-500 font-bold px-2"
                >
                  −
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 空 */}
      {deck.length === 0 && (
        <div className="text-gray-400 text-sm mt-4">カードがありません</div>
      )}
    </div>
  );
}
