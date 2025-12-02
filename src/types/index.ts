export interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Plan {
  id: 'monthly' | 'yearly';
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  period: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
}

export interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}