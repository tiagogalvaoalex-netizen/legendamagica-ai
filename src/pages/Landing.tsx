import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Zap, Shield, Globe, ArrowRight, CheckCircle2, MessageSquare, Star, Heart, Instagram, Music, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import PublicLayout from '../components/PublicLayout';

export default function Landing() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const handleStart = async () => {
    if (user) {
      navigate('/app/dashboard');
    } else {
      await signIn();
      navigate('/app/dashboard');
    }
  };

  const features = [
    {
      icon: <Zap className="text-emerald-600" />,
      title: "Geração Instantânea",
      description: "Recebe até 10 variações de legendas em menos de 5 segundos para qualquer plataforma."
    },
    {
      icon: <Globe className="text-emerald-600" />,
      title: "Multi-Plataforma",
      description: "Formatos otimizados para Instagram, TikTok, LinkedIn, Facebook e X (Twitter)."
    },
    {
      icon: <Shield className="text-emerald-600" />,
      title: "Tom de Voz Personalizado",
      description: "Escolhe entre tons profissionais, criativos, persuasivos ou descontraídos."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Define o teu tema",
      description: "Escreve brevemente sobre o que é o teu post ou carrega uma ideia base."
    },
    {
      number: "02",
      title: "Escolhe o estilo",
      description: "Seleciona a plataforma e o tom de voz que melhor se adapta à tua marca."
    },
    {
      number: "03",
      title: "Copia e brilha",
      description: "Escolhe a tua legenda favorita, copia e publica. Simples assim."
    }
  ];

  const testimonials = [
    {
      name: "Ana Silva",
      role: "Social Media Manager",
      content: "A LegendaMágica poupa-me horas de trabalho todas as semanas. As legendas são incrivelmente naturais.",
      avatar: "https://picsum.photos/seed/ana/100/100"
    },
    {
      name: "Pedro Santos",
      role: "Empreendedor Digital",
      content: "O melhor investimento que fiz para o meu Instagram. O engajamento subiu 40% desde que comecei a usar.",
      avatar: "https://picsum.photos/seed/pedro/100/100"
    }
  ];

  const faqs = [
    {
      q: "O LegendaMágica é gratuito?",
      a: "Sim! Podes começar a usar o LegendaMágica gratuitamente. Oferecemos créditos iniciais para testares a nossa IA e veres a magia a acontecer."
    },
    {
      q: "As legendas são originais?",
      a: "Absolutamente. A nossa IA gera conteúdo único para cada pedido, garantindo que a tua marca se destaca com textos autênticos e criativos."
    },
    {
      q: "Posso usar em várias redes sociais?",
      a: "Sim, o LegendaMágica está otimizado para Instagram, TikTok, LinkedIn, Facebook e X (Twitter), adaptando o formato e os emojis a cada plataforma."
    },
    {
      q: "Como funcionam os créditos?",
      a: "Cada geração de legendas consome 1 crédito. Podes ganhar mais créditos convidando amigos ou fazendo upgrade para o plano Pro."
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
              ✨ A IA favorita dos criadores portugueses
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1] text-stone-900 dark:text-white">
              Cria legendas <span className="text-emerald-600 italic">virais</span><br />
              em segundos.
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Diz adeus ao bloqueio criativo. Usa a Inteligência Artificial para criar legendas que convertem seguidores em clientes no Instagram, TikTok e LinkedIn.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={handleStart}
                className="btn-primary text-lg px-12 py-5 flex items-center gap-3 group shadow-2xl shadow-emerald-500/20"
              >
                Começar Agora Grátis
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-sm">
                <CheckCircle2 size={18} className="text-emerald-600" />
                Sem cartão de crédito
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-10 bg-emerald-500/10 blur-[120px] rounded-full -z-10"></div>
            <div className="glass p-2 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800">
              <img 
                src="https://picsum.photos/seed/app-preview/1200/700" 
                alt="LegendaMágica Dashboard" 
                className="rounded-2xl w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Platforms */}
      <section className="py-12 border-y border-stone-100 dark:border-stone-900 bg-white dark:bg-stone-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold text-stone-400"><Instagram size={24} /> Instagram</div>
          <div className="flex items-center gap-2 font-bold text-stone-400"><Music size={24} /> TikTok</div>
          <div className="flex items-center gap-2 font-bold text-stone-400"><Linkedin size={24} /> LinkedIn</div>
          <div className="flex items-center gap-2 font-bold text-stone-400"><MessageSquare size={24} /> Threads</div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 md:py-32 bg-stone-50 dark:bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">Como funciona a Magia?</h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
              Três passos simples para transformares as tuas ideias em conteúdo viral.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative p-8 card-premium group hover:-translate-y-2 transition-all">
                <span className="text-6xl font-black text-stone-100 dark:text-stone-800 absolute top-4 right-8 group-hover:text-emerald-500/10 transition-colors">
                  {step.number}
                </span>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-4 relative z-10">{step.title}</h3>
                <p className="text-stone-600 dark:text-stone-400 relative z-10 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-white mb-8 leading-tight">
                Criado para quem não tem tempo a perder.
              </h2>
              <div className="space-y-8">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-white mb-2">{f.title}</h4>
                      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full -z-10"></div>
              <div className="card-premium p-4">
                <img 
                  src="https://picsum.photos/seed/features/800/800" 
                  alt="Features" 
                  className="rounded-xl w-full shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Niches */}
      <section className="py-24 md:py-32 bg-white dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">Legendas para todos os nichos</h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
              Explora as nossas sugestões e descobre como a nossa IA se adapta ao teu conteúdo.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Instagram', path: '/legendas-instagram', icon: <Instagram size={20} /> },
              { name: 'TikTok', path: '/legendas-tiktok', icon: <Music size={20} /> },
              { name: 'Viagens', path: '/legendas-viagem', icon: <Globe size={20} /> },
              { name: 'Fitness', path: '/legendas-fitness', icon: <Zap size={20} /> },
              { name: 'Humor', path: '/legendas-engracadas', icon: <MessageSquare size={20} /> },
            ].map((niche, i) => (
              <Link 
                key={i} 
                to={niche.path}
                className="card-premium p-6 flex flex-col items-center text-center gap-4 hover:border-emerald-500 transition-all group"
              >
                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-stone-500 dark:text-stone-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {niche.icon}
                </div>
                <span className="font-bold text-stone-900 dark:text-white text-sm">{niche.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">O que dizem os nossos utilizadores</h2>
            <div className="flex justify-center gap-1 text-emerald-500">
              {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-stone-800 p-10 rounded-3xl border border-stone-700 hover:border-emerald-500/50 transition-colors">
                <p className="text-xl italic mb-8 text-stone-300">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-emerald-500" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-stone-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-stone-50 dark:bg-stone-900/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">Perguntas Frequentes</h2>
            <p className="text-stone-600 dark:text-stone-400">Tudo o que precisas de saber sobre o LegendaMágica.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card-premium p-8">
                <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-3">{faq.q}</h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-600 -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Pronto para transformar as tuas redes sociais?</h2>
          <p className="text-xl text-emerald-50/80 mb-12 max-w-2xl mx-auto">
            Junta-te a milhares de criadores e começa a gerar legendas profissionais hoje mesmo.
          </p>
          <button 
            onClick={handleStart}
            className="bg-white text-emerald-600 px-12 py-5 rounded-full text-xl font-bold hover:bg-emerald-50 transition-all active:scale-95 shadow-2xl shadow-black/20"
          >
            Criar Minha Conta Grátis
          </button>
          <p className="mt-8 text-emerald-100/60 text-sm flex items-center justify-center gap-2">
            <Heart size={16} fill="currentColor" /> Feito para criadores, por criadores.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
