'use client';

import { useState } from 'react';
import { User, Scale, Ruler, Target, Bell, Crown, LogOut, RefreshCw, ChevronRight } from 'lucide-react';
import { type QuizData } from '@/lib/workouts';

interface ProfileTabProps {
  quizData: QuizData;
  onResetQuiz: () => void;
}

export function ProfileTab({ quizData, onResetQuiz }: ProfileTabProps) {
  const [showPremium, setShowPremium] = useState(false);

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const currentBMI = calculateBMI(quizData.currentWeight, quizData.height);

  if (showPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-b-3xl">
          <button
            onClick={() => setShowPremium(false)}
            className="mb-4 text-white/80 hover:text-white"
          >
            ← Voltar
          </button>
          <div className="text-center">
            <Crown className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Sua mudança começa hoje!</h1>
            <p className="text-white/90">Desbloqueie todo o potencial do app</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="p-6 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4">O que você ganha:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <p className="font-medium">Preparo físico em casa</p>
                  <p className="text-sm text-muted-foreground">Mais de 100 treinos para abdômen, corpo inteiro e mais</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <p className="font-medium">Cuidado facial</p>
                  <p className="text-sm text-muted-foreground">Rotinas extras de bem-estar</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <p className="font-medium">Alongamento para relaxar</p>
                  <p className="text-sm text-muted-foreground">Para dormir melhor e recuperar</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <p className="font-medium">Alimentações mais saudáveis</p>
                  <p className="text-sm text-muted-foreground">Mais de 50 receitas extras</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">Plano Anual</p>
                <p className="text-3xl font-bold">R$ 9,90/mês</p>
              </div>
              <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                -67%
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Cobrado R$ 118,80 anualmente
            </p>
            <button className="w-full py-4 bg-white text-purple-600 rounded-xl font-bold hover:scale-105 transition-transform">
              Continuar
            </button>
            <p className="text-xs text-center mt-3 opacity-75">
              7 dias grátis • Cancele quando quiser
            </p>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações e configurações
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Olá! 👋</h2>
            <p className="text-white/90">Continue firme na sua jornada</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            <Scale className="w-5 h-5" />
            <span className="text-sm font-medium">Peso Atual</span>
          </div>
          <p className="text-2xl font-bold">{quizData.currentWeight} kg</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2 text-green-600">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Meta</span>
          </div>
          <p className="text-2xl font-bold">{quizData.targetWeight} kg</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2 text-purple-600">
            <Ruler className="w-5 h-5" />
            <span className="text-sm font-medium">Altura</span>
          </div>
          <p className="text-2xl font-bold">{quizData.height} cm</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2 text-orange-600">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">IMC</span>
          </div>
          <p className="text-2xl font-bold">{currentBMI}</p>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-lg mb-3">Áreas de Foco</h3>
        <div className="flex flex-wrap gap-2">
          {quizData.muscleGroups.map((group) => (
            <span
              key={group}
              className="px-4 py-2 bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium"
            >
              {group}
            </span>
          ))}
        </div>
      </div>

      {/* Premium Banner */}
      <button
        onClick={() => setShowPremium(true)}
        className="w-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-xl hover:scale-105 transition-transform"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6" />
              <span className="font-bold text-lg">Upgrade para Premium</span>
            </div>
            <p className="text-sm text-white/90">
              Desbloqueie mais de 100 treinos e 50 receitas
            </p>
          </div>
          <ChevronRight className="w-6 h-6" />
        </div>
      </button>

      {/* Settings */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg">Configurações</h3>
        
        <button className="w-full bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Notificações</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={onResetQuiz}
          className="w-full bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-800 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Redefinir Plano</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
