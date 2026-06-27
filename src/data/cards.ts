import type { Card } from "@/types";

export const cards: Card[] = [
  // =========================
  // 🔥 火文明
  // =========================
  {
    id: "fire-1",
    name: "ボルシャック・ドラゴン",
    cost: 6,
    civilization: "火",
    type: "creature",
    isTrigger: false,
  },
  {
    id: "fire-2",
    name: "バルキリー・ドラゴン",
    cost: 7,
    civilization: "火",
    type: "creature",
    isTrigger: false,
  },
  {
    id: "fire-3",
    name: "地獄スクラッパー",
    cost: 6,
    civilization: "火",
    type: "spell",
    isTrigger: true,
  },

  // =========================
  // 💧 水文明
  // =========================
  {
    id: "water-1",
    name: "アクア・スナイパー",
    cost: 4,
    civilization: "水",
    type: "creature",
    isTrigger: false,
  },
  {
    id: "water-2",
    name: "アクア・ハルカス",
    cost: 2,
    civilization: "水",
    type: "creature",
    isTrigger: false,
  },
  {
    id: "water-3",
    name: "エナジー・ライト",
    cost: 3,
    civilization: "水",
    type: "spell",
    isTrigger: false,
  },

  // =========================
  // 🌿 自然文明
  // =========================
  {
    id: "nature-1",
    name: "青銅の鎧",
    cost: 2,
    civilization: "自然",
    type: "creature",
    isTrigger: false,
  },
  {
    id: "nature-2",
    name: "母なる大地",
    cost: 3,
    civilization: "自然",
    type: "spell",
    isTrigger: true,
  },
  {
    id: "nature-3",
    name: "緑神龍ソウルガルダス",
    cost: 7,
    civilization: "自然",
    type: "creature",
    isTrigger: false,
  },

  // =========================
  // ✨ 光文明
  // =========================
  {
    id: "light-1",
    name: "聖天使クラウゼ・バルキューラ",
    cost: 6,
    civilization: "光",
    type: "creature",
    isTrigger: false,
  },
  {
    id: "light-2",
    name: "予言者クルト",
    cost: 2,
    civilization: "光",
    type: "creature",
    isTrigger: false,
  },
  {
    id: "light-3",
    name: "ホーリー・スパーク",
    cost: 6,
    civilization: "光",
    type: "spell",
    isTrigger: true,
  },

  // =========================
  // 🌑 闇文明
  // =========================
  {
    id: "dark-1",
    name: "暗黒の騎士ザガーン",
    cost: 5,
    civilization: "闇",
    type: "creature",
    isTrigger: false,
  },
  {
    id: "dark-2",
    name: "デーモン・ハンド",
    cost: 6,
    civilization: "闇",
    type: "spell",
    isTrigger: true,
  },
  {
    id: "dark-3",
    name: "死神明王",
    cost: 7,
    civilization: "闇",
    type: "creature",
    isTrigger: false,
  },
];
