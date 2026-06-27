export type CardType = "creature" | "spell" | "other";

export type Civilization = "火" | "水" | "自然" | "光" | "闇";

export type Card = {
  id: string;
  name: string;

  cost: number;
  power?: number;

  civilization: Civilization;

  type: CardType;

  isTrigger: boolean;

  // ⭐カードゲームとして必要な情報
  race: string; // 種族
  effect: string; // 効果テキスト
};
