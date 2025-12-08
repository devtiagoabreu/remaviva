import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Heart, BookOpen, Users, Download, Check, Star, Clock, Shield, Mail, Phone, ChevronDown, CreditCard, Gift, Sparkles, Award, Target, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

// Definição de tipos TypeScript
interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  whatsapp?: string;
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

// Nova paleta de cores - CORRIGIDO
const COLORS = {
  blue: '#2E88FF',
  yellow: '#FFD449',
  green: '#7ACB72',
  orange: '#FF8A42',
  gray: '#F4F4F4',
  black: '#1E1E1E',
};

// URLs DO MERCADO PAGO
const MERCADO_PAGO_LINKS = {
  serie1: 'https://mpago.li/1QAb8kq',
  kit3: 'https://mpago.la/2AdPPmt',
};

// LINK DO PDF GRATUITO NO GOOGLE DRIVE
const PDF_GRATUITO_URL = 'https://drive.google.com/file/d/1l3BNC-qSIdn7r8eIafc6Pwv5-0m_koBH/view?usp=sharing';

// ENDPOINT DO GOOGLE APPS SCRIPT - VERIFIQUE SE ESTÁ CORRETO!
const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzeXa9rF8rPt2sAzx0RsHojEtccqQ2WVGR6Os5YZy47KyrgO4-dFDnT4w59AgB2PA75/exec';

// IDs dos campos do Google Forms - CONFIRMADOS (mantidos para fallback)
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

// Regex para validação
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export default function LandingPageRemaViva() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{type: 'serie1' | 'kit3', name: string, price: string} | null>(null);
  const [formData, setFormData] = useState<FormData>({ nome: '', email: '', whatsapp: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  
  // Refs para focus trap
  const freeModalRef = useRef<HTMLDivElement>(null);
  const paidModalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Timer countdown
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

  // Efeito para controlar scroll e focus nos modais
  useEffect(() => {
    if (showFreeModal || showPaidModal) {
      // Salva o elemento que tinha foco antes de abrir o modal
      lastFocusedElement.current = document.activeElement as HTMLElement;
      
      // Bloqueia scroll do body
      document.body.style.overflow = 'hidden';
      
      // Foca no modal quando abrir
      setTimeout(() => {
        const modal = showFreeModal ? freeModalRef.current : paidModalRef.current;
        if (modal) {
          modal.focus();
        }
      }, 100);
      
      // Adiciona listener para ESC
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (showFreeModal) closeFreeModal();
          if (showPaidModal) closePaidModal();
        }
      };
      
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    } else {
      // Restaura scroll quando modal fecha
      document.body.style.overflow = 'auto';
      
      // Retorna foco para o elemento anterior
      if (lastFocusedElement.current) {
        lastFocusedElement.current.focus();
      }
    }
  }, [showFreeModal, showPaidModal]);

  // Função para fazer focus trap (manter foco dentro do modal)
  const handleTabKey = (e: React.KeyboardEvent, modalRef: React.RefObject<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    
    if (!modalRef.current) return;
    
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  // Validação do formulário
  const validateForm = (isFree = true): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validação do nome
    if (!formData.nome.trim()) {
      errors.nome = 'Nome é obrigatório';
      isValid = false;
    } else if (formData.nome.trim().length < 2) {
      errors.nome = 'Nome deve ter pelo menos 2 caracteres';
      isValid = false;
    }

    // Validação do email
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!EMAIL_REGEX.test(formData.email)) {
      errors.email = 'Email inválido';
      isValid = false;
    }

    // Validação do WhatsApp (opcional mas se preenchido, deve ser válido)
    if (formData.whatsapp.trim() && !WHATSAPP_REGEX.test(formData.whatsapp)) {
      errors.whatsapp = 'WhatsApp inválido. Use o formato: (14) 99999-9999';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Formatar WhatsApp enquanto digita
  const formatWhatsApp = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Formatação: (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0,2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0,2)}) ${numbers.slice(2,6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0,2)}) ${numbers.slice(2,7)}-${numbers.slice(7,11)}`;
    }
  };

  // Manipulador de mudança nos campos do formulário
  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value;
    
    // Aplica máscara no WhatsApp
    if (field === 'whatsapp') {
      formattedValue = formatWhatsApp(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Limpa erro do campo quando o usuário começa a digitar
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Função auxiliar para testar conexão com GAS
  const testGASConnection = async (): Promise<boolean> => {
    try {
      console.log('🔍 Testando conexão com Google Apps Script...');
      
      const response = await fetch(`${GAS_ENDPOINT}?test=${Date.now()}`, {
        method: 'GET',
        mode: 'no-cors',
      });
      
      console.log('✅ Teste de conexão completado');
      return true; // Se chegou aqui, a requisição foi feita
      
    } catch (error) {
      console.log('❌ Falha no teste de conexão:', error);
      return false;
    }
  };

  // Backup silencioso usando Image beacon
  const submitSilentBackup = (tipo: 'gratuito' | 'pago', produto?: string, valor?: string) => {
    try {
      // Método alternativo usando imagem beacon (não bloqueante)
      if (tipo === 'gratuito') {
        const params = new URLSearchParams({
          'entry.475459393': formData.nome,
          'entry.1587784529': formData.email,
          'entry.1708940276': formData.whatsapp || 'NÃO PREENCHEU'
        });
        
        // Usa um Image beacon para enviar os dados (não bloqueante, sem CORS)
        const img = new Image();
        img.src = `https://docs.google.com/forms/d/e/1FAIpQLSd9zNxVhJEW-KOHqKqyONoXl8Gwij4-yuVeUXHJrIzKh77USg/formResponse?${params.toString()}&submit=Submit`;
        
      } else if (tipo === 'pago' && produto && valor) {
        const params = new URLSearchParams({
          'entry.1160029517': formData.nome,
          'entry.2081423330': formData.email,
          'entry.2014421681': produto,
          'entry.1045548342': valor,
          'entry.274487651': formData.whatsapp || 'NÃO PREENCHEU'
        });
        
        const img = new Image();
        img.src = `https://docs.google.com/forms/d/e/1FAIpQLSecb_jjWXZlqQsbVofhL4hZCPq7AsZNS5oAbqWn1sg44PjvVA/formResponse?${params.toString()}&submit=Submit`;
      }
      
      console.log('✅ Backup silencioso enviado');
    } catch (error) {
      console.log('⚠️ Erro no backup silencioso (não crítico):', error);
    }
  };

  // Fallback: método antigo usando iframe (se o GAS falhar)
  const submitViaFallback = async (tipo: 'gratuito' | 'pago', produto?: string, valor?: string): Promise<boolean> => {
    console.log('🔄 Usando fallback (método iframe)...');
    
    try {
      if (tipo === 'gratuito') {
        // URL para formulário gratuito
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd9zNxVhJEW-KOHqKqyONoXl8Gwij4-yuVeUXHJrIzKh77USg/formResponse';
        const fields = FORM_FIELDS.gratuito;
        
        // Criar iframe oculto
        const iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe_gratuito_fallback';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Criar formulário
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = formUrl;
        form.target = 'hidden_iframe_gratuito_fallback';
        
        // Adicionar campos
        const addField = (name: string, value: string) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };
        
        addField(fields.nome, formData.nome || '');
        addField(fields.email, formData.email || '');
        addField(fields.whatsapp, formData.whatsapp || 'NÃO PREENCHEU');
        
        // Adicionar ao DOM e enviar
        document.body.appendChild(form);
        
        setTimeout(() => {
          form.submit();
          console.log('✅ Formulário gratuito enviado via fallback (iframe)');
          
          // Limpar após 3 segundos
          setTimeout(() => {
            if (document.body.contains(form)) document.body.removeChild(form);
            if (document.body.contains(iframe)) document.body.removeChild(iframe);
          }, 3000);
        }, 100);
        
        return true;
        
      } else if (tipo === 'pago' && produto && valor) {
        // URL para formulário pago
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSecb_jjWXZlqQsbVofhL4hZCPq7AsZNS5oAbqWn1sg44PjvVA/formResponse';
        const fields = FORM_FIELDS.pago;
        
        // Criar iframe oculto
        const iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe_pago_fallback';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Criar formulário
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = formUrl;
        form.target = 'hidden_iframe_pago_fallback';
        
        // Adicionar campos
        const addField = (name: string, value: string) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };
        
        addField(fields.nome, formData.nome || '');
        addField(fields.email, formData.email || '');
        addField(fields.produto, produto);
        addField(fields.valor, valor);
        addField(fields.whatsapp, formData.whatsapp || 'NÃO PREENCHEU');
        
        // Adicionar ao DOM e enviar
        document.body.appendChild(form);
        
        setTimeout(() => {
          form.submit();
          console.log('✅ Formulário pago enviado via fallback (iframe)');
          
          // Limpar após 3 segundos
          setTimeout(() => {
            if (document.body.contains(form)) document.body.removeChild(form);
            if (document.body.contains(iframe)) document.body.removeChild(iframe);
          }, 3000);
        }, 100);
        
        return true;
      }
      
      return false;
      
    } catch (error) {
      console.error('❌ Erro no fallback:', error);
      return false;
    }
  };

  // Função principal para enviar para Google Apps Script - VERSÃO CORRIGIDA
  const submitToGoogleAppsScript = async (tipo: 'gratuito' | 'pago', produto?: string, valor?: string): Promise<boolean> => {
    const payload = {
      tipo,
      nome: formData.nome.trim(),
      email: formData.email.trim(),
      whatsapp: formData.whatsapp.trim() || 'NÃO PREENCHEU',
      produto: produto || '',
      valor: valor || '',
      timestamp: new Date().toISOString(),
      origem: 'landing-page-rema-viva'
    };

    console.log('📤 Enviando para Google Apps Script:', payload);

    try {
      // Construir a string de dados no formato URL-encoded
      const formDataString = Object.entries(payload)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      console.log('📝 Dados formatados:', formDataString);

      // Configurar timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

      // Enviar para o GAS - CORREÇÃO AQUI
      const response = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors', // Mantenha como no-cors para evitar problemas CORS
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formDataString,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('✅ Dados enviados para GAS');
      
      // IMPORTANTE: Com mode: 'no-cors', não podemos ler a resposta
      // Mas o GAS ainda recebe os dados e processa
      
      // Sempre fazer backup silencioso
      setTimeout(() => {
        submitSilentBackup(tipo, produto, valor);
      }, 1000);
      
      return true;
      
    } catch (error) {
      console.error('❌ Erro ao enviar para Google Apps Script:', error);
      
      // Fallback para método antigo se o GAS falhar
      console.log('🔄 Usando fallback (método iframe)...');
      return await submitViaFallback(tipo, produto, valor);
    }
  };

  // Função para material GRATUITO
  const handleSubmitGratuito = async () => {
    // Validação antes de enviar
    if (!validateForm(true)) {
      toast.error('Por favor, corrija os erros no formulário.');
      return;
    }
    
    setIsSubmitting(true);
    const loadingToast = toast.loading('Enviando seus dados...');
    
    try {
      // Envia para Google Apps Script
      const success = await submitToGoogleAppsScript('gratuito');
      
      toast.dismiss(loadingToast);
      
      if (success) {
        toast.success('✅ Dados enviados com sucesso!');
      } else {
        toast.success('✅ Processando seu cadastro...');
      }
      
      closeFreeModal();
      
      // Abrir PDF em nova aba após 1 segundo
      setTimeout(() => {
        window.open(PDF_GRATUITO_URL, '_blank');
      }, 1000);
      
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('❌ Erro ao enviar dados. Por favor, tente novamente.');
      console.error('Erro no envio gratuito:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para material PAGO
  const handleSubmitPago = async () => {
    if (!selectedProduct) {
      toast.error('Produto não selecionado.');
      return;
    }

    // Validação antes de enviar
    if (!validateForm(false)) {
      toast.error('Por favor, corrija os erros no formulário.');
      return;
    }
    
    setIsSubmitting(true);
    const loadingToast = toast.loading('Enviando seus dados...');
    
    try {
      // Envia para Google Apps Script
      const success = await submitToGoogleAppsScript(
        'pago',
        selectedProduct.name,
        selectedProduct.price
      );
      
      toast.dismiss(loadingToast);
      
      if (success) {
        toast.success('✅ Dados enviados! Redirecionando para pagamento...');
      } else {
        toast.success('✅ Redirecionando para pagamento...');
      }
      
      closePaidModal();
      
      // Redireciona para Mercado Pago após 2 segundos
      setTimeout(() => {
        const mercadoPagoLink = selectedProduct.type === 'serie1' 
          ? MERCADO_PAGO_LINKS.serie1 
          : MERCADO_PAGO_LINKS.kit3;
        window.open(mercadoPagoLink, '_blank');
        
        // Resetar formulário
        resetForm();
      }, 2000);
      
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('❌ Erro ao enviar dados. Por favor, tente novamente.');
      console.error('Erro no envio pago:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resetar formulário
  const resetForm = () => {
    setFormData({ nome: '', email: '', whatsapp: '' });
    setFormErrors({});
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Funções para abrir modais PAGOS
  const openSerie1Modal = () => {
    resetForm();
    setSelectedProduct({
      type: 'serie1',
      name: 'Série: Quem é Jesus? - Lição 1',
      price: 'R$ 19,90'
    });
    setShowPaidModal(true);
  };

  const openKit3Modal = () => {
    resetForm();
    setSelectedProduct({
      type: 'kit3',
      name: 'Kit Completo - 3 lições',
      price: 'R$ 49,90'
    });
    setShowPaidModal(true);
  };

  // Funções para fechar modais
  const closeFreeModal = () => {
    setShowFreeModal(false);
    resetForm();
  };

  const closePaidModal = () => {
    setShowPaidModal(false);
    resetForm();
  };

  // Abrir modal gratuito
  const openFreeModal = () => {
    resetForm();
    setShowFreeModal(true);
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
      a: 'Sim. Todo o material da Editora Rema Viva é fundamentado nas Escrituras, com foco em ensinar às crianças quem Jesus é, o que Ele fez e como elas podem viver a fé no dia a dia. Nosso compromisso é com a fidelidade bíblica e a clareza no discipulado infantil.'
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

  // Função para teste manual (remova em produção)
  const testGASManual = async () => {
    const testData = {
      tipo: 'gratuito',
      nome: 'Teste Manual',
      email: 'teste@teste.com',
      whatsapp: '(11) 99999-9999',
      produto: '',
      valor: '',
      timestamp: new Date().toISOString(),
      origem: 'teste-manual'
    };

    try {
      const formDataString = Object.entries(testData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      const response = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formDataString
      });

      console.log('✅ Teste manual enviado');
      toast.success('Teste enviado para o GAS!');
    } catch (error) {
      console.error('❌ Erro no teste manual:', error);
      toast.error('Erro no teste');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* HELMET PARA FAVICON E TÍTULO */}
      <Helmet>
        <link rel="icon" href="https://i.ibb.co/VpxG4Qv3/favicon-32x32.png" />
        <title>Editora Rema Viva - Materiais Bíblicos Cristocêntricos</title>
        <meta name="description" content="Conteúdo bíblico, cristocêntrico e fácil de aplicar. Economize horas de preparação e ensine as crianças com profundidade, clareza e simplicidade." />
        <meta name="keywords" content="material bíblico infantil, escola dominical, lições bíblicas, editora rema viva, ministério infantil, ensino cristão" />
        <meta property="og:title" content="Editora Rema Viva - Materiais Bíblicos Cristocêntricos" />
        <meta property="og:description" content="Conteúdo bíblico, cristocêntrico e fácil de aplicar. Economize horas de preparação e ensine as crianças com profundidade, clareza e simplicidade." />
        <meta property="og:image" content="https://i.ibb.co/YTLbYWFw/remaviva-natal.jpg" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Botão de teste (remova em produção) */}
      <button 
        onClick={testGASManual} 
        className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded text-xs z-50"
        style={{ display: 'none' }} // Oculto por padrão
      >
        Testar GAS
      </button>

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
              
              {/* BOTÕES ALTERADOS - Dois botões lado a lado */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button 
                  onClick={openFreeModal}
                  className="px-8 py-4 rounded-lg text-xl font-bold hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-2 flex-1"
                  style={{ 
                    backgroundColor: COLORS.yellow,
                    color: COLORS.black
                  }}
                >
                  <Download className="w-6 h-6" />
                  Baixe a Lição Gratuita
                </button>
                
                <a 
                  href="#assinatura"
                  className="px-8 py-4 rounded-lg text-xl font-bold hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-2 flex-1 border-2 border-white bg-transparent hover:bg-white/10"
                >
                  <ArrowRight className="w-6 h-6" />
                  ✨ Ver Produtos
                </a>
              </div>
              
              <p className="text-sm opacity-80">
                🎁 Sem compromisso • Acesso imediato • 100% gratuito
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform">
                <img 
                  src="https://i.ibb.co/YTLbYWFw/remaviva-natal.jpg" 
                  alt="Lição de Natal" 
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

      {/* Oferta Principal */}
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

          {/* Produtos */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* GRATUITO */}
            <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col">
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-4">Material Gratuito</h3>
                <div className="mb-4 flex flex-col items-center">
                  <span className="text-5xl font-bold" style={{ color: COLORS.green }}>R$ 0</span>
                  <span className="text-gray-600 text-lg">/grátis</span>
                </div>
                <div className="text-center text-gray-600 mb-6">
                  <p className="font-medium">Lição amostra da série</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
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
                  onClick={openFreeModal}
                  className="w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ 
                    backgroundColor: COLORS.green,
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
                <div className="mb-4 flex flex-col items-center">
                  <span className="text-5xl font-bold" style={{ color: COLORS.blue }}>R$ 19,90</span>
                  <span className="text-gray-600 text-lg">/único</span>
                </div>
                <div className="text-center text-gray-600 mb-6">
                  <p className="font-medium">Lição 1 - Jesus: Filho de Deus</p>
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
                  className="w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ 
                    backgroundColor: COLORS.blue,
                    color: 'white'
                  }}
                >
                  <CreditCard className="w-5 h-5" />
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* KIT 3 LIÇÕES - R$ 49,90 */}
            <div className="bg-white text-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col relative border-4"
              style={{ 
                borderColor: COLORS.yellow
              }}
            >
              <div 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-6 py-1 rounded-full font-bold text-sm"
                style={{ 
                  backgroundColor: COLORS.yellow,
                  color: COLORS.black
                }}
              >
                MELHOR OFERTA
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-4 mt-2">Kit Completo</h3>
                <div className="mb-4 flex flex-col items-center">
                  <span className="text-5xl font-bold" style={{ color: COLORS.green }}>R$ 49,90</span>
                  <span className="text-gray-600 text-lg">/kit completo</span>
                </div>
                <div className="text-center text-gray-600 mb-6">
                  <p className="font-medium">3 primeiras lições da série</p>
                  <p className="text-sm text-gray-500 line-through mt-1">R$ 59,70</p>
                  <p className="font-bold mt-2" style={{ color: COLORS.green }}>
                    Economize R$ 9,80 (16% OFF)
                  </p>
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
                      <Check className="w-5 h-5" style={{ color: COLORS.green }} />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <button 
                  onClick={openKit3Modal}
                  className="w-full py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ 
                    backgroundColor: COLORS.yellow,
                    color: COLORS.black
                  }}
                >
                  <Target className="w-5 h-5" />
                  Comprar Kit
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
                  aria-expanded={faqOpen[i] || false}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-bold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${faqOpen[i] ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen[i] && (
                  <div id={`faq-answer-${i}`} className="px-6 pb-4 text-gray-700">
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
              onClick={openFreeModal}
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
                  <span>remaviva@gmail.com</span>
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

      {/* Modal Material Gratuito - ATUALIZADO COM VALIDAÇÃO */}
      {showFreeModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="free-modal-title"
          onClick={closeFreeModal}
        >
          <div 
            ref={freeModalRef}
            tabIndex={-1}
            onKeyDown={(e) => handleTabKey(e, freeModalRef)}
            className="bg-white rounded-2xl max-w-md w-full p-8 relative outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeFreeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Fechar modal"
              disabled={isSubmitting}
            >
              ✕
            </button>
            <h3 
              id="free-modal-title"
              className="text-2xl font-bold mb-4 text-gray-800"
            >
              🎁 Receba Sua Lição Gratuita
            </h3>
            <p className="text-gray-600 mb-6">
              Preencha os dados abaixo para acessar o PDF gratuito:
            </p>
            <div className="space-y-6">
              <div>
                <label htmlFor="free-nome" className="block text-sm font-medium mb-1 text-gray-700">
                  Nome Completo *
                </label>
                <input 
                  id="free-nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    formErrors.nome 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Seu nome"
                  required
                  autoFocus
                  disabled={isSubmitting}
                />
                {formErrors.nome && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.nome}</p>
                )}
              </div>
              <div>
                <label htmlFor="free-email" className="block text-sm font-medium mb-1 text-gray-700">
                  E-mail *
                </label>
                <input 
                  id="free-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    formErrors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="seu@email.com"
                  required
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="free-whatsapp" className="block text-sm font-medium mb-1 text-gray-700">
                  WhatsApp (opcional)
                </label>
                <input 
                  id="free-whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    formErrors.whatsapp 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="(14) 99999-9999"
                  disabled={isSubmitting}
                />
                {formErrors.whatsapp ? (
                  <p className="mt-1 text-sm text-red-600">{formErrors.whatsapp}</p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Não obrigatório, mas nos ajuda a enviar novidades
                  </p>
                )}
              </div>
              <button 
                onClick={handleSubmitGratuito}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.green})`,
                  color: 'white'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Enviar e Acessar PDF Grátis
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Seus dados estão seguros. Não compartilhamos com terceiros.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Material Pago - ATUALIZADO COM VALIDAÇÃO */}
      {showPaidModal && selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="paid-modal-title"
          onClick={closePaidModal}
        >
          <div 
            ref={paidModalRef}
            tabIndex={-1}
            onKeyDown={(e) => handleTabKey(e, paidModalRef)}
            className="bg-white rounded-2xl max-w-md w-full p-8 relative outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closePaidModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Fechar modal"
              disabled={isSubmitting}
            >
              ✕
            </button>
            <h3 
              id="paid-modal-title"
              className="text-2xl font-bold mb-4 text-gray-800"
            >
              🛒 Finalizar Compra - {selectedProduct.name}
            </h3>
            <p className="text-gray-600 mb-6">
              Preencha seus dados para prosseguir com a compra:
            </p>
            <div className="space-y-6">
              <div>
                <label htmlFor="paid-nome" className="block text-sm font-medium mb-1 text-gray-700">
                  Nome Completo *
                </label>
                <input 
                  id="paid-nome"
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    formErrors.nome 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Seu nome"
                  required
                  autoFocus
                  disabled={isSubmitting}
                />
                {formErrors.nome && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.nome}</p>
                )}
              </div>
              <div>
                <label htmlFor="paid-email" className="block text-sm font-medium mb-1 text-gray-700">
                  E-mail *
                </label>
                <input 
                  id="paid-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    formErrors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="seu@email.com"
                  required
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="paid-whatsapp" className="block text-sm font-medium mb-1 text-gray-700">
                  WhatsApp (opcional)
                </label>
                <input 
                  id="paid-whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    formErrors.whatsapp 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="(14) 99999-9999"
                  disabled={isSubmitting}
                />
                {formErrors.whatsapp ? (
                  <p className="mt-1 text-sm text-red-600">{formErrors.whatsapp}</p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Não obrigatório, mas nos ajuda a enviar novidades
                  </p>
                )}
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
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.green})`,
                  color: 'white'
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Enviar e Ir para Pagamento
                  </>
                )}
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