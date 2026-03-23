import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { generateCaptions, CaptionRequest } from '../services/gemini';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { cn } from '../utils';
import AdComponent from '../components/AdComponent';
import { 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Music2, 
  Copy, 
  Star, 
  Check, 
  Loader2,
  Sparkles,
  Hash,
  MessageSquare,
  PenTool,
  Plus,
  Trash2,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PLATFORMS = [
  { id: 'Instagram', icon: Instagram, color: 'text-pink-600' },
  { id: 'TikTok', icon: Music2, color: 'text-stone-900 dark:text-white' },
  { id: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
  { id: 'Facebook', icon: Facebook, color: 'text-blue-600' },
  { id: 'X (Twitter)', icon: Twitter, color: 'text-stone-900 dark:text-white' },
];

const TONES = ['Profissional', 'Criativo', 'Descontraído', 'Persuasivo', 'Inspirador', 'Humorístico'];
const OBJECTIVES = ['Vender', 'Informar', 'Inspirar', 'Promover', 'Engajar'];
const LANGUAGES = ['Português (PT)', 'Português (BR)', 'Inglês', 'Espanhol'];
const LENGTHS = ['Curto', 'Médio', 'Longo'];

const QUICK_SUGGESTIONS = [
  "Foto de viagem na praia",
  "Treino matinal no ginásio",
  "Receita de bolo de chocolate",
  "Look do dia para o trabalho",
  "Dica rápida de produtividade",
  "Frase motivacional",
  "Bastidores do negócio",
  "Promoção especial",
  "Unboxing de produto"
];

export default function Generator() {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ captions: string[], hashtags: string[] } | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copyAllSuccess, setCopyAllSuccess] = useState(false);
  const [savedIndices, setSavedIndices] = useState<number[]>([]);

  const [formData, setFormData] = useState<CaptionRequest>({
    platform: 'Instagram',
    category: '',
    theme: '',
    tone: 'Criativo',
    language: 'Português (PT)',
    targetAudience: '',
    keywords: '',
    objective: 'Engajar',
    length: 'Médio',
    count: 3
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || profile.creditsRemaining <= 0) {
      alert('Não tens créditos suficientes. Faz upgrade para o plano Pro!');
      return;
    }

    setLoading(true);
    try {
      const response = await generateCaptions(formData);
      setResults(response);
      setSavedIndices([]);

      // Save to history
      await addDoc(collection(db, 'generations'), {
        userId: user?.uid,
        ...formData,
        results: response.captions,
        hashtags: response.hashtags,
        createdAt: serverTimestamp()
      });

      // Deduct credit
      const userRef = doc(db, 'users', user!.uid);
      await updateDoc(userRef, {
        creditsRemaining: increment(-1)
      });
      await refreshProfile();

    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'generations');
    } finally {
      setLoading(false);
    }
  };

  const regenerateIndividual = async (index: number) => {
    if (!profile || profile.creditsRemaining <= 0) {
      alert('Não tens créditos suficientes para regenerar.');
      return;
    }

    setLoading(true);
    try {
      const singleReq = { ...formData, count: 1 };
      const response = await generateCaptions(singleReq);
      
      if (results && response.captions.length > 0) {
        const newCaptions = [...results.captions];
        newCaptions[index] = response.captions[0];
        setResults({ ...results, captions: newCaptions });
        
        // Deduct credit
        const userRef = doc(db, 'users', user!.uid);
        await updateDoc(userRef, {
          creditsRemaining: increment(-1)
        });
        await refreshProfile();
      }
    } catch (error) {
      console.error("Erro ao regenerar:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    if (!results) return;
    const allText = results.captions.map((c, i) => `Opção ${i+1}:\n${c}`).join('\n\n---\n\n') + '\n\nHashtags:\n' + results.hashtags.join(' ');
    navigator.clipboard.writeText(allText);
    setCopyAllSuccess(true);
    setTimeout(() => setCopyAllSuccess(false), 2000);
  };

  const saveToFavorites = async (caption: string, index: number) => {
    try {
      await addDoc(collection(db, 'favorites'), {
        userId: user?.uid,
        caption,
        platform: formData.platform,
        createdAt: serverTimestamp()
      });
      setSavedIndices([...savedIndices, index]);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'favorites');
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white">Gerador de Legendas</h1>
          <p className="text-stone-500 dark:text-stone-400">Transforma as tuas ideias em conteúdo viral com IA.</p>
        </div>
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-800/50">
          <Sparkles className="text-emerald-600" size={18} />
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{profile?.creditsRemaining} Créditos</span>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Form Section */}
        <section className="space-y-6">
          <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
            <form onSubmit={handleGenerate} className="space-y-8">
              {/* Platform Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-400 dark:text-stone-500 mb-4 uppercase tracking-widest">Plataforma</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {PLATFORMS.map((p) => {
                    const Icon = p.icon;
                    const isSelected = formData.platform === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, platform: p.id })}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200",
                          isSelected 
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 shadow-lg shadow-emerald-500/10" 
                            : "border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 text-stone-400 hover:border-stone-200 dark:hover:border-stone-700"
                        )}
                      >
                        <Icon size={24} className={isSelected ? p.color : ''} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{p.id.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme & Suggestions */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">Sobre o que é o teu post?</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Ex: Estou a lançar um novo ebook sobre produtividade e quero convidar as pessoas para o link na bio..."
                    value={formData.theme}
                    onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-stone-400 flex items-center gap-1 mr-2"><Lightbulb size={14} /> Sugestões:</span>
                  {QUICK_SUGGESTIONS.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, theme: s })}
                      className="text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">Tom de Voz</label>
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                  >
                    {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">Objetivo</label>
                  <select
                    value={formData.objective}
                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none appearance-none cursor-pointer"
                  >
                    {OBJECTIVES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Advanced Settings Toggle */}
              <div className="p-6 bg-stone-50 dark:bg-stone-800/30 rounded-2xl space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-stone-400 mb-2 uppercase tracking-widest">Idioma</label>
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-white text-sm outline-none"
                    >
                      {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-400 mb-2 uppercase tracking-widest">Tamanho</label>
                    <select
                      value={formData.length}
                      onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-white text-sm outline-none"
                    >
                      {LENGTHS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-2 uppercase tracking-widest">Nº de Variações ({formData.count})</label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={formData.count}
                    onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) })}
                    className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    A criar magia...
                  </>
                ) : (
                  <>
                    <Sparkles size={24} />
                    Gerar Legendas
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="glass p-6 rounded-3xl border border-stone-200 dark:border-stone-800">
            <AdComponent format="rectangle" />
          </div>
        </section>

        {/* Results Section */}
        <section className="space-y-6">
          <AnimatePresence mode="wait">
            {!results && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-3xl text-stone-400 dark:text-stone-600"
              >
                <div className="w-20 h-20 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-6">
                  <PenTool size={40} className="text-stone-300 dark:text-stone-700" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">As tuas legendas aparecerão aqui</h3>
                <p className="text-sm max-w-xs mx-auto">Preenche o formulário à esquerda e clica em gerar para começar.</p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6"
              >
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-emerald-100 dark:border-emerald-900/20 border-t-emerald-600 rounded-full animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto text-emerald-600 animate-pulse w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-stone-900 dark:text-white">A IA está a escrever para ti...</p>
                  <p className="text-stone-500 dark:text-stone-400 italic">Isto demora apenas alguns segundos.</p>
                </div>
              </motion.div>
            )}

            {results && !loading && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Hashtags Card */}
                <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold">
                      <Hash className="text-emerald-600" size={20} />
                      <span>Hashtags Sugeridas</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(results.hashtags.join(' '), 999)}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      {copiedIndex === 999 ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar todas</>}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {results.hashtags.map((tag, i) => (
                      <span key={i} className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-100 dark:border-emerald-800/50">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between px-2">
                  <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
                    <MessageSquare size={20} className="text-emerald-600" />
                    Resultados ({results.captions.length})
                  </h3>
                  <button 
                    onClick={copyAll}
                    className="text-sm font-bold text-stone-500 hover:text-emerald-600 flex items-center gap-2 transition-colors"
                  >
                    {copyAllSuccess ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    Copiar Tudo
                  </button>
                </div>

                {/* Captions List */}
                <div className="space-y-4">
                  {results.captions.map((caption, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="card-premium group relative"
                    >
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="w-10 h-10 bg-stone-50 dark:bg-stone-800 rounded-xl flex items-center justify-center text-stone-400 dark:text-stone-500 font-black text-sm border border-stone-100 dark:border-stone-700">
                          {i + 1}
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => regenerateIndividual(i)}
                            className="p-3 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl text-stone-400 hover:text-emerald-600 transition-all"
                            title="Regenerar esta legenda"
                          >
                            <Loader2 size={20} className={loading ? "animate-spin" : ""} />
                          </button>
                          <button 
                            onClick={() => copyToClipboard(caption, i)}
                            className="p-3 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl text-stone-400 hover:text-emerald-600 transition-all"
                            title="Copiar"
                          >
                            {copiedIndex === i ? <Check size={20} /> : <Copy size={20} />}
                          </button>
                          <button 
                            onClick={() => saveToFavorites(caption, i)}
                            disabled={savedIndices.includes(i)}
                            className={cn(
                              "p-3 rounded-xl transition-all",
                              savedIndices.includes(i) 
                                ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" 
                                : "text-stone-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                            )}
                            title="Favoritar"
                          >
                            <Star size={20} fill={savedIndices.includes(i) ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 whitespace-pre-wrap leading-relaxed text-lg">{caption}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}


