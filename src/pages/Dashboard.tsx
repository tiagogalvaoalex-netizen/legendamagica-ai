import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import AdComponent from '../components/AdComponent';
import { 
  Zap, 
  History as HistoryIcon, 
  Star, 
  PenTool, 
  TrendingUp, 
  CreditCard,
  ArrowRight,
  Sparkles,
  Loader2,
  Instagram,
  Music2,
  Hash
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Dashboard() {
  const { profile, user } = useAuth();
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.uid, plan: 'pro' }),
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Stripe error:', error);
      alert('Erro ao iniciar checkout. Verifica as chaves do Stripe.');
    } finally {
      setUpgrading(false);
    }
  };

  const stats = [
    { name: 'Créditos Disponíveis', value: profile?.creditsRemaining || 0, icon: Zap, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
    { name: 'Plano Atual', value: profile?.plan === 'free' ? 'Grátis' : 'Pro', icon: CreditCard, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
  ];

  const seoResources = [
    { name: 'Legendas Instagram', path: '/legendas-instagram', icon: Instagram },
    { name: 'Legendas TikTok', path: '/legendas-tiktok', icon: Music2 },
    { name: 'Legendas Engraçadas', path: '/legendas-engracadas', icon: Hash },
  ];

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white">Olá, {user?.displayName?.split(' ')[0]}! 👋</h1>
          <p className="text-stone-500 dark:text-stone-400 text-lg">Bem-vindo ao teu painel criativo.</p>
        </div>
        <Link 
          to="/app/generator" 
          className="btn-primary flex items-center gap-2"
        >
          <PenTool size={20} />
          Criar Nova Legenda
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-widest">{stat.name}</p>
            <p className="text-3xl font-bold text-stone-900 dark:text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main CTA Card */}
        <div className="lg:col-span-2 bg-stone-900 dark:bg-stone-800 rounded-3xl p-10 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Sparkles size={200} />
          </div>
          <div className="relative z-10 max-w-md">
            <h2 className="text-3xl font-bold mb-4">Pronto para engajar o teu público?</h2>
            <p className="text-stone-400 mb-8 text-lg leading-relaxed">
              Usa a nossa inteligência artificial para criar legendas que param o scroll e geram conversões reais.
            </p>
            <Link 
              to="/app/generator" 
              className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all active:scale-95"
            >
              Começar a Gerar
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="card-premium flex flex-col border-emerald-500/20">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-2 dark:text-white">Plano Pro</h3>
          <p className="text-stone-500 dark:text-stone-400 mb-8 leading-relaxed">
            Desbloqueia gerações ilimitadas, tons de voz exclusivos e suporte prioritário.
          </p>
          <button 
            onClick={handleUpgrade}
            disabled={upgrading || profile?.plan === 'pro'}
            className="mt-auto w-full border-2 border-stone-900 dark:border-stone-700 text-stone-900 dark:text-white py-3 rounded-xl font-bold hover:bg-stone-900 dark:hover:bg-stone-800 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {upgrading ? <Loader2 className="animate-spin" size={20} /> : profile?.plan === 'pro' ? 'Plano Ativo' : 'Fazer Upgrade'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          <Link to="/app/history" className="card-premium group flex items-center justify-between hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center text-stone-600 dark:text-stone-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                <HistoryIcon size={24} />
              </div>
              <div>
                <p className="font-bold text-stone-900 dark:text-white">Ver Histórico</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">Acede às tuas gerações anteriores</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-stone-300 dark:text-stone-600 group-hover:text-emerald-500 transition-colors" />
          </Link>
          <Link to="/app/favorites" className="card-premium group flex items-center justify-between hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center text-stone-600 dark:text-stone-400 group-hover:bg-yellow-50 dark:group-hover:bg-yellow-900/20 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                <Star size={24} />
              </div>
              <div>
                <p className="font-bold text-stone-900 dark:text-white">Favoritos</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">As tuas melhores legendas salvas</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-stone-300 dark:text-stone-600 group-hover:text-emerald-500 transition-colors" />
          </Link>
        </div>

        {/* SEO Resources */}
        <div className="card-premium">
          <h3 className="font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-600" />
            Recursos Úteis
          </h3>
          <div className="space-y-4">
            {seoResources.map((res, i) => (
              <Link key={i} to={res.path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group">
                <res.icon size={18} className="text-stone-400 group-hover:text-emerald-600 transition-colors" />
                <span className="text-sm text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white font-medium">{res.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
        <AdComponent />
      </div>
    </div>
  );
}
