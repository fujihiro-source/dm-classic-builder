"use client";

import { useEffect, useState } from "react";
import CardItem from "@/components/CardItem";
import Header from "@/components/Header";
import DeckPanel from "@/components/DeckPanel";
import DeckList from "@/components/DeckList";
import { cards } from "@/data/cards";
import { loadDecks, saveDecks } from "@/storage/deckStorage";
import type { Card, Deck } from "@/types";

export default function CardsPage() {
  const [keyword, setKeyword] = useState("");
  const [civilization, setCivilization] = useState("全部");
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [deck, setDeck] = useState<Card[]>([]);

  const filteredCards = cards.filter((card) => {
    const matchKeyword = card.name.includes(keyword);

    const matchCivilization =
      civilization === "全部" || card.civilization === civilization;

    return matchKeyword && matchCivilization;
  });

  useEffect(() => {
    const savedDecks = loadDecks();

    if (savedDecks.length > 0) {
      setDeck(savedDecks[0].cards);
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
    if (deck.length >= 40) {
      alert("デッキは40枚までです！");
      return;
    }

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

  const clearDeck = () => {
    setDeck([]);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Header />

      <input
        type="text"
        placeholder="カード名で検索"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {["全部", "火", "水", "自然", "光", "闇"].map((civ) => (
          <button
            key={civ}
            onClick={() => setCivilization(civ)}
            className={`rounded px-4 py-2 ${
              civilization === civ
                ? "bg-blue-600 text-white"
                : "border bg-white"
            }`}
          >
            {civ}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-8">
        {/* 左：デッキ一覧 */}
        <div>
          <DeckList selectedDeck="default" />
        </div>

        {/* 中央：カード一覧 */}
        <div className="col-span-2 space-y-4">
          {filteredCards.map((card) => (
            <CardItem key={card.id} card={card} onAdd={() => addCard(card)} />
          ))}
        </div>

        {/* 右：現在のデッキ */}
        <div>
          <DeckPanel
            deck={deck}
            removeCard={removeCard}
            clearDeck={clearDeck}
          />
        </div>
      </div>
    </main>
  );
}
