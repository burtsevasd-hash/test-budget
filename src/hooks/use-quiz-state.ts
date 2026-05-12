import { useCallback, useEffect, useState } from "react";

const STATE_KEY = "br_state_v1";
const SESSION_KEY = "br_session_id";
const STARTED_KEY = "br_started_at";
const RESULT_KEY = "br_result";
const TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 дней

export type QuizState = {
  step: number; // 0..17
  answers: Record<string, string>;
  finished: boolean;
};

const initial: QuizState = { step: 0, answers: {}, finished: false };

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function readState(): QuizState {
  if (typeof window === "undefined") return initial;
  try {
    const started = Number(localStorage.getItem(STARTED_KEY) || 0);
    if (started && Date.now() - started > TTL_MS) {
      localStorage.removeItem(STATE_KEY);
      localStorage.removeItem(STARTED_KEY);
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(RESULT_KEY);
      return initial;
    }
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) } as QuizState;
  } catch {
    return initial;
  }
}

export function useQuizState() {
  const [state, setState] = useState<QuizState>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readState());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: QuizState) => {
    setState(next);
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(next));
      if (!localStorage.getItem(STARTED_KEY)) {
        localStorage.setItem(STARTED_KEY, String(Date.now()));
      }
      if (!localStorage.getItem(SESSION_KEY)) {
        localStorage.setItem(SESSION_KEY, uuid());
      }
    } catch {}
  }, []);

  const answer = useCallback(
    (qid: string, oid: string) => {
      persist({ ...state, answers: { ...state.answers, [qid]: oid } });
    },
    [state, persist],
  );

  const goNext = useCallback(() => persist({ ...state, step: state.step + 1 }), [state, persist]);
  const goPrev = useCallback(
    () => persist({ ...state, step: Math.max(0, state.step - 1) }),
    [state, persist],
  );
  const finish = useCallback(() => persist({ ...state, finished: true }), [state, persist]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STATE_KEY);
      localStorage.removeItem(STARTED_KEY);
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(RESULT_KEY);
    } catch {}
    setState(initial);
  }, []);

  return { state, hydrated, answer, goNext, goPrev, finish, reset };
}

export function saveResult(r: unknown) {
  try {
    localStorage.setItem(RESULT_KEY, JSON.stringify(r));
  } catch {}
}
export function loadResult<T = unknown>(): T | null {
  try {
    const raw = localStorage.getItem(RESULT_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
export function hasResult(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(RESULT_KEY);
}
