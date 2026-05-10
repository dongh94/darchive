"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "../lib/utils";

const backgroundMusicUrl = "/audio/from-the-start.mp3";

export function BackgroundMusicControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriedGesturePlayRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pauseMusic = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const audio = new Audio(backgroundMusicUrl);
    audio.loop = true;
    audio.volume = 0.42;
    audio.preload = "auto";
    audioRef.current = audio;

    const syncPausedState = () => setIsPlaying(!audio.paused);
    audio.addEventListener("play", syncPausedState);
    audio.addEventListener("pause", syncPausedState);

    return () => {
      audio.pause();
      audio.removeEventListener("play", syncPausedState);
      audio.removeEventListener("pause", syncPausedState);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || isPlaying) {
      return;
    }

    const playAfterGesture = () => {
      if (hasTriedGesturePlayRef.current) {
        return;
      }

      hasTriedGesturePlayRef.current = true;
      void playMusic();
    };

    window.addEventListener("scroll", playAfterGesture, { once: true, passive: true });
    window.addEventListener("touchstart", playAfterGesture, { once: true, passive: true });
    window.addEventListener("pointerdown", playAfterGesture, { once: true });

    return () => {
      window.removeEventListener("scroll", playAfterGesture);
      window.removeEventListener("touchstart", playAfterGesture);
      window.removeEventListener("pointerdown", playAfterGesture);
    };
  }, [isEnabled, isPlaying, playMusic]);

  useEffect(() => {
    const stopMusic = () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    };

    const stopMusicWhenHidden = () => {
      if (document.visibilityState === "hidden") {
        stopMusic();
      }
    };

    window.addEventListener("pagehide", stopMusic);
    window.addEventListener("beforeunload", stopMusic);
    document.addEventListener("visibilitychange", stopMusicWhenHidden);

    return () => {
      window.removeEventListener("pagehide", stopMusic);
      window.removeEventListener("beforeunload", stopMusic);
      document.removeEventListener("visibilitychange", stopMusicWhenHidden);
    };
  }, []);

  const handleToggle = useCallback(() => {
    if (isPlaying) {
      setIsEnabled(false);
      pauseMusic();
      return;
    }

    setIsEnabled(true);
    hasTriedGesturePlayRef.current = true;
    void playMusic();
  }, [isPlaying, pauseMusic, playMusic]);

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "absolute right-4 top-4 z-[70]",
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-brand-ink shadow-[0_8px_24px_rgba(44,44,44,0.14)] ring-1 ring-brand-gold/15 backdrop-blur transition active:scale-95",
      )}
      aria-label={isPlaying ? "배경음악 끄기" : "배경음악 켜기"}
      aria-pressed={isPlaying}
    >
      {isPlaying ? <Volume2 size={18} strokeWidth={1.8} /> : <VolumeX size={18} strokeWidth={1.8} />}
    </button>
  );
}
