/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Shield, 
  Settings, 
  Database, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  Server, 
  Monitor,
  Wrench,
  BarChart3,
  ChevronRight,
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, type ReactNode, type FormEvent, type ChangeEvent } from 'react';

const NavItem = ({ href, children }: { href: string; children: ReactNode }) => (
  <a 
    href={href} 
    className="text-slate-600 hover:text-brand-600 font-medium transition-colors duration-200"
  >
    {children}
  </a>
);

const ServiceCard = ({ icon: Icon, title, description, features, delay = 0 }: { 
  icon: any; 
  title: string; 
  description: string;
  features: string[];
  delay?: number;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-6 text-brand-600">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
          <CheckCircle2 size={16} className="text-brand-500 mt-0.5 shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center group">
    <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">
      {value}
    </div>
    <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{label}</div>
  </div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Maintenance & Installer',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email perusahaan wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', service: 'Maintenance & Installer', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
              <Shield size={24} />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              PIXELLOKA <span className="text-brand-600">SOLUTION</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavItem href="#layanan">Layanan</NavItem>
            <NavItem href="#paket">Paket</NavItem>
            <NavItem href="#pakar">Keunggulan</NavItem>
            <NavItem href="#proses">Proses</NavItem>
            <NavItem href="#kontak">Kontak</NavItem>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-600 transition-all active:scale-95">
              Konsultasi Gratis
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center text-center">
              <a href="#layanan" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Layanan</a>
              <a href="#paket" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Paket</a>
              <a href="#pakar" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Keunggulan</a>
              <a href="#proses" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Proses</a>
              <a href="#kontak" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold">Kontak</a>
              <button className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold">Konsultasi Gratis</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden tech-grid shadow-[inset_0_-100px_100px_-50px_rgba(248,250,252,1)]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                Partner IT Support Terpercaya
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
                Optimalkan <span className="text-brand-600">Aset Digital</span> Perusahaan Anda.
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                Layanan Maintenance, Instalasi, dan Pendataan Aset IT profesional untuk memastikan operasional bisnis berjalan tanpa hambatan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-brand-600 text-white rounded-xl font-bold text-lg hover:bg-brand-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/30 active:scale-[0.98]">
                  Mulai Sekarang <ArrowRight size={20} />
                </button>
                <a href="#paket" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold text-lg hover:border-brand-300 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                   Lihat Paket Layanan
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 p-4 bg-white rounded-3xl shadow-2xl border border-slate-200">
                <div className="bg-slate-900 rounded-2xl p-6 aspect-video flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Cpu size={240} className="text-white" />
                  </div>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="text-brand-400 text-xs font-mono mb-1">NETWORK_STATUS</div>
                      <div className="text-white font-bold flex items-center gap-2 text-lg">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        ACTIVE & SECURED
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur">
                      <Server className="text-brand-400" size={24} />
                    </div>
                  </div>
                  <div className="flex gap-2 relative z-10">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 w-2/3"></div>
                    </div>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-400 w-full animate-pulse"></div>
                    </div>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white/20 w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-400 rounded-full blur-3xl opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem label="Aset Terdaftar" value="12,500+" />
            <StatItem label="Klien Korporasi" value="450+" />
            <StatItem label="SLA Support" value="99.9%" />
            <StatItem label="Teknisi Ahli" value="85+" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Layanan Menyeluruh untuk Kebutuhan IT Bisnis Anda
            </h2>
            <p className="text-lg text-slate-600">
              Solusi IT yang dirancang khusus untuk meningkatkan efisiensi dan keamanan infrastruktur perusahaan Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={Wrench}
              title="Maintenance Rutin"
              delay={0.1}
              description="Perawatan berkala untuk perangkat keras dan lunak guna mencegah kerusakan fatal sebelum terjadi."
              features={[
                "Pembersihan Hardware",
                "Update Software & Security",
                "Pemeriksaan Suhu & Performa",
                "Pembersihan Virus & Malware"
              ]}
            />
            <ServiceCard 
              icon={Monitor}
              title="Installer & Setup"
              delay={0.2}
              description="Instalasi profesional untuk OS, software bisnis, hingga konfigurasi workstation baru."
              features={[
                "Deployment OS Massal",
                "Konfigurasi Jaringan Lokal",
                "Instalasi Aplikasi Bisnis",
                "Setup Dual-Monitor & Ergonomic"
              ]}
            />
            <ServiceCard 
              icon={Database}
              title="Pendataan Aset"
              delay={0.3}
              description="Manajemen inventaris IT yang terintegrasi untuk melacak siklus hidup setiap perangkat."
              features={[
                "Audit Hardware Menyeluruh",
                "Labeling & Tagging Aset",
                "Laporan Kondisi Perangkat",
                "Estimasi Peremajaan (Upgrade)"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="paket" className="py-24 bg-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full tech-grid opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6 font-sans">
              Pilih Paket yang Sesuai Bisnis Anda
            </h2>
            <p className="text-lg text-slate-600">
              Harga transparan dengan layanan yang dapat disesuaikan dengan skala kebutuhan operasional Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Perorangan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col h-full shadow-sm"
            >
              <div className="mb-8">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">Perorangan</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">IDR 150k</span>
                  <span className="text-slate-500 text-sm">/perangkat</span>
                </div>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  Ideal untuk pelajar, freelancer, atau pemilik bisnis kecil dengan satu perangkat utama.
                </p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Instalasi OS & Software",
                  "Pembersihan Virus & Malware",
                  "Hardware Deep Cleaning",
                  "Konsultasi IT On-Demand",
                  "Data Backup Dasar"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={18} className="text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all active:scale-95">
                Pilih Paket
              </button>
            </motion.div>

            {/* Sekolah */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl border-2 border-brand-500 flex flex-col h-full shadow-2xl relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-500 text-white text-xs font-bold rounded-full uppercase tracking-widest">Paling Populer</div>
              <div className="mb-8">
                <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider">Sekolah / Yayasan</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">IDR 2.5jt</span>
                  <span className="text-slate-500 text-sm">/bulan</span>
                </div>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  Solusi manajemen laboratorium komputer dan infrastruktur jaringan sekolah yang stabil.
                </p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Hingga 30 Perangkat",
                  "Network & Server Admin",
                  "E-Learning Platform Support",
                  "Maintenance Berkala 1x Bulan",
                  "Pembaruan Lab Massal",
                  "SLA Respons 24 Jam"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={18} className="text-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-all active:scale-95 shadow-lg shadow-brand-500/20">
                Pilih Paket
              </button>
            </motion.div>

            {/* Perusahaan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col h-full shadow-sm text-white"
            >
              <div className="mb-8">
                <span className="px-3 py-1 rounded-full bg-white/10 text-brand-400 text-xs font-bold uppercase tracking-wider">Perusahaan</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-bold uppercase">Custom Quote</span>
                </div>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                  Managed IT Services lengkap untuk korporasi dengan ratusan aset dan kebutuhan keamanan tinggi.
                </p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Unlimited Aset IT",
                  "Full Asset Management Tracking",
                  "24/7 Helpdesk & Tiketing",
                  "Disaster Recovery Setup",
                  "SLA Respons 4 Jam",
                  "On-site Resident Engineer",
                  "IT Security Audit & Compliance"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={18} className="text-brand-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-brand-500 hover:text-white transition-all active:scale-95">
                Hubungi Kami
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Feature: Asset Management */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-600/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div className="order-2 lg:order-1">
               <div className="flex flex-col gap-6">
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-brand-500/20 text-brand-400">
                        <BarChart3 size={24} />
                      </div>
                      <h4 className="text-xl font-bold">Visualisasi Data Real-time</h4>
                    </div>
                    <p className="text-slate-400">Pantau distribusi laptop, server, dan printer di seluruh kantor cabang dalam satu dashboard.</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-brand-500/20 text-brand-400">
                        <Settings size={24} />
                      </div>
                      <h4 className="text-xl font-bold">Lifecycle Management</h4>
                    </div>
                    <p className="text-slate-400">Ingatkan jadwal maintenance dan prediksi kapan aset harus diganti sebelum performanya menurun.</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-brand-500/20 text-brand-400">
                        <Smartphone size={24} />
                      </div>
                      <h4 className="text-xl font-bold">Mobile Audit Ready</h4>
                    </div>
                    <p className="text-slate-400">Audit aset di lapangan dengan cepat menggunakan pemindaian QR Code di smartphone.</p>
                 </div>
               </div>
             </div>
             <div className="order-1 lg:order-2">
               <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                 Kendali Penuh Atas <span className="text-brand-400">Seluruh Aset IT</span> Perusahaan.
               </h2>
               <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                 Jangan biarkan aset berharga hilang atau rusak tanpa terpantau. Sistem pendataan kami memberikan visibilitas 100% terhadap infrastruktur Anda.
               </p>
               <div className="flex items-center gap-8">
                  <div className="flex -space-x-4">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                         {i === 4 ? '+12' : `T${i}`}
                       </div>
                     ))}
                  </div>
                  <div className="text-sm font-medium text-slate-400">
                    Dipercayai oleh <span className="text-white">50+ Enterprise Lokal</span>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proses" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Cara Kerja Kami</h2>
            <p className="text-slate-600">Alur kerja profesional untuk hasil yang maksimal dan terukur.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 z-0"></div>
            
            {[
              { icon: MapPin, title: "Survey Lokasi", desc: "Tim kami melakukan audit awal dan pemetaan kebutuhan." },
              { icon: Settings, title: "Strategi & Rencana", desc: "Penyusunan jadwal maintenance dan alur pendataan." },
              { icon: Wrench, title: "Eksekusi Teknis", desc: "Implementasi maintenance, instalasi, dan tagging aset." },
              { icon: CheckCircle2, title: "Pelaporan & Review", desc: "Penyerahan laporan aset digital dan berita acara." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 text-center group/step">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center mx-auto mb-8 shadow-lg ring-8 ring-white relative">
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover/step:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl translate-y-2 group-hover/step:translate-y-0">
                    {step.title}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                  </div>
                  
                  <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center group-hover/step:scale-110 transition-transform duration-300">
                    <step.icon size={28} />
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="pakar" className="py-24 bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-4xl font-bold mb-12">Mengapa Memilih Pixelloka Solution?</h2>
               <div className="space-y-8">
                 <div className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-700 flex items-center justify-center">
                      <Clock className="text-brand-300" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Respons Cepat 24/7</h4>
                      <p className="text-brand-200/70 leading-relaxed">Kami memahami downtime adalah kerugian. Tim kami siap merespon setiap kendala teknik kapanpun dibutuhkan.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-700 flex items-center justify-center">
                      <Shield className="text-brand-300" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Sertifikasi Internasional</h4>
                      <p className="text-brand-200/70 leading-relaxed">Teknisi kami memiliki sertifikasi resmi dari Microsoft, Cisco, dan AWS untuk menjamin kualitas pengerjaan.</p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-700 flex items-center justify-center">
                      <ArrowRight className="text-brand-300" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Hustle-Free Outsourcing</h4>
                      <p className="text-brand-200/70 leading-relaxed">Fokus pada bisnis inti Anda, serahkan infrastruktur IT kepada ahlinya. Efisien dan hemat biaya operasional.</p>
                    </div>
                 </div>
               </div>
             </div>
             <div className="relative">
                <div className="aspect-square bg-brand-800 rounded-3xl overflow-hidden relative border border-brand-700/50">
                  <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-brand-950 to-transparent">
                    <div className="p-6 rounded-2xl bg-brand-500 shadow-2xl">
                      <p className="text-lg font-bold mb-4 uppercase tracking-tighter italic">"Infrastruktur IT yang sehat adalah tulang punggung setiap bisnis modern yang sukses."</p>
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-brand-400"></div>
                         <div>
                            <div className="font-bold">Eka Pratama</div>
                            <div className="text-sm text-brand-100">CTO, Persada Digdaya</div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Visual decoration */}
                <div className="absolute -top-10 -right-10 w-40 h-40 border border-brand-700 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none opacity-20"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Konsultasikan Kebutuhan IT Anda</h2>
              <p className="text-lg text-slate-600 mb-12">
                Punya pertanyaan tentang pendataan aset atau butuh maintenance segera? Tim kami siap membantu.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Hubungi Kami</div>
                    <div className="text-xl font-bold">+62 851-5974-6119</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Email Support</div>
                    <div className="text-xl font-bold">hello@pixelloka.id</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600" id="lokasi-kantor">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Alamat Kantor</div>
                    <div className="text-xl font-bold">Pakuwon Tower, Lt. 22, Jakarta</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white transition-all ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                      }`} 
                    />
                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Perusahaan</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@perusahaan.com" 
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white transition-all ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                      }`} 
                    />
                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Layanan yang Dibutuhkan</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white appearance-none cursor-pointer"
                  >
                    <option>Maintenance & Installer</option>
                    <option>Pendataan Aset Perusahaan</option>
                    <option>Full Managed Services</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Pesan</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Jelaskan kebutuhan IT Anda..." 
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white transition-all ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'
                    }`}
                  ></textarea>
                  {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
                </div>
                
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium border border-green-200 flex items-center gap-3"
                    >
                      <CheckCircle2 size={18} />
                      Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-brand-600 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Pesan'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-500 rounded flex items-center justify-center text-white">
                  <Shield size={20} />
                </div>
                <span className="text-lg font-black tracking-tight uppercase">Pixelloka Solution</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Solusi IT Support terintegrasi untuk bisnis modern di Indonesia. Berfokus pada keandalan infrastruktur dan keamanan data.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Layanan</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-brand-400 transition-colors">IT Maintenance</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Software Installation</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Asset Management</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Network Security</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Perusahaan</h5>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-brand-400 transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Blog IT</a></li>
                <li><a href="#" className="hover:text-brand-400 transition-colors">Kebijakan Privasi</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Social</h5>
              <div className="flex gap-4">
                 {[Smartphone, Server, Database, Shield].map((Icon, i) => (
                   <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-500 transition-colors">
                     <Icon size={18} />
                   </a>
                 ))}
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs">
            <p>© 2024 Pixelloka Solution Indonesia. All rights reserved.</p>
            <div className="flex gap-8">
              <span>Jakarta</span>
              <span>Bandung</span>
              <span>Surabaya</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
