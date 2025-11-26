'use client';

import { useState, useEffect } from 'react';
import { type QuizData } from '@/lib/workouts';
import { PersonalizedQuiz } from '@/components/custom/PersonalizedQuiz';
import { MainApp } from '@/components/custom/MainApp';
import { Dumbbell, Target, Apple, Pill, Crown, Star, CheckCircle } from 'lucide-react';

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(true);
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    const savedQuiz = localStorage.getItem('quiz-data');

    if (savedQuiz) {
      const quiz = JSON.parse(savedQuiz);
      setQuizData(quiz);
      setShowQuiz(false);
    }
  }, []);

  const handleQuizComplete = (data: QuizData) => {
    // Salva dados do quiz
    localStorage.setItem('quiz-data', JSON.stringify(data));
    setQuizData(data);

    // Transição instantânea para o app
    setShowQuiz(false);
  };

  const handleResetQuiz = () => {
    if (confirm('Tem certeza? Isso vai resetar todo seu progresso e criar um novo plano.')) {
      localStorage.removeItem('quiz-data');
      localStorage.removeItem('workout-progress');
      setShowQuiz(true);
      setQuizData(null);
    }
  };

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Header with Logo */}
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <img
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8702246c-5aec-482d-b962-ed692e0a9f79.png"
                  alt="FitFast Logo"
                  className="h-10 w-auto rounded-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    FitFast
                  </h1>
                  <p className="text-xs text-muted-foreground">Sua jornada fitness começa aqui</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Transforme seu corpo com inteligência artificial
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Planos personalizados de treino e nutrição adaptados ao seu perfil,
              objetivos e até mesmo aos medicamentos que você toma.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Planos Personalizados</h3>
                <p className="text-sm text-muted-foreground">
                  Treinos e dietas feitos sob medida para seu corpo e objetivos
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Apple className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Nutrição Inteligente</h3>
                <p className="text-sm text-muted-foreground">
                  Macronutrientes calculados automaticamente conforme seu perfil
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Compatível com Medicamentos</h3>
                <p className="text-sm text-muted-foreground">
                  Planos adaptados aos remédios para emagrecimento que você toma
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-6 text-white mb-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold mb-1">10k+</div>
                  <div className="text-sm opacity-90">Usuários ativos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">90</div>
                  <div className="text-sm opacity-90">Dias de plano</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">100+</div>
                  <div className="text-sm opacity-90">Receitas saudáveis</div>
                </div>
              </div>
            </div>

            {/* Premium CTA */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Crown className="w-6 h-6" />
                <span className="font-bold">Premium por apenas R$ 9,90/mês</span>
              </div>
              <p className="text-sm opacity-90 mb-4">
                Desbloqueie 100+ treinos exclusivos e consultoria nutricional
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Sem anúncios
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Suporte 24/7
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Cancele quando quiser
                </span>
              </div>
            </div>

            {/* Start Button */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Pronto para começar sua transformação?</h3>
              <p className="text-muted-foreground mb-6">
                Responda algumas perguntas rápidas e receba seu plano personalizado em segundos!
              </p>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform cursor-pointer">
                  <Star className="w-5 h-5" />
                  Criar Meu Plano Agora
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Component */}
        <div className="max-w-2xl mx-auto px-4 pb-8">
          <PersonalizedQuiz onComplete={handleQuizComplete} />
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-8">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Suporte: fitfast.contato@gmail.com
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 FitFast. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 animate-pulse">
            <span className="text-4xl">💪</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Carregando seu plano...</h2>
          <p className="text-muted-foreground">Aguarde um momento 🎯</p>
        </div>
      </div>
    );
  }

  return <MainApp quizData={quizData} onResetQuiz={handleResetQuiz} />;
}