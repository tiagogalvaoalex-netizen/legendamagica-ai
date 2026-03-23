import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot, getDocs } from 'firebase/firestore';
import { Users, BarChart3, ShieldCheck, Search, ArrowUpRight, Filter, MoreVertical, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Admin() {
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalGenerations: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<'all' | 'free' | 'pro'>('all');

  // Simple admin check
  const isAdmin = user?.email === 'tiagogalvaoalex@gmail.com';

  useEffect(() => {
    if (!isAdmin) return;

    // Fetch users
    const usersQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(100));
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setStats(prev => ({ ...prev, totalUsers: snapshot.size }));
      setLoading(false);
    });

    // Fetch total generations count (simplified)
    const fetchStats = async () => {
      const genSnap = await getDocs(collection(db, 'generations'));
      setStats(prev => ({ ...prev, totalGenerations: genSnap.size }));
    };
    fetchStats();

    return () => unsubscribeUsers();
  }, [isAdmin]);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = 
        (u.displayName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (u.email?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesPlan = filterPlan === 'all' || u.plan === filterPlan;
      return matchesSearch && matchesPlan;
    });
  }, [users, searchTerm, filterPlan]);

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-white">Acesso Negado</h1>
        <p className="text-stone-500 dark:text-stone-400 max-w-sm">Não tens permissão para aceder a esta área administrativa.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="text-emerald-600" />
            Painel Admin
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">Visão geral do sistema e gestão de utilizadores.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 bg-stone-100 dark:bg-stone-800 px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Sistema Online
        </div>
      </header>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium"
        >
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <p className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-widest">Total Utilizadores</p>
          <p className="text-3xl font-bold text-stone-900 dark:text-white mt-1">{stats.totalUsers}</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium"
        >
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 size={24} />
          </div>
          <p className="text-stone-500 dark:text-stone-400 text-xs font-bold uppercase tracking-widest">Total Gerações</p>
          <p className="text-3xl font-bold text-stone-900 dark:text-white mt-1">{stats.totalGenerations}</p>
        </motion.div>
      </div>

      {/* Users Table */}
      <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-stone-100 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="font-bold text-xl text-stone-900 dark:text-white">Gestão de Utilizadores</h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" size={18} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar nome ou email..." 
                className="w-full pl-10 pr-4 py-2.5 border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-950 p-1 rounded-xl border border-stone-200 dark:border-stone-800">
              {(['all', 'free', 'pro'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPlan(p)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    filterPlan === p 
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm' 
                      : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
                  }`}
                >
                  {p === 'all' ? 'Todos' : p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-8 py-5">Utilizador</th>
                <th className="px-8 py-5">Plano</th>
                <th className="px-8 py-5">Créditos</th>
                <th className="px-8 py-5">Data Registo</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((u, i) => (
                  <motion.tr 
                    key={u.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700 rounded-xl flex items-center justify-center text-stone-600 dark:text-stone-400 font-bold text-sm uppercase shadow-sm">
                          {u.email?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-stone-900 dark:text-white">{u.displayName || 'Sem Nome'}</p>
                          <p className="text-xs text-stone-400 dark:text-stone-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        u.plan === 'pro' 
                          ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' 
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}>
                        {u.plan}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <Zap size={14} className={u.creditsRemaining > 0 ? 'text-amber-500' : 'text-stone-300'} />
                        <span className="text-sm font-medium text-stone-600 dark:text-stone-400">{u.creditsRemaining}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-stone-400 dark:text-stone-500">
                      {u.createdAt?.toDate?.()?.toLocaleDateString('pt-PT') || 'N/A'}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-stone-300 dark:text-stone-700 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                          <ArrowUpRight size={18} />
                        </button>
                        <button className="p-2 text-stone-300 dark:text-stone-700 hover:text-stone-900 dark:hover:text-white transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && !loading && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Search size={32} />
              </div>
              <p className="text-stone-500 dark:text-stone-400 font-medium">Nenhum utilizador encontrado para "{searchTerm}"</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
