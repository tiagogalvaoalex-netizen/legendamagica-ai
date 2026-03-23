import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { cn } from '../utils';
import { 
  LayoutDashboard, 
  PenTool, 
  History, 
  Star, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { logout, user, profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Gerador', path: '/app/generator', icon: PenTool },
    { name: 'Histórico', path: '/app/history', icon: History },
    { name: 'Favoritos', path: '/app/favorites', icon: Star },
  ];

  const isAdmin = user?.email === 'tiagogalvaoalex@gmail.com';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col md:flex-row transition-colors duration-200">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 p-4 flex items-center justify-between sticky top-0 z-50">
        <Link to="/app/dashboard" className="flex items-center gap-2 font-bold text-xl text-stone-900 dark:text-white">
          <Sparkles className="text-emerald-600" />
          <span>LegendaMágica</span>
        </Link>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="dark:text-white" /> : <Menu className="dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-0 z-40 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 w-64 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col p-6">
          <div className="hidden md:flex items-center justify-between mb-10">
            <div className="flex items-center gap-2 font-bold text-2xl text-stone-900 dark:text-white">
              <Sparkles className="text-emerald-600" />
              <span>LegendaMágica</span>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                    isActive 
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium" 
                      : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                  )}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/app/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                  location.pathname === '/app/admin' 
                    ? "bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium" 
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                )}
              >
                <ShieldCheck size={20} />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          <div className="mt-auto pt-6 border-t border-stone-100 dark:border-stone-800">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-4 py-3 w-full text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors mb-2"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              <span>{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
            </button>
            <div className="flex items-center gap-3 px-4 py-3 mb-4">
              <img 
                src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border border-stone-200 dark:border-stone-700"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-stone-900 dark:text-white truncate">{user?.displayName}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wider font-bold">
                  Plano {profile?.plan}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-stone-600 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
