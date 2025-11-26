'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Target, TrendingDown, Ruler, Weight, Dumbbell, Pill } from 'lucide-react';

interface QuizData {
  currentWeight: number;
  targetWeight: number;
  height: number;
  muscleGroups: string[];
  fitnessLevel: 'iniciante' | 'intermediário' | 'avançado';
  medication?: {
    takesMedication: boolean;
    medicationName?: string;
    category?: 'fitoterápico' | 'suplemento' | 'prescrição';
    dosesPerDay?: number;
    times?: string[];
  };
}

interface PersonalizedQuizProps {
  onComplete: (data: QuizData) => void;
}

export function PersonalizedQuiz({ onComplete }: PersonalizedQuizProps) {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState<Partial<QuizData>>({
    muscleGroups: [],
    fitnessLevel: 'iniciante',
    medication: {
      takesMedication: false,
      times: []
    }
  });

  const muscleGroupOptions = [
    { id: 'abdomen', label: 'Abdômen', emoji: '💥' },
    { id: 'pernas', label: 'Pernas', emoji: '🦵' },
    { id: 'bracos', label: 'Braços', emoji: '💪' },
    { id: 'gluteos', label: 'Glúteos', emoji: '🍑' },
    { id: 'peito', label: 'Peito', emoji: '🫀' },
    { id: 'costas', label: 'Costas', emoji: '🏋️' },
  ];

  const medicationOptions = [
    { name: 'Orlistat', category: 'prescrição' },
    { name: 'Sibutramina', category: 'prescrição' },
    { name: 'Fluoxetina', category: 'prescrição' },
    { name: 'Garcinia Cambogia', category: 'fitoterápico' },
    { name: 'Chá Verde', category: 'fitoterápico' },
    { name: 'Hibiscus', category: 'fitoterápico' },
    { name: 'CLA (Ácido Linoleico Conjugado)', category: 'suplemento' },
    { name: 'Cafeína', category: 'suplemento' },
    { name: 'Outros', category: 'outros' }
  ];

  const timeOptions = [
    { id: 'manha', label: 'Manhã', emoji: '🌅' },
    { id: 'tarde', label: 'Tarde', emoji: '🌞' },
    { id: 'noite', label: 'Noite', emoji: '🌙' }
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

  const handleMedicationToggle = (takes: boolean) => {
    setQuizData({
      ...quizData,
      medication: {
        ...quizData.medication,
        takesMedication: takes,
        medicationName: takes ? quizData.medication?.medicationName : undefined,
        category: takes ? quizData.medication?.category : undefined,
        dosesPerDay: takes ? quizData.medication?.dosesPerDay : undefined,
        times: takes ? quizData.medication?.times : []
      }
    });
  };

  const handleTimeToggle = (timeId: string) => {
    const current = quizData.medication?.times || [];
    if (current.includes(timeId)) {
      setQuizData({
        ...quizData,
        medication: {
          ...quizData.medication,
          times: current.filter(t => t !== timeId)
        }
      });
    } else {
      setQuizData({
        ...quizData,
        medication: {
          ...quizData.medication,
          times: [...current, timeId]
        }
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
      quizData.fitnessLevel &&
      (quizData.medication?.takesMedication === false || (
        quizData.medication?.takesMedication &&
        quizData.medication.medicationName &&
        quizData.medication.category &&
        quizData.medication.dosesPerDay &&
        quizData.medication.times &&
        quizData.medication.times.length > 0
      ))
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
      case 6:
        return quizData.medication?.takesMedication !== undefined;
      case 7:
        return !quizData.medication?.takesMedication || (quizData.medication?.medicationName && quizData.medication?.category);
      case 8:
        return !quizData.medication?.takesMedication || (quizData.medication?.dosesPerDay && quizData.medication?.times && quizData.medication.times.length > 0);
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
              Passo {step} de 8
            </span>
            <span className="text-sm font-medium text-orange-600">
              {Math.round((step / 8) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
              style={{ width: `${(step / 8) * 100}%` }}
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

          {/* Step 6: Takes Medication */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full mb-4">
                  <Pill className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Você toma remédio para emagrecer?</h2>
                <p className="text-muted-foreground">Isso nos ajuda a ajustar seu plano alimentar</p>
              </div>

              <div className="space-y-4">
                {[
                  { takes: false, label: 'Não', desc: 'Não tomo nenhum remédio', emoji: '❌' },
                  { takes: true, label: 'Sim', desc: 'Tomo algum remédio ou suplemento', emoji: '✅' },
                ].map((option) => (
                  <button
                    key={option.takes ? 'yes' : 'no'}
                    onClick={() => handleMedicationToggle(option.takes)}
                    className={`w-full p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
                      quizData.medication?.takesMedication === option.takes
                        ? 'border-green-500 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'
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

          {/* Step 7: Medication Details */}
          {step === 7 && quizData.medication?.takesMedication && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mb-4">
                  <Pill className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Qual remédio você utiliza?</h2>
                <p className="text-muted-foreground">Selecione da lista ou digite outro</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {medicationOptions.map((med) => (
                    <button
                      key={med.name}
                      onClick={() => setQuizData({
                        ...quizData,
                        medication: {
                          ...quizData.medication,
                          medicationName: med.name,
                          category: med.category as any
                        }
                      })}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        quizData.medication?.medicationName === med.name
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 scale-105'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                      }`}
                    >
                      <div className="font-semibold">{med.name}</div>
                      <div className="text-sm text-muted-foreground capitalize">{med.category}</div>
                    </button>
                  ))}
                </div>

                {quizData.medication?.medicationName === 'Outros' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Digite o nome do remédio"
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                      onChange={(e) => setQuizData({
                        ...quizData,
                        medication: {
                          ...quizData.medication,
                          medicationName: e.target.value
                        }
                      })}
                    />
                    <select
                      value={quizData.medication?.category || ''}
                      onChange={(e) => setQuizData({
                        ...quizData,
                        medication: {
                          ...quizData.medication,
                          category: e.target.value as any
                        }
                      })}
                      className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="">Selecione a categoria</option>
                      <option value="fitoterápico">Fitoterápico</option>
                      <option value="suplemento">Suplemento natural</option>
                      <option value="prescrição">Prescrição médica</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 8: Medication Schedule */}
          {step === 8 && quizData.medication?.takesMedication && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full mb-4">
                  <Pill className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Dosagem e horários</h2>
                <p className="text-muted-foreground">Quanto e quando você toma?</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantas cápsulas/doses por dia?</label>
                  <input
                    type="number"
                    min="1"
                    value={quizData.medication?.dosesPerDay || ''}
                    onChange={(e) => setQuizData({
                      ...quizData,
                      medication: {
                        ...quizData.medication,
                        dosesPerDay: parseInt(e.target.value)
                      }
                    })}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Ex: 2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Em quais horários?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeOptions.map((time) => (
                      <button
                        key={time.id}
                        onClick={() => handleTimeToggle(time.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                          quizData.medication?.times?.includes(time.id)
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 scale-105'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                        }`}
                      >
                        <div className="text-3xl mb-2">{time.emoji}</div>
                        <div className="font-semibold">{time.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
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

            {step < 8 ? (
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