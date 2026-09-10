import React, { useState, useEffect } from 'react';
import { Download, Copy, CheckCircle, CreditCard, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import { getSiteSettings } from '../lib/supabase';

export const BottomBanners: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flyer' | 'transfer'>('flyer');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState(false);
  const [zoomImage, setZoomImage] = useState<{ src: string, name: string } | null>(null);
  
  const [settings, setSettings] = useState<any>({
    giving_flyer: '/giving.png',
    giving_acc1_name: 'GRI Zion Filadelfia',
    giving_acc1_bank: 'BRI',
    giving_acc1_number: '204501000621565',
    giving_acc1_qr: '',
    giving_acc2_name: 'BESRON JUSUP RONI MARPAUNG',
    giving_acc2_bank: 'BRI',
    giving_acc2_number: '075201017462531',
    giving_acc2_qr: ''
  });

  useEffect(() => {
    const loadSettings = async () => {
      const data = await getSiteSettings();
      setSettings(data);
    };
    loadSettings();
  }, []);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isFlyerModalOpen || zoomImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isFlyerModalOpen, zoomImage]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="giving" className="bg-[#FBF9F5] py-16 sm:py-24 px-4 sm:px-[5%] border-t border-stone-200">
      <div data-aos="fade-up" className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight uppercase">
              Persembahan
            </h2>
            <div className="text-stone-600 text-xs sm:text-sm mt-4 max-w-3xl italic leading-relaxed">
              <p className="mb-2">"Camkanlah ini: Orang yang menabur sedikit, akan menuai sedikit juga, dan orang yang menabur banyak, akan menuai banyak juga. Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan..."</p>
              <p className="text-[#8E7015] font-bold not-italic mt-2">— 2 Korintus 9:6-7</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-stone-200 shadow-lg overflow-hidden">
          
          {/* TABS */}
          <div className="flex border-b border-stone-200 bg-stone-50">
            <button
              onClick={() => setActiveTab('flyer')}
              className={`flex-1 py-4 sm:py-5 flex items-center justify-center gap-2 font-bold transition-all duration-300 text-sm sm:text-base ${
                activeTab === 'flyer' ? 'bg-white text-[#8E7015] border-b-2 border-[#8E7015] shadow-sm' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-700'
              }`}
            >
              <ImageIcon className="w-5 h-5" /> Scan Flyer Utama
            </button>
            <button
              onClick={() => setActiveTab('transfer')}
              className={`flex-1 py-4 sm:py-5 flex items-center justify-center gap-2 font-bold transition-all duration-300 text-sm sm:text-base ${
                activeTab === 'transfer' ? 'bg-white text-[#8E7015] border-b-2 border-[#8E7015] shadow-sm' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-700'
              }`}
            >
              <CreditCard className="w-5 h-5" /> Transfer Bank & QRIS
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {/* OPSI 1: FLYER BESAR */}
            {activeTab === 'flyer' && (
              <div className="animate-fade-in-up">
                <div 
                  className="w-full h-[500px] sm:h-[600px] md:h-[700px] bg-stone-100 rounded-2xl overflow-hidden shadow-inner border border-stone-200 relative group cursor-pointer"
                  onClick={() => setIsFlyerModalOpen(true)}
                >
                  <img 
                    src={settings.giving_flyer} 
                    alt="Flyer Persembahan" 
                    className="w-full h-full object-contain p-4 sm:p-8" 
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white/90 text-neutral-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ZoomIn className="w-5 h-5" /> Perbesar Flyer
                    </div>
                  </div>
                </div>
                <div className="text-center mt-6">
                   <p className="text-stone-500 text-sm mb-4">Klik gambar di atas untuk memperbesar flyer.</p>
                </div>
              </div>
            )}

            {/* OPSI 2: TRANSFER CARDS */}
            {activeTab === 'transfer' && (
              <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LEFT CARD: OPERASIONAL */}
                <div className="bg-[#2B1A0A] rounded-[28px] p-8 flex flex-col relative text-white shadow-md">
                  {/* Header Row */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1.5 bg-[#8E7015]/20 text-[#D4AF37] text-[10px] sm:text-xs font-bold rounded-full border border-[#8E7015]/40 uppercase tracking-widest shrink-0">
                      Operasional & Gedung
                    </span>
                    <span className="text-[#8E7015] text-[10px] sm:text-xs font-semibold tracking-wider text-right">
                      GRI Zion Filadelfia
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                    Persembahan Operasional Pelayanan & Pembangunan Gedung Gereja
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm mb-6 leading-relaxed font-light">
                    Mendukung operasional harian ibadah, misi penjangkauan, sarana pelayanan, dan perluasan rumah doa Tuhan.
                  </p>

                  <div className="space-y-4 mt-auto">
                    {/* Bank Box */}
                    <div className="bg-[#1D1107] rounded-2xl p-5 border border-white/5">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#00529C] text-white text-[10px] font-bold px-2 py-0.5 rounded">BRI</span>
                          <span className="text-white text-xs sm:text-sm font-medium">Bank Rakyat Indonesia</span>
                        </div>
                        <span className="text-[#D4AF37] text-xs font-bold">Rek. Gereja Resmi</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                        <span className="text-2xl sm:text-3xl font-bold text-white tracking-widest font-mono">
                          {settings.giving_acc1_number || '204501000621565'}
                        </span>
                        <button
                          onClick={() => handleCopy(settings.giving_acc1_number || '204501000621565', 1)}
                          className="px-4 py-2.5 bg-[#8E7015] hover:bg-[#7A5F0F] rounded-lg text-white text-xs font-bold flex items-center gap-2 transition-colors"
                        >
                          {copiedIndex === 1 ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          Salin No. Rekening
                        </button>
                      </div>
                      <span className="text-xs text-stone-400">a.n <span className="font-bold text-white uppercase">{settings.giving_acc1_name || 'GRI Zion Filadelfia'}</span></span>
                    </div>

                    {/* QR Box */}
                    <div className="bg-[#1D1107] rounded-2xl p-5 border border-white/5 flex gap-5 items-center">
                      <div 
                        className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-2 rounded-xl shrink-0 cursor-pointer hover:scale-105 transition-transform shadow-md"
                        onClick={() => settings.giving_acc1_qr && setZoomImage({ src: settings.giving_acc1_qr, name: 'QR_Operasional_GRI' })}
                      >
                        {settings.giving_acc1_qr ? (
                          <img src={settings.giving_acc1_qr} alt="QR Operasional" className="w-full h-full object-cover rounded-md" />
                        ) : (
                          <div className="w-full h-full border border-stone-200 border-dashed rounded-md flex items-center justify-center">
                            <span className="text-[10px] text-stone-400">No QR</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-white text-sm mb-1">QR Code Operasional & Gedung</h4>
                        <p className="text-xs text-stone-400 mb-3 leading-relaxed">Scan melalui BCA Mobile, BRImo, Livin, GoPay, OVO, Dana.</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {settings.giving_acc1_qr && (
                            <>
                              <button onClick={() => downloadImage(settings.giving_acc1_qr, 'QRIS_Operasional.png')} className="px-3 py-1.5 bg-[#8E7015] hover:bg-[#7A5F0F] text-white text-[11px] font-bold rounded-md flex items-center gap-1.5 transition-colors">
                                <Download className="w-3.5 h-3.5" /> Download QR
                              </button>
                              <button onClick={() => setZoomImage({ src: settings.giving_acc1_qr, name: 'QRIS_Operasional' })} className="px-3 py-1.5 border border-white/20 text-white hover:bg-white/10 text-[11px] font-bold rounded-md flex items-center gap-1.5 transition-colors">
                                Perbesar
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT CARD: SYUKUR */}
                <div className="bg-[#FDFBF7] rounded-[28px] p-8 flex flex-col relative border border-[#EADDAC] shadow-md">
                  {/* Header Row */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1.5 bg-transparent text-[#8E7015] text-[10px] sm:text-xs font-bold rounded-full border border-[#8E7015]/30 uppercase tracking-widest shrink-0">
                      Persepuluhan & Syukur
                    </span>
                    <span className="text-stone-400 text-[10px] sm:text-xs font-medium font-mono tracking-wider text-right">
                      Tithe & Thanksgiving
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-[#171717] mb-3 leading-snug">
                    Khusus Persembahan Persepuluhan & Ucapan Syukur
                  </h3>
                  <p className="text-stone-500 text-xs sm:text-sm mb-6 leading-relaxed">
                    Bagi jemaat yang hendak mengembalikan persepuluhan dan menabur ucapan syukur kepada Tuhan melalui gembala sidang.
                  </p>

                  <div className="space-y-4 mt-auto">
                    {/* Bank Box 1 (BRI) */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-2 sm:mb-3">
                        <span className="bg-[#00529C] text-white text-[10px] font-bold px-2 py-0.5 rounded">BRI</span>
                        <span className="text-stone-600 text-xs font-medium">Bank Rakyat Indonesia</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-2xl font-bold text-[#171717] tracking-widest font-mono">
                          {settings.giving_acc2_number || '075201017462531'}
                        </span>
                        <button
                          onClick={() => handleCopy(settings.giving_acc2_number || '075201017462531', 2)}
                          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold rounded-lg transition-colors"
                        >
                          {copiedIndex === 2 ? 'Disalin' : 'Salin'}
                        </button>
                      </div>
                    </div>

                    {/* Bank Box 2 (BCA) - Static */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm flex flex-col">
                      <div className="flex items-center gap-3 mb-2 sm:mb-3">
                        <span className="bg-[#005AAA] text-white text-[10px] font-bold px-2 py-0.5 rounded">BCA</span>
                        <span className="text-stone-600 text-xs font-medium">Bank Central Asia</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg sm:text-2xl font-bold text-[#171717] tracking-widest font-mono">
                          5140523200
                        </span>
                        <button
                          onClick={() => handleCopy('5140523200', 3)}
                          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold rounded-lg transition-colors"
                        >
                          {copiedIndex === 3 ? 'Disalin' : 'Salin'}
                        </button>
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-xs text-stone-500 font-medium py-1">
                      Atas Nama: <span className="text-[#171717] font-bold uppercase">{settings.giving_acc2_name || 'BESRON JUSUP RONI MARPAUNG'}</span>
                    </p>

                    {/* QR Box */}
                    <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 flex gap-5 items-center">
                      <div 
                        className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-2 rounded-xl border border-stone-200 shrink-0 cursor-pointer hover:scale-105 transition-transform shadow-sm"
                        onClick={() => settings.giving_acc2_qr && setZoomImage({ src: settings.giving_acc2_qr, name: 'QR_Syukur_Besron' })}
                      >
                        {settings.giving_acc2_qr ? (
                          <img src={settings.giving_acc2_qr} alt="QR Syukur" className="w-full h-full object-cover rounded-md" />
                        ) : (
                          <div className="w-full h-full border border-stone-200 border-dashed rounded-md flex items-center justify-center">
                            <span className="text-[10px] text-stone-400 text-center">No QR</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-bold text-[#171717] text-sm mb-1">QR Code Persepuluhan & Syukur</h4>
                        <p className="text-xs text-stone-500 mb-3 leading-relaxed">Scan untuk transfer persepuluhan langsung.</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {settings.giving_acc2_qr && (
                            <>
                              <button onClick={() => downloadImage(settings.giving_acc2_qr, 'QRIS_Syukur.png')} className="px-3 py-1.5 bg-[#8E7015] hover:bg-[#7A5F0F] text-white text-[11px] font-bold rounded-md flex items-center gap-1.5 transition-colors">
                                <Download className="w-3.5 h-3.5" /> Download QR
                              </button>
                              <button onClick={() => setZoomImage({ src: settings.giving_acc2_qr, name: 'QRIS_Syukur' })} className="px-3 py-1.5 border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-[11px] font-bold rounded-md flex items-center gap-1.5 transition-colors">
                                Perbesar
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* FLYER MODAL */}
      {isFlyerModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in-up">
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] bg-transparent flex flex-col">
            <div className="flex justify-end gap-4 mb-4">
              <button 
                onClick={() => downloadImage(settings.giving_flyer, 'Flyer_Persembahan_GRI.png')}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#8E7015] hover:bg-[#7A5F0F] text-white rounded-full font-bold transition-colors shadow-lg"
              >
                <Download className="w-5 h-5" /> Download Flyer
              </button>
              <button 
                onClick={() => setIsFlyerModalOpen(false)}
                className="w-11 h-11 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center rounded-full transition-colors backdrop-blur-sm border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-black/50 rounded-2xl border border-white/10 flex items-center justify-center p-2 sm:p-6" onClick={() => setIsFlyerModalOpen(false)}>
              <img 
                src={settings.giving_flyer} 
                alt="Flyer Full" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" 
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      {/* QR ZOOM MODAL */}
      {zoomImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in-up">
          <div className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-stone-100 bg-stone-50">
              <h3 className="font-bold text-[#171717]">QRIS Code</h3>
              <button 
                onClick={() => setZoomImage(null)}
                className="w-10 h-10 bg-white hover:bg-stone-200 text-stone-500 flex items-center justify-center rounded-full transition-colors border border-stone-200 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 sm:p-12 flex items-center justify-center bg-white" onClick={() => setZoomImage(null)}>
              <img 
                src={zoomImage.src} 
                alt="QR Zoom" 
                className="w-full max-w-[300px] h-auto object-contain rounded-xl shadow-md border border-stone-100" 
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-center">
              <button 
                onClick={() => downloadImage(zoomImage.src, `${zoomImage.name}.png`)}
                className="flex items-center gap-2 px-8 py-3 bg-[#8E7015] hover:bg-[#7A5F0F] text-white rounded-xl font-bold transition-colors shadow-sm w-full sm:w-auto justify-center"
              >
                <Download className="w-5 h-5" /> Download Gambar QR
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
