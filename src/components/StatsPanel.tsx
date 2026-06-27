"use client";

import type { Card } from "@/types";

type Props = {
  deck: Card[];
  viewMode: "build" | "view";
  onToggleView: () => void;
};

export default function StatsPanel({ deck, viewMode, onToggleView }: Props) {
  const total = deck.length;

  // =====================
  // コスト分布（1〜10+）
  // =====================
  const costMap: Record<string, number> = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10+": 0,
  };

  deck.forEach((card) => {
    const cost = card.cost;

    if (cost >= 10) {
      costMap["10+"] += 1;
    } else {
      costMap[String(cost)] += 1;
    }
  });

  const costList = Object.entries(costMap).map(([cost, count]) => ({
    cost,
    count,
  }));

  const max = Math.max(...costList.map((c) => c.count), 1);

  // =====================
  // 文明
  // =====================
  const civMap: Record<string, number> = {
    火: 0,
    水: 0,
    自然: 0,
    光: 0,
    闇: 0,
  };

  deck.forEach((card) => {
    if (civMap[card.civilization] !== undefined) {
      civMap[card.civilization]++;
    }
  });

  // =====================
  // タイプ
  // =====================
  const creature = deck.filter((c) => c.type === "creature").length;
  const spell = deck.filter((c) => c.type === "spell").length;
  const other = deck.filter((c) => c.type === "other").length;

  // =====================
  // Sトリガー
  // =====================
  const trigger = deck.filter((c) => c.isTrigger).length;

  return (
    <div className="mb-6 grid grid-cols-4 gap-4">
      {/* =====================
          コスト分布（棒グラフ維持）
      ===================== */}
      <div className="col-span-2 rounded-xl bg-white p-4 shadow">
        <div className="mb-3 font-bold text-black">コスト分布（{total}枚）</div>

        <div className="flex items-end gap-2 h-36">
          {costList.map((item) => {
            const height = (item.count / max) * 100;

            return (
              <div
                key={item.cost}
                className="flex flex-col items-center flex-1"
              >
                <div className="relative w-6 h-32 flex items-end">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  />

                  {item.count > 0 && (
                    <div className="absolute -top-5 text-xs text-black">
                      {item.count}
                    </div>
                  )}
                </div>

                <div className="text-xs text-gray-600 mt-1">{item.cost}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================
          文明
      ===================== */}
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="mb-2 font-bold text-black">文明分布</div>

        <div className="space-y-2 text-sm text-black">
          <div className="flex justify-between text-red-500">
            <span>火</span>
            <span>{civMap["火"]}枚</span>
          </div>

          <div className="flex justify-between text-blue-500">
            <span>水</span>
            <span>{civMap["水"]}枚</span>
          </div>

          <div className="flex justify-between text-green-500">
            <span>自然</span>
            <span>{civMap["自然"]}枚</span>
          </div>

          <div className="flex justify-between text-yellow-500">
            <span>光</span>
            <span>{civMap["光"]}枚</span>
          </div>

          <div className="flex justify-between text-purple-500">
            <span>闇</span>
            <span>{civMap["闇"]}枚</span>
          </div>
        </div>
      </div>

      {/* =====================
          右サイド
      ===================== */}
      <div className="space-y-4">
        {/* Sトリガー */}
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="font-bold text-black">S・トリガー</div>
          <div className="text-2xl font-bold text-black mt-2">
            ⚡ {trigger}枚
          </div>
        </div>

        {/* タイプ */}
        <div className="rounded-xl bg-white p-4 shadow text-sm text-black">
          <div className="font-bold mb-2">カードタイプ</div>
          <div>クリーチャー：{creature}枚</div>
          <div>呪文：{spell}枚</div>
          <div>その他：{other}枚</div>
        </div>

        {/* =====================
            ボタン（状態依存）
        ===================== */}
        <button
          onClick={onToggleView}
          className="w-full rounded-xl bg-black p-3 text-white font-bold hover:opacity-80"
        >
          {viewMode === "build" ? "デッキ確認" : "編集に戻る"}
        </button>
      </div>
    </div>
  );
}
