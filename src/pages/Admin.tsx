import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  supabase,
  signInAdmin, 
  signOutAdmin, 
  getSession, 
  isSupabaseConfigured,
  getSiteSettings,
  updateSiteSetting,
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent
} from '../lib/supabase';
import { LogOut, Save, Plus, Trash2, Edit2, Settings, Calendar, AlertCircle, X, CheckCircle, Image as ImageIcon, Upload, Heart } from 'lucide-react';

// Custom Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-8 right-8 z-[9999] flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 border ${
      type === 'success' ? 'bg-white border-green-200 text-green-800' : 'bg-white border-red-200 text-red-800'
    }`}>
      {type === 'success' ? <CheckCircle className="w-6 h-6 text-green-500" /> : <AlertCircle className="w-6 h-6 text-red-500" />}
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-2 text-neutral-400 hover:text-neutral-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'settings' | 'events' | 'giving'>('settings');
  const [settings, setSettings] = useState<any>({});
  const [events, setEvents] = useState<any[]>([]);
  const [savingSettings, setSavingSettings] = useState(false);
  
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<any>(null);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: '',
    dateStr: '',
    timeStr: '',
    category: 'Kegiatan Umum',
    location: '',
    description: '',
    image: '/event.png',
  });

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    const currentSession = await getSession();
    setSession(currentSession);
    if (currentSession) {
      loadData();
    }
    setLoading(false);
  };

  const loadData = async () => {
    const s = await getSiteSettings();
    setSettings(s);
    const e = await getEvents();
    setEvents(e);
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const { error } = await signInAdmin(email, password) as any;
    if (error) {
      setLoginError(error.message || 'Login gagal. Periksa kembali email & password.');
    } else {
      checkSession();
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setSession(null);
    navigate('/');
  };

  const handleSettingChange = (id: string, value: string) => {
    setSettings({ ...settings, [id]: value });
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    let hasError = false;
    for (const key in settings) {
      const res = await updateSiteSetting(key, settings[key]);
      if (res?.error) {
        hasError = true;
        console.error("Error saving", key, res.error);
      }
    }
    setSavingSettings(false);
    
    if (hasError) {
      showToast('Gagal menyimpan beberapa pengaturan. Cek hak akses DB.', 'error');
    } else {
      showToast('Pengaturan umum berhasil disimpan!');
    }
  };

  // Date Parsers
  const parseIndonesianToDateInput = (indoDateStr: string) => {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const parts = indoDateStr.split(' ');
    if (parts.length >= 3) {
       const d = parts[0].padStart(2, '0');
       const m = String(months.indexOf(parts[1]) + 1).padStart(2, '0');
       const y = parts[2];
       if (m !== '00') return `${y}-${m}-${d}`;
    }
    return '';
  };

  const formatDateToIndonesian = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const openAddEvent = () => {
    setEventToEdit(null);
    setEventForm({
      title: '',
      dateStr: '',
      timeStr: '',
      category: 'Kegiatan Umum',
      location: '',
      description: '',
      image: '',
    });
    setIsEventModalOpen(true);
  };

  const openEditEvent = (ev: any) => {
    setEventToEdit(ev.id);
    let d = '';
    let t = '';
    if (ev.date && ev.date.includes(' • ')) {
      const parts = ev.date.split(' • ');
      d = parseIndonesianToDateInput(parts[0]);
      t = parts[1].replace(' WIB', '');
    } else {
      d = parseIndonesianToDateInput(ev.date);
    }

    setEventForm({
      title: ev.title,
      dateStr: d,
      timeStr: t,
      category: ev.category,
      location: ev.location,
      description: ev.description,
      image: ev.image,
    });
    setIsEventModalOpen(true);
  };

  const confirmDeleteEvent = (id: string) => {
    setEventToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error } = await supabase.storage.from('events').upload(filePath, file);

        if (error) {
          console.error("Upload error: ", error);
          showToast('Gagal mengunggah gambar. Pastikan Bucket Storage "events" sudah dibuat.', 'error');
        } else {
          const { data } = supabase.storage.from('events').getPublicUrl(filePath);
          setEventForm({ ...eventForm, image: data.publicUrl });
        }
      } catch (err) {
        showToast('Terjadi kesalahan saat mengunggah.', 'error');
      }
    } else {
      // Local fallback using Base64 if no supabase
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEventForm({ ...eventForm, image: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }

    setUploadingImage(false);
  };


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

    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHeroImage(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `hero_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error } = await supabase.storage.from('events').upload(filePath, file);

        if (error) {
          console.error("Upload error: ", error);
          showToast('Gagal mengunggah gambar banner.', 'error');
        } else {
          const { data } = supabase.storage.from('events').getPublicUrl(filePath);
          setSettings({ ...settings, hero_image: data.publicUrl });
        }
      } catch (err) {
        showToast('Terjadi kesalahan saat mengunggah.', 'error');
      }
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSettings({ ...settings, hero_image: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    }

    setUploadingHeroImage(false);
  };

  const submitEventForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine Date and Time back to Indonesian string
    const indoDate = formatDateToIndonesian(eventForm.dateStr);
    const combinedDate = eventForm.timeStr ? `${indoDate} • ${eventForm.timeStr} WIB` : indoDate;

    const payload = {
      title: eventForm.title,
      date: combinedDate,
      category: eventForm.category,
      location: eventForm.location,
      description: eventForm.description,
      image: eventForm.image || ''
    };

    if (eventToEdit) {
      await updateEvent(eventToEdit, payload);
      showToast('Agenda berhasil diperbarui!');
    } else {
      await addEvent(payload);
      showToast('Agenda baru berhasil ditambahkan!');
    }

    setIsEventModalOpen(false);
    loadData();
  };

  const executeDeleteEvent = async () => {
    if (eventToDelete) {
      await deleteEvent(eventToDelete);
      showToast('Agenda berhasil dihapus!');
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
      loadData();
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-neutral-900 mb-2">Supabase Belum Dikonfigurasi</h2>
          <p className="text-neutral-600 mb-4">
            Fitur Admin Dashboard membutuhkan koneksi ke Supabase. Lengkapi <code className="bg-neutral-100 px-2 py-1 rounded text-red-600">.env</code>.
          </p>
          <button onClick={() => navigate('/')} className="text-gold font-semibold hover:underline">
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-neutral-100">Memuat...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-neutral-200 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-neutral-100">
               <img src="/Icon.png" alt="Logo" className="w-12 h-12" style={{ filter: 'brightness(0) sepia(1) hue-rotate(340deg) saturate(500%) brightness(0.4)' }} />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">Admin Login</h1>
            <p className="text-neutral-600 text-sm mt-2">Ruang kontrol pengurus website GRI</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Alamat Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
                placeholder="admin@gri.or.id"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Kata Sandi</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-neutral-900 hover:bg-gold text-white font-bold rounded-xl transition-colors shadow-md mt-4"
            >
              Masuk ke Dashboard
            </button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => navigate('/')} className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors">
              &larr; Kembali ke halaman utama
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 py-12 px-[5%]">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white shadow-sm border border-neutral-100 rounded-lg flex items-center justify-center">
              <img src="/Icon.png" alt="Logo" className="w-8 h-8" style={{ filter: 'brightness(0) sepia(1) hue-rotate(340deg) saturate(500%) brightness(0.4)' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
              <p className="text-neutral-500 text-sm">Gereja Rasuli Indonesia Jemaat Zion Filadelfia</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="flex border-b border-neutral-100">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-semibold transition-colors ${
                activeTab === 'settings' ? 'bg-gold/5 text-gold border-b-2 border-gold' : 'text-neutral-500 hover:bg-neutral-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              Pengaturan Umum
            </button>
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
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'settings' && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Banner */}
                  <div className="space-y-5">
                    <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gold rounded-full"></span>
                      Banner Utama
                    </h3>
                    <div className="space-y-4 bg-neutral-50 p-5 rounded-xl border border-neutral-100">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-neutral-500" />
                          Gambar Background Banner
                        </label>
                        
                        <div className="mt-2 flex items-center gap-4">
                          {settings.hero_image && (
                            <div className="w-24 h-24 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                              <img src={settings.hero_image} alt="Hero Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border-2 border-dashed border-neutral-300 rounded-xl hover:border-gold hover:bg-gold/5 transition-colors cursor-pointer text-sm font-semibold text-neutral-600">
                              {uploadingHeroImage ? (
                                <span>Mengunggah...</span>
                              ) : (
                                <>
                                  <Upload className="w-4 h-4" />
                                  Unggah Gambar Banner
                                  <input type="file" accept="image/*" className="hidden" onChange={handleHeroImageUpload} disabled={uploadingHeroImage} />
                                </>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Kutipan Ayat</label>
                        <textarea
                          value={settings.hero_quote || ''}
                          onChange={(e) => handleSettingChange('hero_quote', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-y"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Referensi Ayat</label>
                        <input
                          type="text"
                          value={settings.hero_quote_ref || ''}
                          onChange={(e) => handleSettingChange('hero_quote_ref', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* YouTube Khotbah */}
                  <div className="space-y-5">
                    <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gold rounded-full"></span>
                      Video Khotbah Terbaru
                    </h3>
                    <div className="space-y-4 bg-neutral-50 p-5 rounded-xl border border-neutral-100">

                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Nama Pembicara Khotbah</label>
                        <input
                          type="text"
                          value={settings.sermon_speaker || ''}
                          onChange={(e) => handleSettingChange('sermon_speaker', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                          placeholder="Ps. Besron Jusup Roni Marpaung"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">ID Video YouTube</label>
                        <input
                          type="text"
                          value={settings.sermon_youtube_id || ''}
                          onChange={(e) => handleSettingChange('sermon_youtube_id', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg outline-none focus:border-gold focus:ring-1 focus:ring-gold font-mono text-blue-600"
                        />
                        <p className="text-xs text-neutral-500 mt-2">
                          Misal: <strong className="text-neutral-700">3aEH4-tlua8</strong> (Karakter setelah v= atau youtu.be/)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-neutral-100">
                  <button
                    onClick={saveSettings}
                    disabled={savingSettings}
                    className="flex items-center gap-2 px-8 py-3 bg-neutral-900 hover:bg-gold text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-md"
                  >
                    <Save className="w-5 h-5" />
                    {savingSettings ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  <div>
                    <h3 className="font-bold text-lg text-neutral-900">Kelola Agenda Kegiatan</h3>
                    <p className="text-sm text-neutral-500">Agenda akan tayang di halaman Beranda & Events.</p>
                  </div>
                  <button
                    onClick={openAddEvent}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-white font-bold rounded-xl transition-colors shadow-sm"
                  >
                    <Plus className="w-5 h-5" /> Tambah Agenda Baru
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {events.map((ev) => (
                    <div key={ev.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group">
                      <div className="h-40 bg-neutral-100 relative overflow-hidden flex items-center justify-center">
                        {ev.image && ev.image.trim() !== '' && ev.image !== '/event.png' ? (
                          <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="text-neutral-400 flex flex-col items-center">
                            <Calendar className="w-8 h-8 mb-1 opacity-50" />
                            <span className="text-xs font-medium">Tanpa Gambar</span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-sm text-neutral-800">
                          {ev.category}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="mb-4 flex-1">
                          <span className="text-xs font-bold text-gold uppercase mb-1 block">{ev.date}</span>
                          <h4 className="font-bold text-lg leading-tight text-neutral-900 mb-1">{ev.title}</h4>
                          <p className="text-sm text-neutral-500 line-clamp-2">{ev.description}</p>
                        </div>
                        <div className="flex gap-2 border-t border-neutral-100 pt-4">
                          <button
                            onClick={() => openEditEvent(ev)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-semibold rounded-lg transition-colors text-sm border border-neutral-200"
                          >
                            <Edit2 className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => confirmDeleteEvent(ev.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition-colors text-sm border border-red-100"
                          >
                            <Trash2 className="w-4 h-4" /> Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <div className="col-span-full text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-100">
                      <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                      <p className="text-neutral-500 font-medium">Belum ada agenda kegiatan.</p>
                      <button onClick={openAddEvent} className="mt-4 text-gold font-bold hover:underline">Mulai tambahkan sekarang</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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

              {/* MODAL FORM TAMBAH/EDIT AGENDA */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEventModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex justify-between items-center z-20">
              <h3 className="font-bold text-xl text-neutral-900">{eventToEdit ? 'Edit Agenda' : 'Tambah Agenda Baru'}</h3>
              <button onClick={() => setIsEventModalOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-neutral-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={submitEventForm} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Judul Agenda <span className="text-red-500">*</span></label>
                <input required type="text" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-gold outline-none focus:ring-1 focus:ring-gold" placeholder="Contoh: Ibadah Raya Minggu" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Kategori / Label <span className="text-red-500">*</span></label>
                  <input required type="text" value={eventForm.category} onChange={e => setEventForm({...eventForm, category: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-gold outline-none focus:ring-1 focus:ring-gold" placeholder="Contoh: Ibadah Raya" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Lokasi <span className="text-red-500">*</span></label>
                  <input required type="text" value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-gold outline-none focus:ring-1 focus:ring-gold" placeholder="Gedung Utama GRI" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Tanggal Acara <span className="text-red-500">*</span></label>
                  <input required type="date" value={eventForm.dateStr} onChange={e => setEventForm({...eventForm, dateStr: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-gold outline-none focus:ring-1 focus:ring-gold" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Waktu (Opsional)</label>
                  <input type="time" value={eventForm.timeStr} onChange={e => setEventForm({...eventForm, timeStr: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-gold outline-none focus:ring-1 focus:ring-gold" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Deskripsi Singkat <span className="text-red-500">*</span></label>
                <textarea required rows={3} value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:border-gold outline-none focus:ring-1 focus:ring-gold resize-y" placeholder="Tuliskan deskripsi agenda di sini..."></textarea>
              </div>

              {/* IMAGE UPLOAD SECTION */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-neutral-500" />
                  Gambar / Pamflet Acara (Opsional)
                </label>
                
                <div className="mt-2 flex items-center gap-4">
                  {eventForm.image && eventForm.image !== '/event.png' && eventForm.image.trim() !== '' && (
                    <div className="w-24 h-24 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0 relative group">
                      <img src={eventForm.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => setEventForm({...eventForm, image: ''})} className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-sm" title="Hapus Gambar">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <label className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-xl hover:border-gold hover:bg-gold/5 transition-colors cursor-pointer text-sm font-semibold text-neutral-600">
                      {uploadingImage ? (
                        <span>Mengunggah...</span>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Unggah Gambar
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                        </>
                      )}
                    </label>
                    <p className="text-xs text-neutral-500 mt-2">Mendukung file JPG, PNG, atau WEBP. Jika dikosongkan, desain otomatis menyesuaikan tanpa gambar.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEventModalOpen(false)} className="px-6 py-2.5 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors">Batal</button>
                <button type="submit" disabled={uploadingImage} className="px-8 py-2.5 bg-gold hover:bg-gold-light text-white font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50">{eventToEdit ? 'Simpan Perubahan' : 'Tambahkan Agenda'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-xl text-neutral-900 mb-2">Hapus Agenda?</h3>
            <p className="text-neutral-500 text-sm mb-6">Agenda yang dihapus tidak dapat dikembalikan. Anda yakin ingin melanjutkan?</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 bg-neutral-100 text-neutral-700 font-semibold rounded-xl hover:bg-neutral-200 transition-colors">Batal</button>
              <button onClick={executeDeleteEvent} className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-sm">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};