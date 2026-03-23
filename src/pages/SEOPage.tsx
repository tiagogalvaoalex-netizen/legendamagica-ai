import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { motion } from 'motion/react';

interface SEOPageProps {
  title: string;
  h1: string;
  description: string;
  captions: string[];
  platform: string;
}

export default function SEOPage({ title, h1, description, captions, platform }: SEOPageProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Legendas para {platform}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6 leading-tight">
            {h1}
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Ad Placeholder */}
        <div className="bg-stone-100 dark:bg-stone-900/50 h-32 rounded-2xl flex items-center justify-center text-stone-400 text-xs uppercase tracking-widest border border-stone-200 dark:border-stone-800 mb-12">
          Anúncio
        </div>

        <div className="space-y-6 mb-20">
          {captions.map((caption, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-premium group relative"
            >
              <p className="text-stone-700 dark:text-stone-300 whitespace-pre-wrap leading-relaxed pr-12">
                {caption}
              </p>
              <button 
                onClick={() => copyToClipboard(caption, i)}
                className="absolute top-6 right-6 p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-400 hover:text-emerald-600 transition-all"
                title="Copiar"
              >
                {copiedIndex === i ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Content Section for SEO */}
        <section className="prose dark:prose-invert max-w-none mb-20 p-10 bg-stone-50 dark:bg-stone-900/30 rounded-3xl border border-stone-200 dark:border-stone-800">
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-6">Como criar as melhores legendas para {platform}?</h2>
          <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
            Uma boa legenda é a chave para transformar um simples post num conteúdo viral. Quer estejas no Instagram, TikTok ou LinkedIn, o texto que acompanha a tua imagem ou vídeo tem o poder de gerar conexão, engajamento e vendas.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Check className="text-emerald-600" size={20} />
                Sê Autêntico
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                As pessoas conectam-se com pessoas. Não tenhas medo de mostrar a tua personalidade e usar um tom de voz que seja natural para ti ou para a tua marca.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Check className="text-emerald-600" size={20} />
                Usa Emojis Estratégicos
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                Os emojis ajudam a quebrar o texto e a transmitir emoções. Usa-os para destacar pontos importantes, mas sem exagerar.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Check className="text-emerald-600" size={20} />
                Call to Action (CTA)
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                Diz aos teus seguidores o que queres que eles façam. "Comenta abaixo", "Partilha com um amigo" ou "Clica no link da bio" são exemplos clássicos que funcionam.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Check className="text-emerald-600" size={20} />
                Hashtags Relevantes
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                Usa hashtags que tenham a ver com o teu conteúdo. Elas ajudam o algoritmo a entregar o teu post às pessoas certas.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="mt-20 p-12 bg-emerald-600 rounded-3xl text-center text-white shadow-2xl shadow-emerald-600/20">
          <Sparkles className="mx-auto mb-6 w-12 h-12" />
          <h2 className="text-3xl font-bold mb-6">Queres legendas personalizadas?</h2>
          <p className="text-emerald-50/80 text-lg mb-10 max-w-xl mx-auto">
            Usa o nosso gerador de IA para criar legendas únicas baseadas no teu tema e tom de voz.
          </p>
          <Link to="/app/dashboard" className="inline-flex items-center gap-2 bg-white text-emerald-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all active:scale-95">
            Gerar Legendas com IA
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Ad Placeholder */}
        <div className="mt-12 bg-stone-100 dark:bg-stone-900/50 h-32 rounded-2xl flex items-center justify-center text-stone-400 text-xs uppercase tracking-widest border border-stone-200 dark:border-stone-800">
          Anúncio
        </div>
      </div>
    </PublicLayout>
  );
}
