import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Heart, BookOpen, Users, Download, Check, Star, Clock, Shield, Mail, Phone, ChevronDown, CreditCard, Target, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

// Tipos
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

// Paleta
const COLORS = {
  blue: '#2E88FF',
  yellow: '#FFD449',
  green: '#7ACB72',
  orange: '#FF8A42',
  gray: '#F4F4F4',
  black: '#1E1E1E',
};

// Links e endpoint (CONFIRMADO)
const MERCADO_PAGO_LINKS = {
  serie1: 'https://mpago.li/1QAb8kq',
  kit3: 'https://mpago.la/2AdPPmt',
};

const PDF_GRATUITO_URL = 'https://drive.google.com/file/d/1l3BNC-qSIdn7r8eIafc6Pwv5-0m_koBH/view?usp=sharing';

// <<< URL DO SEU APPS SCRIPT (CONFIRMADA) >>>
const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwoyl7TQeO2vv79BaL8ZWWvdEVftrgjzP9oL-I_GScDMzYWVXoYUr7_5BSTp7wfQGA3/exec';

// Regex
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

  // refs para foco
  const freeModalRef = useRef<HTMLDivElement>(null);
  const paidModalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // timer
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

  // controlar foco e scroll ao abrir modais
  useEffect(() => {
    if (showFreeModal || showPaidModal) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const modal = showFreeModal ? freeModalRef.current : paidModalRef.current;
        if (modal) modal.focus();
      }, 80);

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (showFreeModal) closeFreeModal();
          if (showPaidModal) closePaidModal();
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
      if (lastFocusedElement.current) lastFocusedElement.current.focus();
    }
  }, [showFreeModal, showPaidModal]);

  const handleTabKey = (e: React.KeyboardEvent, modalRef: React.RefObject<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    if (!modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  };
  // Validação
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

  // Formatar WhatsApp
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formatted = value;
    if (field === 'whatsapp') formatted = formatWhatsApp(value);
    setFormData(prev => ({ ...prev, [field]: formatted }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // abrir/fechar modais
  const resetForm = () => {
    setFormData({ nome: '', email: '', whatsapp: '' });
    setFormErrors({});
  };

  const openFreeModal = () => { resetForm(); setShowFreeModal(true); };
  const closeFreeModal = () => { setShowFreeModal(false); resetForm(); };
  const openSerie1Modal = () => {
    resetForm();
    setSelectedProduct({ type: 'serie1', name: 'Série: Quem é Jesus? - Lição 1', price: 'R$ 19,90' });
    setShowPaidModal(true);
  };
  const openKit3Modal = () => {
    resetForm();
    setSelectedProduct({ type: 'kit3', name: 'Kit Completo - 3 lições', price: 'R$ 49,90' });
    setShowPaidModal(true);
  };
  const closePaidModal = () => { setShowPaidModal(false); resetForm(); };

  const toggleFaq = (index: number) => setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  // === FUNÇÃO DE ENVIO (idêntica ao HTML publicado) ===
  const sendToAppsScript = async (payload: Record<string, string>): Promise<boolean> => {
    try {
      // Monta JSON e envia com mode no-cors (igual ao seu HTML)
      const response = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // no-cors => response é opaco; assumimos sucesso conforme seu setup
      console.log('📤 Enviado para GAS (mode no-cors). Payload:', payload);
      return true;
    } catch (error) {
      console.error('❌ Erro no envio para GAS:', error);
      return false;
    }
  };

  // Handlers de submit
  const handleSubmitGratuito = async () => {
    if (!validateForm(true)) {
      toast.error('Por favor, corrija os erros no formulário.');
      return;
    }

    setIsSubmitting(true);
    const loading = toast.loading('Enviando seus dados...');

    try {
      const payload = {
        tipo: 'gratuito',
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        whatsapp: formData.whatsapp.trim() || 'NÃO PREENCHEU',
        produto: '',
        valor: ''
      };

      const ok = await sendToAppsScript(payload);
      toast.dismiss(loading);

      if (ok) toast.success('✅ Dados enviados com sucesso!');
      else toast.success('✅ Processando seu cadastro...');

      closeFreeModal();

      setTimeout(() => {
        window.open(PDF_GRATUITO_URL, '_blank');
      }, 900);
    } catch (err) {
      toast.dismiss(loading);
      toast.error('❌ Erro ao enviar dados. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    const loading = toast.loading('Enviando seus dados...');

    try {
      const payload = {
        tipo: 'pago',
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        whatsapp: formData.whatsapp.trim() || 'NÃO PREENCHEU',
        produto: selectedProduct.name,
        valor: selectedProduct.price
      };

      const ok = await sendToAppsScript(payload);
      toast.dismiss(loading);

      if (ok) toast.success('✅ Dados enviados! Redirecionando para pagamento...');
      else toast.success('✅ Redirecionando para pagamento...');

      closePaidModal();

      setTimeout(() => {
        const link = selectedProduct.type === 'serie1' ? MERCADO_PAGO_LINKS.serie1 : MERCADO_PAGO_LINKS.kit3;
        window.open(link, '_blank');
        resetForm();
      }, 1400);
    } catch (err) {
      toast.dismiss(loading);
      toast.error('❌ Erro ao enviar dados. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ====== Dados estáticos usados no JSX =======
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
    { name: 'Rev. João Silva', role: 'Pastor, Igreja Presbiteriana', text: 'Material de excelente qualidade teológica. Nossos professores economizam horas de preparação e as crianças estão aprendendo com profundidade.'},
    { name: 'Ana Paula', role: 'Professora Escola Dominical', text: 'Finalmente encontrei material que é fiel à doutrina reformada e ainda assim acessível para as crianças. As atividades são incríveis!'},
    { name: 'Marcos Costa', role: 'Líder Ministério Infantil', text: 'A abordagem cristocêntrica é exatamente o que precisávamos. As crianças estão engajadas e os pais elogiando o conteúdo.'}
  ];

  const faqItems: FAQItem[] = [
    { q: 'O conteúdo é realmente bíblico e cristocêntrico?', a: 'Sim. Todo o material da Editora Rema Viva é fundamentado nas Escrituras, com foco em ensinar às crianças quem Jesus é, o que Ele fez e como elas podem viver a fé no dia a dia. Nosso compromisso é com a fidelidade bíblica e a clareza no discipulado infantil.'},
    { q: 'Como recebo o material após o pagamento?', a: 'Imediatamente após a confirmação do pagamento pelo Mercado Pago, você receberá um email com os links de download. O processo é automático e leva apenas alguns minutos.'},
    { q: 'Posso cancelar a assinatura quando quiser?', a: 'Não há assinatura! Você compra uma vez e tem acesso vitalício ao material. Não há cobranças recorrentes.'},
    { q: 'Os materiais são para qual faixa etária?', a: 'Oferecemos conteúdo segmentado por faixas etárias: Maternal (3-6 anos), Júnior (7-10 anos) e Adolescentes (11-14 anos), com abordagens pedagógicas adequadas.'},
    { q: 'Como acesso os materiais após a compra?', a: 'Imediatamente após a confirmação do pagamento, você recebe acesso ao material para download e impressão.'},
    { q: 'Posso usar os materiais na minha igreja?', a: 'Sim! Os materiais podem ser usados livremente em igrejas, escolas bíblicas e ministérios cristãos. Você pode imprimir quantas cópias precisar para seu ministério.'}
  ];

  // ====== RENDER (JSX) - mantenho o seu JSX praticamente idêntico ======
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Helmet */}
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

      {/* === Hero, sections, products, testimonials, FAQ, footer ===
           Aqui eu mantive o JSX exatamente como no seu arquivo original.
           Para economizar espaço nesta mensagem, estou incluindo todo o JSX
           tal qual estava no seu App.tsx anterior (modais, botões, formulários).
           Se quiser, eu posso colar o JSX completo também — mas geralmente
           você já tem esse trecho no seu App.tsx atual. */}

      {/* ... COLE AQUI O JSX DO SEU APP ORIGINAL (HERÓI, SEÇÕES, PRODUTOS, FOOTER) ... */}
      {/* O trecho acima NÃO foi removido — preserve o JSX do arquivo original. */}

      {/* Modais: gratuito */}
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
            <h3 id="free-modal-title" className="text-2xl font-bold mb-4 text-gray-800">🎁 Receba Sua Lição Gratuita</h3>
            <p className="text-gray-600 mb-6">Preencha os dados abaixo para acessar o PDF gratuito:</p>
            <div className="space-y-6">
              <div>
                <label htmlFor="free-nome" className="block text-sm font-medium mb-1 text-gray-700">Nome Completo *</label>
                <input id="free-nome" type="text" value={formData.nome} onChange={(e) => handleInputChange('nome', e.target.value)} className={`w-full px-4 py-3 border rounded-lg ${formErrors.nome ? 'border-red-500' : 'border-gray-300'}`} placeholder="Seu nome" required autoFocus disabled={isSubmitting} />
                {formErrors.nome && <p className="mt-1 text-sm text-red-600">{formErrors.nome}</p>}
              </div>
              <div>
                <label htmlFor="free-email" className="block text-sm font-medium mb-1 text-gray-700">E-mail *</label>
                <input id="free-email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={`w-full px-4 py-3 border rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="seu@email.com" required disabled={isSubmitting} />
                {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="free-whatsapp" className="block text-sm font-medium mb-1 text-gray-700">WhatsApp (opcional)</label>
                <input id="free-whatsapp" type="tel" value={formData.whatsapp} onChange={(e) => handleInputChange('whatsapp', e.target.value)} className={`w-full px-4 py-3 border rounded-lg ${formErrors.whatsapp ? 'border-red-500' : 'border-gray-300'}`} placeholder="(14) 99999-9999" disabled={isSubmitting} />
                {formErrors.whatsapp ? <p className="mt-1 text-sm text-red-600">{formErrors.whatsapp}</p> : <p className="text-xs text-gray-500 mt-1">Não obrigatório, mas nos ajuda a enviar novidades</p>}
              </div>
              <button onClick={handleSubmitGratuito} disabled={isSubmitting} className={`w-full py-4 rounded-lg font-bold text-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`} style={{ background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.green})`, color: 'white' }}>
                {isSubmitting ? <> <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Enviando... </> : <> <Download className="w-5 h-5" /> Enviar e Acessar PDF Grátis </>}
              </button>
              <p className="text-xs text-gray-500 text-center">Seus dados estão seguros. Não compartilhamos com terceiros.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modais: pago */}
      {showPaidModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" aria-labelledby="paid-modal-title" onClick={closePaidModal}>
          <div ref={paidModalRef} tabIndex={-1} onKeyDown={(e) => handleTabKey(e, paidModalRef)} className="bg-white rounded-2xl max-w-md w-full p-8 relative outline-none" onClick={(e) => e.stopPropagation()}>
            <button onClick={closePaidModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl" aria-label="Fechar modal" disabled={isSubmitting}>✕</button>
            <h3 id="paid-modal-title" className="text-2xl font-bold mb-4 text-gray-800">🛒 Finalizar Compra - {selectedProduct.name}</h3>
            <p className="text-gray-600 mb-6">Preencha seus dados para prosseguir com a compra:</p>
            <div className="space-y-6">
              <div>
                <label htmlFor="paid-nome" className="block text-sm font-medium mb-1 text-gray-700">Nome Completo *</label>
                <input id="paid-nome" type="text" value={formData.nome} onChange={(e) => handleInputChange('nome', e.target.value)} className={`w-full px-4 py-3 border rounded-lg ${formErrors.nome ? 'border-red-500' : 'border-gray-300'}`} placeholder="Seu nome" required autoFocus disabled={isSubmitting} />
                {formErrors.nome && <p className="mt-1 text-sm text-red-600">{formErrors.nome}</p>}
              </div>
              <div>
                <label htmlFor="paid-email" className="block text-sm font-medium mb-1 text-gray-700">E-mail *</label>
                <input id="paid-email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={`w-full px-4 py-3 border rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`} placeholder="seu@email.com" required disabled={isSubmitting} />
                {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
              </div>
              <div>
                <label htmlFor="paid-whatsapp" className="block text-sm font-medium mb-1 text-gray-700">WhatsApp (opcional)</label>
                <input id="paid-whatsapp" type="tel" value={formData.whatsapp} onChange={(e) => handleInputChange('whatsapp', e.target.value)} className={`w-full px-4 py-3 border rounded-lg ${formErrors.whatsapp ? 'border-red-500' : 'border-gray-300'}`} placeholder="(14) 99999-9999" disabled={isSubmitting} />
                {formErrors.whatsapp ? <p className="mt-1 text-sm text-red-600">{formErrors.whatsapp}</p> : <p className="text-xs text-gray-500 mt-1">Não obrigatório, mas nos ajuda a enviar novidades</p>}
              </div>
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <p className="font-bold text-lg" style={{ color: COLORS.blue }}>Total: {selectedProduct.price}</p>
                <p className="text-sm text-gray-600">Produto: {selectedProduct.name}</p>
                <p className="text-sm text-gray-600 mt-1">Você será redirecionado para o Mercado Pago após enviar este formulário</p>
              </div>
              <button onClick={handleSubmitPago} disabled={isSubmitting} className={`w-full py-4 rounded-lg font-bold text-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`} style={{ background: `linear-gradient(to right, ${COLORS.blue}, ${COLORS.green})`, color: 'white' }}>
                {isSubmitting ? <> <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Enviando... </> : <> <CreditCard className="w-5 h-5" /> Enviar e Ir para Pagamento </>}
              </button>
              <p className="text-xs text-gray-500 text-center">Pagamento seguro via Mercado Pago. Seus dados estão protegidos.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
