import React, { useState } from 'react';
import { submitContactMessage } from '../lib/supabase';

export const Connect: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const res: any = await submitContactMessage(formData);

    if (res && !res.error) {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      setStatus('error');
      setErrorMessage(res?.error?.message || res?.error || 'Gagal mengirim pesan.');
    }
  };

  return (
    <div className="w-full">
      {/* Banner */}
      <section
        className="h-[50vh] min-h-[350px] flex flex-col justify-center items-center text-center text-white px-[5%] bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.5)), url('/Gereja Rasuli Indonesia Jemaat Zion Filadelfia.png')`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider">
          Connect With Us
        </h1>
      </section>

      {/* Content */}
      <section className="py-24 px-[5%] max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-neutral-900 mb-4 uppercase tracking-wide">
          Hubungi & Bergabunglah Bersama Kami
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-xl mx-auto text-base">
          Kami siap menyambut Anda dengan sukacita dan kasih Tuhan. Kirimkan pertanyaan, permohonan doa, atau pesan Anda melalui formulir di bawah ini.
        </p>

        {status === 'success' && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 text-green-800 rounded-lg text-center space-y-2">
            <h3 className="font-bold text-lg">Pesan Berhasil Terkirim!</h3>
            <p className="text-sm">
              Terima kasih! Pesan dan permohonan doa Anda telah kami terima dan tim pastoral kami akan mendoakan Anda.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 text-red-800 rounded-lg text-center">
            <p className="font-semibold text-sm">{errorMessage}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-neutral-100 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
              className="w-full px-4 py-3.5 border border-neutral-300 rounded-md focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-neutral-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Alamat Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@email.com"
              className="w-full px-4 py-3.5 border border-neutral-300 rounded-md focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-neutral-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Nomor Telepon / WhatsApp
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="081234567890 (Opsional)"
              className="w-full px-4 py-3.5 border border-neutral-300 rounded-md focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all text-neutral-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Pesan atau Permohonan Doa <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tuliskan pesan, pertanyaan, atau pokok doa Anda di sini..."
              className="w-full px-4 py-3.5 border border-neutral-300 rounded-md focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-y text-neutral-900"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 bg-neutral-900 text-white font-semibold rounded-md hover:bg-gold transition-colors duration-300 tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {status === 'loading' ? 'Mengirim Pesan...' : 'Kirim Pesan & Doa'}
          </button>
        </form>
      </section>
    </div>
  );
};
