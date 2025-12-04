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
  blue: '#2E88FF',
  yellow: '#FFD449',
  green: '##7ACB72',
  orange: '#FF8A42',
  gray: '#F4F4F4',
  black: '#1E1E1E',
};

// URLs DO MERCADO PAGO
const MERCADO_PAGO_LINKS = {
  serie1: 'https://mpago.li/1QAb8kq',
  kit3: 'https://mpago.la/2AdPPmt',
};

// URLs DO GOOGLE FORMS ATUALIZADAS
const GOOGLE_FORMS = {
  gratuito: 'https://docs.google.com/forms/d/e/1FAIpQLSd9zNxVhJEW-KOHqKqyONoXl8Gwij4-yuVeUXHJrIzKh77USg/formResponse',
  pago: 'https://docs.google.com/forms/d/e/1FAIpQLSecb_jjWXZlqQsbVofhL4hZCPq7AsZNS5oAbqWn1sg44PjvVA/formResponse'
};

// IDs dos campos do Google Forms ATUALIZADOS
const FORM_FIELDS = {
  gratuito: {
    nome: 'entry.475459393',
    email: 'entry.1587784529',
    whatsapp: 'entry.1708940276'
  },
  pago: {
    nome: 'entry.1160029517',
    email: 'entry.2081423330',
    produto: 'entry.2014421681',
    valor: 'entry.1045548342',
    whatsapp: 'entry.274487651'
  }
};

// LINK DO PDF GRATUITO NO GOOGLE DRIVE (SUBSTITUA PELO SEU LINK)
const PDF_GRATUITO_URL = 'https://drive.google.com/file/d/1l3BNC-qSIdn7r8eIafc6Pwv5-0m_koBH/view?usp=sharing';

export default function LandingPageRemaViva() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{type: 'serie1' | 'kit3', name: string, price: string} | null>(null);
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

  // Função para enviar para Google Forms (GRATUITO) - CORRIGIDA
  const submitToGoogleFormsGratuito = async () => {
    const formUrl = GOOGLE_FORMS.gratuito;
    const fields = FORM_FIELDS.gratuito;
    
    // WhatsApp: envia o valor ou 'NÃO PREENCHEU'
    const whatsappValue = formData.whatsapp.trim() || 'NÃO PREENCHEU';
    
    // Criar query string para enviar via GET (mais confiável)
    const params = new URLSearchParams();
    params.append(fields.nome, formData.nome);
    params.append(fields.email, formData.email);
    params.append(fields.whatsapp, whatsappValue);

    try {
      // Usando fetch com mode: 'no-cors' e método POST
      const response = await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });
      
      // Como estamos usando no-cors, não podemos verificar a resposta
      // Mas podemos assumir que foi enviado
      console.log('Formulário gratuito enviado:', {
        nome: formData.nome,
        email: formData.email,
        whatsapp: whatsappValue
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao enviar para Google Forms gratuito:', error);
      
      // Tentar método alternativo: abrir uma nova janela com GET
      try {
        const getUrl = `${formUrl}?${params.toString()}`;
        window.open(getUrl, '_blank', 'noopener,noreferrer');
        return true;
      } catch (fallbackError) {
        console.error('Erro no método alternativo:', fallbackError);
        return false;
      }
    }
  };

  // Função para enviar para Google Forms (PAGO) - CORRIGIDA
  const submitToGoogleFormsPago = async (produto: string, valor: string, nome: string, email: string) => {
    const formUrl = GOOGLE_FORMS.pago;
    const fields = FORM_FIELDS.pago;
    
    // WhatsApp: envia o valor ou 'NÃO PREENCHEU'
    const whatsappValue = formData.whatsapp.trim() || 'NÃO PREENCHEU';
    
    // Criar query string
    const params = new URLSearchParams();
    params.append(fields.nome, nome);
    params.append(fields.email, email);
    params.append(fields.produto, produto);
    params.append(fields.valor, valor);
    params.append(fields.whatsapp, whatsappValue);

    try {
      // Usando fetch com mode: 'no-cors'
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });
      
      console.log('Formulário pago enviado:', {
        nome: nome,
        email: email,
        produto: produto,
        valor: valor,
        whatsapp: whatsappValue
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao enviar para Google Forms pago:', error);
      
      // Tentar método alternativo: abrir uma nova janela com GET
      try {
        const getUrl = `${formUrl}?${params.toString()}`;
        window.open(getUrl, '_blank', 'noopener,noreferrer');
        return true;
      } catch (fallbackError) {
        console.error('Erro no método alternativo:', fallbackError);
        return false;
      }
    }
  };

  // Função para material GRATUITO
  const handleSubmitGratuito = async () => {
    if (!formData.nome || !formData.email) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }
    
    // Envia para Google Forms (GRATUITO)
    toast.loading('Enviando seus dados...');
    
    // Primeiro, sempre tentar enviar para o Google Forms
    const success = await submitToGoogleFormsGratuito();
    
    // Depois redirecionar para o PDF
    setTimeout(() => {
      toast.dismiss();
      
      if (success) {
        toast.success('✅ Dados enviados! Redirecionando para o PDF...');
      } else {
        toast.success('✅ Redirecionando para o PDF...');
      }
      
      setShowFreeModal(false);
      setFormData({ nome: '', email: '', whatsapp: '' });
      
      // Redireciona para o PDF no Google Drive
      window.open(PDF_GRATUITO_URL, '_blank');
    }, 2000);
  };

  // Função para material PAGO
  const handleSubmitPago = async () => {
    if (!formData.nome || !formData.email || !selectedProduct) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    toast.loading('Enviando seus dados...');
    
    // Envia para Google Forms (PAGO)
    const success = await submitToGoogleFormsPago(
      selectedProduct.name,
      selectedProduct.price,
      formData.nome,
      formData.email
    );
    
    // Depois redirecionar para Mercado Pago
    setTimeout(() => {
      toast.dismiss();
      
      if (success) {
        toast.success('✅ Dados enviados! Redirecionando para pagamento...');
      } else {
        toast.success('✅ Redirecionando para pagamento...');
      }
      
      setShowPaidModal(false);
      setFormData({ nome: '', email: '', whatsapp: '' });
      
      // Redireciona para Mercado Pago
      const mercadoPagoLink = selectedProduct.type === 'serie1' 
        ? MERCADO_PAGO_LINKS.serie1 
        : MERCADO_PAGO_LINKS.kit3;
      window.open(mercadoPagoLink, '_blank');
    }, 2000);
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Funções para abrir modais PAGOS (com formulário primeiro)
  const openSerie1Modal = () => {
    setSelectedProduct({
      type: 'serie1',
      name: 'Série: Quem é Jesus? - Lição 1',
      price: 'R$ 19,90'
    });
    setShowPaidModal(true);
  };

  const openKit3Modal = () => {
    setSelectedProduct({
      type: 'kit3',
      name: 'Kit Completo - 3 lições',
      price: 'R$ 49,90'
    });
    setShowPaidModal(true);
  };

  // Dados para renderização
  const painPoints = [
    'Passar horas pesquisando e preparando cada lição',
    'Falta de materiais bíblicos, claros e prontos para usar',
    'Dificuldade em encontrar atividades adequadas para a faixa etária',
    'Conteúdo raso ou genérico, que não ajuda no discipulado das crianças',
    'Falta de tempo para montar aplicações práticas e objetivas'
  ];

  const solutions = [
    'Lições completas e prontas para usar imediatamente',
    'Conteúdo 100% cristocêntrico e fiel às Escrituras',
    'Atividades pedagógicas simples e práticas para cada lição',
    'Aplicações claras que ajudam as crianças a viverem a Palavra',
    'Materiais visuais profissionais e fáceis de apresentar'
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
      q: 'O conteúdo é realmente bíblico e cristocêntrico?',
      a: 'Sim. Todo o material da Editora Rema Viva é fundamentado nas Escrituras, com foco em ensinar às crianças quem Jesus é, o que Ele fez e como elas podem viver a fé no dia a dia. Nosso compromisso é com a fidelidade bíblica e a clareza no discipulado infantil.'
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
      {/* Hero Section */}
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
                  ✨ Materiais Bíblicos, Cristocêntricos e Confiáveis
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Lições Inesquecíveis para o Ministério Infantil – Bíblica, Simples e Perfeita para as crianças.
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Conteúdo bíblico, cristocêntrico e fácil de aplicar. Economize horas de preparação e ensine as crianças com profundidade, clareza e simplicidade.
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
                Baixe a Lição de Natal Gratuitamente!
              </button>
              <p className="text-sm mt-4 opacity-80">
                🎁 Sem compromisso • Acesso imediato • 100% gratuito
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform">
                <img 
                  src="https://i.ibb.co/qLdP2rfy/natal.png"
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

      {/* Autoridade */}
      <section className="bg-white py-8 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" style={{ color: COLORS.blue }} />
              <div className="text-left">
                <p className="font-bold text-gray-800">Editora Rema Viva</p>
                <p className="text-sm text-gray-600">Materiais Bíblicos e confiáveis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" style={{ color: COLORS.green }} />
              <div className="text-left">
                <p className="font-bold text-gray-800">Cristocêntrica</p>
                <p className="text-sm text-gray-600">Focado na Palavra de Deus</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" style={{ color: COLORS.orange }} />
              <div className="text-left">
                <p className="font-bold text-gray-800">Aprovado por Líderes</p>
                <p className="text-sm text-gray-600">Igrejas e Ministérios de todo o Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dores vs Soluções */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Tenha Aulas Bíblicas Preparadas com Clareza, Propósito e Economia de Tempo
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16">
            Você não está sozinho — milhares de professores enfrentam as mesmas dificuldades...
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
                😰 Desafios que Professores e Líderes Enfrentam na Preparação de Aulas
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

      {/* Oferta Principal - COM BOTÕES ALINHADOS */}
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

          {/* Produtos - COM BOTÕES ALINHADOS NA MESMA ALTURA */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* GRATUITO */}
            <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col">
              <div className="flex-grow">
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
              </div>
              <div className="mt-auto">
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
            </div>

            {/* SÉRIE 1 - R$ 19,90 */}
            <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col">
              <div className="flex-grow">
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
              </div>
              <div className="mt-auto">
                <button 
                  onClick={openSerie1Modal}
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
            </div>

            {/* KIT 3 LIÇÕES - R$ 49,90 */}
            <div className="rounded-2xl p-8 shadow-2xl relative border-4 flex flex-col"
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
              <div className="flex-grow">
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
              </div>
              <div className="mt-auto">
                <button 
                  onClick={openKit3Modal}
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
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <img 
                src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-8.png" 
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

      {/* FAQ */}
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

      {/* CTA Final */}
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

      {/* Footer */}
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
              Preencha os dados abaixo para acessar o PDF gratuito:
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
                  required
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
                  required
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
                <p className="text-xs text-gray-500 mt-1">
                  Não obrigatório, mas nos ajuda a enviar novidades
                </p>
              </div>
              <button 
                onClick={handleSubmitGratuito}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 hover:opacity-90"
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.green})`,
                  color: 'white'
                }}
              >
                <Download className="w-5 h-5" />
                Enviar e Acessar PDF Grátis
              </button>
              <p className="text-xs text-gray-500 text-center">
                Seus dados estão seguros. Não compartilhamos com terceiros.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Material Pago */}
      {showPaidModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowPaidModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowPaidModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              🛒 Finalizar Compra - {selectedProduct.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Preencha seus dados para prosseguir com a compra:
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
                  required
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
                  required
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
                <p className="text-xs text-gray-500 mt-1">
                  Não obrigatório, mas nos ajuda a enviar novidades
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <p className="font-bold text-lg" style={{ color: COLORS.blue }}>
                  Total: {selectedProduct.price}
                </p>
                <p className="text-sm text-gray-600">
                  Produto: {selectedProduct.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Você será redirecionado para o Mercado Pago após enviar este formulário
                </p>
              </div>
              <button 
                onClick={handleSubmitPago}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 hover:opacity-90"
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.green})`,
                  color: 'white'
                }}
              >
                <CreditCard className="w-5 h-5" />
                Enviar e Ir para Pagamento
              </button>
              <p className="text-xs text-gray-500 text-center">
                Pagamento seguro via Mercado Pago. Seus dados estão protegidos.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}