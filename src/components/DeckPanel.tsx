"use client";

import type { Card } from "@/types";

type Props = {
  deck: Card[];
  onAdd: (card: Card) => void;
  onRemove: (name: string) => void;
};

export default function DeckPanel({ deck, onAdd, onRemove }: Props) {
  // =====================
  // スタック化（絶対に変更禁止）
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
    <div className="rounded-xl bg-white p-4 shadow h-full overflow-y-auto">
      {/* =====================
          デッキ枚数
      ===================== */}
      <div className="mb-3 font-bold text-black sticky top-0 bg-white z-10 py-2">
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
              className="flex items-center justify-between border-b py-2 min-w-0 group relative"
            >
              {/* =====================
                  左：カード情報
              ===================== */}
              <div className="flex items-center gap-2 text-sm text-black min-w-0 flex-1">
                {/* 画像ダミー（固定サイズ＋ズレ防止） */}
                <div className="w-8 h-10 bg-gray-200 rounded flex-shrink-0" />

                {/* カード名（崩れ防止） */}
                <span className="truncate min-w-0 flex-1">{card.name}</span>

                {/* 枚数（固定） */}
                <span className="text-gray-500 flex-shrink-0">×{count}</span>
              </div>

              {/* =====================
                  右：ボタン
              ===================== */}
              <div className="flex items-center gap-2 w-[70px] justify-end flex-shrink-0">
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

                <button
                  onClick={() => onRemove(card.name)}
                  className="text-red-500 font-bold px-2"
                >
                  −
                </button>
              </div>

              {/* =====================
                  ホバー詳細（UI改善のみ）
              ===================== */}
              <div className="absolute left-0 top-full mt-2 hidden group-hover:flex gap-3 z-50 bg-white border shadow-lg p-3 rounded w-72">
                {/* カード画像（固定） */}
                <div className="w-20 h-28 bg-gray-200 rounded flex-shrink-0" />

                {/* 詳細 */}
                <div className="text-xs text-gray-700 space-y-1 min-w-0">
                  <div className="font-bold text-sm text-black truncate">
                    {card.name}
                  </div>

                  <div>コスト: {card.cost}</div>
                  <div>文明: {card.civilization}</div>

                  {/* ここは存在する前提そのまま */}
                  <div>種族: {card.race}</div>

                  <div>パワー: {card.power ?? "-"}</div>

                  {card.isTrigger && (
                    <div className="text-blue-600 font-bold">S・トリガー</div>
                  )}

                  <div className="mt-2 text-gray-600 line-clamp-3">
                    {card.effect}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================
          空デッキ
      ===================== */}
      {deck.length === 0 && (
        <div className="text-gray-400 text-sm mt-4">カードがありません</div>
      )}
    </div>
  );
}
