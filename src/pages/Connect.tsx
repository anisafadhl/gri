import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitContactMessage } from '../lib/supabase';
import { useHeroImage } from '../hooks/useHeroImage';
import {
  Compass,
  Users,
  Sparkles,
  Phone,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Music,
  Video,
  Flame,
  Sprout,
  HeartHandshake
} from 'lucide-react';

interface MinistryOption {
  id: string;
  title: string;
  category: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const MINISTRIES_DATA: MinistryOption[] = [
  {
    id: 'worship',
    title: 'Praise, Worship & Creative',
    category: 'Penyembahan & Seni',
    desc: 'Wadah bagi pemusik, singers, song leader, dan penari profetik untuk melayani hadirat Tuhan dengan keunggulan.',
    icon: Music,
    badge: 'Audisi Terbuka'
  },
  {
    id: 'multimedia',
    title: 'Media, Sound & Broadcasting',
    category: 'Teknologi & Digital',
    desc: 'Mengelola live streaming harian Mezbah Doa Pagi, visual display proyektor, tata suara gedung, dan media sosial.',
    icon: Video,
    badge: 'Pelatihan Disediakan'
  },
  {
    id: 'intercession',
    title: 'Doa Syafaat & Konseling',
    category: 'Mezbah Doa',
    desc: 'Prajurit doa di garis depan yang setia mendoakan pokok doa jemaat, keselamatan bangsa, dan pemulihan jiwa-jiwa.',
    icon: Flame,
    badge: 'Panggilan Khusus'
  },
  {
    id: 'kids-youth',
    title: 'Kids & Youth Mentorship',
    category: 'Generasi Penerus',
    desc: 'Membimbing anak-anak Sekolah Minggu dan pemuda-pemudi untuk berdiri teguh dalam firman Tuhan dan menjadi terang.',
    icon: Sprout,
    badge: 'Generasi Penerus'
  },
  {
    id: 'hospitality',
    title: 'Usher, Welcome & Diakonia',
    category: 'Pelayanan Kasih',
    desc: 'Menyambut setiap jemaat dengan senyum kasih Kristus, melayani perjamuan kudus, tata ruang, dan bantuan sosial.',
    icon: HeartHandshake,
    badge: 'Ramah & Melayani'
  }
];

const FAQS_DATA: FaqItem[] = [
  {
    question: 'Apakah saya perlu mendaftar terlebih dahulu sebelum hadir beribadah?',
    answer: 'Tidak perlu! Anda dan seluruh keluarga dapat langsung hadir di cabang mana pun (Jakarta, Bekasi, Bandung, Toraja). Tim penerima tamu kami akan dengan sukacita menyambut kedatangan Anda.'
  },
  {
    question: 'Bagaimana cara bergabung dalam Mezbah Doa Pagi (MDP) online?',
    answer: 'Mezbah Doa Pagi disiarkan secara langsung setiap Senin – Sabtu pukul 05.00 WIB melalui kanal resmi YouTube @BJRBesronJusupRoni dan Facebook. Anda bisa bergabung secara daring dari mana saja.'
  },
  {
    question: 'Saya membutuhkan konseling pastoral atau doa khusus, bagaimana prosedurnya?',
    answer: 'Anda dapat mengisi formulir di halaman ini dengan memilih "Konseling Pastoral" atau langsung menghubungi nomor kontak pastoral kami di 0878 8252 0227. Setiap percakapan dan pokok doa dijamin kerahasiaannya.'
  },
  {
    question: 'Apakah ada pelayanan penyerahan anak, baptisan air, atau pernikahan kudus?',
    answer: 'Ya, GRI Zion Filadelfia melayani sakramen baptisan selam, penyerahan anak, konseling pranikah, dan pemberkatan nikah kudus secara rutin. Silakan pilih kategori tersebut di formulir untuk dijadwalkan bersama hamba Tuhan.'
  }
];

export const Connect: React.FC = () => {
  const heroImage = useHeroImage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'ZFM Jakarta Barat',
    purpose: 'Jemaat Baru / Ingin Hadir',
    message: ''
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitNotice, setSubmitNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePurposeSelect = (purpose: string) => {
    setFormData((prev) => ({ ...prev, purpose }));
    const formEl = document.getElementById('connect-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const copyPastoralHotline = () => {
    const tempEl = document.createElement('textarea');
    tempEl.value = '087882520227';
    tempEl.style.position = 'fixed';
    tempEl.style.left = '-9999px';
    document.body.appendChild(tempEl);
    tempEl.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      // Fallback
    }
    document.body.removeChild(tempEl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitNotice(null);

    // 1. Simpan ke database Supabase jika fungsi tersedia
    try {
      if (typeof submitContactMessage === 'function') {
        await submitContactMessage({
          name: formData.name,
          email: `${formData.phone.replace(/[^0-9]/g, '') || 'kontak'}@jemaat.zion`,
          phone: formData.phone,
          message: `[Kategori: ${formData.purpose} | Cabang: ${formData.city}] ${formData.message}`
        });
      }
    } catch (err) {
      console.warn('Gagal menyimpan salinan ke Supabase, melanjutkan ke WhatsApp:', err);
    }

    // 2. Format pesan terstruktur dan buka ruang obrolan WhatsApp resmi gereja
    const adminPhone = '6287882520227';
    const textMsg = `Halo Tim Pastoral & Sekretariat GRI Zion Filadelfia,\n\nSaya ingin terhubung melalui formulir Connect:\n• Nama: ${formData.name || '-'}\n• No. Kontak: ${formData.phone || '-'}\n• Asal Kota/Cabang: ${formData.city}\n• Keperluan: ${formData.purpose}\n• Pesan/Kerinduan: ${formData.message || '-'}\n\nTerima kasih, mohon arahan dan doanya. Tuhan Yesus memberkati!`;

    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(textMsg)}`;
    window.open(waUrl, '_blank');

    setSubmitNotice({
      type: 'success',
      text: 'Formulir terkirim! Jendela WhatsApp resmi gereja telah dibuka.'
    });
    setIsSubmitting(false);
  };

  return (
    <div className="w-full font-sans antialiased text-[#171717] bg-[#FBF9F5] selection:bg-[#C5A038]/20 selection:text-[#2E1B0A]">
      
      {/* 1. Hero Header Banner */}
      <section
        className="relative h-[46vh] min-h-[350px] flex flex-col justify-center items-center text-center text-white px-4 sm:px-6 lg:px-8 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(46, 27, 10, 0.65) 0%, rgba(46, 27, 10, 0.85) 100%), url('${heroImage}')`,
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto space-y-4 pt-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-[#C5A038] border border-white/15 tracking-widest uppercase">
            Selamat Datang di Rumah Tuhan
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white drop-shadow-xl font-heading">
            Connect With Us
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-stone-200 font-light leading-relaxed drop-shadow">
            &ldquo;Dan marilah kita saling memperhatikan supaya kita saling mendorong dalam kasih dan dalam pekerjaan baik. Janganlah kita menjauhkan diri dari pertemuan-pertemuan ibadah kita...&rdquo; &mdash; Ibrani 10:24-25
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
        
        {}
        {/* 2. Three Pathway Steps (Langkah Awal Anda) */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
            <span className="text-xs font-bold text-[#8E7015] uppercase tracking-wider block">
              Langkah Awal Anda
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#171717] tracking-tight uppercase">
              Ada Tempat Khusus Untuk Anda
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Di mana pun posisi perjalanan rohani Anda hari ini, keluarga besar GRI Zion Filadelfia rindu menyambut dan berjalan bersama Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Step 1: Baru Pertama Kali */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-center text-[#8E7015] group-hover:bg-[#8E7015] group-hover:text-white transition-colors duration-300 shadow-2xs">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#8E7015] uppercase tracking-wider block">
                    01 &bull; Welcome Home
                  </span>
                  <h3 className="text-xl font-bold font-heading text-[#171717] group-hover:text-[#8E7015] transition-colors">
                    Pertama Kali Hadir?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Kami mengundang Anda dan keluarga untuk hadir di Ibadah Raya Minggu atau mezbah fajar di cabang terdekat. Tim penerima tamu kami siap menyambut kedatangan Anda.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100">
                <Link
                  to="/campuses"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E7015] hover:text-[#C5A038] transition-colors no-underline group/link"
                >
                  <span>Cek Lokasi &amp; Jadwal</span>
                  <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Step 2: Bertumbuh Bersama */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8E7015]/40 ring-1 ring-[#8E7015]/20 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8E7015]/10 rounded-bl-full pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#8E7015] text-white flex items-center justify-center shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#8E7015] uppercase tracking-wider block">
                    02 &bull; Fellowship
                  </span>
                  <h3 className="text-xl font-bold font-heading text-[#171717] group-hover:text-[#8E7015] transition-colors">
                    Bertumbuh Bersama
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Jangan berjalan sendirian. Bergabunglah dalam persekutuan pendalaman firman (PWBS), mezbah dupa doa syafaat, serta komunitas pemuda dan keluarga.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 relative z-10">
                <button
                  type="button"
                  onClick={() => handlePurposeSelect('Jemaat Baru / Ingin Hadir')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E7015] hover:text-[#C5A038] transition-colors no-underline group/link cursor-pointer bg-transparent border-0 p-0"
                >
                  <span>Gabung Komunitas Kami</span>
                  <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
                </button>
              </div>
            </div>

            {/* Step 3: Salurkan Talenta */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-center text-[#8E7015] group-hover:bg-[#8E7015] group-hover:text-white transition-colors duration-300 shadow-2xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#8E7015] uppercase tracking-wider block">
                    03 &bull; Ministry
                  </span>
                  <h3 className="text-xl font-bold font-heading text-[#171717] group-hover:text-[#8E7015] transition-colors">
                    Salurkan Talenta
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Setiap kita diperlengkapi dengan karunia ilahi. Bergabunglah dalam tim pelayanan musik, multimedia, doa syafaat, atau pembinaan anak.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100">
                <a
                  href="#ministry-section"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E7015] hover:text-[#C5A038] transition-colors no-underline group/link"
                >
                  <span>Lihat Bidang Pelayanan</span>
                  <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {}
        {/* 3. Interactive Connect Form & Pastoral Hotline Card */}
        <section id="connect-form" className="scroll-mt-24">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Sisi Kiri: Informasi Pastoral & Panggilan Cepat */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#8E7015] uppercase tracking-wider block mb-1">
                    Formulir Jemaat &amp; Konseling
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#171717] tracking-tight uppercase">
                    Mari Berbincang Dengan Kami
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    Silakan isi formulir ringkas di samping. Pesan Anda akan langsung diteruskan ke tim pastoral kami dengan format rapi dan responsif.
                  </p>
                </div>

                {/* Direct Pastoral Hotline Card */}
                <div className="bg-gradient-to-br from-[#2E1B0A] via-[#241508] to-[#171717] rounded-2xl p-5 sm:p-6 text-white border border-[#8E7015]/30 space-y-4 shadow-md relative overflow-hidden">
                  <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#8E7015]/20 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-[#8E7015] flex items-center justify-center shrink-0 text-white">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#C5A038] uppercase tracking-wider block">
                        Hotline Doa &amp; Konseling Gembala
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        Ps. Besron Jusup Roni Marpaung
                      </h4>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed font-light relative z-10">
                    Membutuhkan dukungan doa mendesak, konseling pribadi, atau bimbingan rohani? Tim pastoral kami siap melayani Anda dengan kasih.
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 relative z-10">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#C5A038]">
                      0878-8252-0227
                    </span>
                    <button
                      type="button"
                      onClick={copyPastoralHotline}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      {isCopied ? 'Tersalin!' : 'Salin Nomor'}
                    </button>
                  </div>
                </div>

                {/* Assurance Badges */}
                <div className="space-y-2.5 pt-1 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8E7015] shrink-0" />
                    <span>Setiap percakapan dan pokok doa dijaga kerahasiaannya.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8E7015] shrink-0" />
                    <span>Terhubung langsung melalui WhatsApp resmi gereja.</span>
                  </div>
                </div>

              </div>

              {/* Sisi Kanan: Interactive Form */}
              <div className="lg:col-span-7 bg-[#FBF9F5] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-200/80">
                {submitNotice && (
                  <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{submitNotice.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Category Pills Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-2.5">
                      Apa Yang Bisa Kami Bantu?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Jemaat Baru / Ingin Hadir',
                        'Permohonan Doa Khusus',
                        'Konseling Pastoral',
                        'Baptisan & Penyerahan Anak',
                        'Ingin Bergabung Pelayanan'
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handlePurposeSelect(item)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            formData.purpose === item
                              ? 'bg-[#2E1B0A] text-white shadow-xs border border-transparent'
                              : 'bg-white border border-stone-200 text-stone-600 hover:border-[#8E7015]/40 hover:text-[#171717]'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Nama & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Contoh: Yohanes Pratama"
                        className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#8E7015] focus:ring-1 focus:ring-[#8E7015]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        No. WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Contoh: 08123456789"
                        className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#8E7015] focus:ring-1 focus:ring-[#8E7015]"
                      />
                    </div>
                  </div>

                  {/* Cabang Terdekat */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Lokasi / Cabang Gereja Terdekat
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#8E7015] focus:ring-1 focus:ring-[#8E7015]"
                    >
                      <option value="ZFM Jakarta Barat">ZFM Jakarta Barat (Ruko Mutiara Taman Palem)</option>
                      <option value="ZFM Bekasi Timur">ZFM Kota Bekasi (Ruko Grand Centre)</option>
                      <option value="ZFM Bandung Barat">ZFM Bandung (Taman Kopo Indah 2)</option>
                      <option value="ZFM Toraja Utara">ZFM Toraja Utara (Jl. Poros Kete Kesu)</option>
                      <option value="Online / Daring">Daring / Online (Luar Kota / Belum Ada Cabang)</option>
                    </select>
                  </div>

                  {/* Pesan atau Pokok Doa */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Pesan atau Pokok Doa Anda
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tuliskan kerinduan, pertanyaan jadwal ibadah, atau pokok doa yang ingin didoakan..."
                      className="w-full bg-white border border-stone-200 rounded-xl p-3.5 text-xs sm:text-sm text-[#171717] placeholder-stone-400 focus:outline-none focus:border-[#8E7015] focus:ring-1 focus:ring-[#8E7015]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#8E7015] to-[#A98721] hover:from-[#A98721] hover:to-[#C5A038] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#C5A038]/40 disabled:opacity-60"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isSubmitting ? 'Menghubungkan...' : 'Kirim Pesan Melalui WhatsApp'}</span>
                  </button>

                  <span className="text-[11px] text-stone-400 text-center block pt-0.5">
                    Pesan akan diformat otomatis dan membuka ruang obrolan WhatsApp resmi gereja.
                  </span>
                </form>
              </div>

            </div>
          </div>
        </section>

        {}
        {/* 4. Bidang Pelayanan (Ministry Opportunities) */}
        <section id="ministry-section" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold text-[#8E7015] uppercase tracking-wider block mb-1">
                Melayani Bersama
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-[#171717] tracking-tight uppercase">
                Temukan Tempat Pelayanan Anda
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
                Tuhan mempercayakan talenta untuk memperluas kerajaan-Nya. Mari melayani dengan sukacita dan kerendahan hati.
              </p>
            </div>

            <div className="self-start md:self-end">
              <button
                type="button"
                onClick={() => handlePurposeSelect('Ingin Bergabung Pelayanan')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-200 hover:border-[#8E7015] bg-white hover:bg-[#FBF9F5] text-[#2E1B0A] hover:text-[#8E7015] text-xs font-semibold shadow-2xs transition-all no-underline cursor-pointer"
              >
                <span>Daftar Pelayanan Sekarang &rarr;</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MINISTRIES_DATA.map((min) => {
              const MinIcon = min.icon;
              return (
                <div
                  key={min.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-center text-[#8E7015] group-hover:bg-[#8E7015] group-hover:text-white transition-colors duration-300 shadow-2xs">
                        <MinIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FBF9F5] border border-stone-200 text-[#8E7015]">
                        {min.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        {min.category}
                      </span>
                      <h3 className="text-lg font-bold font-heading text-[#171717] mt-0.5 group-hover:text-[#8E7015] transition-colors">
                        {min.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                      {min.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => handlePurposeSelect(`Pelayanan: ${min.title}`)}
                      className="text-xs font-bold text-[#8E7015] hover:text-[#C5A038] inline-flex items-center gap-1 transition-colors no-underline bg-transparent border-0 p-0 cursor-pointer"
                    >
                      <span>Saya Rindu Melayani Di Sini</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {}
        {/* 5. Frequently Asked Questions (FAQ Accordion) */}
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-8 space-y-1.5">
            <span className="text-xs font-bold text-[#8E7015] uppercase tracking-wider block">
              Pertanyaan Umum
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#171717] tracking-tight">
              Hal yang Sering Ditanyakan
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq, fIdx) => {
              const isOpen = activeFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer bg-transparent border-0"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#171717]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8E7015] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-[13px] text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

    </div>
  );
};

export default Connect;