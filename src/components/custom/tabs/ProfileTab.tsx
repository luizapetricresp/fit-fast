'use client';

import { useState } from 'react';
import { User, Scale, Ruler, Target, Bell, RefreshCw, ChevronRight, TrendingDown, Calendar, Award, Plus } from 'lucide-react';
import { type QuizData } from '@/lib/workouts';

interface ProfileTabProps {
  quizData: QuizData;
  onResetQuiz: () => void;
}

export function ProfileTab({ quizData, onResetQuiz }: ProfileTabProps) {
  const [weightHistory, setWeightHistory] = useState([
    { date: 'Semana 1', weight: quizData.currentWeight },
    { date: 'Semana 2', weight: quizData.currentWeight - 0.5 },
    { date: 'Semana 3', weight: quizData.currentWeight - 1.2 },
    { date: 'Semana 4', weight: quizData.currentWeight - 2.0 },
  ]);

  const [showAddWeight, setShowAddWeight] = useState(false);
  const [newWeight, setNewWeight] = useState('');

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const currentBMI = calculateBMI(quizData.currentWeight, quizData.height);
  const weightLost = quizData.currentWeight - weightHistory[weightHistory.length - 1].weight;
  const weightToGo = quizData.currentWeight - quizData.targetWeight;
  const progressPercentage = ((weightLost / weightToGo) * 100).toFixed(0);

  const handleAddWeight = () => {
    if (newWeight && parseFloat(newWeight) > 0) {
      const weekNumber = weightHistory.length + 1;
      setWeightHistory([
        ...weightHistory,
        { date: `Semana ${weekNumber}`, weight: parseFloat(newWeight) }
      ]);
      setNewWeight('');
      setShowAddWeight(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Acompanhe sua evolução e progresso
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

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-6 h-6" />
          <h3 className="text-xl font-bold">Seu Progresso</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Peso Perdido</p>
            <p className="text-3xl font-bold">{weightLost.toFixed(1)} kg</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Falta Perder</p>
            <p className="text-3xl font-bold">{(weightToGo - weightLost).toFixed(1)} kg</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
          <div 
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-white/90 text-sm mt-2 text-center">{progressPercentage}% da meta alcançada</p>
      </div>

      {/* Weight Evolution Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-lg">Evolução de Peso</h3>
          </div>
          <button
            onClick={() => setShowAddWeight(!showAddWeight)}
            className="flex items-center gap-1 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg hover:scale-105 transition-transform text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>

        {/* Add Weight Form */}
        {showAddWeight && (
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <label className="block text-sm font-medium mb-2">Novo Peso (kg)</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Ex: 75.5"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAddWeight}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:scale-105 transition-transform"
              >
                Salvar
              </button>
            </div>
          </div>
        )}

        {/* Weight History Graph */}
        <div className="space-y-3">
          {weightHistory.map((entry, index) => {
            const isLatest = index === weightHistory.length - 1;
            const previousWeight = index > 0 ? weightHistory[index - 1].weight : quizData.currentWeight;
            const difference = previousWeight - entry.weight;
            
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-20">
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-8 overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isLatest 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                          : 'bg-gradient-to-r from-blue-400 to-blue-500'
                      }`}
                      style={{ width: `${((quizData.currentWeight - entry.weight + quizData.targetWeight) / quizData.currentWeight) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {entry.weight.toFixed(1)} kg
                      </span>
                      {difference > 0 && (
                        <span className="text-xs font-bold text-green-600">
                          -{difference.toFixed(1)} kg
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Peso Inicial</p>
              <p className="font-bold text-lg">{quizData.currentWeight} kg</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Peso Atual</p>
              <p className="font-bold text-lg text-purple-600">{weightHistory[weightHistory.length - 1].weight.toFixed(1)} kg</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Meta</p>
              <p className="font-bold text-lg text-green-600">{quizData.targetWeight} kg</p>
            </div>
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
          <p className="text-2xl font-bold">{weightHistory[weightHistory.length - 1].weight.toFixed(1)} kg</p>
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
