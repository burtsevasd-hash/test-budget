import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, FileQuestion, Sparkles } from "lucide-react";
import { useQuizState, saveResult, loadResult, hasResult } from "@/hooks/use-quiz-state";
import { QUESTIONS, computeResult, type Result } from "@/data/quiz";
import { QuestionScreen } from "@/components/quiz/QuestionScreen";
import { ProcessingScreen } from "@/components/quiz/ProcessingScreen";
import { ResultScreen } from "@/components/quiz/ResultScreen";

type Phase = "landing" | "quiz" | "processing" | "result";

export default function App() {
  const { state, hydrated, answer, goNext, goPrev, finish, reset } = useQuizState();
  const [phase, setPhase] = useState<Phase>("landing");
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    const stored = loadResult<Result>();
    if (stored) {
      setResult(stored);
      // Не открываем результат автоматически — даём выбор на лендинге.
    }
  }, [hydrated]);

  if (!hydrated) return null;

  if (phase === "quiz") {
    const q = QUESTIONS[state.step];
    return (
      <>
        <Toaster richColors position="top-center" />
        <QuestionScreen
          step={state.step}
          selected={state.answers[q.id]}
          onSelect={answer}
          onPrev={goPrev}
          onNext={() => {
            if (state.step >= QUESTIONS.length - 1) {
              finish();
              setPhase("processing");
            } else {
              goNext();
            }
          }}
        />
      </>
    );
  }

  if (phase === "processing") {
    return (
      <ProcessingScreen
        onDone={() => {
          const r = computeResult(state.answers);
          saveResult(r);
          setResult(r);
          setPhase("result");
        }}
      />
    );
  }

  if (phase === "result" && result) {
    return (
      <>
        <Toaster richColors position="top-center" />
        <ResultScreen
          result={result}
          onRestart={() => {
            reset();
            setResult(null);
            setPhase("landing");
          }}
        />
      </>
    );
  }

  return (
    <Landing
      hasPrevResult={hasResult()}
      onStart={() => {
        if (state.finished) {
          reset();
          setResult(null);
        }
        setPhase("quiz");
      }}
      onShowResult={() => setPhase("result")}
      inProgress={state.step > 0 && !state.finished}
    />
  );
}

function Landing({
  onStart,
  onShowResult,
  hasPrevResult,
  inProgress,
}: {
  onStart: () => void;
  onShowResult: () => void;
  hasPrevResult: boolean;
  inProgress: boolean;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />

      {/* HERO */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 0%, oklch(0.55 0.18 255) 0, transparent 40%), radial-gradient(circle at 80% 60%, oklch(0.7 0.16 220) 0, transparent 40%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 pt-16 sm:pt-24 pb-16 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide uppercase mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Диагностический тест
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.05] mb-6">
            Бюджет-радар:
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              узнайте уровень зрелости
            </span>
            <br />
            вашего бюджета
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            18 вопросов в 5 блоках. На выходе — ваш уровень от 0 до 4, радар по блокам и оценка
            «цены» неточности в % от годовой чистой прибыли.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button size="lg" onClick={onStart} className="text-base px-8 h-14 shadow-elegant">
              {inProgress ? "Продолжить тест" : hasPrevResult ? "Пройти ещё раз" : "Начать тест"}
            </Button>
            {hasPrevResult && !inProgress && (
              <Button size="lg" variant="outline" onClick={onShowResult} className="h-14">
                Посмотреть мой результат
              </Button>
            )}
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            18 вопросов · 5–7 минут · анонимно · бесплатно
          </p>
        </div>
      </header>

      {/* WHAT'S INSIDE */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Что внутри</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: FileQuestion,
              t: "5 блоков диагностики",
              d: "ЦФО, Данные, Методика, Процесс, Точность",
            },
            { icon: Sparkles, t: "Радар-диаграмма", d: "Сильные и слабые зоны на одном экране" },
            { icon: ShieldCheck, t: "Анонимно", d: "Никаких регистраций для прохождения" },
            { icon: Clock, t: "5–7 минут", d: "Можно вернуться к ответу или продолжить позже" },
          ].map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="p-5 rounded-2xl bg-gradient-card border border-border shadow-soft flex gap-4"
            >
              <div className="h-11 w-11 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Частые вопросы</h2>
        <div className="space-y-3">
          {[
            {
              q: "Кому подходит тест?",
              a: "Собственникам, финансовым директорам и руководителям подразделений компаний от 50 до 5000 сотрудников.",
            },
            {
              q: "Как считается уровень?",
              a: "Сумма баллов по 18 вопросам нормируется к 100% и распределяется по 5 уровням: 0–20% — Хаос, 81–100% — Living budget.",
            },
            {
              q: "Что я получу в конце?",
              a: "Уровень зрелости, радар-диаграмму по блокам, цену неточности в % от ЧП, топ-3 слабых блока и рекомендации.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group p-5 rounded-xl border border-border bg-card open:shadow-soft transition"
            >
              <summary className="cursor-pointer font-semibold flex justify-between items-center list-none">
                {f.q}
                <span className="text-muted-foreground group-open:rotate-180 transition">▾</span>
              </summary>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-muted-foreground py-10">
        © Бюджет-радар · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
