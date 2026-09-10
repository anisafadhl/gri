import codecs
import re

with codecs.open('src/pages/Admin.tsx', 'r', 'utf-8') as f:
    content = f.read()

# 1. Add Heart to lucide-react imports
content = content.replace("Settings, Calendar, AlertCircle, X, CheckCircle, Image as ImageIcon, Upload } from 'lucide-react';", "Settings, Calendar, AlertCircle, X, CheckCircle, Image as ImageIcon, Upload, Heart } from 'lucide-react';")

# 2. Update activeTab state type
content = content.replace("const [activeTab, setActiveTab] = useState<'settings' | 'events'>('settings');", "const [activeTab, setActiveTab] = useState<'settings' | 'events' | 'giving'>('settings');")

# 3. Add generic image upload handler inside the component
handler_code = """
  const handleGivingImageUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isSupabaseConfigured && supabase) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${key}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const { error } = await supabase.storage.from('events').upload(fileName, file);
        if (error) {
          showToast(`Gagal mengunggah gambar.`, 'error');
        } else {
          const { data } = supabase.storage.from('events').getPublicUrl(fileName);
          handleSettingChange(key, data.publicUrl);
        }
      } catch (error) {
        showToast('Terjadi kesalahan.', 'error');
      }
    } else {
      handleSettingChange(key, URL.createObjectURL(file));
      showToast('Gambar diubah (Preview Lokal)', 'success');
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
"""
content = content.replace("  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {", handler_code)


# 4. Add the tab button
tab_button = """
              <button
                onClick={() => setActiveTab('events')}
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-semibold transition-colors ${
                  activeTab === 'events' ? 'bg-gold/5 text-gold border-b-2 border-gold' : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                <Calendar className="w-5 h-5" />
                Agenda Kegiatan
              </button>
              <button
                onClick={() => setActiveTab('giving')}
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-semibold transition-colors ${
                  activeTab === 'giving' ? 'bg-gold/5 text-gold border-b-2 border-gold' : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                <Heart className="w-5 h-5" />
                Persembahan
              </button>
"""
content = re.sub(r'<\s*button[^>]*onClick=\{\(\)\s*=>\s*setActiveTab\(\'events\'\)\}[^>]*>[\s\S]*?Agenda Kegiatan\s*</button>', tab_button.strip(), content)

# 5. Add the giving tab content below events tab
giving_tab_content = """
              {activeTab === 'giving' && (
                <div className="space-y-10">
                  <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
                    <h3 className="font-bold text-lg text-neutral-900 mb-4 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gold rounded-full"></span>
                      Flyer Persembahan
                    </h3>
                    <div className="flex items-start gap-6">
                      {settings.giving_flyer && (
                        <div className="w-32 h-40 bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden shrink-0">
                          <img src={settings.giving_flyer} alt="Flyer" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border-2 border-dashed border-neutral-300 rounded-xl hover:border-gold hover:bg-gold/5 transition-colors cursor-pointer text-sm font-semibold text-neutral-600">
                          <Upload className="w-4 h-4" />
                          Unggah Flyer Persembahan
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleGivingImageUpload('giving_flyer', e)} />
                        </label>
                        <p className="text-xs text-neutral-500 mt-2">Format yang didukung: JPG, PNG, WEBP. Ukuran file sebaiknya di bawah 2MB.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Rekening 1 */}
                    <div className="space-y-5 bg-neutral-50 p-5 rounded-xl border border-neutral-100">
                      <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2 border-b border-neutral-200 pb-3">
                        Rekening 1 (Operasional)
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Atas Nama</label>
                        <input type="text" value={settings.giving_acc1_name || ''} onChange={(e) => handleSettingChange('giving_acc1_name', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="GRI Zion Filadelfia" />
                      </div>
                      <div className="flex gap-4">
                        <div className="w-1/3">
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Bank</label>
                          <input type="text" value={settings.giving_acc1_bank || ''} onChange={(e) => handleSettingChange('giving_acc1_bank', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="BCA" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">No. Rekening</label>
                          <input type="text" value={settings.giving_acc1_number || ''} onChange={(e) => handleSettingChange('giving_acc1_number', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="123456789" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">QRIS Rekening 1 (Opsional)</label>
                        <div className="flex items-center gap-4">
                          {settings.giving_acc1_qr && (
                            <img src={settings.giving_acc1_qr} alt="QR 1" className="w-16 h-16 object-contain bg-white rounded border border-neutral-200" />
                          )}
                          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-neutral-300 rounded-lg hover:border-gold hover:bg-gold/5 cursor-pointer text-sm font-semibold text-neutral-600">
                            <Upload className="w-4 h-4" /> Unggah QR
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleGivingImageUpload('giving_acc1_qr', e)} />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Rekening 2 */}
                    <div className="space-y-5 bg-neutral-50 p-5 rounded-xl border border-neutral-100">
                      <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2 border-b border-neutral-200 pb-3">
                        Rekening 2 (Syukur)
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Atas Nama</label>
                        <input type="text" value={settings.giving_acc2_name || ''} onChange={(e) => handleSettingChange('giving_acc2_name', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="Besron Jusup Roni M" />
                      </div>
                      <div className="flex gap-4">
                        <div className="w-1/3">
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Bank</label>
                          <input type="text" value={settings.giving_acc2_bank || ''} onChange={(e) => handleSettingChange('giving_acc2_bank', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="BCA" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">No. Rekening</label>
                          <input type="text" value={settings.giving_acc2_number || ''} onChange={(e) => handleSettingChange('giving_acc2_number', e.target.value)} className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold" placeholder="098765432" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">QRIS Rekening 2 (Opsional)</label>
                        <div className="flex items-center gap-4">
                          {settings.giving_acc2_qr && (
                            <img src={settings.giving_acc2_qr} alt="QR 2" className="w-16 h-16 object-contain bg-white rounded border border-neutral-200" />
                          )}
                          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-dashed border-neutral-300 rounded-lg hover:border-gold hover:bg-gold/5 cursor-pointer text-sm font-semibold text-neutral-600">
                            <Upload className="w-4 h-4" /> Unggah QR
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleGivingImageUpload('giving_acc2_qr', e)} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-neutral-100">
                    <button onClick={saveSettings} disabled={savingSettings} className="flex items-center gap-2 px-8 py-3 bg-neutral-900 hover:bg-gold text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-md">
                      <Save className="w-5 h-5" />
                      {savingSettings ? 'Menyimpan...' : 'Simpan Pengaturan Persembahan'}
                    </button>
                  </div>
                </div>
              )}

              {/* MODAL TAMBAH/EDIT EVENT */}
"""
content = content.replace("{/* MODAL TAMBAH/EDIT EVENT */}", giving_tab_content.strip())

with codecs.open('src/pages/Admin.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Admin.tsx updated with Giving tab")
