import { useEffect, useState } from "react";

const STAGES = [
  "Считаем баллы по 5 блокам…",
  "Сравниваем с медианой по индустрии…",
  "Формируем персональные рекомендации…",
  "Готово!",
];

export function ProcessingScreen({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setStage((s) => Math.min(STAGES.length - 1, s + 1));
    }, 900);
    const finish = setTimeout(() => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, 3000 - elapsed);
      setTimeout(onDone, wait);
    }, 3200);
    return () => {
      clearInterval(interval);
      clearTimeout(finish);
    };
  }, [onDone]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero text-primary-foreground px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-10 h-20 w-20 rounded-full border-4 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
        <div className="space-y-3 min-h-[7rem]">
          {STAGES.map((s, i) => (
            <p
              key={i}
              className={`text-lg sm:text-xl font-medium transition-all duration-500 ${
                i <= stage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {i < stage ? "✓ " : i === stage ? "→ " : ""}{s}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
