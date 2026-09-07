import re

with open('src/pages/Events.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix the bullet symbol
content = content.replace("split('?')[0]", "split('•')[0]")
content = content.replace("split('?')[0]", "split('•')[0]")

# 2. Fix the corrupted location emoji
content = content.replace('dY"?', '📍')
content = content.replace('??', '📍')

# 3. Replace the dark Date Art banner with the light theme
dark_banner = """                      /* Card Tanpa Gambar (Date Art) */
                      <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-br from-[#2E1B0A] via-[#241508] to-[#171717] p-5 flex flex-col justify-between text-white relative overflow-hidden shadow-inner border border-white/5">
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#8E7015]/20 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex items-center justify-start text-xs relative z-10 w-full">
                          <span className="bg-white/10 px-3 py-1 rounded-xl border border-white/10 font-bold text-[#C5A038] text-[11px]">
                            {categoryBadge}
                          </span>
                        </div>

                        <div className="space-y-0.5 my-auto text-center relative z-10 py-1 w-full">
                          {topDate && (
                            <span className="text-[11px] font-bold tracking-widest text-[#C5A038] uppercase block">
                              {topDate}
                            </span>
                          )}
                          <span className=\\ font-black text-white leading-none block py-1 drop-shadow\}>
                            {mainDate}
                          </span>
                          <span className="text-[11px] text-stone-300 font-light block">
                            {timeText || ev.time || 'Pk 18.00 WIB'}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-start text-[11px] text-stone-300 relative z-10 w-full">
                          <span className="flex items-center gap-1.5 truncate max-w-full">
                            <span className="text-[#e11d48]">📍</span>
                            <span className="truncate">{ev.location}</span>
                          </span>
                        </div>
                      </div>"""

light_banner = """                      /* Card Tanpa Gambar (Date Art Light Theme) */
                      <div className="w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-br from-[#FDFBF7] via-[#F8F5EE] to-[#F0EBE0] p-5 flex flex-col justify-between text-[#2E1B0A] relative overflow-hidden shadow-inner border border-[#8E7015]/15">
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#8E7015]/10 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex items-center justify-start text-xs relative z-10 w-full">
                          <span className="bg-white/60 px-3 py-1 rounded-xl border border-[#8E7015]/20 font-bold text-[#8E7015] text-[11px] shadow-sm">
                            {categoryBadge}
                          </span>
                        </div>

                        <div className="space-y-0.5 my-auto text-center relative z-10 py-1 w-full">
                          {topDate && (
                            <span className="text-[11px] font-bold tracking-widest text-[#A98721] uppercase block">
                              {topDate}
                            </span>
                          )}
                          <span className=\\ font-black text-[#2E1B0A] leading-none block py-1 drop-shadow-sm\}>
                            {mainDate}
                          </span>
                          <span className="text-[11px] text-stone-500 font-medium block">
                            {timeText || ev.time || 'Pk 18.00 WIB'}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-[#8E7015]/10 flex items-center justify-start text-[11px] text-stone-600 relative z-10 w-full">
                          <span className="flex items-center gap-1.5 truncate max-w-full">
                            <span className="text-[#e11d48]">📍</span>
                            <span className="truncate">{ev.location}</span>
                          </span>
                        </div>
                      </div>"""

content = content.replace(dark_banner, light_banner)

with open('src/pages/Events.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
