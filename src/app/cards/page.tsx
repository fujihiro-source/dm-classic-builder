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

  const selectedDeck = decks.find((deck) => deck.id === selectedDeckId) ?? null;

  const deck = selectedDeck?.cards ?? [];

  const filteredCards = cards.filter((card) => {
    const matchKeyword = card.name.includes(keyword);

    const matchCivilization =
      civilization === "全部" || card.civilization === civilization;

    return matchKeyword && matchCivilization;
  });

  useEffect(() => {
    const savedDecks = loadDecks();

    if (savedDecks.length > 0) {
      setDecks(savedDecks);
      setSelectedDeckId(savedDecks[0].id);
    } else {
      const firstDeck: Deck = {
        id: crypto.randomUUID(),
        name: "マイデッキ",
        ruleId: "classic2005",
        cards: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setDecks([firstDeck]);
      setSelectedDeckId(firstDeck.id);
    }
  }, []);

  useEffect(() => {
    if (decks.length > 0) {
      saveDecks(decks);
    }
  }, [decks]);

  const addCard = (card: Card) => {
    if (!selectedDeck) return;

    if (selectedDeck.cards.length >= 40) {
      alert("デッキは40枚までです！");
      return;
    }

    const count = selectedDeck.cards.filter((c) => c.id === card.id).length;

    if (count >= 4) {
      alert("同じカードは4枚までです！");
      return;
    }

    const updatedDecks = decks.map((d) =>
      d.id === selectedDeckId
        ? {
            ...d,
            cards: [...d.cards, card],
            updatedAt: new Date().toISOString(),
          }
        : d,
    );

    setDecks(updatedDecks);
  };

  const removeCard = (name: string) => {
    if (!selectedDeck) return;

    const cards = [...selectedDeck.cards];

    const index = cards.findIndex((card) => card.name === name);

    if (index === -1) return;

    cards.splice(index, 1);

    const updatedDecks = decks.map((d) =>
      d.id === selectedDeckId
        ? {
            ...d,
            cards,
            updatedAt: new Date().toISOString(),
          }
        : d,
    );

    setDecks(updatedDecks);
  };

  const clearDeck = () => {
    const updatedDecks = decks.map((d) =>
      d.id === selectedDeckId
        ? {
            ...d,
            cards: [],
            updatedAt: new Date().toISOString(),
          }
        : d,
    );

    setDecks(updatedDecks);
  };

  const createDeck = () => {
    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name: `デッキ${decks.length + 1}`,
      ruleId: "classic2005",
      cards: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedDecks = [...decks, newDeck];

    setDecks(updatedDecks);
    setSelectedDeckId(newDeck.id);
  };
  const renameDeck = (id: string) => {
    const deck = decks.find((d) => d.id === id);

    if (!deck) return;

    const name = prompt("デッキ名を入力してください", deck.name);

    if (!name) return;

    const updatedDecks = decks.map((d) =>
      d.id === id
        ? {
            ...d,
            name,
            updatedAt: new Date().toISOString(),
          }
        : d,
    );

    setDecks(updatedDecks);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Header onCreateDeck={createDeck} />

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
          <DeckList
            decks={decks}
            selectedDeckId={selectedDeckId}
            onSelect={setSelectedDeckId}
            onCreate={createDeck}
            onRename={renameDeck}
          />
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
