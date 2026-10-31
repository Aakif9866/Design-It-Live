"use client";

import { useSyncExternalStore } from "react";

const KEY = "design-it-live:done:v1";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();

// Snapshot must be referentially stable between reads, so cache by raw string.
let lastRaw: string | null = null;
let lastParsed: string[] = EMPTY;
let memory: string[] | null = null; // used when localStorage is unavailable

function read(): string[] {
  if (memory) return memory;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw !== lastRaw) {
    lastRaw = raw;
    try {
      const value = raw ? JSON.parse(raw) : [];
      lastParsed = Array.isArray(value) ? value.filter((v) => typeof v === "string") : EMPTY;
    } catch {
      lastParsed = EMPTY;
    }
  }
  return lastParsed;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function useDone(): string[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function setDone(slug: string, done: boolean) {
  const current = read();
  const next = done ? [...new Set([...current, slug])] : current.filter((s) => s !== slug);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    memory = next;
  }
  listeners.forEach((l) => l());
}
