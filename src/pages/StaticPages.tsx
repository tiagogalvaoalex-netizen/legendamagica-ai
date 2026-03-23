import PublicLayout from '../components/PublicLayout';
import { Link } from 'react-router-dom';
import { Mail, Shield, FileText, HelpCircle, User, CreditCard, Sparkles, Check } from 'lucide-react';

export function About() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-12 text-center">Sobre a LegendaMágica</h1>
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-8 text-stone-600 dark:text-stone-400 leading-relaxed text-lg">
          <p>
            A **LegendaMágica** nasceu de uma necessidade simples: a frustração de olhar para uma foto incrível e não saber o que escrever. Criada em Portugal, a nossa missão é democratizar o acesso à inteligência artificial para criadores de conteúdo, pequenos negócios e qualquer pessoa que queira brilhar nas redes sociais.
          </p>
          <p>
            Acreditamos que a tecnologia deve ser uma aliada da criatividade, não um obstáculo. Por isso, desenvolvemos uma ferramenta intuitiva que entende o teu tom de voz e o teu público, entregando resultados profissionais em segundos.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="card-premium">
              <Sparkles className="text-emerald-600 mb-4" />
              <h3 className="font-bold text-stone-900 dark:text-white mb-2">Inovação</h3>
              <p className="text-sm">Usamos os modelos de IA mais avançados do mundo para garantir qualidade e relevância.</p>
            </div>
            <div className="card-premium">
              <User className="text-emerald-600 mb-4" />
              <h3 className="font-bold text-stone-900 dark:text-white mb-2">Foco no Utilizador</h3>
              <p className="text-sm">Cada funcionalidade é desenhada a pensar na tua produtividade e facilidade de uso.</p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export function Contact() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <Mail className="mx-auto mb-8 w-16 h-16 text-emerald-600" />
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">Fala connosco</h1>
        <p className="text-xl text-stone-600 dark:text-stone-400 mb-12 max-w-xl mx-auto">
          Tens alguma dúvida, sugestão ou apenas queres dizer olá? Estamos aqui para ajudar.
        </p>
        <div className="card-premium inline-block">
          <p className="text-stone-900 dark:text-white font-bold text-2xl mb-2">suporte@legendamagica.com</p>
          <p className="text-stone-500 text-sm">Respondemos em menos de 24 horas úteis.</p>
        </div>
      </div>
    </PublicLayout>
  );
}

export function Privacy() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Shield className="mb-8 w-12 h-12 text-emerald-600" />
        <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-12">Política de Privacidade</h1>
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-stone-600 dark:text-stone-400">
          <p>A tua privacidade é importante para nós. Esta política explica como recolhemos, usamos e protegemos os teus dados.</p>
          <h3 className="text-stone-900 dark:text-white font-bold text-xl mt-8">1. Recolha de Dados</h3>
          <p>Recolhemos apenas as informações necessárias para o funcionamento do serviço, como o teu email para autenticação via Google.</p>
          <h3 className="text-stone-900 dark:text-white font-bold text-xl mt-8">2. Uso de IA</h3>
          <p>Os dados que inseres no gerador são processados por modelos de IA de terceiros (como o Google Gemini). Não partilhamos os teus dados pessoais com estes modelos.</p>
          <h3 className="text-stone-900 dark:text-white font-bold text-xl mt-8">3. Cookies</h3>
          <p>Usamos cookies para manter a tua sessão ativa e para análises anónimas de tráfego.</p>
        </div>
      </div>
    </PublicLayout>
  );
}

export function Terms() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-20">
        <FileText className="mb-8 w-12 h-12 text-emerald-600" />
        <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-12">Termos de Utilização</h1>
        <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-stone-600 dark:text-stone-400">
          <p>Ao usares a LegendaMágica, concordas com os seguintes termos.</p>
          <h3 className="text-stone-900 dark:text-white font-bold text-xl mt-8">1. Uso do Serviço</h3>
          <p>O serviço deve ser usado para fins lícitos. Não é permitido o uso de bots para extração massiva de dados.</p>
          <h3 className="text-stone-900 dark:text-white font-bold text-xl mt-8">2. Créditos e Pagamentos</h3>
          <p>Os créditos adquiridos não são reembolsáveis. Reservamo-nos o direito de alterar os preços a qualquer momento.</p>
          <h3 className="text-stone-900 dark:text-white font-bold text-xl mt-8">3. Responsabilidade</h3>
          <p>Não nos responsabilizamos pelo conteúdo gerado pela IA. Deves sempre rever as legendas antes de publicar.</p>
        </div>
      </div>
    </PublicLayout>
  );
}

export function Pricing() {
  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <CreditCard className="mx-auto mb-6 w-12 h-12 text-emerald-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">Planos Simples</h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            Escolhe o plano que melhor se adapta às tuas necessidades. Sem subscrições chatas, pagas apenas o que usas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card-premium flex flex-col">
            <h3 className="text-xl font-bold mb-2">Plano Grátis</h3>
            <p className="text-stone-500 text-sm mb-6">Ideal para testar a magia.</p>
            <div className="text-4xl font-bold mb-8">0€ <span className="text-lg font-normal text-stone-400">/sempre</span></div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-2 text-sm"><Check className="text-emerald-600" size={16} /> 5 Créditos Iniciais</li>
              <li className="flex items-center gap-2 text-sm"><Check className="text-emerald-600" size={16} /> Acesso ao Gerador IA</li>
              <li className="flex items-center gap-2 text-sm"><Check className="text-emerald-600" size={16} /> Histórico de Gerações</li>
              <li className="flex items-center gap-2 text-sm text-stone-400 italic opacity-60"><Check className="text-stone-300" size={16} /> Contém Anúncios</li>
            </ul>
            <Link to="/app/dashboard" className="w-full py-3 rounded-xl border border-stone-200 dark:border-stone-800 font-bold text-center hover:bg-stone-50 dark:hover:bg-stone-800 transition-all">
              Começar Grátis
            </Link>
          </div>

          <div className="card-premium border-emerald-500 dark:border-emerald-500 ring-4 ring-emerald-500/10 flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Mais Popular</div>
            <h3 className="text-xl font-bold mb-2">Plano Pro</h3>
            <p className="text-stone-500 text-sm mb-6">Para criadores e marcas sérias.</p>
            <div className="text-4xl font-bold mb-8">9.90€ <span className="text-lg font-normal text-stone-400">/pagamento único</span></div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-2 text-sm font-bold"><Check className="text-emerald-600" size={16} /> 100 Créditos</li>
              <li className="flex items-center gap-2 text-sm"><Check className="text-emerald-600" size={16} /> Suporte Prioritário</li>
              <li className="flex items-center gap-2 text-sm font-bold"><Check className="text-emerald-600" size={16} /> Sem Anúncios</li>
              <li className="flex items-center gap-2 text-sm"><Check className="text-emerald-600" size={16} /> Novas Funcionalidades Primeiro</li>
              <li className="flex items-center gap-2 text-sm"><Check className="text-emerald-600" size={16} /> Tons de Voz Exclusivos</li>
            </ul>
            <Link to="/app/dashboard" className="btn-primary text-center">
              Comprar Agora
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export function FAQ() {
  const faqs = [
    { q: "Como funcionam os créditos?", a: "Cada geração de legenda consome 1 crédito. No plano grátis recebes 5 créditos para testar o serviço." },
    { q: "As legendas são originais?", a: "Sim, a nossa IA gera conteúdo único baseado no teu tema e tom de voz, evitando repetições e conteúdo genérico." },
    { q: "Posso cancelar a qualquer momento?", a: "Não temos subscrições mensais. Pagas apenas pelos créditos que queres usar, sem renovações automáticas ou surpresas na fatura." },
    { q: "Em que idiomas posso gerar?", a: "Atualmente suportamos Português (PT e BR), Inglês e Espanhol. Mais idiomas serão adicionados em breve." },
    { q: "O que acontece se os meus créditos acabarem?", a: "Podes comprar mais créditos a qualquer momento através do teu painel de utilizador." }
  ];

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-6 py-20">
        <HelpCircle className="mx-auto mb-8 w-16 h-16 text-emerald-600" />
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-12 text-center">Perguntas Frequentes</h1>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="card-premium">
              <h3 className="font-bold text-stone-900 dark:text-white mb-3">{faq.q}</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center p-12 bg-stone-100 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">Ainda tens dúvidas?</h3>
          <p className="text-stone-600 dark:text-stone-400 mb-8">
            A nossa equipa está pronta para te ajudar com qualquer questão.
          </p>
          <Link to="/contacto" className="btn-primary inline-block">
            Contactar Suporte
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}

export function NotFound() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-9xl font-black text-stone-200 dark:text-stone-800 mb-8">404</h1>
        <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-6">Ups! Perdeste-te no caminho?</h2>
        <p className="text-xl text-stone-600 dark:text-stone-400 mb-12">
          A página que procuras não existe ou foi movida.
        </p>
        <Link to="/" className="btn-primary inline-block">
          Voltar ao Início
        </Link>
      </div>
    </PublicLayout>
  );
}
