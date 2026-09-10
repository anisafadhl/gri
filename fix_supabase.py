import codecs

with codecs.open('src/lib/supabase.ts', 'r', 'utf-8') as f:
    content = f.read()

fallback_addition = """  sermon_speaker: 'Ps. Besron Jusup Roni Marpaung',
  sermon_youtube_id: '3aEH4-tlua8',
  giving_flyer: '/giving.png',
  giving_acc1_name: 'GRI Zion Filadelfia',
  giving_acc1_bank: 'BCA',
  giving_acc1_number: '1234567890',
  giving_acc1_qr: '',
  giving_acc2_name: 'Besron Jusup Roni Martuaung',
  giving_acc2_bank: 'BCA',
  giving_acc2_number: '0987654321',
  giving_acc2_qr: ''
};"""

content = content.replace("  sermon_speaker: 'Ps. Besron Jusup Roni Marpaung',\n  sermon_youtube_id: '3aEH4-tlua8'\n};", fallback_addition)

with codecs.open('src/lib/supabase.ts', 'w', 'utf-8') as f:
    f.write(content)

print("supabase.ts updated")
