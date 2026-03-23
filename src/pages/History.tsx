import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { 
  History as HistoryIcon, 
  Trash2, 
  Copy, 
  Check, 
  Calendar,
  ExternalLink,
  Search,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Music2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PLATFORM_ICONS: Record<string, any> = {
  'Instagram': Instagram,
  'TikTok': Music2,
  'LinkedIn': Linkedin,
  'Facebook': Facebook,
  'X (Twitter)': Twitter,
};

export default function History() {
  const { user } = useAuth();
  const [generations, setGenerations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'generations'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGenerations(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'generations');
    });

    return unsubscribe;
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta geração?')) return;
    try {
      await deleteDoc(doc(db, 'generations', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `generations/${id}`);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredGenerations = generations.filter(gen => 
    gen.theme?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gen.platform?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white">Histórico</h1>
          <p className="text-stone-500 dark:text-stone-400">Todas as suas gerações anteriores em um só lugar.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por tema ou plataforma..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-80 transition-all"
          />
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-stone-400 dark:text-stone-600">
          <HistoryIcon className="animate-spin mr-2" />
          Carregando histórico...
        </div>
      ) : filteredGenerations.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 border-dashed">
          <HistoryIcon size={48} className="mx-auto text-stone-200 dark:text-stone-800 mb-4" />
          <p className="text-stone-500 dark:text-stone-400 font-medium">Nenhuma geração encontrada.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {filteredGenerations.map((gen) => (
              <motion.div 
                key={gen.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden"
              >
                <div className="p-4 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white dark:bg-stone-800 rounded-lg flex items-center justify-center text-stone-600 dark:text-stone-400 shadow-sm">
                      {PLATFORM_ICONS[gen.platform] ? (
                        (() => {
                          const Icon = PLATFORM_ICONS[gen.platform];
                          return <Icon size={18} />;
                        })()
                      ) : (
                        <ExternalLink size={16} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 dark:text-white text-sm">{gen.theme}</p>
                      <div className="flex items-center gap-2 text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest">
                        <span>{gen.platform}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          {gen.createdAt?.toDate().toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(gen.id)}
                    className="p-2 text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gen.results.map((caption: string, i: number) => (
                    <div key={i} className="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl relative group border border-transparent hover:border-emerald-200 dark:hover:border-emerald-900 transition-all">
                      <p className="text-sm text-stone-700 dark:text-stone-300 line-clamp-4 mb-2">{caption}</p>
                      <button 
                        onClick={() => copyToClipboard(caption, `${gen.id}-${i}`)}
                        className="absolute top-2 right-2 p-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                      >
                        {copiedId === `${gen.id}-${i}` ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
