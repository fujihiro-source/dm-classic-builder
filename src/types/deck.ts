import type { Card } from "./card";

/**
 * 今は2005固定運用（後で拡張可能）
 */
export type DeckRuleId = "2005";

export type Deck = {
  id: string;
  name: string;

  // 2005固定ルール
  ruleId: DeckRuleId;

  // カード本体
  cards: Card[];

  createdAt: string;
  updatedAt: string;
};
