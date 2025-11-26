'use client';

import { useState } from 'react';
import { CreditCard, Smartphone, FileText, Crown, Check, Star, Zap } from 'lucide-react';

export function PaymentsTab() {
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const plans = [
    {
      id: 'monthly',
      name: 'Plano Mensal',
      price: 29.90,
      originalPrice: 49.90,
      period: 'mês',
      popular: false,
      features: [
        'Acesso completo ao app',
        '100+ treinos personalizados',
        '80+ receitas saudáveis',
        'Acompanhamento de progresso',
        'Suporte por e-mail'
      ]
    },
    {
      id: 'quarterly',
      name: 'Plano Trimestral',
      price: 79.90,
      originalPrice: 149.70,
      period: '3 meses',
      discount: '15% OFF',
      popular: true,
      features: [
        'Tudo do plano mensal',
        'Consultoria nutricional',
        'Planos de refeições personalizados',
        'Acesso prioritário a novos conteúdos',
        'Suporte por chat'
      ]
    },
    {
      id: 'annual',
      name: 'Plano Anual',
      price: 299.90,
      originalPrice: 599.80,
      period: 'ano',
      discount: '50% OFF',
      popular: false,
      features: [
        'Tudo do plano trimestral',
        'Sessões de coaching mensais',
        'App sem anúncios',
        'Backup de dados na nuvem',
        'Suporte 24/7'
      ]
    }
  ];

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      description: 'Pagamento instantâneo',
      icon: Smartphone,
      color: 'from-green-500 to-emerald-600',
      benefits: ['Aprovação imediata', 'Sem taxas', 'Disponível 24h']
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      description: 'Pagamento tradicional',
      icon: FileText,
      color: 'from-blue-500 to-cyan-600',
      benefits: ['Sem conta bancária', 'Prazo de 3 dias úteis', 'Aceito em todo Brasil']
    },
    {
      id: 'card',
      name: 'Cartão de Crédito',
      description: 'Parcelamento disponível',
      icon: CreditCard,
      color: 'from-purple-500 to-pink-600',
      benefits: ['Até 12x sem juros', 'Aprovação rápida', 'Proteção ao comprador']
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Upgrade Premium</h1>
        <p className="text-muted-foreground">
          Desbloqueie todo o potencial do FitFast! 🚀
        </p>
      </div>

      {/* Premium Benefits */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <Crown className="w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold mb-1">Por que escolher Premium?</h2>
            <p className="text-white/90">Transforme sua jornada fitness</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" />
            <span className="text-sm">100+ treinos exclusivos</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" />
            <span className="text-sm">Receitas personalizadas</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" />
            <span className="text-sm">Acompanhamento 24/7</span>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" />
            <span className="text-sm">Sem anúncios</span>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl">Escolha seu plano</h3>

        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border-2 transition-all cursor-pointer ${
              selectedPlan === plan.id
                ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 scale-105'
                : 'border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MAIS POPULAR
                </span>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-lg">{plan.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-3xl font-bold">R$ {plan.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period}</span>
                  {plan.discount && (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full text-xs font-bold">
                      {plan.discount}
                    </span>
                  )}
                </div>
                {plan.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {plan.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${plan.id === 'monthly' ? 'from-orange-500 to-red-600' : plan.id === 'quarterly' ? 'from-purple-500 to-pink-600' : 'from-green-500 to-emerald-600'} flex items-center justify-center`}>
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl">Forma de pagamento</h3>

        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border-2 transition-all cursor-pointer ${
                selectedPayment === method.id
                  ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 scale-105'
                  : 'border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{method.name}</h4>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {method.benefits.map((benefit, index) => (
                      <span key={index} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Installments for Card */}
      {selectedPayment === 'card' && selectedPlanData && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-5 border border-purple-200 dark:border-purple-800">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Opções de Parcelamento
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 6, 9, 12].map((installment) => {
              const installmentValue = selectedPlanData.price / installment;
              return (
                <div key={installment} className="bg-white dark:bg-gray-900 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold">{installment}x</div>
                  <div className="text-sm text-muted-foreground">
                    R$ {installmentValue.toFixed(2)}
                  </div>
                  {installment <= 6 && (
                    <div className="text-xs text-green-600 font-medium mt-1">
                      Sem juros
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subscription Info */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
        <h4 className="font-bold mb-2">Assinatura Recorrente</h4>
        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
          Seu plano será renovado automaticamente todo período. Você pode cancelar a qualquer momento sem taxas adicionais.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 text-green-500" />
          <span>7 dias de teste grátis</span>
        </div>
        <div className="flex items-center gap-2 text-sm mt-1">
          <Check className="w-4 h-4 text-green-500" />
          <span>Cancele quando quiser</span>
        </div>
      </div>

      {/* Checkout Button */}
      {selectedPlan && selectedPayment && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Pronto para começar?</h3>
            <p className="text-white/90 mb-4">
              {selectedPlanData?.name} - R$ {selectedPlanData?.price.toFixed(2)}/{selectedPlanData?.period}
            </p>
            <button className="w-full bg-white text-green-600 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
              Finalizar Assinatura
            </button>
            <p className="text-xs text-white/80 mt-3">
              Ao continuar, você concorda com nossos Termos de Uso
            </p>
          </div>
        </div>
      )}

      {/* Support */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Dúvidas? Entre em contato:</p>
        <p className="font-medium">fitfast.contato@gmail.com</p>
      </div>
    </div>
  );
}