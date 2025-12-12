'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Target, TrendingDown, Ruler, Weight, Dumbbell } from 'lucide-react';

interface QuizData {
  currentWeight: number;
  targetWeight: number;
  height: number;
  muscleGroups: string[];
  fitnessLevel: 'iniciante' | 'intermediário' | 'avançado';
}

interface PersonalizedQuizProps {
  onComplete: (data: QuizData) => void;
}

export function PersonalizedQuiz({ onComplete }: PersonalizedQuizProps) {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<Partial<QuizData>>({
    muscleGroups: [],
    fitnessLevel: 'iniciante'
  });

  const muscleGroupOptions = [
    { id: 'abdomen', label: 'Abdômen', emoji: '💥' },
    { id: 'pernas', label: 'Pernas', emoji: '🦵' },
    { id: 'bracos', label: 'Braços', emoji: '💪' },
    { id: 'gluteos', label: 'Glúteos', emoji: '🍑' },
    { id: 'peito', label: 'Peito', emoji: '🫀' },
    { id: 'costas', label: 'Costas', emoji: '🏋️' },
  ];

  const handleMuscleGroupToggle = (groupId: string) => {
    const current = quizData.muscleGroups || [];
    if (current.includes(groupId)) {
      setQuizData({
        ...quizData,
        muscleGroups: current.filter(g => g !== groupId)
      });
    } else {
      setQuizData({
        ...quizData,
        muscleGroups: [...current, groupId]
      });
    }
  };

  const handleComplete = () => {
    if (
      quizData.currentWeight &&
      quizData.targetWeight &&
      quizData.height &&
      quizData.muscleGroups &&
      quizData.muscleGroups.length > 0 &&
      quizData.fitnessLevel
    ) {
      onComplete(quizData as QuizData);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return quizData.currentWeight && quizData.currentWeight > 0;
      case 2:
        return quizData.targetWeight && quizData.targetWeight > 0;
      case 3:
        return quizData.height && quizData.height > 0;
      case 4:
        return quizData.muscleGroups && quizData.muscleGroups.length > 0;
      case 5:
        return quizData.fitnessLevel;
      default:
        return false;
    }
  };

  const calculateIMC = () => {
    if (quizData.currentWeight && quizData.height) {
      const heightInMeters = quizData.height / 100;
      return (quizData.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const calculateWeightToLose = () => {
    if (quizData.currentWeight && quizData.targetWeight) {
      return (quizData.currentWeight - quizData.targetWeight).toFixed(1);
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Passo {step} de 5
            </span>
            <span className="text-sm font-medium text-orange-600">
              {Math.round((step / 5) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Step 1: Current Weight */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full mb-4">
                  <Weight className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Qual seu peso atual?</h2>
                <p className="text-muted-foreground">Vamos começar conhecendo você melhor</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    value={quizData.currentWeight || ''}
                    onChange={(e) => setQuizData({ ...quizData, currentWeight: parseFloat(e.target.value) })}
                    placeholder="0"
                    className="w-full text-5xl font-bold text-center bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                  <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">
                    kg
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Target Weight */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Qual seu peso desejado?</h2>
                <p className="text-muted-foreground">Defina sua meta de emagrecimento</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    value={quizData.targetWeight || ''}
                    onChange={(e) => setQuizData({ ...quizData, targetWeight: parseFloat(e.target.value) })}
                    placeholder="0"
                    className="w-full text-5xl font-bold text-center bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 focus:outline-none focus:border-green-500 transition-colors"
                  />
                  <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">
                    kg
                  </span>
                </div>

                {quizData.currentWeight && quizData.targetWeight && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6 text-center">
                    <TrendingDown className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm opacity-90 mb-1">Você quer perder</p>
                    <p className="text-4xl font-bold">{calculateWeightToLose()} kg</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Height */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
                  <Ruler className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Qual sua altura?</h2>
                <p className="text-muted-foreground">Isso nos ajuda a calcular seu IMC</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="number"
                    value={quizData.height || ''}
                    onChange={(e) => setQuizData({ ...quizData, height: parseFloat(e.target.value) })}
                    placeholder="0"
                    className="w-full text-5xl font-bold text-center bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <span className="absolute right-8 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">
                    cm
                  </span>
                </div>

                {calculateIMC() && (
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6 text-center">
                    <p className="text-sm opacity-90 mb-1">Seu IMC atual</p>
                    <p className="text-4xl font-bold">{calculateIMC()}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Muscle Groups */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Quais grupos musculares?</h2>
                <p className="text-muted-foreground">Selecione as áreas que quer focar (mínimo 1)</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {muscleGroupOptions.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => handleMuscleGroupToggle(group.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                      quizData.muscleGroups?.includes(group.id)
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                  >
                    <div className="text-4xl mb-2">{group.emoji}</div>
                    <div className="font-semibold">{group.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Fitness Level */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">Qual seu nível?</h2>
                <p className="text-muted-foreground">Vamos ajustar a intensidade para você</p>
              </div>

              <div className="space-y-4">
                {[
                  { level: 'iniciante', label: 'Iniciante', desc: 'Estou começando agora', emoji: '🌱' },
                  { level: 'intermediário', label: 'Intermediário', desc: 'Já tenho alguma experiência', emoji: '💪' },
                  { level: 'avançado', label: 'Avançado', desc: 'Treino regularmente', emoji: '🔥' },
                ].map((option) => (
                  <button
                    key={option.level}
                    onClick={() => setQuizData({ ...quizData, fitnessLevel: option.level as any })}
                    className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                      quizData.fitnessLevel === option.level
                        ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{option.emoji}</div>
                      <div>
                        <div className="font-bold text-lg">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                onClick={() => setStep(step - 1)}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
            )}

            {step < 5 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                size="lg"
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                Próximo
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canProceed()}
                size="lg"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                Criar Meu Plano 🎯
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
