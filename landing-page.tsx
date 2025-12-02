import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Users, Download, Check, Star, Clock, Shield, Mail, Phone, ChevronDown } from 'lucide-react';

export default function LandingPageRemaViva() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', whatsapp: '' });
  const [faqOpen, setFaqOpen] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (!formData.nome || !formData.email) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }
    // Integração com Google Forms será configurada aqui
    console.log('Dados enviados:', formData);
    alert('Obrigado! Verifique seu e-mail para baixar a lição gratuita.');
    setShowFreeModal(false);
    setFormData({ nome: '', email: '', whatsapp: '' });
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  ✨ Material Cristocêntrico e Fiel à Doutrina Reformada
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Transforme a Fé dos Seus Filhos com Lições Bíblicas Inesquecíveis
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Conteúdo cristocêntrico e fiel à teologia calvinista, pronto para usar. Economize horas de preparação e ministre com excelência.
              </p>
              <button 
                onClick={() => setShowFreeModal(true)}
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
              >
                <Download className="w-6 h-6" />
                Baixe a Lição Gratuita Agora!
              </button>
              <p className="text-sm mt-4 text-blue-200">
                🎁 Sem compromisso • Acesso imediato • 100% gratuito
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=600&fit=crop" 
                  alt="Jesus com crianças" 
                  className="rounded-lg w-full"
                />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                  Material Testado ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Autoridade */}
      <section className="bg-white py-8 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div className="text-left">
                <p className="font-bold text-gray-800">Editora Rema Viva</p>
                <p className="text-sm text-gray-600">Fidelidade Reformada</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <p className="font-bold text-gray-800">Teologia Calvinista</p>
                <p className="text-sm text-gray-600">Doutrina Presbiteriana</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-yellow-600" />
              <div className="text-left">
                <p className="font-bold text-gray-800">Aprovado por Líderes</p>
                <p className="text-sm text-gray-600">Igrejas e Ministérios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dores vs Soluções */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Pare de Perder Tempo Preparando Aulas
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Você não está sozinho nestes desafios...
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dores */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-red-800 flex items-center gap-2">
                😰 Desafios que Você Enfrenta
              </h3>
              <ul className="space-y-4">
                {[
                  'Passar horas pesquisando e preparando cada lição',
                  'Falta de material cristocêntrico e teologicamente sólido',
                  'Dificuldade em encontrar atividades apropriadas para cada idade',
                  'Conteúdo genérico que não reflete a doutrina reformada',
                  'Sensação de estar improvisando a cada semana'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soluções */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
                ✨ Nossa Solução Para Você
              </h3>
              <ul className="space-y-4">
                {[
                  'Lições completas e prontas para usar imediatamente',
                  'Conteúdo 100% cristocêntrico e fiel às Escrituras',
                  'Atividades pedagógicas desenvolvidas por especialistas',
                  'Alinhamento total com a teologia calvinista/presbiteriana',
                  'Materiais visuais profissionais inclusos'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Principal */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 text-white" id="assinatura">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Assinatura Editora Rema Viva
            </h2>
            <p className="text-xl text-blue-200">
              Acesso completo a todo o conteúdo premium
            </p>
          </div>

          {/* Timer de Escassez */}
          <div className="bg-yellow-400 text-blue-900 rounded-xl p-6 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Clock className="w-8 h-8" />
              <p className="text-xl font-bold">Preço de Lançamento Termina em:</p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="bg-blue-900 text-yellow-400 px-4 py-2 rounded-lg text-2xl font-bold">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-sm mt-1">Horas</div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-900 text-yellow-400 px-4 py-2 rounded-lg text-2xl font-bold">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-sm mt-1">Min</div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-900 text-yellow-400 px-4 py-2 rounded-lg text-2xl font-bold">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-sm mt-1">Seg</div>
                </div>
              </div>
            </div>
          </div>

          {/* Planos */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plano Mensal */}
            <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Plano Mensal</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-blue-600">R$ 47</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Lições semanais completas',
                  'Atividades prontas para imprimir',
                  'Guias para professores',
                  'Materiais visuais em PDF',
                  'Acesso imediato ao conteúdo',
                  'Cancele quando quiser'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
                Assinar Plano Mensal
              </button>
            </div>

            {/* Plano Anual */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-8 shadow-2xl relative border-4 border-yellow-400">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-green-900 px-6 py-2 rounded-full font-bold">
                🎉 MELHOR OFERTA
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4">Plano Anual</h3>
              <div className="mb-2">
                <span className="text-gray-300 line-through text-xl">R$ 564</span>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold">R$ 397</span>
                <span className="text-green-200">/ano</span>
                <div className="text-yellow-300 font-bold mt-2">
                  Economize R$ 167 (30% OFF)
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'TUDO do Plano Mensal',
                  '✨ 3 meses grátis',
                  '🎁 Bônus exclusivos',
                  '📚 E-books extras',
                  '🎯 Acesso prioritário a novos materiais',
                  '💎 Materiais especiais de datas comemorativas'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-yellow-300" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-yellow-400 text-green-900 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors">
                Assinar Plano Anual (Melhor Preço)
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8 opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 opacity-80" />
              <p className="text-blue-200">🔒 Pagamento 100% Seguro via Pagar.me</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            O Que Dizem Nossos Parceiros
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Professores e líderes que já transformaram suas aulas
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rev. João Silva',
                role: 'Pastor, Igreja Presbiteriana',
                text: 'Material de excelente qualidade teológica. Nossos professores economizam horas de preparação e as crianças estão aprendendo com profundidade.'
              },
              {
                name: 'Ana Paula',
                role: 'Professora Escola Dominical',
                text: 'Finalmente encontrei material que é fiel à doutrina reformada e ainda assim acessível para as crianças. As atividades são incríveis!'
              },
              {
                name: 'Marcos Costa',
                role: 'Líder Ministério Infantil',
                text: 'A abordagem cristocêntrica é exatamente o que precisávamos. As crianças estão engajadas e os pais elogiando o conteúdo.'
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'O conteúdo é mesmo fiel à teologia reformada?',
                a: 'Sim! Todo o material é desenvolvido com base nas Escrituras e alinhado com a Confissão de Fé de Westminster e os Catecismos. Nosso compromisso é com a fidelidade bíblica e doutrinária.'
              },
              {
                q: 'Com que frequência recebo novos materiais?',
                a: 'Os assinantes recebem lições semanais completas, totalizando 4 lições por mês. Além disso, disponibilizamos materiais especiais para datas comemorativas.'
              },
              {
                q: 'Posso cancelar a assinatura quando quiser?',
                a: 'Sim! Não há fidelidade. Você pode cancelar a qualquer momento sem custos adicionais. No plano mensal, o cancelamento vale a partir do próximo mês.'
              },
              {
                q: 'Os materiais são para qual faixa etária?',
                a: 'Oferecemos conteúdo segmentado por faixas etárias: Maternal (3-6 anos), Júnior (7-10 anos) e Adolescentes (11-14 anos), com abordagens pedagógicas adequadas.'
              },
              {
                q: 'Como acesso os materiais após a assinatura?',
                a: 'Imediatamente após a confirmação do pagamento, você recebe acesso à área de membros com todos os PDFs disponíveis para download e impressão.'
              },
              {
                q: 'Posso usar os materiais na minha igreja?',
                a: 'Sim! Os materiais podem ser usados livremente em igrejas, escolas bíblicas e ministérios cristãos. Você pode imprimir quantas cópias precisar para seu ministério.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${faqOpen[i] ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen[i] && (
                  <div className="px-6 pb-4 text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comece Hoje Mesmo a Transformar Suas Aulas
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a centenas de professores e líderes que já ensinam com excelência
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowFreeModal(true)}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl"
            >
              📥 Baixar Lição Gratuita
            </button>
            <a 
              href="#assinatura"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl inline-block"
            >
              ✨ Ver Planos de Assinatura
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Editora Rema Viva</h3>
              <p className="text-gray-400">
                Ensinar a Bíblia às crianças não precisa ser difícil. Você não está sozinho.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@editoraremaviva.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(14) 99999-9999</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Siga-nos</h4>
              <div className="space-y-2 text-gray-400">
                <a href="https://www.instagram.com/editoraremaviva/" target="_blank" rel="noopener noreferrer" className="block hover:text-yellow-400 transition-colors">
                  📱 Instagram @editoraremaviva
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Editora Rema Viva. Todos os direitos reservados.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-yellow-400 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Material Gratuito */}
      {showFreeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowFreeModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowFreeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              🎁 Receba Sua Lição Gratuita
            </h3>
            <p className="text-gray-600 mb-6">
              Preencha os dados abaixo e receba imediatamente em seu e-mail:
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Nome Completo *</label>
                <input 
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">E-mail *</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">WhatsApp (opcional)</label>
                <input 
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(14) 99999-9999"
                />
              </div>
              <button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-green-700 transition-all"
              >
                Enviar e Receber Material Grátis
              </button>
              <p className="text-xs text-gray-500 text-center">
                Seus dados estão seguros. Não compartilhamos com terceiros.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}