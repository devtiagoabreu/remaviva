export const COUNTDOWN_INITIAL = {
  hours: 23,
  minutes: 45,
  seconds: 30
} as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rev. João Silva',
    role: 'Pastor, Igreja Presbiteriana',
    text: 'Material de excelente qualidade teológica. Nossos professores economizam horas de preparação e as crianças estão aprendendo com profundidade.',
    rating: 5
  },
  {
    id: 2,
    name: 'Ana Paula',
    role: 'Professora Escola Dominical',
    text: 'Finalmente encontrei material que é fiel à doutrina reformada e ainda assim acessível para as crianças. As atividades são incríveis!',
    rating: 5
  },
  {
    id: 3,
    name: 'Marcos Costa',
    role: 'Líder Ministério Infantil',
    text: 'A abordagem cristocêntrica é exatamente o que precisávamos. As crianças estão engajadas e os pais elogiando o conteúdo.',
    rating: 5
  }
] as const;

export const FAQS = [
  {
    id: 1,
    question: 'O conteúdo é mesmo fiel à teologia reformada?',
    answer: 'Sim! Todo o material é desenvolvido com base nas Escrituras e alinhado com a Confissão de Fé de Westminster e os Catecismos. Nosso compromisso é com a fidelidade bíblica e doutrinária.'
  },
  {
    id: 2,
    question: 'Com que frequência recebo novos materiais?',
    answer: 'Os assinantes recebem lições semanais completas, totalizando 4 lições por mês. Além disso, disponibilizamos materiais especiais para datas comemorativas.'
  },
  {
    id: 3,
    question: 'Posso cancelar a assinatura quando quiser?',
    answer: 'Sim! Não há fidelidade. Você pode cancelar a qualquer momento sem custos adicionais. No plano mensal, o cancelamento vale a partir do próximo mês.'
  },
  {
    id: 4,
    question: 'Os materiais são para qual faixa etária?',
    answer: 'Oferecemos conteúdo segmentado por faixas etárias: Maternal (3-6 anos), Júnior (7-10 anos) e Adolescentes (11-14 anos), com abordagens pedagógicas adequadas.'
  },
  {
    id: 5,
    question: 'Como acesso os materiais após a assinatura?',
    answer: 'Imediatamente após a confirmação do pagamento, você recebe acesso à área de membros com todos os PDFs disponíveis para download e impressão.'
  },
  {
    id: 6,
    question: 'Posso usar os materiais na minha igreja?',
    answer: 'Sim! Os materiais podem ser usados livremente em igrejas, escolas bíblicas e ministérios cristãos. Você pode imprimir quantas cópias precisar para seu ministério.'
  }
] as const;

export const PLANS = [
  {
    id: 'monthly' as const,
    name: 'Plano Mensal',
    price: 47,
    period: '/mês',
    features: [
      'Lições semanais completas',
      'Atividades prontas para imprimir',
      'Guias para professores',
      'Materiais visuais em PDF',
      'Acesso imediato ao conteúdo',
      'Cancele quando quiser'
    ],
    ctaText: 'Assinar Plano Mensal'
  },
  {
    id: 'yearly' as const,
    name: 'Plano Anual',
    price: 397,
    originalPrice: 564,
    discount: 30,
    period: '/ano',
    features: [
      'TUDO do Plano Mensal',
      '✨ 3 meses grátis',
      '🎁 Bônus exclusivos',
      '📚 E-books extras',
      '🎯 Acesso prioritário a novos materiais',
      '💎 Materiais especiais de datas comemorativas'
    ],
    ctaText: 'Assinar Plano Anual (Melhor Preço)',
    highlighted: true
  }
] as const;

export const GOOGLE_FORM_CONFIG = {
  url: 'https://docs.google.com/forms/u/0/d/e/FORM_ID/formResponse',
  fieldIds: {
    nome: 'entry.1234567890',
    email: 'entry.0987654321',
    whatsapp: 'entry.1357924680'
  }
} as const;

export const CONTACT_INFO = {
  email: 'contato@editoraremaviva.com.br',
  phone: '(14) 99999-9999',
  instagram: 'https://www.instagram.com/editoraremaviva/',
  whatsapp: 'https://wa.me/5514999999999'
} as const;