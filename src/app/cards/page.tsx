"use client";

import { useEffect, useState } from "react";
import { cards } from "@/data/cards";
import CardItem from "@/components/CardItem";
import { loadDecks, saveDecks } from "@/storage/deckStorage";
import type { Card, Deck } from "@/types";

export default function CardsPage() {
  const [deck, setDeck] = useState<Card[]>([]);

  useEffect(() => {
    const decks = loadDecks();

    if (decks.length > 0) {
      setDeck(decks[0].cards);
    }
  }, []);

  useEffect(() => {
    const deckData: Deck = {
      id: "default",
      name: "マイデッキ",
      ruleId: "classic2005",
      cards: deck,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveDecks([deckData]);
  }, [deck]);

  const addCard = (card: Card) => {
    const count = deck.filter((c) => c.id === card.id).length;

    if (count >= 4) {
      alert("同じカードは4枚までです！");
      return;
    }

    setDeck([...deck, card]);
  };
  const removeCard = (name: string) => {
    const index = deck.findIndex((card) => card.name === name);

    if (index === -1) return;

    const newDeck = [...deck];
    newDeck.splice(index, 1);

    setDeck(newDeck);
  };
  console.log(cards);
  console.log(cards[0]);
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-4xl font-bold text-blue-700">カード一覧</h1>

      <div className="space-y-4">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} onAdd={() => addCard(card)} />
        ))}
      </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold">
          現在のデッキ（{deck.length}枚）
        </h2>

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
                className="flex justify-between rounded border p-3"
              >
                <span>{name}</span>

                <div className="flex gap-4">
                  <span>×{count}</span>

                  <button
                    onClick={() => removeCard(name)}
                    className="rounded bg-red-500 px-3 text-white"
                  >
                    −
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
