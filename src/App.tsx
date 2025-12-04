import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Users, Download, Check, Star, Clock, Shield, Mail, Phone, ChevronDown, CreditCard, Gift, Sparkles, Award, Target, Lock } from 'lucide-react';
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

// URLs DO MERCADO PAGO (SEUS LINKS)
const MERCADO_PAGO_LINKS = {
  serie1: 'https://mpago.li/1QAb8kq',     // R$ 19,90 - Série quem é Jesus? - lição 1
  kit3: 'https://mpago.la/2AdPPmt',       // R$ 49,90 - Kit com 3 lições
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

  // Função para material GRATUITO
  const handleSubmit = () => {
    if (!formData.nome || !formData.email) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }
    
    // CONFIGURAÇÃO DO SEU GOOGLE FORMS
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
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Funções para MERCADO PAGO
  const handleSerie1 = () => {
    toast.loading('Redirecionando para Mercado Pago...');
    setTimeout(() => {
      toast.dismiss();
      window.open(MERCADO_PAGO_LINKS.serie1, '_blank');
      toast.success('Abrindo checkout do Mercado Pago!');
    }, 1500);
  };

  const handleKit3 = () => {
    toast.loading('Redirecionando para Mercado Pago...');
    setTimeout(() => {
      toast.dismiss();
      window.open(MERCADO_PAGO_LINKS.kit3, '_blank');
      toast.success('Abrindo checkout do Mercado Pago!');
    }, 1500);
  };

  // Dados para renderização
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
      q: 'Como recebo o material após o pagamento?',
      a: 'Imediatamente após a confirmação do pagamento pelo Mercado Pago, você receberá um email com os links de download. O processo é automático e leva apenas alguns minutos.'
    },
    {
      q: 'Posso cancelar a assinatura quando quiser?',
      a: 'Não há assinatura! Você compra uma vez e tem acesso vitalício ao material. Não há cobranças recorrentes.'
    },
    {
      q: 'Os materiais são para qual faixa etária?',
      a: 'Oferecemos conteúdo segmentado por faixas etárias: Maternal (3-6 anos), Júnior (7-10 anos) e Adolescentes (11-14 anos), com abordagens pedagógicas adequadas.'
    },
    {
      q: 'Como acesso os materiais após a compra?',
      a: 'Imediatamente após a confirmação do pagamento, você recebe acesso ao material para download e impressão.'
    },
    {
      q: 'Posso usar os materiais na minha igreja?',
      a: 'Sim! Os materiais podem ser usados livremente em igrejas, escolas bíblicas e ministérios cristãos. Você pode imprimir quantas cópias precisar para seu ministério.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section - EXATAMENTE IGUAL AO ORIGINAL, mas com novas cores */}
      <header 
        className="text-white"
        style={{ 
          background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.green})`
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div 
                  className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4"
                  style={{ 
                    backgroundColor: COLORS.yellow,
                    color: COLORS.black
                  }}
                >
                  ✨ Material Cristocêntrico e Fiel à Doutrina Reformada
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Transforme a Fé dos Seus Filhos com Lições Bíblicas Inesquecíveis
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Conteúdo cristocêntrico e fiel à teologia calvinista, pronto para usar. Economize horas de preparação e ministre com excelência.
              </p>
              <button 
                onClick={() => setShowFreeModal(true)}
                className="px-8 py-4 rounded-lg text-xl font-bold hover:scale-105 transition-all shadow-2xl flex items-center gap-2"
                style={{ 
                  backgroundColor: COLORS.yellow,
                  color: COLORS.black
                }}
              >
                <Download className="w-6 h-6" />
                Baixe a Lição Gratuita Agora!
              </button>
              <p className="text-sm mt-4 opacity-80">
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
                <div 
                  className="absolute -top-4 -right-4 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  style={{ backgroundColor: COLORS.green }}
                >
                  Material Testado ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Autoridade - MESMA SEÇÃO */}
      <section className="bg-white py-8 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" style={{ color: COLORS.blue }} />
              <div className="text-left">
                <p className="font-bold text-gray-800">Editora Rema Viva</p>
                <p className="text-sm text-gray-600">Fidelidade Reformada</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" style={{ color: COLORS.green }} />
              <div className="text-left">
                <p className="font-bold text-gray-800">Teologia Calvinista</p>
                <p className="text-sm text-gray-600">Doutrina Presbiteriana</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" style={{ color: COLORS.orange }} />
              <div className="text-left">
                <p className="font-bold text-gray-800">Aprovado por Líderes</p>
                <p className="text-sm text-gray-600">Igrejas e Ministérios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dores vs Soluções - MESMA SEÇÃO */}
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
            <div 
              className="rounded-xl p-8 border-2"
              style={{ 
                backgroundColor: `${COLORS.orange}15`,
                borderColor: `${COLORS.orange}40`
              }}
            >
              <h3 className="text-2xl font-bold mb-6 text-red-800 flex items-center gap-2">
                😰 Desafios que Você Enfrenta
              </h3>
              <ul className="space-y-4">
                {painPoints.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: COLORS.orange, fontSize: '1.25rem' }}>✗</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soluções */}
            <div 
              className="rounded-xl p-8 border-2"
              style={{ 
                backgroundColor: `${COLORS.green}15`,
                borderColor: `${COLORS.green}40`
              }}
            >
              <h3 className="text-2xl font-bold mb-6 text-green-800 flex items-center gap-2">
                ✨ Nossa Solução Para Você
              </h3>
              <ul className="space-y-4">
                {solutions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-6 h-6 flex-shrink-0" style={{ color: COLORS.green }} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Principal - ATUALIZADA COM NOVOS PREÇOS */}
      <section 
        className="py-20 text-white"
        id="assinatura"
        style={{ 
          background: `linear-gradient(to bottom right, ${COLORS.blue}, ${COLORS.green})`
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Materiais Editora Rema Viva
            </h2>
            <p className="text-xl opacity-90">
              Escolha entre o material gratuito ou adquira nossas lições completas
            </p>
          </div>

          {/* Timer de Escassez */}
          <div 
            className="rounded-xl p-6 mb-12 max-w-2xl mx-auto"
            style={{ 
              backgroundColor: COLORS.yellow,
              color: COLORS.black
            }}
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Clock className="w-8 h-8" />
              <p className="text-xl font-bold">Preço Promocional por tempo limitado:</p>
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

          {/* Produtos - 3 OPÇÕES */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* GRATUITO */}
            <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Material Gratuito</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold" style={{ color: COLORS.green }}>R$ 0</span>
                <span className="text-gray-600">/grátis</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Lição amostra da série',
                  'Atividades básicas incluídas',
                  'Acesso imediato após cadastro',
                  'Sem necessidade de pagamento'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setShowFreeModal(true)}
                className="w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: COLORS.blue,
                  color: 'white'
                }}
              >
                <Download className="w-5 h-5" />
                Baixar Grátis
              </button>
            </div>

            {/* SÉRIE 1 - R$ 19,90 */}
            <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Série: Quem é Jesus?</h3>
              <p className="text-gray-600 mb-2">Lição 1 - Jesus: Filho de Deus</p>
              <div className="mb-6">
                <span className="text-5xl font-bold" style={{ color: COLORS.blue }}>R$ 19,90</span>
                <span className="text-gray-600">/único</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Lição completa em PDF',
                  'Guia do professor detalhado',
                  'Atividades extras inclusas',
                  'Acesso vitalício',
                  'Material para imprimir',
                  '100% cristocêntrico'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5" style={{ color: COLORS.blue }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleSerie1}
                className="w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: COLORS.blue,
                  color: 'white'
                }}
              >
                <CreditCard className="w-5 h-5" />
                Comprar Agora R$ 19,90
              </button>
            </div>

            {/* KIT 3 LIÇÕES - R$ 49,90 */}
            <div className="rounded-2xl p-8 shadow-2xl relative border-4"
              style={{ 
                background: `linear-gradient(to bottom right, ${COLORS.green}, ${COLORS.blue})`,
                color: 'white',
                borderColor: COLORS.yellow
              }}
            >
              <div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded-full font-bold"
                style={{ 
                  backgroundColor: COLORS.yellow,
                  color: COLORS.black
                }}
              >
                🎉 MELHOR OFERTA
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4">Kit Completo</h3>
              <p className="opacity-90 mb-2">3 primeiras lições da série</p>
              <div className="mb-2">
                <span className="opacity-70 line-through text-xl">R$ 59,70</span>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold">R$ 49,90</span>
                <span className="opacity-90">/kit completo</span>
                <div className="font-bold mt-2" style={{ color: COLORS.yellow }}>
                  Economize R$ 9,80 (16% OFF)
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  '3 lições completas da série',
                  'Todos os guias do professor',
                  'Atividades extras exclusivas',
                  'Materiais visuais profissionais',
                  'Acesso vitalício a tudo',
                  'Bônus: plano de aulas'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5" style={{ color: COLORS.yellow }} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleKit3}
                className="w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: COLORS.yellow,
                  color: COLORS.black
                }}
              >
                <Target className="w-5 h-5" />
                Comprar Kit R$ 49,90
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <img 
                src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.9/mercadopago/logo__large_plus.png" 
                alt="Mercado Pago" 
                className="h-8"
              />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8 opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 opacity-80" />
              <p className="opacity-90 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Pagamento 100% Seguro via Mercado Pago
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social - MESMA SEÇÃO */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            O Que Dizem Nossos Parceiros
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Professores e líderes que já transformaram suas aulas
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
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

      {/* FAQ - MESMA SEÇÃO */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {faqItems.map((faq, i) => (
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

      {/* CTA Final - MESMA SEÇÃO */}
      <section 
        className="py-20 text-white"
        style={{ 
          background: `linear-gradient(to right, ${COLORS.green}, ${COLORS.blue})`
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
              className="px-8 py-4 rounded-lg text-xl font-bold hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: COLORS.yellow,
                color: COLORS.black
              }}
            >
              📥 Baixar Lição Gratuita
            </button>
            <a 
              href="#assinatura"
              className="px-8 py-4 rounded-lg text-xl font-bold hover:scale-105 transition-all shadow-2xl inline-block flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: 'white',
                color: COLORS.black
              }}
            >
              ✨ Ver Produtos
            </a>
          </div>
        </div>
      </section>

      {/* Footer - MESMA SEÇÃO */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.yellow }}>Editora Rema Viva</h3>
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

      {/* Modal Material Gratuito - MESMA SEÇÃO */}
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
                className="w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.green})`,
                  color: 'white'
                }}
              >
                <Download className="w-5 h-5" />
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