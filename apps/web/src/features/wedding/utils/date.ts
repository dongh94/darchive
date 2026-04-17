import { weddingContent } from "../data/wedding-content";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function getWeddingDDay() {
  const weddingDate = new Date(weddingContent.event.dateTime);
  const today = new Date();

  return Math.ceil((weddingDate.getTime() - today.getTime()) / DAY_IN_MS);
}
