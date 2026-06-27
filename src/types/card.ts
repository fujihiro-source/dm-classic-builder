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
};

export type Deck = {
  id: string;
  name: string;
  ruleId: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
};
