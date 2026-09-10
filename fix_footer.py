import codecs

with codecs.open('src/components/Footer.tsx', 'r', 'utf-8') as f:
    content = f.read()

replacement = """
        {/* Social Media & Yayasan */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-6 items-center">
"""
content = content.replace('        {/* Social Media Icons */}\n        <div className="flex gap-6 items-center">', replacement)

replacement_end = """          </a>
          </div>
          
          <div className="mt-2 h-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center px-4 py-2 hover:bg-white/20 transition-colors">
            <img src="/Logo Yayasan-Main.png" alt="Yayasan Rumah Pemulihan dan Pengajaran" className="h-full w-auto object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
"""
# The original end was:
#           </a>
#         </div>
#       </div>

content = content.replace("""          </a>\n        </div>\n      </div>""", replacement_end)


with codecs.open('src/components/Footer.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Footer updated")
