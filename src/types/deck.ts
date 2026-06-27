import type { Card } from "./card";

export type Deck = {
  id: string;
  name: string;
  ruleId: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
};
