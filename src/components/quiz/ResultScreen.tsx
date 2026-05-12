import { useMemo, useState } from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from "recharts";
import { BLOCKS, LEVELS, RECOMMENDATIONS, type Result } from "@/data/quiz";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Share2, RotateCcw, Send, Mail } from "lucide-react";

export function ResultScreen({ result, onRestart }: { result: Result; onRestart: () => void }) {
  const lvl = LEVELS[result.level];
  const data = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((b) => ({
        block: BLOCKS[b].title.replace(/\(.*?\)/, "").trim(),
        value: Math.round(result.block_scores[b].percent),
        score: result.block_scores[b].score,
        max: result.block_scores[b].max,
      })),
    [result],
  );

  const [pdfOpen, setPdfOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  const submitPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;
    // Здесь интеграция с CRM/email-сервисом (см. п. 10.2–10.3 ТЗ).
    setSent(true);
  };

  const share = (channel: "tg" | "wa" | "copy") => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const text = "Прошёл тест «Бюджет-радар» — узнайте свой уровень зрелости бюджета:";
    if (channel === "tg") {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
    } else if (channel === "wa") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Ссылка скопирована");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* HERO */}
      <section
        className="px-4 pt-12 pb-16 text-center"
        style={{ backgroundColor: lvl.bg, color: lvl.fg }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="uppercase tracking-widest text-xs opacity-70 mb-2">
            Ваш уровень зрелости бюджета
          </p>
          <div className="flex items-baseline justify-center gap-3 my-4">
            <span className="text-7xl sm:text-8xl font-extrabold leading-none">
              {result.level}
            </span>
            <span className="text-2xl sm:text-3xl opacity-70">/ 4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: lvl.fg }}>
            {lvl.name}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto opacity-90">
            {lvl.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/40 backdrop-blur text-sm font-medium">
            Балл: {result.total_score} / 42 · {result.total_percent}%
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 -mt-10 space-y-6">
        {/* RADAR */}
        <Card className="p-6 shadow-elegant bg-gradient-card">
          <h2 className="text-xl font-bold mb-4">Профиль по 5 блокам</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <RadarChart data={data} outerRadius="75%">
                <PolarGrid stroke="oklch(0.85 0.01 250)" />
                <PolarAngleAxis dataKey="block" tick={{ fontSize: 12, fill: "oklch(0.3 0.04 255)" }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Ваш результат"
                  dataKey="value"
                  stroke="oklch(0.55 0.18 255)"
                  fill="oklch(0.55 0.18 255)"
                  fillOpacity={0.25}
                />
                <Tooltip
                  formatter={(_v, _n, p: any) => [`${p.payload.score}/${p.payload.max} (${p.payload.value}%)`, p.payload.block]}
                  contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* MONEY */}
        <Card className="p-6 shadow-soft border-l-4" style={{ borderLeftColor: lvl.fg }}>
          <h2 className="text-xl font-bold mb-2">Что это значит в деньгах</h2>
          <p className="text-muted-foreground leading-relaxed">
            На вашем уровне зрелости в зоне непредсказуемости находится примерно{" "}
            <span className="font-bold text-foreground">
              {result.money_loss_percent_of_np}% годовой чистой прибыли
            </span>
            . Фактический результат может отклониться от плана на эту величину в любую сторону —
            на эту часть прибыли компания не может уверенно рассчитывать.
          </p>
          <p className="mt-3 text-foreground font-medium leading-relaxed">
            На эфире «Бюджет, как инструмент управления чистой прибылью» я покажу, как эту зону сократить — пошагово, на реальных формах и формулах, без воды.
          </p>
        </Card>

        {/* WEAK BLOCKS */}
        <div>
          <h2 className="text-xl font-bold mb-4">Топ-3 слабых блока</h2>
          <div className="grid gap-3">
            {result.weak_blocks.map((b) => (
              <Card key={b} className="p-5 shadow-soft">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-semibold">{RECOMMENDATIONS[b].title}</h3>
                  <span className="text-sm font-mono px-2 py-0.5 rounded bg-secondary">
                    {Math.round(result.block_scores[b].percent)}%
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {RECOMMENDATIONS[b].text}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="p-6 sm:p-8 bg-gradient-hero text-primary-foreground shadow-elegant">
          <div className="rounded-xl bg-background/10 backdrop-blur p-5 sm:p-6 mb-6 border border-primary-foreground/15">
            <p className="font-semibold mb-4">
              На эфире — 10 шагов к бюджету, который реально работает:
            </p>
            <ol className="space-y-3 text-sm sm:text-[15px] leading-relaxed list-decimal pl-5 opacity-95">
              <li>
                Как описать финансовую структуру (ЦФО) так, чтобы каждый руководитель отвечал
                за свои показатели в рублях и единицах — с защитой бюджета и подписанным
                протоколом.
              </li>
              <li>
                Как определить методику бюджетирования под вашу компанию — Incremental,
                Activity-Based, Driver-Based или Rolling Forecast (дерево решений на эфире).
              </li>
              <li>
                Цифровая зрелость данных: что значит «копнуть глубже» и почему без этого
                Driver-Based бюджет не запустить.
              </li>
              <li>
                Как устроен бюджетный процесс — от целеполагания собственника до защиты
                бюджета руководителями ЦФО (с шаблоном письма-старта бюджетной кампании).
              </li>
              <li>
                Связка Excel + Power Query + ChatGPT — параметрическая модель: меняете один
                драйвер, БДР, БДДС и прогнозный баланс пересчитываются автоматически.
              </li>
              <li>
                Как презентовать бюджет собственнику, чтобы он ушёл с подписанным протоколом
                по 5–7 решениям (а не «спасибо, утверждаю»).
              </li>
              <li>
                8 рычагов повышения точности планирования — что внедряют CFO, у которых
                отклонение факт/план ≤ ±5%.
              </li>
              <li>
                Демо интерактивного бюджета: показываю модель, которая даёт точность
                планирования выше 90%.
              </li>
            </ol>
          </div>

          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto text-base font-semibold"
            onClick={() => toast.info("Откройте страницу регистрации эфира")}
          >
            Зарегистрироваться на эфир
          </Button>
          <div className="mt-4 text-sm opacity-90">
            Эфир · 2 часа · бесплатно · разбор кейсов
          </div>
        </Card>

        {/* Share / restart */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground mr-2 inline-flex items-center gap-1">
            <Share2 className="h-4 w-4" /> Поделиться:
          </span>
          <Button size="sm" variant="ghost" onClick={() => share("tg")}>Telegram</Button>
          <Button size="sm" variant="ghost" onClick={() => share("wa")}>WhatsApp</Button>
          <Button size="sm" variant="ghost" onClick={() => share("copy")}>Копировать</Button>
          <Button size="sm" variant="ghost" className="ml-auto gap-1" onClick={onRestart}>
            <RotateCcw className="h-4 w-4" /> Пройти ещё раз
          </Button>
        </div>
      </div>

      <Dialog open={pdfOpen} onOpenChange={(o) => { setPdfOpen(o); if (!o) setSent(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{sent ? "Готово" : "Получить PDF-отчёт"}</DialogTitle>
            <DialogDescription>
              {sent
                ? `PDF отправлен на ${email}. Проверьте папки «Промоакции» и «Спам».`
                : "Отправим расширенный отчёт с рекомендациями вам на почту."}
            </DialogDescription>
          </DialogHeader>
          {!sent && (
            <form onSubmit={submitPdf} className="space-y-4">
              <Input
                type="email"
                required
                placeholder="you@company.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <Checkbox
                  checked={consent}
                  onCheckedChange={(v) => setConsent(Boolean(v))}
                  className="mt-0.5"
                />
                <span>Согласен(на) на обработку персональных данных</span>
              </label>
              <Button type="submit" disabled={!email || !consent} className="w-full gap-2">
                <Send className="h-4 w-4" /> Отправить
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
