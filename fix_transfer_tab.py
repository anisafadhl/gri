import codecs

with codecs.open('src/components/BottomBanners.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Define the exact block to replace
start_marker = "{/* OPSI 2: TRANSFER CARDS */}"
end_marker = "{/* FLYER MODAL */}"

import re
pattern = re.compile(re.escape(start_marker) + r".*?(?=" + re.escape(end_marker) + ")", re.DOTALL)

new_transfer_content = """{/* OPSI 2: TRANSFER CARDS */}
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
"""

content = pattern.sub(new_transfer_content, content)

with codecs.open('src/components/BottomBanners.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Transfer layout fixed")
