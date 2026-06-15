import { weddingContent } from "../data/wedding-content";

const SECOND_IN_MS = 1000;
const MINUTE_IN_MS = SECOND_IN_MS * 60;
const HOUR_IN_MS = MINUTE_IN_MS * 60;
const DAY_IN_MS = HOUR_IN_MS * 24;

export type WeddingCountdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isAfterWedding: boolean;
};

export function getWeddingCountdown(now = new Date()): WeddingCountdown {
  const weddingTime = new Date(weddingContent.event.dateTime).getTime();
  const difference = weddingTime - now.getTime();
  const elapsedTime = Math.abs(difference);

  return {
    days: Math.floor(elapsedTime / DAY_IN_MS),
    hours: Math.floor((elapsedTime % DAY_IN_MS) / HOUR_IN_MS),
    minutes: Math.floor((elapsedTime % HOUR_IN_MS) / MINUTE_IN_MS),
    seconds: Math.floor((elapsedTime % MINUTE_IN_MS) / SECOND_IN_MS),
    isAfterWedding: difference <= 0,
  };
}
