import codecs

with codecs.open('src/components/BottomBanners.tsx', 'r', 'utf-8') as f:
    content = f.read()

header = """
    <div id="giving" className="bg-[#FBF9F5] py-16 sm:py-20 px-4 sm:px-[5%] border-t border-stone-200">
      <div data-aos="fade-up" className="max-w-[1200px] mx-auto">
        
        {/* Section Header: Titles on Left */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight uppercase">
              Persembahan
            </h2>
            <div className="text-stone-600 text-xs sm:text-sm mt-3 max-w-3xl italic leading-relaxed">
              <p className="mb-1">"Camkanlah ini: Orang yang menabur sedikit, akan menuai sedikit juga, dan orang yang menabur banyak, akan menuai banyak juga. Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan..."</p>
              <p className="text-[#8E7015] font-bold not-italic mt-2">— 2 Korintus 9:6-7</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
"""
content = content.replace('    <div id="giving" className="bg-[#FBF9F5] py-16 px-4 sm:px-[5%] border-t border-stone-200">\n      <div data-aos="fade-up" className="max-w-[1200px] mx-auto">\n        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">', header)

flyer_removal = """              <div className="animate-fade-in-up flex flex-col items-center">
                <div className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-stone-200 mb-8 bg-stone-50">"""
original_flyer = """              <div className="animate-fade-in-up flex flex-col items-center">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-extrabold text-[#171717] tracking-tight uppercase mb-4">Persembahan</h2>
                  <p className="text-stone-500 max-w-2xl mx-auto italic leading-relaxed">
                    "Camkanlah ini: Orang yang menabur sedikit, akan menuai sedikit juga, dan orang yang menabur banyak, akan menuai banyak juga. Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan..."
                  </p>
                  <p className="text-[#8E7015] font-bold text-sm mt-3">— 2 Korintus 9:6-7</p>
                </div>
                <div className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-stone-200 mb-8 bg-stone-50">"""
content = content.replace(original_flyer, flyer_removal)

with codecs.open('src/components/BottomBanners.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("BottomBanners updated")
