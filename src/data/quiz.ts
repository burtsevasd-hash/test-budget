// Данные квиза «Бюджет-радар». Согласно ТЗ, тексты должны быть редактируемы
// без релиза — методолог правит этот файл. Структура соответствует разделам 5–8 ТЗ.

export type Option = { id: string; text: string; score: number };
export type Question = {
  id: string;
  block: 1 | 2 | 3 | 4 | 5;
  block_title: string;
  text: string;
  options: Option[];
};

export const BLOCKS: Record<number, { title: string; max: number }> = {
  1: { title: "Финансовая структура (ЦФО)", max: 8 },
  2: { title: "Данные", max: 9 },
  3: { title: "Методика", max: 10 },
  4: { title: "Процесс", max: 6 },
  5: { title: "Точность", max: 9 },
};

export const TOTAL_MAX = 42;

export const QUESTIONS: Question[] = [
  // Блок 1 — ЦФО, max 8 (4 вопроса × до 2 баллов)
  {
    id: "q1", block: 1, block_title: BLOCKS[1].title,
    text: "В компании выделена финансовая структура (ЦФО) с зонами ответственности?",
    options: [
      { id: "q1_a1", text: "Нет, ответственность размыта", score: 0 },
      { id: "q1_a2", text: "Частично — на словах, без формализации", score: 1 },
      { id: "q1_a3", text: "Да, ЦФО закреплены документально", score: 2 },
    ],
  },
  {
    id: "q2", block: 1, block_title: BLOCKS[1].title,
    text: "Руководители подразделений отвечают за бюджет своего ЦФО?",
    options: [
      { id: "q2_a1", text: "Нет, всё контролирует собственник/финдир", score: 0 },
      { id: "q2_a2", text: "Скорее формально — без последствий", score: 1 },
      { id: "q2_a3", text: "Да, есть KPI и регулярный разбор", score: 2 },
    ],
  },
  {
    id: "q3", block: 1, block_title: BLOCKS[1].title,
    text: "Есть ли матрица доходов/расходов с привязкой к ЦФО?",
    options: [
      { id: "q3_a1", text: "Нет, всё в общем котле", score: 0 },
      { id: "q3_a2", text: "Частично — только по крупным статьям", score: 1 },
      { id: "q3_a3", text: "Да, полная матрица", score: 2 },
    ],
  },
  {
    id: "q4", block: 1, block_title: BLOCKS[1].title,
    text: "Пересматриваете ли вы оргструктуру при изменении бизнес-модели?",
    options: [
      { id: "q4_a1", text: "Нет, структура не менялась годами", score: 0 },
      { id: "q4_a2", text: "Изредка, по факту проблем", score: 1 },
      { id: "q4_a3", text: "Да, регулярный аудит структуры", score: 2 },
    ],
  },

  // Блок 2 — Данные, max 9 (3 вопроса × до 3)
  {
    id: "q5", block: 2, block_title: BLOCKS[2].title,
    text: "Источник управленческих данных для бюджета:",
    options: [
      { id: "q5_a1", text: "Только 1С/бухгалтерия задним числом", score: 0 },
      { id: "q5_a2", text: "Excel-выгрузки руками", score: 1 },
      { id: "q5_a3", text: "Полу-автоматический сбор из систем", score: 2 },
      { id: "q5_a4", text: "Единое хранилище (DWH/BI)", score: 3 },
    ],
  },
  {
    id: "q6", block: 2, block_title: BLOCKS[2].title,
    text: "Скорость закрытия управленческого периода:",
    options: [
      { id: "q6_a1", text: "Более 30 дней или не закрываем", score: 0 },
      { id: "q6_a2", text: "15–30 дней", score: 1 },
      { id: "q6_a3", text: "5–15 дней", score: 2 },
      { id: "q6_a4", text: "До 5 дней", score: 3 },
    ],
  },
  {
    id: "q7", block: 2, block_title: BLOCKS[2].title,
    text: "Качество данных (сверка, дубли, классификаторы):",
    options: [
      { id: "q7_a1", text: "Регулярные расхождения, доверия нет", score: 0 },
      { id: "q7_a2", text: "Есть проблемы, чиним вручную", score: 1 },
      { id: "q7_a3", text: "Сверка налажена, ошибки редки", score: 2 },
      { id: "q7_a4", text: "Контроль качества автоматизирован", score: 3 },
    ],
  },

  // Блок 3 — Методика, max 10 (4 вопроса × до 2-3)
  {
    id: "q8", block: 3, block_title: BLOCKS[3].title,
    text: "Бюджет строится на драйверах (натуральных показателях) или «от прошлого года»?",
    options: [
      { id: "q8_a1", text: "От прошлого года ± %", score: 0 },
      { id: "q8_a2", text: "Смешанный подход", score: 1 },
      { id: "q8_a3", text: "На драйверах: цена×объём, конверсии и т.д.", score: 3 },
    ],
  },
  {
    id: "q9", block: 3, block_title: BLOCKS[3].title,
    text: "Есть ли сценарное планирование (база/оптимистичный/пессимистичный)?",
    options: [
      { id: "q9_a1", text: "Нет, один сценарий", score: 0 },
      { id: "q9_a2", text: "Только в голове руководителя", score: 1 },
      { id: "q9_a3", text: "Да, 2–3 проработанных сценария", score: 3 },
    ],
  },
  {
    id: "q10", block: 3, block_title: BLOCKS[3].title,
    text: "Учитываются ли постоянные/переменные расходы отдельно?",
    options: [
      { id: "q10_a1", text: "Нет, всё одной кучей", score: 0 },
      { id: "q10_a2", text: "Только частично", score: 1 },
      { id: "q10_a3", text: "Да, маржинальная модель", score: 2 },
    ],
  },
  {
    id: "q11", block: 3, block_title: BLOCKS[3].title,
    text: "Есть ли модель cash flow (платёжный календарь, прогноз ДДС)?",
    options: [
      { id: "q11_a1", text: "Нет", score: 0 },
      { id: "q11_a2", text: "Календарь на 1–2 недели вперёд", score: 1 },
      { id: "q11_a3", text: "Прогноз ДДС на 3–12 месяцев", score: 2 },
    ],
  },

  // Блок 4 — Процесс, max 6 (3 × до 2)
  {
    id: "q12", block: 4, block_title: BLOCKS[4].title,
    text: "Регламент бюджетирования (сроки, ответственные, форматы):",
    options: [
      { id: "q12_a1", text: "Регламента нет", score: 0 },
      { id: "q12_a2", text: "Есть на словах", score: 1 },
      { id: "q12_a3", text: "Документ + календарь, все знают", score: 2 },
    ],
  },
  {
    id: "q13", block: 4, block_title: BLOCKS[4].title,
    text: "Бюджетный комитет / регулярные встречи по бюджету:",
    options: [
      { id: "q13_a1", text: "Не проводятся", score: 0 },
      { id: "q13_a2", text: "Эпизодически", score: 1 },
      { id: "q13_a3", text: "Раз в месяц/квартал по графику", score: 2 },
    ],
  },
  {
    id: "q14", block: 4, block_title: BLOCKS[4].title,
    text: "Связь бюджета с мотивацией сотрудников:",
    options: [
      { id: "q14_a1", text: "Нет связи", score: 0 },
      { id: "q14_a2", text: "Только у топ-менеджмента", score: 1 },
      { id: "q14_a3", text: "У всех ЦФО — KPI и бонусы", score: 2 },
    ],
  },

  // Блок 5 — Точность, max 9 (4 × до 2-3)
  {
    id: "q15", block: 5, block_title: BLOCKS[5].title,
    text: "Сравниваете ли план/факт регулярно?",
    options: [
      { id: "q15_a1", text: "Нет", score: 0 },
      { id: "q15_a2", text: "Раз в квартал/год", score: 1 },
      { id: "q15_a3", text: "Каждый месяц с разбором", score: 2 },
    ],
  },
  {
    id: "q16", block: 5, block_title: BLOCKS[5].title,
    text: "Какова типичная ошибка прогноза по выручке за год?",
    options: [
      { id: "q16_a1", text: "Не считали / более 25%", score: 0 },
      { id: "q16_a2", text: "10–25%", score: 1 },
      { id: "q16_a3", text: "5–10%", score: 2 },
      { id: "q16_a4", text: "Менее 5%", score: 3 },
    ],
  },
  {
    id: "q17", block: 5, block_title: BLOCKS[5].title,
    text: "Анализируете причины отклонений (variance analysis)?",
    options: [
      { id: "q17_a1", text: "Нет", score: 0 },
      { id: "q17_a2", text: "По крупным отклонениям", score: 1 },
      { id: "q17_a3", text: "Да, по всем статьям с гипотезами", score: 2 },
    ],
  },
  {
    id: "q18", block: 5, block_title: BLOCKS[5].title,
    text: "Используете rolling forecast (скользящий прогноз)?",
    options: [
      { id: "q18_a1", text: "Нет, только годовой бюджет", score: 0 },
      { id: "q18_a2", text: "Корректируем раз в квартал", score: 1 },
      { id: "q18_a3", text: "Да, ежемесячный rolling 12 мес.", score: 2 },
    ],
  },
];

export type LevelInfo = {
  level: 0 | 1 | 2 | 3 | 4;
  name: string;
  range: string;
  bg: string;
  fg: string;
  description: string;
  cta_text: string;
  gap: number; // доля годовой ЧП
};

export const LEVELS: LevelInfo[] = [
  {
    level: 0, name: "Хаос", range: "0–20%",
    bg: "#FFCDD2", fg: "#7A1F1F",
    description:
      "Бюджета как инструмента нет. Решения принимаются на ощущениях, итог месяца — каждый раз сюрприз.",
    cta_text:
      "Вы в зоне максимальной неэффективности. На эфире покажу 10 шагов, которые превратят таблицу в реальный инструмент управления прибылью.",
    gap: 0.25,
  },
  {
    level: 1, name: "Формальный бюджет", range: "21–40%",
    bg: "#FFE0B2", fg: "#7A4A12",
    description:
      "Бюджет есть «на бумаге», но живёт отдельно от управленческих решений. План/факт смотрят редко, выводов почти нет.",
    cta_text:
      "Бюджет у вас формальный. На эфире разберём, как сделать его рабочим: ЦФО, драйверы и регулярный разбор отклонений.",
    gap: 0.175,
  },
  {
    level: 2, name: "Управленческий учёт", range: "41–60%",
    bg: "#FFF9C4", fg: "#6E5B12",
    description:
      "Учёт по ЦФО налажен, план/факт смотрите. Но методика плоская: «от прошлого года», без сценариев и драйверов.",
    cta_text:
      "Вы в зоне неэффективности — теряете 12,5% ЧП на «слепых зонах». На эфире — переход к драйверной модели и сценариям.",
    gap: 0.125,
  },
  {
    level: 3, name: "Драйверный бюджет", range: "61–80%",
    bg: "#C8E6C9", fg: "#1F5F2A",
    description:
      "Бюджет — на драйверах, со сценариями. Регулярный разбор и связь с мотивацией. Хороший уровень с потенциалом роста.",
    cta_text:
      "Хороший уровень. На эфире — как добить точность до living budget: rolling forecast и DBB на практике.",
    gap: 0.075,
  },
  {
    level: 4, name: "Living budget", range: "81–100%",
    bg: "#B2DFDB", fg: "#11514C",
    description:
      "Driver-Based Budgeting + Rolling Forecast в живой модели. Бюджет = инструмент управления, а не отчётность.",
    cta_text:
      "У вас зрелый бюджет. На эфире — кейсы и приёмы, которые поднимают точность даже у сильных команд.",
    gap: 0.035,
  },
];

export const RECOMMENDATIONS: Record<number, { title: string; text: string }> = {
  1: {
    title: "Блок «Финансовая структура (ЦФО)»",
    text: "У вас нет формальной финансовой структуры или руководители не отвечают за свои показатели. Начните с матрицы ЦФО и закрепите ответственность за статьи доходов/расходов.",
  },
  2: {
    title: "Блок «Данные»",
    text: "Данные собираются медленно или не вызывают доверия. Сократите срок закрытия периода, наладьте сверку и единый классификатор статей.",
  },
  3: {
    title: "Блок «Методика»",
    text: "Бюджет строится «от прошлого года». Перейдите на драйверы (цена × объём, конверсии, ставки) и заведите 2–3 сценария.",
  },
  4: {
    title: "Блок «Процесс»",
    text: "Нет регламента и регулярного бюджетного комитета. Опишите цикл планирования и привяжите бюджет к мотивации ЦФО.",
  },
  5: {
    title: "Блок «Точность»",
    text: "Слабый план/факт-анализ. Разбирайте отклонения ежемесячно и внедрите rolling forecast на 12 месяцев вперёд.",
  },
};

export function pickLevel(totalPercent: number): 0 | 1 | 2 | 3 | 4 {
  if (totalPercent <= 20) return 0;
  if (totalPercent <= 40) return 1;
  if (totalPercent <= 60) return 2;
  if (totalPercent <= 80) return 3;
  return 4;
}

export type Result = {
  total_score: number;
  total_percent: number;
  level: 0 | 1 | 2 | 3 | 4;
  level_name: string;
  block_scores: Record<number, { score: number; max: number; percent: number }>;
  weak_blocks: number[];
  money_loss_percent_of_np: number;
};

export function computeResult(answers: Record<string, string>): Result {
  const blockScores: Record<number, { score: number; max: number; percent: number }> = {};
  for (const b of [1, 2, 3, 4, 5]) {
    blockScores[b] = { score: 0, max: BLOCKS[b].max, percent: 0 };
  }
  for (const [qId, optId] of Object.entries(answers)) {
    const q = QUESTIONS.find((x) => x.id === qId);
    if (!q) continue;
    const opt = q.options.find((o) => o.id === optId);
    if (!opt) continue;
    blockScores[q.block].score += opt.score;
  }
  let total = 0;
  for (const b of [1, 2, 3, 4, 5]) {
    blockScores[b].percent = (blockScores[b].score / blockScores[b].max) * 100;
    total += blockScores[b].score;
  }
  const totalPercent = (total / TOTAL_MAX) * 100;
  const level = pickLevel(totalPercent);
  const weak = [1, 2, 3, 4, 5]
    .map((b) => ({ b, p: blockScores[b].percent }))
    .sort((a, b) => a.p - b.p || a.b - b.b)
    .slice(0, 3)
    .map((x) => x.b);
  return {
    total_score: total,
    total_percent: Math.round(totalPercent * 10) / 10,
    level,
    level_name: LEVELS[level].name,
    block_scores: blockScores,
    weak_blocks: weak,
    money_loss_percent_of_np: LEVELS[level].gap * 100,
  };
}
