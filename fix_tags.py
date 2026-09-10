import codecs

with codecs.open('src/components/BottomBanners.tsx', 'r', 'utf-8') as f:
    content = f.read()

# I will find "{/* FLYER MODAL */}" and prepend "        </div>\n      </div>\n"
content = content.replace("{/* FLYER MODAL */}", "        </div>\n      </div>\n\n      {/* FLYER MODAL */}")

with codecs.open('src/components/BottomBanners.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Tags fixed")
