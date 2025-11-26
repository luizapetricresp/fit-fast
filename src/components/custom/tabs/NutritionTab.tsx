'use client';

import { useState } from 'react';
import { Apple, Droplets, Clock, Pill, Utensils, Target, Flame } from 'lucide-react';
import { type QuizData } from '@/lib/workouts';

interface NutritionTabProps {
  quizData: QuizData;
}

export function NutritionTab({ quizData }: NutritionTabProps) {
  const [selectedDay, setSelectedDay] = useState(1);

  // Calcular macronutrientes baseados no perfil
  const calculateMacros = () => {
    const weight = quizData.currentWeight;
    const targetWeight = quizData.targetWeight;
    const isWeightLoss = targetWeight < weight;

    // Calorias base (Harris-Benedict simplificado)
    const baseCalories = weight * 30; // Aproximado
    const calories = isWeightLoss ? baseCalories - 500 : baseCalories + 200;

    // Ajuste por medicação
    let adjustedCalories = calories;
    if (quizData.medication?.takesMedication) {
      if (quizData.medication.category === 'prescrição') {
        adjustedCalories -= 200; // Medicamentos para emagrecimento reduzem calorias
      } else if (quizData.medication.category === 'fitoterápico') {
        adjustedCalories -= 100; // Fitoterápicos têm efeito mais suave
      }
    }

    // Distribuição de macronutrientes
    const protein = Math.round(weight * 1.6); // 1.6g por kg
    const fat = Math.round((adjustedCalories * 0.25) / 9); // 25% das calorias
    const carbs = Math.round((adjustedCalories - (protein * 4) - (fat * 9)) / 4);

    return {
      calories: Math.round(adjustedCalories),
      protein,
      carbs,
      fat
    };
  };

  const macros = calculateMacros();

  // Plano alimentar diário
  const dailyMeals = [
    {
      time: '07:00',
      name: 'Café da Manhã',
      calories: Math.round(macros.calories * 0.25),
      protein: Math.round(macros.protein * 0.25),
      carbs: Math.round(macros.carbs * 0.25),
      fat: Math.round(macros.fat * 0.25),
      foods: ['Aveia com frutas', 'Iogurte natural', 'Café preto'],
      icon: '☕'
    },
    {
      time: '10:00',
      name: 'Lanche da Manhã',
      calories: Math.round(macros.calories * 0.15),
      protein: Math.round(macros.protein * 0.15),
      carbs: Math.round(macros.carbs * 0.15),
      fat: Math.round(macros.fat * 0.15),
      foods: ['Maçã com castanhas', 'Iogurte grego'],
      icon: '🍎'
    },
    {
      time: '13:00',
      name: 'Almoço',
      calories: Math.round(macros.calories * 0.35),
      protein: Math.round(macros.protein * 0.35),
      carbs: Math.round(macros.carbs * 0.35),
      fat: Math.round(macros.fat * 0.35),
      foods: ['Frango grelhado', 'Arroz integral', 'Salada verde', 'Legumes'],
      icon: '🍽️'
    },
    {
      time: '16:00',
      name: 'Lanche da Tarde',
      calories: Math.round(macros.calories * 0.15),
      protein: Math.round(macros.protein * 0.15),
      carbs: Math.round(macros.carbs * 0.15),
      fat: Math.round(macros.fat * 0.15),
      foods: ['Banana com pasta de amendoim', 'Queijo cottage'],
      icon: '🍌'
    },
    {
      time: '19:00',
      name: 'Jantar',
      calories: Math.round(macros.calories * 0.25),
      protein: Math.round(macros.protein * 0.25),
      carbs: Math.round(macros.carbs * 0.25),
      fat: Math.round(macros.fat * 0.25),
      foods: ['Peixe assado', 'Batata-doce', 'Vegetais refogados'],
      icon: '🍽️'
    },
    {
      time: '21:00',
      name: 'Ceia (opcional)',
      calories: Math.round(macros.calories * 0.1),
      protein: Math.round(macros.protein * 0.1),
      carbs: Math.round(macros.carbs * 0.1),
      fat: Math.round(macros.fat * 0.1),
      foods: ['Chá de camomila', 'Fruta leve'],
      icon: '🌙'
    }
  ];

  // Lembretes personalizados
  const reminders = [
    {
      time: '08:00',
      title: 'Tomar remédio',
      description: quizData.medication?.takesMedication ? `${quizData.medication.medicationName} - ${quizData.medication.dosesPerDay} cápsulas` : null,
      icon: '💊',
      enabled: quizData.medication?.takesMedication
    },
    {
      time: '12:00',
      title: 'Tomar remédio',
      description: quizData.medication?.takesMedication ? `${quizData.medication.medicationName} - ${quizData.medication.dosesPerDay} cápsulas` : null,
      icon: '💊',
      enabled: quizData.medication?.takesMedication
    },
    {
      time: '18:00',
      title: 'Tomar remédio',
      description: quizData.medication?.takesMedication ? `${quizData.medication.medicationName} - ${quizData.medication.dosesPerDay} cápsulas` : null,
      icon: '💊',
      enabled: quizData.medication?.takesMedication
    },
    {
      time: '07:00',
      title: 'Café da Manhã',
      description: 'Inicie o dia com energia!',
      icon: '☕',
      enabled: true
    },
    {
      time: '13:00',
      title: 'Almoço',
      description: 'Refeição principal do dia',
      icon: '🍽️',
      enabled: true
    },
    {
      time: '19:00',
      title: 'Jantar',
      description: 'Última refeição do dia',
      icon: '🍽️',
      enabled: true
    },
    {
      time: 'Cada 2h',
      title: 'Beber água',
      description: 'Mantenha-se hidratado - 2L por dia',
      icon: '💧',
      enabled: true
    }
  ].filter(reminder => reminder.enabled);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Plano Alimentar</h1>
        <p className="text-muted-foreground">
          Seu plano personalizado de nutrição 🍎
        </p>
      </div>

      {/* Daily Summary */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Meta Diária</p>
            <h2 className="text-4xl font-bold">{macros.calories}</h2>
            <p className="text-white/90 text-sm">calorias</p>
          </div>
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <Target className="w-12 h-12" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{macros.protein}g</div>
            <div className="text-sm text-white/80">Proteína</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{macros.carbs}g</div>
            <div className="text-sm text-white/80">Carboidrato</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{macros.fat}g</div>
            <div className="text-sm text-white/80">Gordura</div>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedDay === day
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
            }`}
          >
            Dia {day}
          </button>
        ))}
      </div>

      {/* Daily Meals */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl">Refeições do Dia {selectedDay}</h3>

        {dailyMeals.map((meal, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">{meal.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">{meal.time}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{meal.name}</h4>

                {/* Macros por refeição */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    {meal.calories} kcal
                  </span>
                  <span className="text-gray-500">•</span>
                  <span>P: {meal.protein}g</span>
                  <span>C: {meal.carbs}g</span>
                  <span>G: {meal.fat}g</span>
                </div>

                {/* Foods */}
                <div className="space-y-1">
                  {meal.foods.map((food, foodIndex) => (
                    <div key={foodIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      {food}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reminders */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          Lembretes Personalizados
        </h3>

        <div className="space-y-3">
          {reminders.map((reminder, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="text-2xl">{reminder.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{reminder.title}</span>
                  <span className="text-sm text-gray-500">• {reminder.time}</span>
                </div>
                {reminder.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{reminder.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medication Info */}
      {quizData.medication?.takesMedication && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Pill className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-bold text-lg mb-2">Informações sobre seu remédio</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Seu plano foi ajustado considerando o uso de {quizData.medication.medicationName}.
                Continue acompanhando com seu médico e mantenha uma alimentação balanceada.
              </p>
              <div className="text-sm">
                <p><strong>Categoria:</strong> {quizData.medication.category}</p>
                <p><strong>Dosagem:</strong> {quizData.medication.dosesPerDay} cápsulas/dia</p>
                <p><strong>Horários:</strong> {quizData.medication.times?.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}