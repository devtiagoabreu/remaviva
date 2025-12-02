import React, { useState } from 'react';
import { 
  Heart, BookOpen, Users, Download, Check, Star, Clock, 
  Shield, Mail, Phone, ChevronDown, Sparkles, Award, Book
} from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import { useForm } from '@/hooks/useForm';
import { 
  COUNTDOWN_INITIAL, 
  TESTIMONIALS, 
  FAQS, 
  PLANS,
  CONTACT_INFO 
} from '@/utils/constants';
import { FormData } from '@/types';
import toast from 'react-hot-toast';

export default function App() {
  const { timeLeft, formatted } = useCountdown(COUNTDOWN_INITIAL);
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  const form = useForm<FormData>({
    initialValues: {
      nome: '',
      email: '',
      whatsapp: ''
    },
    onSubmit: async (values) => {
      console.log('Enviando formulário:', values);
      toast.success('🎉 Obrigado! Verifique seu e-mail para baixar a lição gratuita.');
      setShowFreeModal(false);
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormData, string>> = {};
      if (!values.nome.trim()) errors.nome = 'Nome é obrigatório';
      if (!values.email.trim()) errors.email = 'E-mail é obrigatório';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'E-mail inválido';
      }
      return errors;
    }
  });

  const toggleFaq = (id: number) => {
    setOpenFaqs(prev => 
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };

  const handleMonthlySubscription = () => {
    toast.loading('Redirecionando para pagamento...');
    // Aqui vai a integração com Pagar.me
    setTimeout(() => {
      toast.dismiss();
      toast.success('Redirecionando para checkout!');
      // window.location.href = checkoutUrl;
    }, 1500);
  };

  const handleYearlySubscription = () => {
    toast.loading('Redirecionando para pagamento...');
    // Aqui vai a integração com Pagar.me
    setTimeout(() => {
      toast.dismiss();
      toast.success('Redirecionando para checkout!');
      // window.location.href = checkoutUrl;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative section-container section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-accent-400/20 backdrop-blur-sm text-accent-300 px-4 py-2 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Material Cristocêntrico e Fiel à Doutrina Reformada
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transforme a Fé dos Seus Filhos com Lições Bíblicas{' '}
                <span className="text-accent-300">Inesquecíveis</span>
              </h1>
              
              <p className="text-xl text-primary-100">
                Conteúdo cristocêntrico e fiel à teologia calvinista, pronto para usar. 
                Economize horas de preparação e ministre com excelência.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => setShowFreeModal(true)}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  <Download className="w-5 h-5" />
                  Baixe a Lição Gratuita Agora!
                </button>
                
                <a 
                  href="#planos" 
                  className="btn-outline text-lg px-8 py-4 text-white border-white hover:bg-white/10"
                >
                  <Book className="w-5 h-5" />
                  Ver Planos
                </a>
              </div>
              
              <p className="text-sm text-primary-200">
                🎁 Sem compromisso • Acesso imediato • 100% gratuito
              </p>
            </div>
            
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&crop=face" 
                    alt="Jesus ensinando crianças" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -top-3 -right-3 bg-secondary-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Material Testado ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Resto do seu código vai aqui... */}
      {/* Vou manter o resto do código similar ao que você já tem, mas adaptado para TypeScript */}

      {/* Modal para Material Gratuito */}
      {showFreeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="modal-content animate-slide-up">
            <button 
              onClick={() => setShowFreeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                🎁 Receba Sua Lição Gratuita
              </h3>
              <p className="text-gray-600 mt-2">
                Preencha os dados abaixo e receba imediatamente em seu e-mail:
              </p>
            </div>
            
            <form onSubmit={form.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={form.values.nome}
                  onChange={form.handleChange}
                  className="input-field"
                  placeholder="Seu nome"
                />
                {form.errors.nome && (
                  <p className="mt-1 text-sm text-red-600">{form.errors.nome}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.values.email}
                  onChange={form.handleChange}
                  className="input-field"
                  placeholder="seu@email.com"
                />
                {form.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{form.errors.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp (opcional)
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={form.values.whatsapp}
                  onChange={form.handleChange}
                  className="input-field"
                  placeholder="(14) 99999-9999"
                />
              </div>
              
              <button
                type="submit"
                disabled={form.isSubmitting}
                className="btn-primary w-full py-4 text-lg"
              >
                {form.isSubmitting ? 'Enviando...' : 'Enviar e Receber Material Grátis'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                🔒 Seus dados estão seguros. Não compartilhamos com terceiros.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}