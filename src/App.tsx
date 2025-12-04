import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Users, Download, Check, Star, Clock, Shield, Mail, Phone, ChevronDown, CreditCard, Gift, Sparkles, Award, Target, Lock, Book, Sparkle, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

// Definição de tipos TypeScript
interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

// Nova paleta de cores
const COLORS = {
  blue: '#2E88FF',     // Azul Esperança
  yellow: '#FFD449',   // Amarelo Luz
  green: '#7ACB72',    // Verde Vida
  orange: '#FF8A42',   // Laranja Calor
  gray: '#F4F4F4',     // Cinza Suave
  black: '#1E1E1E',    // Preto Amável
};

export default function LandingPageRemaViva() {
  // Estados com tipos explícitos
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({ nome: '', email: '', whatsapp: '' });
  
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

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
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }
    
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/FORM_ID/formResponse';
    
    const form = new FormData();
    form.append('entry.1234567890', formData.nome);
    form.append('entry.0987654321', formData.email);
    if (formData.whatsapp) {
      form.append('entry.1357924680', formData.whatsapp);
    }

    fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: form
    }).then(() => {
      toast.success('🎉 Obrigado! Verifique seu e-mail para baixar a lição gratuita.');
      setShowFreeModal(false);
      setFormData({ nome: '', email: '', whatsapp: '' });
    }).catch(() => {
      toast.success('✅ Recebemos seus dados! Você receberá o material em breve.');
      setShowFreeModal(false);
    });
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => {
      const newState = { ...prev };
      newState[index] = !prev[index];
      return newState;
    });
  };

  const handleMonthlySubscription = () => {
    toast.loading('Redirecionando para pagamento...');
    setTimeout(() => {
      toast.dismiss();
      toast.success('Redirecionando para checkout do Pagar.me!');
    }, 1500);
  };

  const handleYearlySubscription = () => {
    toast.loading('Redirecionando para pagamento...');
    setTimeout(() => {
      toast.dismiss();
      toast.success('Redirecionando para checkout do Pagar.me!');
    }, 1500);
  };

  const painPoints = [
    'Passar horas pesquisando e preparando cada lição',
    'Falta de material cristocêntrico e teologicamente sólido',
    'Dificuldade em encontrar atividades apropriadas para cada idade',
    'Conteúdo genérico que não reflete a doutrina reformada',
    'Sensação de estar improvisando a cada semana'
  ];

  const solutions = [
    'Lições completas e prontas para usar imediatamente',
    'Conteúdo 100% cristocêntrico e fiel às Escrituras',
    'Atividades pedagógicas desenvolvidas por especialistas',
    'Alinhamento total com a teologia calvinista/presbiteriana',
    'Materiais visuais profissionais inclusos'
  ];

  const testimonials: Testimonial[] = [
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
  ];

  const faqItems: FAQItem[] = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white">
      {/* Hero Section - Azul Esperança + Amarelo Luz */}
      <header 
        className="text-white relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.green} 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4"
                style={{ 
                  backgroundColor: `${COLORS.yellow}20`, 
                  color: COLORS.yellow,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Sparkle className="w-4 h-4" />
                Material Cristocêntrico e Fiel à Doutrina Reformada
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transforme a Fé dos Seus Filhos com Lições Bíblicas{' '}
                <span style={{ color: COLORS.yellow }}>Inesquecíveis</span>
              </h1>
              
              <p className="text-xl opacity-90">
                Conteúdo cristocêntrico e fiel à teologia calvinista, pronto para usar. 
                Economize horas de preparação e ministre com excelência.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => setShowFreeModal(true)}
                  className="px-8 py-4 rounded-lg text-xl font-bold transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
                  style={{ 
                    backgroundColor: COLORS.yellow,
                    color: COLORS.black
                  }}
                >
                  <Download className="w-6 h-6" />
                  Baixe a Lição Gratuita Agora!
                </button>
                
                <a 
                  href="#planos" 
                  className="px-8 py-4 rounded-lg text-xl font-bold border-2 transition-all transform hover:scale-105 flex items-center gap-2"
                  style={{ 
                    borderColor: 'white',
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Book className="w-6 h-6" />
                  Ver Planos
                </a>
              </div>
              
              <p className="text-sm opacity-80">
                🎁 Sem compromisso • Acesso imediato • 100% gratuito
              </p>
            </div>
            
            <div className="relative">
              <div 
                className="rounded-2xl p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&crop=face" 
                    alt="Jesus ensinando crianças" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div 
                  className="absolute -top-3 -right-3 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
                  style={{ backgroundColor: COLORS.green }}
                >
                  <Award className="w-4 h-4" />
                  Material Testado ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Autoridade - Verde Vida + Cinza Suave */}
      <section className="py-8" style={{ backgroundColor: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" style={{ color: COLORS.green }} />
              <div className="text-left">
                <p className="font-bold" style={{ color: COLORS.black }}>Editora Rema Viva</p>
                <p className="text-sm" style={{ color: COLORS.black, opacity: 0.7 }}>Fidelidade Reformada</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" style={{ color: COLORS.blue }} />
              <div className="text-left">
                <p className="font-bold" style={{ color: COLORS.black }}>Teologia Calvinista</p>
                <p className="text-sm" style={{ color: COLORS.black, opacity: 0.7 }}>Doutrina Presbiteriana</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" style={{ color: COLORS.orange }} />
              <div className="text-left">
                <p className="font-bold" style={{ color: COLORS.black }}>Aprovado por Líderes</p>
                <p className="text-sm" style={{ color: COLORS.black, opacity: 0.7 }}>Igrejas e Ministérios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dores vs Soluções - Laranja Calor vs Verde Vida */}
      <section className="py-20" style={{ backgroundColor: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 
            className="text-4xl font-bold text-center mb-4"
            style={{ color: COLORS.black }}
          >
            Pare de Perder Tempo Preparando Aulas
          </h2>
          <p className="text-xl text-center mb-16" style={{ color: COLORS.black, opacity: 0.7 }}>
            Você não está sozinho nestes desafios...
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dores - Laranja Calor */}
            <div 
              className="rounded-xl p-8 border-2"
              style={{ 
                backgroundColor: `${COLORS.orange}15`,
                borderColor: `${COLORS.orange}40`
              }}
            >
              <h3 
                className="text-2xl font-bold mb-6 flex items-center gap-2"
                style={{ color: COLORS.orange }}
              >
                <Zap className="w-6 h-6" />
                Desafios que Você Enfrenta
              </h3>
              <ul className="space-y-4">
                {painPoints.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span style={{ color: COLORS.orange, fontSize: '1.25rem' }}>✗</span>
                    <span style={{ color: COLORS.black }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soluções - Verde Vida */}
            <div 
              className="rounded-xl p-8 border-2"
              style={{ 
                backgroundColor: `${COLORS.green}15`,
                borderColor: `${COLORS.green}40`
              }}
            >
              <h3 
                className="text-2xl font-bold mb-6 flex items-center gap-2"
                style={{ color: COLORS.green }}
              >
                <Sparkle className="w-6 h-6" />
                Nossa Solução Para Você
              </h3>
              <ul className="space-y-4">
                {solutions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 flex-shrink-0" style={{ color: COLORS.green }} />
                    <span style={{ color: COLORS.black, fontWeight: '500' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Principal - Azul Esperança + Amarelo Luz */}
      <section 
        className="py-20 text-white relative overflow-hidden"
        id="assinatura"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.blue} 0%, #2563eb 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Assinatura Editora Rema Viva
            </h2>
            <p className="text-xl opacity-90">
              Acesso completo a todo o conteúdo premium
            </p>
          </div>

          {/* Timer de Escassez - Amarelo Luz */}
          <div 
            className="rounded-xl p-6 mb-12 max-w-2xl mx-auto shadow-2xl"
            style={{ 
              backgroundColor: COLORS.yellow,
              color: COLORS.black
            }}
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Clock className="w-8 h-8" />
              <p className="text-xl font-bold">Preço de Lançamento Termina em:</p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div 
                    className="px-4 py-2 rounded-lg text-2xl font-bold"
                    style={{ 
                      backgroundColor: COLORS.blue,
                      color: COLORS.yellow
                    }}
                  >
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-sm mt-1">Horas</div>
                </div>
                <div className="text-center">
                  <div 
                    className="px-4 py-2 rounded-lg text-2xl font-bold"
                    style={{ 
                      backgroundColor: COLORS.blue,
                      color: COLORS.yellow
                    }}
                  >
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-sm mt-1">Min</div>
                </div>
                <div className="text-center">
                  <div 
                    className="px-4 py-2 rounded-lg text-2xl font-bold"
                    style={{ 
                      backgroundColor: COLORS.blue,
                      color: COLORS.yellow
                    }}
                  >
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-sm mt-1">Seg</div>
                </div>
              </div>
            </div>
          </div>

          {/* Planos */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plano Mensal - Limpo */}
            <div 
              className="rounded-2xl p-8 shadow-2xl backdrop-blur-sm"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: COLORS.black
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Plano Mensal</h3>
              <div className="mb-6">
                <span 
                  className="text-5xl font-bold"
                  style={{ color: COLORS.blue }}
                >
                  R$ 47
                </span>
                <span className="opacity-70">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Lições semanais completas',
                  'Atividades prontas para imprimir',
                  'Guias para professores',
                  'Materiais visuais em PDF',
                  'Acesso imediato ao conteúdo',
                  'Cancele quando quiser'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleMonthlySubscription}
                className="w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: COLORS.blue,
                  color: 'white'
                }}
              >
                <CreditCard className="w-5 h-5" />
                Assinar Plano Mensal
              </button>
            </div>

            {/* Plano Anual - Destaque com Amarelo Luz */}
            <div 
              className="rounded-2xl p-8 shadow-2xl relative border-4 backdrop-blur-sm"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.blue} 100%)`,
                color: 'white',
                borderColor: COLORS.yellow
              }}
            >
              <div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg"
                style={{ 
                  backgroundColor: COLORS.yellow,
                  color: COLORS.black
                }}
              >
                <Gift className="w-4 h-4" />
                MELHOR OFERTA
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4">Plano Anual</h3>
              <div className="mb-2">
                <span className="opacity-70 line-through text-xl">R$ 564</span>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold">R$ 397</span>
                <span className="opacity-90">/ano</span>
                <div 
                  className="font-bold mt-2"
                  style={{ color: COLORS.yellow }}
                >
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
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5" style={{ color: COLORS.yellow }} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleYearlySubscription}
                className="w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: COLORS.yellow,
                  color: COLORS.black
                }}
              >
                <Target className="w-5 h-5" />
                Assinar Plano Anual (Melhor Preço)
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8 opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 opacity-80" />
              <img src="https://raw.githubusercontent.com/pagarme/brand/1d9b1d8329e10c5c5e2f5c6c17c6dc8b25f5d6d6/logotipos/pagarme-vertical-rosa.png" alt="Pagar.me" className="h-8 opacity-80" />
              <p className="opacity-90 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Pagamento 100% Seguro via Pagar.me
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social - Cinza Suave */}
      <section className="py-20" style={{ backgroundColor: COLORS.gray }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 
            className="text-4xl font-bold text-center mb-4"
            style={{ color: COLORS.black }}
          >
            O Que Dizem Nossos Parceiros
          </h2>
          <p 
            className="text-center mb-12"
            style={{ color: COLORS.black, opacity: 0.7 }}
          >
            Professores e líderes que já transformaram suas aulas
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                style={{ 
                  backgroundColor: 'white',
                  color: COLORS.black
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className="w-5 h-5 fill-current" 
                      style={{ color: COLORS.yellow }}
                    />
                  ))}
                </div>
                <p className="mb-4 italic opacity-90">"{testimonial.text}"</p>
                <div className="border-t pt-4" style={{ borderColor: `${COLORS.black}10` }}>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm opacity-70">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Cinza Suave */}
      <section className="py-20" style={{ backgroundColor: COLORS.gray }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 
            className="text-4xl font-bold text-center mb-12"
            style={{ color: COLORS.black }}
          >
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {faqItems.map((faq, index) => {
              const isOpen = faqOpen[index] || false;
              return (
                <div 
                  key={index} 
                  className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  style={{ 
                    backgroundColor: 'white',
                    color: COLORS.black
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-opacity-50 transition-colors"
                    style={{ 
                      backgroundColor: isOpen ? `${COLORS.blue}10` : 'transparent'
                    }}
                  >
                    <span className="font-bold">{faq.q}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      style={{ color: COLORS.blue }}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 opacity-90">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final - Verde Vida + Azul Esperança */}
      <section 
        className="py-20 text-white"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.blue} 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comece Hoje Mesmo a Transformar Suas Aulas
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a centenas de professores e líderes que já ensinam com excelência
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowFreeModal(true)}
              className="px-8 py-4 rounded-lg text-xl font-bold transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: COLORS.yellow,
                color: COLORS.black
              }}
            >
              <Download className="w-6 h-6" />
              Baixar Lição Gratuita
            </button>
            <a 
              href="#assinatura"
              className="px-8 py-4 rounded-lg text-xl font-bold transition-all transform hover:scale-105 shadow-2xl inline-block flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: 'white',
                color: COLORS.black
              }}
            >
              <Sparkles className="w-6 h-6" />
              Ver Planos de Assinatura
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Preto Amável */}
      <footer 
        className="py-12 text-white"
        style={{ backgroundColor: COLORS.black }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: COLORS.yellow }}
              >
                Editora Rema Viva
              </h3>
              <p style={{ color: '#888' }}>
                Ensinar a Bíblia às crianças não precisa ser difícil. Você não está sozinho.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <div className="space-y-2" style={{ color: '#888' }}>
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
              <div className="space-y-2" style={{ color: '#888' }}>
                <a 
                  href="https://www.instagram.com/editoraremaviva/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block hover:opacity-100 transition-opacity flex items-center gap-2"
                  style={{ color: COLORS.yellow, opacity: 0.8 }}
                >
                  <Heart className="w-4 h-4" />
                  Instagram @editoraremaviva
                </a>
              </div>
            </div>
          </div>
          <div 
            className="border-t pt-8 text-center text-sm"
            style={{ 
              borderColor: '#333',
              color: '#666'
            }}
          >
            <p>&copy; 2025 Editora Rema Viva. Todos os direitos reservados.</p>
            <div className="mt-2 space-x-4">
              <a 
                href="#" 
                className="hover:opacity-100 transition-opacity"
                style={{ color: COLORS.yellow, opacity: 0.8 }}
              >
                Termos de Uso
              </a>
              <a 
                href="#" 
                className="hover:opacity-100 transition-opacity"
                style={{ color: COLORS.yellow, opacity: 0.8 }}
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Material Gratuito - Branco com toques de cor */}
      {showFreeModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm" 
          onClick={() => setShowFreeModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-8 relative"
            style={{ color: COLORS.black }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowFreeModal(false)}
              className="absolute top-4 right-4 hover:opacity-70 transition-opacity"
              style={{ color: COLORS.black }}
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${COLORS.green}20` }}
              >
                <Download className="w-6 h-6" style={{ color: COLORS.green }} />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                🎁 Receba Sua Lição Gratuita
              </h3>
              <p className="opacity-70">
                Preencha os dados abaixo e receba imediatamente em seu e-mail:
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 opacity-80">
                  Nome Completo *
                </label>
                <input 
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: `${COLORS.black}20`,
                    backgroundColor: COLORS.gray
                  }}
                  placeholder="Seu nome"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 opacity-80">
                  E-mail *
                </label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: `${COLORS.black}20`,
                    backgroundColor: COLORS.gray
                  }}
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 opacity-80">
                  WhatsApp (opcional)
                </label>
                <input 
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: `${COLORS.black}20`,
                    backgroundColor: COLORS.gray
                  }}
                  placeholder="(14) 99999-9999"
                />
              </div>
              
              <button 
                onClick={handleSubmit}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.green} 100%)`,
                  color: 'white'
                }}
              >
                <Download className="w-5 h-5" />
                Enviar e Receber Material Grátis
              </button>
              
              <p className="text-xs text-center opacity-60 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                Seus dados estão seguros. Não compartilhamos com terceiros.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}