'use client';

import { TrendingUp, TrendingDown, Award, Calendar, Scale, Target } from 'lucide-react';
import { type QuizData } from '@/lib/workouts';

interface ReportTabProps {
  quizData: QuizData;
}

export function ReportTab({ quizData }: ReportTabProps) {
  // Simular dados de progresso
  const currentWeight = quizData.currentWeight;
  const targetWeight = quizData.targetWeight;
  const weightDiff = currentWeight - targetWeight;
  const progress = Math.min(Math.round((weightDiff / (currentWeight - targetWeight)) * 100), 100);

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const currentBMI = calculateBMI(currentWeight, quizData.height);
  const targetBMI = calculateBMI(targetWeight, quizData.height);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-600' };
    if (bmi < 25) return { label: 'Peso normal', color: 'text-green-600' };
    if (bmi < 30) return { label: 'Sobrepeso', color: 'text-yellow-600' };
    return { label: 'Obesidade', color: 'text-red-600' };
  };

  const currentBMICategory = getBMICategory(Number(currentBMI));

  // Dados simulados de treinos
  const workoutsThisWeek = 4;
  const consecutiveDays = 3;
  const totalWorkouts = 12;

  // Dados simulados para gráfico de peso
  const weightHistory = [
    { week: 'Sem 1', weight: currentWeight },
    { week: 'Sem 2', weight: currentWeight - 0.5 },
    { week: 'Sem 3', weight: currentWeight - 1.2 },
    { week: 'Sem 4', weight: currentWeight - 2.0 },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Relatório</h1>
        <p className="text-muted-foreground">
          Acompanhe sua evolução e progresso 📊
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Esta Semana</span>
          </div>
          <p className="text-3xl font-bold">{workoutsThisWeek}</p>
          <p className="text-sm opacity-90">treinos completos</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Sequência</span>
          </div>
          <p className="text-3xl font-bold">{consecutiveDays}</p>
          <p className="text-sm opacity-90">dias seguidos</p>
        </div>
      </div>

      {/* Weight Progress */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">Progresso de Peso</h3>
          <Scale className="w-6 h-6 text-purple-600" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Peso Atual</p>
              <p className="text-2xl font-bold">{currentWeight} kg</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Meta</p>
              <p className="text-2xl font-bold text-purple-600">{targetWeight} kg</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso</span>
              <span className="text-sm font-bold text-purple-600">{progress}%</span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full h-3 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {weightDiff > 0 ? (
              <>
                <TrendingDown className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">
                  Faltam {weightDiff.toFixed(1)} kg para sua meta!
                </span>
              </>
            ) : (
              <>
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">
                  Meta alcançada! Parabéns! 🎉
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Weight Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-xl mb-6">Evolução do Peso</h3>
        <div className="space-y-4">
          {weightHistory.map((entry, index) => {
            const isLast = index === weightHistory.length - 1;
            const prevWeight = index > 0 ? weightHistory[index - 1].weight : entry.weight;
            const diff = prevWeight - entry.weight;
            
            return (
              <div key={entry.week} className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium text-muted-foreground">
                  {entry.week}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className={`${
                          isLast ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gray-400 dark:bg-gray-600'
                        } rounded-full h-2 transition-all`}
                        style={{ width: `${((currentWeight - entry.weight) / (currentWeight - targetWeight)) * 100}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold w-16 text-right">
                      {entry.weight.toFixed(1)}
                    </span>
                  </div>
                </div>
                {diff > 0 && (
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingDown className="w-4 h-4" />
                    -{diff.toFixed(1)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BMI Card */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">Índice de Massa Corporal</h3>
          <Target className="w-6 h-6 text-blue-600" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">IMC Atual</p>
              <p className="text-3xl font-bold">{currentBMI}</p>
              <p className={`text-sm font-medium ${currentBMICategory.color}`}>
                {currentBMICategory.label}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">IMC Meta</p>
              <p className="text-3xl font-bold text-blue-600">{targetBMI}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950 rounded-2xl p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💡 Continue com seus treinos e alimentação saudável para alcançar seu IMC ideal!
            </p>
          </div>
        </div>
      </div>

      {/* Total Workouts */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Total de Treinos</p>
            <p className="text-4xl font-bold mb-2">{totalWorkouts}</p>
            <p className="text-sm opacity-90">Você está arrasando! 💪</p>
          </div>
          <div className="text-6xl">🏆</div>
        </div>
      </div>
    </div>
  );
}
