"use client";

import type { Card } from "@/types";

type Props = {
  deck: Card[];
};

export default function DeckView({ deck }: Props) {
  const ROWS = 8;
  const COLS = 5;

  // 40枠
  const slots: (Card | null)[] = Array(ROWS * COLS).fill(null);

  // =====================
  // ★縦優先で埋める
  // =====================
  deck.slice(0, 40).forEach((card, i) => {
    const col = Math.floor(i / ROWS); // 列
    const row = i % ROWS; // 行

    const index = row * COLS + col;

    slots[index] = card;
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 grid-rows-8 gap-2">
        {slots.map((card, i) => (
          <div
            key={i}
            className="h-20 border bg-white rounded flex items-center justify-center text-xs"
          >
            {card ? (
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-300 mx-auto rounded" />
                <div>{card.name}</div>
              </div>
            ) : (
              <span className="text-gray-300">空</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
