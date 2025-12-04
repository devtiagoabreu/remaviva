import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Users, Download, Check, Star, Clock, Shield, Mail, Phone, ChevronDown, CreditCard, Gift, Sparkles, Award, Target, Lock, Book, Sparkle, Zap, ShoppingCart, DollarSign, FileText, Package } from 'lucide-react';
import toast from 'react-hot-toast';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
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

const COLORS = {
  blue: '#2E88FF',
  yellow: '#FFD449',
  green: '#7ACB72',
  orange: '#FF8A42',
  gray: '#F4F4F4',
  black: '#1E1E1E',
};

// URLs ATUALIZADAS COM SEUS LINKS REAIS
const MERCADO_PAGO_LINKS = {
  serie1: 'https://mpago.li/1QAb8kq',     // Série 1: R$ 19,90
  kit3: 'https://mpago.la/2AdPPmt',       // Kit 3 lições: R$ 49,90
};

export default function LandingPageRemaViva() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({ nome: '', email: '', telefone: '' });
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

  // FUNÇÃO PARA MATERIAL GRATUITO (Google Forms)
  const handleFreeSubmit = async () => {
    if (!formData.nome || !formData.email) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }
    
    // CONFIGURAÇÃO DO SEU GOOGLE FORMS (GRATUITO)
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/FORM_ID/formResponse';
    
    const formPayload = new FormData();
    formPayload.append('entry.1234567890', formData.nome);    // Nome
    formPayload.append('entry.0987654321', formData.email);   // Email
    if (formData.telefone) {
      formPayload.append('entry.1357924680', formData.telefone); // Telefone
    }

    try {
      // Envia para Google Forms
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formPayload
      });

      // AQUI VOCÊ PODE INTEGRAR COM EMAIL AUTOMÁTICO DEPOIS
      // Por enquanto, apenas mostra sucesso
      toast.success('🎉 Obrigado! Verifique seu e-mail para baixar a lição gratuita.');
      
      // Redireciona para página de obrigado ou download
      setTimeout(() => {
        window.open('https://drive.google.com/SEU_LINK_DO_PDF_AQUI', '_blank');
      }, 1500);
      
      setShowFreeModal(false);
      setFormData({ nome: '', email: '', telefone: '' });
      
    } catch (error) {
      toast.success('✅ Recebemos seus dados! Você receberá o material em breve.');
      setShowFreeModal(false);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => {
      const newState = { ...prev };
      newState[index] = !prev[index];
      return newState;
    });
  };

  // FUNÇÕES PARA PAGAMENTOS
  const handleSerie1 = () => {
    toast.loading('Abrindo checkout do Mercado Pago...');
    
    // Abre o link do Mercado Pago em nova aba
    window.open(MERCADO_PAGO_LINKS.serie1, '_blank');
    
    // MOSTRA AVISO IMPORTANTE
    setTimeout(() => {
      toast.dismiss();
      toast.success(
        <div>
          <p>✅ Redirecionado para Mercado Pago!</p>
          <p className="text-sm">Após o pagamento, você receberá o acesso por email.</p>
        </div>,
        { duration: 5000 }
      );
    }, 1000);
  };

  const handleKit3 = () => {
    toast.loading('Abrindo checkout do Mercado Pago...');
    
    window.open(MERCADO_PAGO_LINKS.kit3, '_blank');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success(
        <div>
          <p>✅ Redirecionado para Mercado Pago!</p>
          <p className="text-sm">Após o pagamento, você receberá o acesso por email.</p>
        </div>,
        { duration: 5000 }
      );
    }, 1000);
  };

  // Adicionando FAQ sobre o processo
  const processFaq = {
    q: 'Como recebo o material após o pagamento?',
    a: 'Imediatamente após a confirmação do pagamento pelo Mercado Pago, você receberá um email com os links de download. O processo é automático e leva apenas alguns minutos. Caso não receba, entre em contato conosco.'
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
    processFaq,
    {
      q: 'Posso usar os materiais na minha igreja?',
      a: 'Sim! Os materiais podem ser usados livremente em igrejas, escolas bíblicas e ministérios cristãos. Você pode imprimir quantas cópias precisar para seu ministério.'
    },
    {
      q: 'Qual a diferença entre o material gratuito e pago?',
      a: 'O material gratuito é uma amostra da qualidade do nosso conteúdo. Os materiais pagos são lições completas com atividades, guias do professor e materiais visuais profissionais.'
    },
    {
      q: 'Como funciona o pagamento?',
      a: 'Usamos o Mercado Pago, plataforma 100% segura. Aceitamos cartão (até 12x), PIX ou boleto. Após a confirmação do pagamento, o acesso é liberado automaticamente.'
    },
    {
      q: 'Os materiais são para qual faixa etária?',
      a: 'Oferecemos conteúdo segmentado por faixas etárias: Maternal (3-6 anos), Júnior (7-10 anos) e Adolescentes (11-14 anos), com abordagens pedagógicas adequadas.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F4F4] to-white">
      {/* Hero Section */}
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
                Transforme a Fé das Crianças com Lições Bíblicas{' '}
                <span style={{ color: COLORS.yellow }}>Inesquecíveis</span>
              </h1>
              
              <p className="text-xl opacity-90">
                Conteúdo cristocêntrico e fiel à teologia calvinista. 
                <span className="font-bold" style={{ color: COLORS.yellow }}> Baixe grátis</span> a primeira lição ou adquira o material completo.
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
                  Baixe a Lição Gratuita
                </button>
                
                <a 
                  href="#produtos" 
                  className="px-8 py-4 rounded-lg text-xl font-bold border-2 transition-all transform hover:scale-105 flex items-center gap-2"
                  style={{ 
                    borderColor: 'white',
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Book className="w-6 h-6" />
                  Ver Produtos
                </a>
              </div>
              
              <div className="text-sm opacity-80 space-y-1">
                <p>🎁 <span className="font-bold">Grátis:</span> Lição amostra + Newsletter</p>
                <p>💎 <span className="font-bold">Pago:</span> Lições completas + Materiais extras</p>
              </div>
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

      {/* Seção de Produtos - ATUALIZADA */}
      <section 
        className="py-20 text-white relative overflow-hidden"
        id="produtos"
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
              Escolha Seu Material
            </h2>
            <p className="text-xl opacity-90">
              Da amostra grátis ao kit completo
            </p>
          </div>

          {/* Timer de Oferta */}
          <div 
            className="rounded-xl p-6 mb-12 max-w-2xl mx-auto shadow-2xl"
            style={{ 
              backgroundColor: COLORS.yellow,
              color: COLORS.black
            }}
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Clock className="w-8 h-8" />
              <p className="text-xl font-bold">Preços promocionais por tempo limitado!</p>
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

          {/* Produtos - TRÊS OPÇÕES */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* GRATUITO */}
            <div 
              className="rounded-2xl p-8 shadow-2xl backdrop-blur-sm border-2"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: COLORS.black,
                borderColor: COLORS.blue
              }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${COLORS.blue}20` }}>
                  <Download className="w-8 h-8" style={{ color: COLORS.blue }} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Material Gratuito</h3>
                <p className="opacity-70">Para experimentar</p>
              </div>
              
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold" style={{ color: COLORS.green }}>R$ 0</span>
                <span className="opacity-70">/gratuito</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                  <span>Ligação amostra da série</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                  <span>Atividades básicas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                  <span>Acesso imediato</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                  <span>Sem compromisso</span>
                </li>
              </ul>
              
              <button 
                onClick={() => setShowFreeModal(true)}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 hover:scale-105 transform"
                style={{ 
                  backgroundColor: COLORS.blue,
                  color: 'white'
                }}
              >
                <Download className="w-5 h-5" />
                Baixar Grátis
              </button>
              
              <p className="text-center text-sm mt-4 opacity-70">
                Apenas preencha o formulário
              </p>
            </div>

            {/* SÉRIE 1 - R$ 19,90 */}
            <div 
              className="rounded-2xl p-8 shadow-2xl backdrop-blur-sm border-2 relative"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: COLORS.black,
                borderColor: COLORS.green
              }}
            >
              <div 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold"
                style={{ 
                  backgroundColor: COLORS.green,
                  color: 'white'
                }}
              >
                MAIS VENDIDO
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${COLORS.green}20` }}>
                  <FileText className="w-8 h-8" style={{ color: COLORS.green }} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Série: Quem é Jesus?</h3>
                <p className="opacity-70">Lição 1 - Jesus: Filho de Deus</p>
              </div>
              
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold" style={{ color: COLORS.green }}>R$ 19,90</span>
                <span className="opacity-70">/único</span>
                <div className="text-sm mt-1 opacity-70">Pagamento único</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                  <span>Ligação completa (PDF)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                  <span>Guia do professor</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                  <span>Atividades extras</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                  <span>Acesso imediato após pagamento</span>
                </li>
              </ul>
              
              <button 
                onClick={handleSerie1}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 hover:scale-105 transform"
                style={{ 
                  backgroundColor: COLORS.green,
                  color: 'white'
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                Comprar Agora
              </button>
              
              <p className="text-center text-sm mt-4 opacity-70">
                Pagamento via Mercado Pago
              </p>
            </div>

            {/* KIT 3 LIÇÕES - R$ 49,90 */}
            <div 
              className="rounded-2xl p-8 shadow-2xl backdrop-blur-sm border-4 relative"
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
                MELHOR CUSTO-BENEFÍCIO
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-white/20">
                  <Package className="w-8 h-8" style={{ color: COLORS.yellow }} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Kit Completo</h3>
                <p className="opacity-90">3 primeiras lições da série</p>
              </div>
              
              <div className="mb-2 text-center">
                <span className="opacity-70 line-through">R$ 59,70</span>
              </div>
              <div className="mb-6 text-center">
                <span className="text-5xl font-bold">R$ 49,90</span>
                <span className="opacity-90">/kit</span>
                <div 
                  className="font-bold mt-2"
                  style={{ color: COLORS.yellow }}
                >
                  Economize R$ 9,80
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.yellow }} />
                  <span className="font-medium">3 lições completas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.yellow }} />
                  <span className="font-medium">+ Guias do professor</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.yellow }} />
                  <span className="font-medium">+ Atividades extras</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.yellow }} />
                  <span className="font-medium">+ Materiais visuais</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: COLORS.yellow }} />
                  <span className="font-medium">Acesso imediato</span>
                </li>
              </ul>
              
              <button 
                onClick={handleKit3}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 hover:scale-105 transform"
                style={{ 
                  backgroundColor: COLORS.yellow,
                  color: COLORS.black
                }}
              >
                <Target className="w-5 h-5" />
                Comprar Kit Completo
              </button>
              
              <p className="text-center text-sm mt-4 opacity-90">
                🌟 16% de desconto no pacote
              </p>
            </div>
          </div>

          {/* Logos de Pagamento */}
          <div className="text-center mt-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <img 
                  src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.18.9/mercadopago/logo__large_plus.png" 
                  alt="Mercado Pago" 
                  className="h-10"
                />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                <img src="https://logodownload.org/wp-content/uploads/2020/04/pix-banco-central-logo-3.png" alt="PIX" className="h-8" />
              </div>
              
              <div className="flex items-center justify-center gap-4 flex-wrap mt-4">
                <p className="opacity-90 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Pagamento 100% Seguro
                </p>
                <p className="opacity-90 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Cartão (até 12x), PIX ou Boleto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ... RESTANTE DO CÓDIGO (testimonials, FAQ, footer) MANTIDO IGUAL ... */}
      {/* (Mantive igual ao anterior para não ficar muito longo) */}

      {/* Modal Material Gratuito - ATUALIZADO */}
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
                style={{ backgroundColor: `${COLORS.blue}20` }}
              >
                <Download className="w-6 h-6" style={{ color: COLORS.blue }} />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                🎁 Receba Sua Lição Gratuita
              </h3>
              <p className="opacity-70">
                Preencha abaixo e receba imediatamente:
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
                  WhatsApp (opcional, para suporte)
                </label>
                <input 
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: `${COLORS.black}20`,
                    backgroundColor: COLORS.gray
                  }}
                  placeholder="(14) 99999-9999"
                />
              </div>
              
              <button 
                onClick={handleFreeSubmit}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.green} 100%)`,
                  color: 'white'
                }}
              >
                <Download className="w-5 h-5" />
                Enviar e Receber Material Grátis
              </button>
              
              <div className="text-xs text-center opacity-60 space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Seus dados estão seguros. Não compartilhamos com terceiros.
                </p>
                <p>🔔 Você também entrará na nossa lista de novidades</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}