import codecs

with codecs.open('src/components/Navbar.tsx', 'r', 'utf-8') as f:
    content = f.read()

replacement = """
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Yayasan Pill Tag */}
          <Link
            to="/yayasan"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600/40 to-amber-800/40 hover:from-amber-500/60 hover:to-amber-700/60 backdrop-blur-md border border-amber-200/30 pl-1.5 pr-4 py-1.5 rounded-full transition-all duration-300 no-underline shadow-sm group"
          >
            <div className="bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 overflow-hidden p-1">
               <img src="/Logo Yayasan-Main.png" alt="Yayasan" className="h-full w-auto object-contain" />
            </div>
            <span className="text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase drop-shadow-sm flex flex-col leading-tight">
              <span>Yayasan</span>
              <span className="hidden sm:block text-[8px] text-amber-200 font-medium">Rumah Pemulihan & Pengajaran</span>
            </span>
          </Link>

          {/* Hamburger / Close Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            className="w-11 h-11 flex items-center justify-center text-white hover:text-amber-200 transition-colors duration-300 bg-transparent border-0 cursor-pointer focus:outline-none drop-shadow-md"
          >
            {isOpen ? (
              <X className="w-8 h-8 transition-transform duration-300 rotate-0 hover:scale-110" />
            ) : (
              <Menu className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
            )}
          </button>
        </div>
      </nav>
"""

content = content.replace("""        {/* Hamburger / Close Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          className="w-11 h-11 flex items-center justify-center text-white hover:text-amber-200 transition-colors duration-300 bg-transparent border-0 cursor-pointer focus:outline-none drop-shadow-md"
        >
          {isOpen ? (
            <X className="w-8 h-8 transition-transform duration-300 rotate-0 hover:scale-110" />
          ) : (
            <Menu className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
          )}
        </button>
      </nav>""", replacement.strip())

# Make the title smaller on mobile to accommodate the pill
content = content.replace('<span className="text-white drop-shadow-md font-bold tracking-widest text-2xl">', '<span className="text-white drop-shadow-md font-bold tracking-widest text-lg sm:text-2xl hidden sm:block md:hidden lg:block">')
# Actually, hiding it completely on mobile might be better if the logo handles it, or just use smaller text
content = content.replace('<span className="text-white drop-shadow-md font-bold tracking-widest text-lg sm:text-2xl hidden sm:block md:hidden lg:block">', '<span className="text-white drop-shadow-md font-bold tracking-widest text-xl hidden md:block">')

# But maybe the icon itself is enough on small screens, let's just do `hidden md:block`.
# I'll just change the original text line
content = content.replace('<span className="text-white drop-shadow-md font-bold tracking-widest text-2xl">\n            GRI Zion Filadelfia\n          </span>', '<span className="text-white drop-shadow-md font-bold tracking-widest text-xl lg:text-2xl hidden md:block">\n            GRI Zion Filadelfia\n          </span>')


with codecs.open('src/components/Navbar.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Navbar updated")
