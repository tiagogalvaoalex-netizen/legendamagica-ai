import { Link } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 border-b border-stone-200/50 dark:border-stone-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-stone-900 dark:text-white">
            <Sparkles className="text-emerald-600" />
            <span>LegendaMágica</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/legendas-instagram" className="text-stone-600 dark:text-stone-400 hover:text-emerald-600 transition-colors font-medium">Instagram</Link>
            <Link to="/legendas-tiktok" className="text-stone-600 dark:text-stone-400 hover:text-emerald-600 transition-colors font-medium">TikTok</Link>
            <Link to="/precos" className="text-stone-600 dark:text-stone-400 hover:text-emerald-600 transition-colors font-medium">Preços</Link>
            {user ? (
              <Link to="/app/dashboard" className="btn-primary px-6">Dashboard</Link>
            ) : (
              <Link to="/precos" className="btn-primary px-6">Começar Agora</Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-stone-900 dark:text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 p-6 space-y-4 animate-in slide-in-from-top duration-200">
            <Link to="/legendas-instagram" className="block text-stone-600 dark:text-stone-400 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Instagram</Link>
            <Link to="/legendas-tiktok" className="block text-stone-600 dark:text-stone-400 font-medium py-2" onClick={() => setIsMenuOpen(false)}>TikTok</Link>
            <Link to="/precos" className="block text-stone-600 dark:text-stone-400 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Preços</Link>
            <Link to={user ? "/app/dashboard" : "/precos"} className="block btn-primary text-center py-3" onClick={() => setIsMenuOpen(false)}>
              {user ? "Dashboard" : "Começar Agora"}
            </Link>
          </div>
        )}
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-stone-900 dark:text-white">
              <Sparkles className="text-emerald-600" />
              <span>LegendaMágica</span>
            </Link>
            <p className="text-stone-500 dark:text-stone-400 text-base leading-relaxed max-w-xs">
              A ferramenta de IA favorita dos criadores de conteúdo em Portugal. Criamos legendas virais que convertem seguidores em clientes.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Produto</h4>
            <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400">
              <li><Link to="/precos" className="hover:text-emerald-600 transition-colors">Preços e Planos</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-600 transition-colors">Perguntas Frequentes</Link></li>
              <li><Link to="/app/generator" className="hover:text-emerald-600 transition-colors">Gerador de Legendas</Link></li>
              <li><Link to="/app/dashboard" className="hover:text-emerald-600 transition-colors">Painel de Controlo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Recursos SEO</h4>
            <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400">
              <li><Link to="/legendas-instagram" className="hover:text-emerald-600 transition-colors">Legendas para Instagram</Link></li>
              <li><Link to="/legendas-tiktok" className="hover:text-emerald-600 transition-colors">Legendas para TikTok</Link></li>
              <li><Link to="/legendas-amor" className="hover:text-emerald-600 transition-colors">Legendas de Amor</Link></li>
              <li><Link to="/legendas-curtas" className="hover:text-emerald-600 transition-colors">Legendas Curtas</Link></li>
              <li><Link to="/legendas-engracadas" className="hover:text-emerald-600 transition-colors">Legendas Engraçadas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Institucional</h4>
            <ul className="space-y-4 text-sm text-stone-500 dark:text-stone-400">
              <li><Link to="/sobre" className="hover:text-emerald-600 transition-colors">Sobre Nós</Link></li>
              <li><Link to="/contacto" className="hover:text-emerald-600 transition-colors">Contacto</Link></li>
              <li><Link to="/privacidade" className="hover:text-emerald-600 transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/termos" className="hover:text-emerald-600 transition-colors">Termos de Serviço</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-stone-100 dark:border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-400 text-xs">
          <p>© 2026 LegendaMágica AI. Todos os direitos reservados.</p>
          <p>Feito com ✨ para criadores em Portugal.</p>
        </div>
      </footer>
    </div>
  );
}
