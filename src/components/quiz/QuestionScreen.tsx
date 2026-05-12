import { useEffect, useState } from "react";
import { QUESTIONS, type Question } from "@/data/quiz";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  step: number;
  selected?: string;
  onSelect: (qid: string, oid: string) => void;
  onNext: () => void;
  onPrev: () => void;
};

export function QuestionScreen({ step, selected, onSelect, onNext, onPrev }: Props) {
  const q: Question = QUESTIONS[step];
  const total = QUESTIONS.length;
  const progress = ((step + 1) / total) * 100;
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    setAnim(true);
    const t = setTimeout(() => setAnim(false), 200);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 backdrop-blur bg-background/80 border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Блок {q.block} · {q.block_title}</span>
            <span>Вопрос {step + 1} из {total}</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
        <div
          className={`transition-all duration-200 ${anim ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"}`}
        >
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-foreground mb-8">
            {q.text}
          </h1>

          <div className="space-y-3">
            {q.options.map((opt) => {
              const active = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelect(q.id, opt.id)}
                  className={[
                    "w-full text-left rounded-xl border-2 px-5 py-4 min-h-14 transition-all",
                    "hover:border-primary/50 hover:shadow-soft",
                    active
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border bg-card",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={[
                        "mt-0.5 inline-flex h-5 w-5 shrink-0 rounded-full border-2 items-center justify-center transition",
                        active ? "border-primary bg-primary" : "border-muted-foreground/40",
                      ].join(" ")}
                    >
                      {active && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
                    </span>
                    <span className="text-base text-foreground">{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={step === 0}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Назад
          </Button>
          <Button onClick={onNext} disabled={!selected} size="lg" className="gap-1">
            {step === total - 1 ? "Завершить" : "Далее"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
