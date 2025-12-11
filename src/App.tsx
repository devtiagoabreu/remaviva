// App.tsx ok
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import {
  Heart, BookOpen, Users, Download, Check, Star, Clock, Shield, Mail,
  Phone, ChevronDown, CreditCard, Gift, Sparkles, Award, Target, Lock, ArrowRight,
  MessageCircle, Instagram, Facebook, Youtube, ChevronUp
} from 'lucide-react';
import toast from 'react-hot-toast';
import TagManager from 'react-gtm-module';

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

// IDs DO GOOGLE ANALYTICS E TAG MANAGER
const GA4_MEASUREMENT_ID = 'G-HCLXXD74FX';
const GTM_ID = 'GTM-MGNWKFTN';

// Configuração do GTM
const gtmConfig = {
  gtmId: GTM_ID,
  // Para desenvolvimento (opcional)
  auth: 'Z58KQn7ZvF4q45u2IVQZ_w',
  preview: 'env-1',
};

// Nova paleta de cores
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
  serie1: 'https://mpago.la/2yincPZ',
  kit3: 'https://mpago.la/2AP2zxE',
};

// LINK DO PDF GRATUITO NO GOOGLE DRIVE
const PDF_GRATUITO_URL = 'https://drive.google.com/file/d/1_1mgxLic1_8Rai04Rtt-wS-IVAOFGK3r/view?usp=sharing';

// ENDPOINT DO GOOGLE APPS SCRIPT (ATUALIZADO COM SUA URL)
const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwoyl7TQeO2vv79BaL8ZWWvdEVftrgjzP9oL-I_GScDMzYWVXoYUr7_5BSTp7wfQGA3/exec';

// Regex para validação
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

// Redes Sociais
const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/5514999999999?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Editora%20Rema%20Viva.',
  instagram: 'https://www.instagram.com/editoraremaviva/',
  facebook: 'https://www.facebook.com/editoraremaviva',
  youtube: 'https://www.youtube.com/@editoraremaviva'
};

// Declaração para window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Funções de rastreamento GTM/GA4
const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  // Para GTM
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
    console.log(`📊 Evento GTM enviado: ${eventName}`, eventParams);
  }
  
  // Para GA4 direto (backup)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

export default function LandingPageRemaViva() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{type: 'serie1' | 'kit3', name: string, price: string} | null>(null);
  const [formData, setFormData] = useState<FormData>({ nome: '', email: '', whatsapp: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  
  // Refs para focus trap
  const freeModalRef = useRef<HTMLDivElement>(null);
  const paidModalRef = useRef<HTMLDivElement>(null);
  const termsModalRef = useRef<HTMLDivElement>(null);
  const privacyModalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Inicializar GTM e GA4
  useEffect(() => {
    // Inicializar Google Tag Manager
    if (GTM_ID && import.meta.env.PROD) {
      try {
        TagManager.initialize(gtmConfig);
        console.log('✅ GTM inicializado com sucesso - ID:', GTM_ID);
        
        // Enviar evento de inicialização
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'gtm_init',
            timestamp: new Date().toISOString(),
            environment: import.meta.env.MODE,
            page_type: 'landing_page',
            business: 'editora_rema_viva'
          });
        }
      } catch (error) {
        console.error('❌ Erro ao inicializar GTM:', error);
      }
    } else {
      console.log('🚧 GTM não inicializado (ambiente:', import.meta.env.MODE, ')');
    }

    // Inicializar GA4 diretamente também (como backup)
    if (GA4_MEASUREMENT_ID && import.meta.env.PROD) {
      const script1 = document.createElement('script');
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
      script1.async = true;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA4_MEASUREMENT_ID}');
      `;
      document.head.appendChild(script2);
      
      console.log('✅ GA4 inicializado com sucesso - ID:', GA4_MEASUREMENT_ID);
    }
    
    // Track page view inicial
    trackEvent('page_view', {
      page_title: 'Editora Rema Viva - Landing Page',
      page_location: window.location.href,
      page_path: window.location.pathname
    });
    
    // Rastrear tempo na página
    const startTime = Date.now();
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 10) {
        trackEvent('time_on_page', {
          time_seconds: timeSpent,
          page_title: document.title
        });
      }
    };
  }, []);

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
    if (showFreeModal || showPaidModal || showTermsModal || showPrivacyModal) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        let modal = null;
        if (showFreeModal) modal = freeModalRef.current;
        else if (showPaidModal) modal = paidModalRef.current;
        else if (showTermsModal) modal = termsModalRef.current;
        else if (showPrivacyModal) modal = privacyModalRef.current;
        if (modal) modal.focus();
      }, 100);
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (showFreeModal) closeFreeModal();
          else if (showPaidModal) closePaidModal();
          else if (showTermsModal) setShowTermsModal(false);
          else if (showPrivacyModal) setShowPrivacyModal(false);
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
      if (lastFocusedElement.current) lastFocusedElement.current.focus();
    }
  }, [showFreeModal, showPaidModal, showTermsModal, showPrivacyModal]);

  // Efeito para mostrar/ocultar botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      
      // Rastrear scroll
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      // Rastrear apenas em marcos importantes
      if ([25, 50, 75, 90].includes(scrollPercentage)) {
        trackEvent('scroll', {
          scroll_percentage: scrollPercentage,
          page_title: document.title
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para fazer focus trap (manter foco dentro do modal)
  const handleTabKey = (e: React.KeyboardEvent, modalRef: React.RefObject<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    if (!modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  // Função para voltar ao topo
  const scrollToTop = () => {
    trackEvent('button_click', {
      button_name: 'voltar_ao_topo',
      button_location: 'floating'
    });
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Validação do formulário
  const validateForm = (isFree = true): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.nome.trim()) {
      errors.nome = 'Nome é obrigatório';
      isValid = false;
    } else if (formData.nome.trim().length < 2) {
      errors.nome = 'Nome deve ter pelo menos 2 caracteres';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!EMAIL_REGEX.test(formData.email)) {
      errors.email = 'Email inválido';
      isValid = false;
    }

    if (formData.whatsapp.trim() && !WHATSAPP_REGEX.test(formData.whatsapp)) {
      errors.whatsapp = 'WhatsApp inválido. Use o formato: (14) 99999-9999';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Formatar WhatsApp enquanto digita
  const formatWhatsApp = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
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
    if (field === 'whatsapp') {
      formattedValue = formatWhatsApp(value);
    }
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // FUNÇÃO DE ENVIO COM DEBUG AVANÇADO
  const submitToGoogleAppsScript = async (tipo: 'gratuito' | 'pago', produto?: string, valor?: string): Promise<boolean> => {
    const payload = {
      nome: formData.nome.trim(),
      email: formData.email.trim(),
      whatsapp: formData.whatsapp.trim() || '',
      tipo: tipo,
      produto: produto || '',
      valor: valor || ''
    };

    console.log('🔍 ========== DEBUG DETALHADO ==========');
    console.log('📤 PAYLOAD A SER ENVIADO:', JSON.stringify(payload, null, 2));
    console.log('🔗 URL DO APPS SCRIPT:', GAS_ENDPOINT);
    console.log('⏰ TIMESTAMP:', new Date().toISOString());
    console.log('📝 HEADERS que serão enviados:', {
      'Content-Type': 'application/json'
    });

    try {
      console.log('🔄 ENVIANDO REQUISIÇÃO FETCH...');
      console.log('📋 Configuração do fetch:', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // TENTATIVA 1: Fetch normal com no-cors
      const inicio = Date.now();
      const response = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const tempo = Date.now() - inicio;
      console.log('✅ FETCH COMPLETADO!');
      console.log('⏱️ Tempo de resposta:', tempo + 'ms');
      console.log('📊 Tipo de resposta:', response.type);
      console.log('🔗 URL da resposta:', response.url);
      console.log('📈 Status (aprox.):', response.ok ? 'OK' : 'Não OK');
      console.log('ℹ️ Com "no-cors" não podemos ler o corpo da resposta');
      
      // TENTATIVA 2: Backup usando o método antigo (form submit)
      setTimeout(() => {
        console.log('🔄 TENTANDO MÉTODO ALTERNATIVO (backup)...');
        enviarViaFormBackup(payload);
      }, 500);

      return true;

    } catch (error: any) {
      console.error('❌ ERRO NO FETCH:', error);
      console.error('📝 Mensagem:', error.message);
      console.error('🔗 URL que falhou:', error.url || GAS_ENDPOINT);
      
      // Tenta método alternativo imediatamente
      console.log('🔄 TENTANDO MÉTODO ALTERNATIVO APÓS ERRO...');
      const sucessoBackup = enviarViaFormBackup(payload);
      
      return sucessoBackup;
    }
  };

  // MÉTODO ALTERNATIVO: Envia via form submit (funciona quando fetch falha)
  const enviarViaFormBackup = (payload: any): boolean => {
    try {
      console.log('🔧 INICIANDO MÉTODO ALTERNATIVO (form submit)');
      
      // Cria um form oculto
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GAS_ENDPOINT;
      form.style.display = 'none';
      form.target = '_blank'; // Abre em nova aba para não interferir
      
      // Adiciona campos
      Object.keys(payload).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payload[key];
        form.appendChild(input);
      });
      
      // Adiciona ao body e submete
      document.body.appendChild(form);
      form.submit();
      
      // Remove após 3 segundos
      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 3000);
      
      console.log('✅ MÉTODO ALTERNATIVO ENVIADO');
      return true;
      
    } catch (backupError) {
      console.error('❌ MÉTODO ALTERNATIVO TAMBÉM FALHOU:', backupError);
      return false;
    }
  };

  // TESTE DIRETO NO CONSOLE - função auxiliar
  const testarEnvioDireto = () => {
    const testData = {
      nome: 'TESTE CONSOLE REACT',
      email: 'console@react.com',
      whatsapp: '(11) 98765-4321',
      tipo: 'teste_console',
      produto: 'Produto Teste Console',
      valor: 'R$ 29,90'
    };

    console.log('🧪 TESTE DIRETO DO CONSOLE REACT');
    console.log('📤 Dados:', testData);
    console.log('🔗 URL:', GAS_ENDPOINT);
    
    fetch(GAS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(testData)
    })
    .then(() => console.log('✅ Teste enviado - verifique a planilha!'))
    .catch(e => console.error('❌ Erro no teste:', e));
  };

  // Adiciona a função ao window para testar no console
  useEffect(() => {
    (window as any).testarEnvioRemaViva = testarEnvioDireto;
    console.log('🔧 Função de teste disponível: testarEnvioRemaViva()');
  }, []);

  // Função para abrir redes sociais em nova aba
  const openSocialLink = (platform: keyof typeof SOCIAL_LINKS) => {
    trackEvent('social_click', {
      social_platform: platform,
      button_location: 'floating_social'
    });
    
    window.open(SOCIAL_LINKS[platform], '_blank', 'noopener,noreferrer');
  };

  // Função para material GRATUITO
  const handleSubmitGratuito = async () => {
    if (!validateForm(true)) {
      toast.error('Por favor, corrija os erros no formulário.');
      return;
    }
    
    setIsSubmitting(true);
    const loadingToast = toast.loading('Enviando seus dados...');
    
    try {
      console.log('🟡 ========== INICIANDO ENVIO GRATUITO ==========');
      
      // Rastrear envio do formulário gratuito
      trackEvent('form_submit', {
        form_type: 'gratuito',
        form_name: 'download_gratuito',
        form_status: 'started'
      });
      
      const success = await submitToGoogleAppsScript('gratuito');
      toast.dismiss(loadingToast);
      
      if (success) {
        // Rastrear sucesso no envio
        trackEvent('form_submit', {
          form_type: 'gratuito',
          form_name: 'download_gratuito',
          form_status: 'success'
        });
        
        // Rastrear download
        trackEvent('download', {
          download_type: 'gratuito',
          file_name: 'lição_amostra',
          value: 0,
          currency: 'BRL'
        });
        
        // Rastrear lead
        trackEvent('generate_lead', {
          lead_type: 'gratuito',
          lead_source: 'landing_page'
        });
        
        toast.success('✅ Dados enviados com sucesso! Redirecionando para o PDF...');
        // Aguarda 1.5 segundos antes de redirecionar
        setTimeout(() => {
          window.open(PDF_GRATUITO_URL, '_blank');
          closeFreeModal();
          resetForm();
        }, 1500);
      } else {
        // Rastrear falha no envio
        trackEvent('form_submit', {
          form_type: 'gratuito',
          form_name: 'download_gratuito',
          form_status: 'error'
        });
        
        toast.error('❌ Não foi possível enviar seus dados. Tente novamente.');
      }
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
    if (!validateForm(false)) {
      toast.error('Por favor, corrija os erros no formulário.');
      return;
    }
    
    setIsSubmitting(true);
    const loadingToast = toast.loading('Enviando seus dados...');
    
    try {
      console.log('🟡 ========== INICIANDO ENVIO PAGO ==========');
      
      const price = parseFloat(selectedProduct.price.replace('R$ ', '').replace(',', '.'));
      
      // Rastrear início de checkout
      trackEvent('begin_checkout', {
        currency: 'BRL',
        value: price,
        items: [{
          item_id: selectedProduct.type,
          item_name: selectedProduct.name,
          price: price,
          quantity: 1
        }]
      });
      
      // Rastrear envio do formulário pago
      trackEvent('form_submit', {
        form_type: 'pago',
        form_name: 'checkout',
        product_id: selectedProduct.type,
        product_name: selectedProduct.name,
        product_price: price,
        form_status: 'started'
      });
      
      const success = await submitToGoogleAppsScript('pago', selectedProduct.name, selectedProduct.price);
      toast.dismiss(loadingToast);
      
      if (success) {
        // Rastrear sucesso no envio
        trackEvent('form_submit', {
          form_type: 'pago',
          form_name: 'checkout',
          product_id: selectedProduct.type,
          product_name: selectedProduct.name,
          product_price: price,
          form_status: 'success'
        });
        
        // Rastrear lead
        trackEvent('generate_lead', {
          lead_type: 'pago',
          lead_source: 'landing_page',
          product_id: selectedProduct.type,
          product_name: selectedProduct.name,
          product_price: price
        });
        
        toast.success('✅ Dados enviados! Redirecionando para pagamento...');
        setTimeout(() => {
          const mercadoPagoLink = selectedProduct.type === 'serie1' ? MERCADO_PAGO_LINKS.serie1 : MERCADO_PAGO_LINKS.kit3;
          window.open(mercadoPagoLink, '_blank');
          closePaidModal();
          resetForm();
        }, 1500);
      } else {
        // Rastrear falha no envio
        trackEvent('form_submit', {
          form_type: 'pago',
          form_name: 'checkout',
          product_id: selectedProduct.type,
          product_name: selectedProduct.name,
          product_price: price,
          form_status: 'error'
        });
        
        toast.error('❌ Não foi possível registrar seu pedido. Tente novamente.');
      }
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
    
    // Rastrear clique no FAQ
    if (!faqOpen[index]) {
      trackEvent('faq_open', {
        faq_index: index,
        faq_question: faqItems[index].q.substring(0, 100)
      });
    }
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
    
    // Rastrear visualização de produto
    trackEvent('view_item', {
      currency: 'BRL',
      value: 19.90,
      items: [{
        item_id: 'serie1',
        item_name: 'Série: Quem é Jesus? - Lição 1',
        price: 19.90,
        item_category: 'material_biblico'
      }]
    });
    
    // Rastrear clique no botão
    trackEvent('button_click', {
      button_name: 'comprar_serie1',
      button_location: 'produtos_section',
      product_id: 'serie1',
      product_price: 19.90
    });
  };

  const openKit3Modal = () => {
    resetForm();
    setSelectedProduct({
      type: 'kit3',
      name: 'Kit Completo - 3 lições',
      price: 'R$ 49,90'
    });
    setShowPaidModal(true);
    
    // Rastrear visualização de produto
    trackEvent('view_item', {
      currency: 'BRL',
      value: 49.90,
      items: [{
        item_id: 'kit3',
        item_name: 'Kit Completo - 3 lições',
        price: 49.90,
        item_category: 'material_biblico'
      }]
    });
    
    // Rastrear clique no botão
    trackEvent('button_click', {
      button_name: 'comprar_kit3',
      button_location: 'produtos_section',
      product_id: 'kit3',
      product_price: 49.90
    });
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
    
    // Rastrear clique no botão de download gratuito
    trackEvent('button_click', {
      button_name: 'baixar_gratuito',
      button_location: 'hero_section'
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* HELMET PARA FAVICON, TÍTULO E SCRIPTS DO GTM/GA4 */}
      <Helmet>
        <link rel="icon" href="https://i.ibb.co/VpxG4Qv3/favicon-32x32.png" />
        <title>Editora Rema Viva - Materiais Bíblicos Cristocêntricos</title>
        <meta name="description" content="Conteúdo bíblico, cristocêntrico e fácil de aplicar. Economize horas de preparação e ensine as crianças com profundidade, clareza e simplicidade." />
        <meta name="keywords" content="material bíblico infantil, escola dominical, lições bíblicas, editora rema viva, ministério infantil, ensino cristão" />
        <meta property="og:title" content="Editora Rema Viva - Materiais Bíblicos Cristocêntricos" />
        <meta property="og:description" content="Conteúdo bíblico, cristocêntrico e fácil de aplicar. Economize horas de preparação e ensine as crianças com profundidade, clareza e simplicidade." />
        <meta property="og:image" content="https://i.ibb.co/YTLbYWFw/remaviva-natal.jpg" />
        <meta property="og:type" content="website" />
        
        {/* Google Tag Manager */}
        {import.meta.env.PROD && (
          <>
            <script>
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `}
            </script>
            
            {/* Google Analytics 4 */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`} />
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_MEASUREMENT_ID}');
              `}
            </script>
          </>
        )}
      </Helmet>

      {/* Google Tag Manager (noscript) */}
      {import.meta.env.PROD && (
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
            title="Google Tag Manager"
          />
        </noscript>
      )}

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
                Lições Bíblicas Inesquecíveis para o Ministério Infantil.
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
                  onClick={() => {
                    trackEvent('button_click', {
                      button_name: 'ver_produtos',
                      button_location: 'hero_section'
                    });
                  }}
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
                  <span className="text-gray-600 text-lg"></span>
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
                  <span className="text-gray-600 text-lg"></span>
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
                  <span className="text-gray-600 text-lg"></span>
                </div>
                <div className="text-center text-gray-600 mb-6">
                  <p className="font-medium"></p>
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
              onClick={() => {
                trackEvent('button_click', {
                  button_name: 'ver_produtos',
                  button_location: 'final_cta'
                });
              }}
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
                  <span>editoraremaviva@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(19) 99999-9999</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Siga-nos</h4>
              <div className="space-y-2 text-gray-400">
                <a 
                  href="https://www.instagram.com/editoraremaviva/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block hover:text-yellow-400 transition-colors"
                  onClick={() => {
                    trackEvent('social_click', {
                      social_platform: 'instagram',
                      button_location: 'footer'
                    });
                  }}
                >
                  📱 Instagram @editoraremaviva
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Editora Rema Viva. Todos os direitos reservados.</p>
            <div className="mt-2 space-x-4">
              <button 
                onClick={() => {
                  setShowTermsModal(true);
                  trackEvent('link_click', {
                    link_type: 'terms',
                    link_location: 'footer'
                  });
                }}
                className="hover:text-yellow-400 transition-colors"
              >
                Termos de Uso
              </button>
              <button 
                onClick={() => {
                  setShowPrivacyModal(true);
                  trackEvent('link_click', {
                    link_type: 'privacy',
                    link_location: 'footer'
                  });
                }}
                className="hover:text-yellow-400 transition-colors"
              >
                Política de Privacidade
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* BARRA FLUTUANTE DE REDES SOCIAIS */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col items-center gap-3">
          {/* WhatsApp - Destaque */}
          <button
            onClick={() => openSocialLink('whatsapp')}
            className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 animate-bounce"
            style={{ 
              backgroundColor: '#25D366',
              animation: 'bounce 2s infinite'
            }}
            aria-label="Conversar no WhatsApp"
            title="Conversar no WhatsApp"
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </button>
          
          {/* Outras redes sociais */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl flex flex-col gap-3 border border-gray-200/50">
            <button
              onClick={() => openSocialLink('instagram')}
              className="w-10 h-10 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:shadow-lg"
              style={{ 
                background: 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)'
              }}
              aria-label="Seguir no Instagram"
              title="Seguir no Instagram"
            >
              <Instagram className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={() => openSocialLink('facebook')}
              className="w-10 h-10 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: '#1877F2' }}
              aria-label="Curtir no Facebook"
              title="Curtir no Facebook"
            >
              <Facebook className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={() => openSocialLink('youtube')}
              className="w-10 h-10 rounded-full flex items-center justify-center transform hover:scale-110 transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: '#FF0000' }}
              aria-label="Inscrever-se no YouTube"
              title="Inscrever-se no YouTube"
            >
              <Youtube className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Botão de voltar ao topo - Parte inferior esquerda */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 transition-all duration-300"
          style={{ 
            backgroundColor: COLORS.blue,
            color: 'white'
          }}
          aria-label="Voltar ao topo"
          title="Voltar ao topo"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Modal Material Gratuito */}
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

      {/* Modal Material Pago */}
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
              🛒 Iniciar Compra - {selectedProduct.name}
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
                    Não obrigatório, mas nos ajuda a enviar novidades e prestar suporte.
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
                  Você será redirecionado para o Mercado Pago após enviar este formulário, preencha com dados reais. Seu produto será enviado por email ou WhastsApp em até 2 horas.
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

      {/* Modal de Termos de Uso */}
      {showTermsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-modal-title"
          onClick={() => setShowTermsModal(false)}
        >
          <div 
            ref={termsModalRef}
            tabIndex={-1}
            onKeyDown={(e) => handleTabKey(e, termsModalRef)}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 relative outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Fechar modal"
            >
              ✕
            </button>
            <h3 
              id="terms-modal-title"
              className="text-2xl font-bold mb-6 text-gray-800"
            >
              📄 Termos de Uso - Editora Rema Viva
            </h3>
            <div className="space-y-4 text-gray-700">
              <p><strong>Última atualização: Janeiro de 2025</strong></p>
              
              <div>
                <h4 className="font-bold text-lg mb-2">1. Aceitação dos Termos</h4>
                <p>
                  Ao acessar e utilizar os materiais da Editora Rema Viva, você concorda com estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não utilize nossos produtos ou serviços.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">2. Licença de Uso</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Os materiais adquiridos são para uso pessoal e ministerial.</li>
                  <li>É permitida a impressão e distribuição em igrejas, escolas bíblicas e ministérios cristãos.</li>
                  <li>É proibida a revenda, redistribuição comercial ou modificação para fins comerciais.</li>
                  <li>Os materiais não podem ser compartilhados em plataformas de venda ou afiliadas.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">3. Propriedade Intelectual</h4>
                <p>
                  Todo o conteúdo (textos, ilustrações, atividades) é de propriedade exclusiva da Editora Rema Viva. 
                  Os direitos autorais são protegidos pela legislação brasileira e tratados internacionais.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">4. Pagamentos e Reembolsos</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Os pagamentos são processados através do Mercado Pago.</li>
                  <li>Em caso de insatisfação, entre em contato em até 7 dias para solicitar reembolso.</li>
                  <li>O acesso ao material é disponibilizado imediatamente após a confirmação do pagamento.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">5. Responsabilidades</h4>
                <p>
                  A Editora Rema Viva não se responsabiliza por:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Uso inadequado do material</li>
                  <li>Problemas técnicos de terceiros (Mercado Pago, provedores de email, etc.)</li>
                  <li>Interpretações teológicas divergentes</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">6. Alterações nos Termos</h4>
                <p>
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  As alterações entrarão em vigor imediatamente após sua publicação no site.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">7. Contato</h4>
                <p>
                  Para questões sobre estes Termos de Uso, entre em contato:
                </p>
                <ul className="list-none pl-5 space-y-1 mt-2">
                  <li>📧 Email: editoraremaviva@gmail.com</li>
                  <li>📱 WhatsApp: (19) 99999-9999</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-3 rounded-lg font-bold transition-colors w-full"
                style={{ 
                  backgroundColor: COLORS.blue,
                  color: 'white'
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Política de Privacidade */}
      {showPrivacyModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div 
            ref={privacyModalRef}
            tabIndex={-1}
            onKeyDown={(e) => handleTabKey(e, privacyModalRef)}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 relative outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Fechar modal"
            >
              ✕
            </button>
            <h3 
              id="privacy-modal-title"
              className="text-2xl font-bold mb-6 text-gray-800"
            >
              🔒 Política de Privacidade - Editora Rema Viva
            </h3>
            <div className="space-y-4 text-gray-700">
              <p><strong>Última atualização: Janeiro de 2025</strong></p>
              
              <div>
                <h4 className="font-bold text-lg mb-2">1. Informações Coletadas</h4>
                <p>
                  Coletamos as seguintes informações quando você interage conosco:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li><strong>Informações pessoais:</strong> nome completo, email, telefone (opcional)</li>
                  <li><strong>Informações de pagamento:</strong> processadas exclusivamente pelo Mercado Pago</li>
                  <li><strong>Dados de uso:</strong> páginas visitadas, downloads realizados, interações</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">2. Como Usamos Suas Informações</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Enviar os materiais adquiridos</li>
                  <li>Processar pagamentos e entregar produtos</li>
                  <li>Enviar comunicações sobre novos produtos (com possibilidade de cancelamento)</li>
                  <li>Melhorar nossos produtos e serviços</li>
                  <li>Responder a dúvidas e solicitações de suporte</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">3. Compartilhamento de Dados</h4>
                <p>
                  <strong>NÃO</strong> vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, exceto:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li><strong>Processadores de pagamento:</strong> Mercado Pago (dados necessários para transação)</li>
                  <li><strong>Provedores de serviço:</strong> Google (planilhas para registro de leads)</li>
                  <li><strong>Exigência legal:</strong> quando exigido por lei ou processo judicial</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">4. Segurança dos Dados</h4>
                <p>
                  Implementamos medidas de segurança para proteger suas informações:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Dados armazenados em planilhas do Google com acesso restrito</li>
                  <li>Comunicação segura via HTTPS</li>
                  <li>Acesso limitado apenas a pessoal autorizado</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">5. Seus Direitos</h4>
                <p>
                  Você tem direito a:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incorretos</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Cancelar o recebimento de comunicações</li>
                  <li>Revogar consentimentos dados</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">6. Cookies e Tecnologias Similares</h4>
                <p>
                  Podemos usar cookies para melhorar sua experiência:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Cookies essenciais para funcionamento do site</li>
                  <li>Cookies de desempenho para análise de uso</li>
                  <li>Você pode controlar cookies através das configurações do navegador</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">7. Retenção de Dados</h4>
                <p>
                  Mantemos seus dados pelo tempo necessário para:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li>Cumprir obrigações legais</li>
                  <li>Resolver disputas</li>
                  <li>Aplicar nossos termos de uso</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">8. Contato sobre Privacidade</h4>
                <p>
                  Para exercer seus direitos ou tirar dúvidas sobre privacidade:
                </p>
                <ul className="list-none pl-5 space-y-1 mt-2">
                  <li>📧 Email: editoraremaviva@gmail.com</li>
                  <li>📱 WhatsApp: (19) 99999-9999</li>
                  <li>📬 Resposta em até 30 dias úteis</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2">9. Alterações nesta Política</h4>
                <p>
                  Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="px-6 py-3 rounded-lg font-bold transition-colors w-full"
                style={{ 
                  backgroundColor: COLORS.green,
                  color: 'white'
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}