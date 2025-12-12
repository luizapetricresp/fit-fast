'use client';

import { useState, useEffect } from 'react';
import { Droplet, Check } from 'lucide-react';
import { type QuizData } from '@/lib/workouts';

interface HomeTabProps {
  quizData: QuizData;
}

export function HomeTab({ quizData }: HomeTabProps) {
  // Calcula quantidade de água baseado no peso (35ml por kg)
  const dailyWaterGoal = Math.round((quizData.currentWeight * 35) / 250); // em copos de 250ml
  
  const [waterIntake, setWaterIntake] = useState<number>(0);

  // Carrega progresso de água do localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const savedData = localStorage.getItem('water-intake');
    
    if (savedData) {
      const { date, amount } = JSON.parse(savedData);
      if (date === today) {
        setWaterIntake(amount);
      } else {
        // Novo dia, reseta
        localStorage.setItem('water-intake', JSON.stringify({ date: today, amount: 0 }));
        setWaterIntake(0);
      }
    }
  }, []);

  const addWaterGlass = () => {
    const newAmount = Math.min(waterIntake + 1, dailyWaterGoal);
    setWaterIntake(newAmount);
    
    const today = new Date().toDateString();
    localStorage.setItem('water-intake', JSON.stringify({ date: today, amount: newAmount }));
  };

  const removeWaterGlass = () => {
    const newAmount = Math.max(waterIntake - 1, 0);
    setWaterIntake(newAmount);
    
    const today = new Date().toDateString();
    localStorage.setItem('water-intake', JSON.stringify({ date: today, amount: newAmount }));
  };

  const waterPercentage = (waterIntake / dailyWaterGoal) * 100;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Início</h1>
        <p className="text-muted-foreground">
          Acompanhe sua hidratação diária 💧
        </p>
      </div>

      {/* Water Tracker Card */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Droplet className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Hidratação</h2>
            <p className="text-white/90 text-sm">Meta diária de água</p>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="flex items-center justify-center my-6">
          <div className="relative w-40 h-40">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="white"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - waterPercentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{waterIntake}</span>
              <span className="text-sm opacity-90">de {dailyWaterGoal} copos</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Meta diária</span>
            <span className="font-bold">{dailyWaterGoal * 250}ml</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Consumido</span>
            <span className="font-bold">{waterIntake * 250}ml</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={removeWaterGlass}
            disabled={waterIntake === 0}
            className="flex-1 bg-white/20 backdrop-blur-sm py-3 rounded-xl font-bold hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            - Remover
          </button>
          <button
            onClick={addWaterGlass}
            disabled={waterIntake >= dailyWaterGoal}
            className="flex-1 bg-white text-blue-600 py-3 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Adicionar Copo
          </button>
        </div>

        {waterIntake >= dailyWaterGoal && (
          <div className="mt-4 bg-green-500/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span className="font-medium">Meta atingida! Parabéns! 🎉</span>
          </div>
        )}
      </div>

      {/* Tips Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-lg mb-3">💡 Dicas de Hidratação</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Beba água ao acordar para ativar o metabolismo</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Mantenha uma garrafa de água sempre por perto</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Beba água antes, durante e após os treinos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Adicione limão ou frutas para variar o sabor</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
