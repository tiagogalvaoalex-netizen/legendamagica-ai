import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { 
  Star, 
  Trash2, 
  Copy, 
  Check, 
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Music2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PLATFORM_ICONS: Record<string, any> = {
  'Instagram': Instagram,
  'TikTok': Music2,
  'LinkedIn': Linkedin,
  'Facebook': Facebook,
  'X (Twitter)': Twitter,
};

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavorites(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'favorites');
    });

    return unsubscribe;
  }, [user]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'favorites', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `favorites/${id}`);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white">Favoritos</h1>
        <p className="text-stone-500 dark:text-stone-400">Suas melhores legendas guardadas com carinho.</p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-stone-400 dark:text-stone-600">
          <Star className="animate-pulse mr-2" />
          Carregando favoritos...
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 border-dashed">
          <Star size={48} className="mx-auto text-stone-200 dark:text-stone-800 mb-4" />
          <p className="text-stone-500 dark:text-stone-400 font-medium">Você ainda não salvou nenhuma legenda.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {favorites.map((fav) => {
              const Icon = PLATFORM_ICONS[fav.platform] || ExternalLink;
              return (
                <motion.div 
                  key={fav.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm group hover:border-yellow-200 dark:hover:border-yellow-900 transition-all flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-stone-50 dark:bg-stone-800 rounded-full border border-stone-100 dark:border-stone-700">
                      <Icon size={14} className="text-stone-600 dark:text-stone-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-500">{fav.platform}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyToClipboard(fav.caption, fav.id)}
                        className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
                        title="Copiar"
                      >
                        {copiedId === fav.id ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
                      </button>
                      <button 
                        onClick={() => handleDelete(fav.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-all"
                        title="Remover"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 whitespace-pre-wrap leading-relaxed flex-1">{fav.caption}</p>
                  <div className="mt-6 pt-4 border-t border-stone-50 dark:border-stone-800 text-[10px] text-stone-400 dark:text-stone-500 font-medium">
                    Salvo em {fav.createdAt?.toDate().toLocaleDateString()}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
