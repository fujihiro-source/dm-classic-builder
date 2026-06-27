"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDeckPage() {
  const [deckName, setDeckName] = useState("");
  const router = useRouter();

  const createDeck = () => {
    if (!deckName.trim()) {
      alert("デッキ名を入力してください！");
      return;
    }

    // 今はカード一覧ページへ移動
    router.push("/cards");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          新しいデッキ
        </h1>

        <p className="mt-6 mb-2 font-semibold">
          デッキ名
        </p>

        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="例：赤青速攻"
          className="w-full rounded-lg border p-3"
        />

        <button
          onClick={createDeck}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          デッキを作成
        </button>
      </div>
    </main>
  );
}