"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import StatsPanel from "@/components/StatsPanel";
import DeckList from "@/components/DeckList";
import DeckPanel from "@/components/DeckPanel";
import DeckView from "@/components/DeckView";
import CardItem from "@/components/CardItem";

import { cards } from "@/data/cards";
import { loadDecks, saveDecks } from "@/storage/deckStorage";
import type { Card, Deck } from "@/types";

export default function CardsPage() {
  // =====================
  // state
  // =====================
  const [keyword, setKeyword] = useState("");
  const [civilization, setCivilization] = useState("全部");

  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");

  const [viewMode, setViewMode] = useState<"build" | "view">("build");

  const selectedDeck = decks.find((d) => d.id === selectedDeckId) ?? null;

  const deck = selectedDeck?.cards ?? [];

  // =====================
  // 初期ロード
  // =====================
  useEffect(() => {
    const saved = loadDecks();

    if (saved.length > 0) {
      setDecks(saved);
      setSelectedDeckId(saved[0].id);
    } else {
      const first: Deck = {
        id: crypto.randomUUID(),
        name: "マイデッキ",
        ruleId: "2005",
        cards: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setDecks([first]);
      setSelectedDeckId(first.id);
    }
  }, []);

  // =====================
  // save
  // =====================
  useEffect(() => {
    if (decks.length > 0) {
      saveDecks(decks);
    }
  }, [decks]);

  // =====================
  // ★唯一のソート（コスト順）
  // =====================
  const sortDeck = (list: Card[]) => {
    return [...list].sort((a, b) => a.cost - b.cost);
  };

  // =====================
  // 追加（完全版）
  // =====================
  const addCard = (card: Card) => {
    if (!selectedDeck) return;

    const count = selectedDeck.cards.filter((c) => c.id === card.id).length;

    if (selectedDeck.cards.length >= 40) return;
    if (count >= 4) return;

    const updatedCards = sortDeck([...selectedDeck.cards, card]);

    const updated = decks.map((d) =>
      d.id === selectedDeckId
        ? {
            ...d,
            cards: updatedCards,
            updatedAt: new Date().toISOString(),
          }
        : d,
    );

    setDecks(updated);
  };

  // =====================
  // 削除（順番保持）
  // =====================
  const removeCard = (name: string) => {
    if (!selectedDeck) return;

    const list = [...selectedDeck.cards];

    const index = list.findIndex((c) => c.name === name);
    if (index === -1) return;

    list.splice(index, 1);

    const updated = decks.map((d) =>
      d.id === selectedDeckId
        ? {
            ...d,
            cards: list,
            updatedAt: new Date().toISOString(),
          }
        : d,
    );

    setDecks(updated);
  };

  // =====================
  // deck操作
  // =====================
  const createDeck = () => {
    const newDeck: Deck = {
      id: crypto.randomUUID(),
      name: `デッキ${decks.length + 1}`,
      ruleId: "2005",
      cards: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDecks([...decks, newDeck]);
    setSelectedDeckId(newDeck.id);
  };

  const renameDeck = (id: string) => {
    const target = decks.find((d) => d.id === id);
    if (!target) return;

    const name = prompt("デッキ名", target.name);
    if (!name) return;

    setDecks(
      decks.map((d) =>
        d.id === id ? { ...d, name, updatedAt: new Date().toISOString() } : d,
      ),
    );
  };

  const deleteDeck = (id: string) => {
    if (decks.length === 1) return;

    const ok = confirm("削除しますか？");
    if (!ok) return;

    const updated = decks.filter((d) => d.id !== id);
    setDecks(updated);

    if (selectedDeckId === id) {
      setSelectedDeckId(updated[0].id);
    }
  };

  const duplicateDeck = (id: string) => {
    const target = decks.find((d) => d.id === id);
    if (!target) return;

    const copy: Deck = {
      ...target,
      id: crypto.randomUUID(),
      name: target.name + "コピー",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDecks([...decks, copy]);
    setSelectedDeckId(copy.id);
  };

  // =====================
  // view切替
  // =====================
  const toggleView = () => {
    setViewMode((v) => (v === "build" ? "view" : "build"));
  };

  // =====================
  // filter
  // =====================
  const filteredCards = cards.filter((card) => {
    const matchKeyword = card.name.includes(keyword);
    const matchCivil =
      civilization === "全部" || card.civilization === civilization;

    return matchKeyword && matchCivil;
  });

  // =====================
  // UI
  // =====================
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Header onCreateDeck={createDeck} />

      {/* Stats（常時表示） */}
      <StatsPanel deck={deck} viewMode={viewMode} onToggleView={toggleView} />

      {/* VIEW MODE */}
      {viewMode === "view" ? (
        <DeckView deck={deck} />
      ) : (
        <>
          {/* search */}
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="カード名検索"
            className="mb-4 w-full border p-2"
          />

          {/* filter */}
          <div className="mb-6 flex gap-2">
            {["全部", "火", "水", "自然", "光", "闇"].map((c) => (
              <button
                key={c}
                onClick={() => setCivilization(c)}
                className="border px-3 py-1"
              >
                {c}
              </button>
            ))}
          </div>

          {/* layout */}
          <div className="grid grid-cols-4 gap-8">
            {/* left */}
            <DeckList
              decks={decks}
              selectedDeckId={selectedDeckId}
              onSelect={setSelectedDeckId}
              onCreate={createDeck}
              onRename={renameDeck}
              onDelete={deleteDeck}
              onDuplicate={duplicateDeck}
            />

            {/* center */}
            <div className="col-span-2 space-y-3">
              {filteredCards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  onAdd={() => addCard(card)}
                />
              ))}
            </div>

            {/* right */}
            <DeckPanel deck={deck} onAdd={addCard} onRemove={removeCard} />
          </div>
        </>
      )}
    </main>
  );
}
