import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import History from './pages/History';
import Favorites from './pages/Favorites';
import Admin from './pages/Admin';
import SEOPage from './pages/SEOPage';
import { SEO_PAGES } from './seoData';
import { About, Contact, Privacy, Terms, Pricing, FAQ, NotFound } from './pages/StaticPages';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white">Carregando...</div>;
  return user ? <>{children}</> : <Navigate to="/" />;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/precos" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* SEO Content Pages */}
            {SEO_PAGES.map((page) => (
              <Route 
                key={page.path} 
                path={`/${page.path}`} 
                element={
                  <SEOPage 
                    title={page.title}
                    h1={page.h1}
                    description={page.description}
                    captions={page.captions}
                    platform={page.platform}
                  />
                } 
              />
            ))}

            {/* App Private Routes */}
            <Route
              path="/app/*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="generator" element={<Generator />} />
                      <Route path="history" element={<History />} />
                      <Route path="favorites" element={<Favorites />} />
                      <Route path="admin" element={<Admin />} />
                      <Route path="*" element={<Navigate to="dashboard" />} />
                    </Routes>
                  </Layout>
                </PrivateRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}
