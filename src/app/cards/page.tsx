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
  // ソート（コスト順）
  // =====================
  const sortDeck = (list: Card[]) => {
    return [...list].sort((a, b) => a.cost - b.cost);
  };

  // =====================
  // 追加
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
  // 削除
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
  // UI（レイアウトだけ修正済み）
  // =====================
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header onCreateDeck={createDeck} />

      {/* Stats */}
      <div className="px-2">
        <StatsPanel deck={deck} viewMode={viewMode} onToggleView={toggleView} />
      </div>

      {/* VIEW MODE */}
      {viewMode === "view" ? (
        <div className="flex-1 overflow-hidden px-2 pb-2">
          <DeckView deck={deck} />
        </div>
      ) : (
        <div className="flex-1 overflow-hidden px-2 pb-2">
          {/* search */}
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="カード名検索"
            className="mb-3 w-full border p-2 rounded"
          />

          {/* filter */}
          <div className="mb-4 flex flex-wrap gap-2">
            {["全部", "火", "水", "自然", "光", "闇"].map((c) => (
              <button
                key={c}
                onClick={() => setCivilization(c)}
                className={`border px-3 py-1 rounded ${
                  civilization === c ? "bg-black text-white" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* 3 panel layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
            {/* DeckList */}
            <div className="md:col-span-1 overflow-y-auto max-h-[60vh]">
              <DeckList
                decks={decks}
                selectedDeckId={selectedDeckId}
                onSelect={setSelectedDeckId}
                onCreate={createDeck}
                onRename={renameDeck}
                onDelete={deleteDeck}
                onDuplicate={duplicateDeck}
              />
            </div>

            {/* Card list */}
            <div className="md:col-span-2 overflow-y-auto max-h-[60vh] space-y-2">
              {filteredCards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  onAdd={() => addCard(card)}
                />
              ))}
            </div>

            {/* DeckPanel */}
            <div className="md:col-span-1 overflow-y-auto max-h-[60vh]">
              <DeckPanel deck={deck} onAdd={addCard} onRemove={removeCard} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
