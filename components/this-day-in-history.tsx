"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Sparkles } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

const historicalEvents = [
  { month: 1, day: 12, year: 1964, event: "The Zanzibar Revolution overthrew the Sultan and established a republic.", region: "East Africa" },
  { month: 2, day: 18, year: 1965, event: "The Gambia gained independence from the United Kingdom.", region: "West Africa" },
  { month: 3, day: 6, year: 1957, event: "Ghana became the first sub-Saharan African country to gain independence.", region: "West Africa" },
  { month: 3, day: 21, year: 1960, event: "The Sharpeville massacre in South Africa killed 69 anti-apartheid protesters.", region: "Southern Africa" },
  { month: 4, day: 27, year: 1961, event: "Sierra Leone gained independence from Britain.", region: "West Africa" },
  { month: 5, day: 25, year: 1963, event: "The Organisation of African Unity (OAU) was founded in Addis Ababa.", region: "Pan-Africa" },
  { month: 6, day: 30, year: 1960, event: "The Congo gained independence from Belgium, sparking the Congo Crisis.", region: "Central Africa" },
  { month: 7, day: 1, year: 1962, event: "Rwanda and Burundi gained independence from Belgium.", region: "East Africa" },
  { month: 7, day: 26, year: 1847, event: "Liberia declared independence, making it Africa's first modern republic.", region: "West Africa" },
  { month: 8, day: 7, year: 1960, event: "Cote d'Ivoire gained independence from France.", region: "West Africa" },
  { month: 9, day: 12, year: 1974, event: "Emperor Haile Selassie of Ethiopia was deposed by the Derg military committee.", region: "East Africa" },
  { month: 10, day: 1, year: 1960, event: "Nigeria gained independence from Britain, becoming Africa's most populous nation.", region: "West Africa" },
  { month: 11, day: 1, year: 1954, event: "The Algerian War of Independence began against French colonial rule.", region: "North Africa" },
  { month: 12, day: 12, year: 1963, event: "Kenya gained independence from Britain with Jomo Kenyatta as prime minister.", region: "East Africa" },
  { month: 1, day: 1, year: 1960, event: "Cameroon became the first country to gain independence in the Year of Africa.", region: "Central Africa" },
  { month: 2, day: 4, year: 1899, event: "The Philippine-American War began, a precursor to anti-colonial movements worldwide.", region: "Global" },
  { month: 6, day: 28, year: 1914, event: "Archduke Franz Ferdinand assassinated in Sarajevo, triggering World War I.", region: "Europe/Global" },
  { month: 11, day: 11, year: 1918, event: "World War I ended. Over 2 million Africans had served in the conflict.", region: "Global" },
  { month: 9, day: 1, year: 1939, event: "World War II began. African colonies were once again drawn into global conflict.", region: "Global" },
  { month: 5, day: 8, year: 1945, event: "VE Day marked the end of WWII in Europe. African soldiers returned as veterans.", region: "Global" },
  { month: 1, day: 10, year: 1920, event: "The League of Nations was established, though it largely ignored African self-determination.", region: "Global" },
  { month: 10, day: 3, year: 1935, event: "Italy invaded Ethiopia, exposing the League of Nations' inability to protect smaller nations.", region: "East Africa" },
  { month: 4, day: 18, year: 1955, event: "The Bandung Conference united Asian and African nations in anti-colonial solidarity.", region: "Global" },
  { month: 8, day: 15, year: 1960, event: "Republic of the Congo (Brazzaville) gained independence from France.", region: "Central Africa" },
];

export default function ThisDayInHistory() {
  const todayEvent = useMemo(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const exactMatch = historicalEvents.find(
      (e) => e.month === month && e.day === day
    );
    if (exactMatch) return exactMatch;

    const closeMatch = historicalEvents.find(
      (e) => e.month === month && Math.abs(e.day - day) <= 3
    );
    if (closeMatch) return closeMatch;

    const monthMatch = historicalEvents.find((e) => e.month === month);
    if (monthMatch) return monthMatch;

    return historicalEvents[Math.floor(Math.random() * historicalEvents.length)];
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative bg-ink rounded-3xl p-8 md:p-12 overflow-hidden group cursor-default"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-gold/10" />
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CalendarDays className="w-32 h-32 text-gold" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-gold text-xs uppercase tracking-[0.3em] font-bold">
                  This Day in History
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-baby text-4xl md:text-5xl font-bold text-gold">
                  {monthNames[todayEvent.month - 1]} {todayEvent.day}
                </span>
                <span className="font-baby text-2xl text-cream/60">
                  {todayEvent.year}
                </span>
              </div>

              <p className="font-serif text-lg md:text-xl text-cream/90 leading-relaxed mb-4 max-w-2xl text-pretty">
                {todayEvent.event}
              </p>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-accent/30 text-accent-light text-xs font-bold rounded-full">
                  {todayEvent.region}
                </span>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
