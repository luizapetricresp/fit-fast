'use client';

import { useState, useEffect } from 'react';
import { type QuizData } from '@/lib/workouts';
import { PersonalizedQuiz } from '@/components/custom/PersonalizedQuiz';
import { MainApp } from '@/components/custom/MainApp';

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
    return <PersonalizedQuiz onComplete={handleQuizComplete} />;
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
