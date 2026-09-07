const fs = require('fs');

let content = fs.readFileSync('src/pages/Events.tsx', 'utf8');

// 1. Add loading state to Events
content = content.replace(
  "  const [events, setEvents] = useState<EventItem[]>(DEFAULT_EVENTS);",
  "  const [events, setEvents] = useState<EventItem[]>([]);\n  const [loading, setLoading] = useState<boolean>(true);"
);

// 2. Update useEffect to use loading
content = content.replace(
  /  useEffect\(\(\) => \{\n    const fetchEventsList = async \(\) => \{[\s\S]*?    fetchEventsList\(\);\n  \}, \[\]\);/,
  \  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        const data = await getEvents();
        setEvents(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsList();
  }, []);\
);

// 3. Update rendering to show loading
content = content.replace(
  "        {/* Scroll Container (Snap, Horizontal, No Auto-Scroll, Clean) */}",
  \        {loading ? (
          <div className="min-h-[460px] flex items-center justify-center text-stone-500 font-sans">
            Memuat daftar agenda...
          </div>
        ) : events.length === 0 ? (
          <div className="min-h-[460px] flex items-center justify-center text-stone-500 font-sans">
            Belum ada agenda kegiatan.
          </div>
        ) : (
          {/* Scroll Container (Snap, Horizontal, No Auto-Scroll, Clean) */}\
);

// 4. Close the ternary for loading at the end of the scroll container
content = content.replace(
  "          })}\n        </div>\n      </section>",
  "          })}\n        </div>\n        )}\n      </section>"
);

// 5. Replace dark banner with light banner
content = content.replace(
  /<div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-br from-\\[#2E1B0A\\] via-\\[#241508\\] to-\\[#171717\\][\\s\\S]*?<\\/div>\\s*<\\/div>\\s*\\)\\}/,
  \<div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-br from-[#FDFBF7] via-[#F8F5EE] to-[#F0EBE0] p-5 flex flex-col justify-between text-[#2E1B0A] relative overflow-hidden shadow-inner border border-[#8E7015]/15">
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#8E7015]/10 rounded-full blur-2xl pointer-events-none" />

                        {/* Top: Category badge */}
                        <div className="flex items-center justify-start text-xs relative z-10 w-full">
                          <span className="bg-white/60 px-3 py-1 rounded-xl border border-[#8E7015]/20 font-bold text-[#8E7015] text-[11px] shadow-sm">
                            {categoryBadge}
                          </span>
                        </div>

                        {/* Center: Month Year + Huge Day Number + Time */}
                        <div className="space-y-0.5 my-auto text-center relative z-10 py-1 w-full">
                          {topDate && (
                            <span className="text-[11px] font-bold tracking-widest text-[#A98721] uppercase block">
                              {topDate}
                            </span>
                          )}
                          <span className="\\\ font-black text-[#2E1B0A] leading-none block py-1 drop-shadow-sm">
                            {mainDate}
                          </span>
                          <span className="text-[11px] text-stone-500 font-medium block">
                            {timeText || ev.time || 'Pk 18.00 WIB'}
                          </span>
                        </div>

                        {/* Bottom: Location */}
                        <div className="pt-3 border-t border-[#8E7015]/10 flex items-center justify-start text-[11px] text-stone-600 relative z-10 w-full">
                          <span className="flex items-center gap-1.5 truncate max-w-full">
                            <span className="text-[#e11d48]">📍</span>
                            <span className="truncate">{ev.location}</span>
                          </span>
                        </div>
                      </div>
                    )}\
);

// 6. Remove DEFAULT_EVENTS definition
content = content.replace(
  /const DEFAULT_EVENTS: EventItem\\[\\] = \\[[\\s\\S]*?\\];\\n\\nexport const Events/,
  "export const Events"
);

// 7. Remove Footer
content = content.replace(
  /      \\{\\}\\n      <footer[\\s\\S]*?<\\/footer>\\n/,
  ""
);

fs.writeFileSync('src/pages/Events.tsx', content, 'utf8');
console.log('Events.tsx fixed!');
