'use client';

import { useState, useEffect } from 'react';
import { Calendar, Trophy, Flame, Target } from 'lucide-react';
import { type QuizData, generateWorkoutPlan } from '@/lib/workouts';
import { DayCard } from '../DayCard';

interface PlanTabProps {
  quizData: QuizData;
}

interface WorkoutProgress {
  completedDays: number[];
  currentDay: number;
}

export function PlanTab({ quizData }: PlanTabProps) {
  const [progress, setProgress] = useState<WorkoutProgress>({
    completedDays: [],
    currentDay: 1,
  });

  const workoutPlan = generateWorkoutPlan(quizData);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('workout-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('workout-progress', JSON.stringify(progress));
  }, [progress]);

  const totalDays = workoutPlan.length;
  const completedDays = progress.completedDays.length;
  const progressPercentage = (completedDays / totalDays) * 100;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Seu Plano de Treino</h1>
        <p className="text-muted-foreground">
          Plano personalizado de {totalDays} dias 💪
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Seu Progresso</p>
            <h2 className="text-4xl font-bold">{completedDays}/{totalDays}</h2>
            <p className="text-white/90 text-sm mt-1">dias completos</p>
          </div>
          <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <Trophy className="w-12 h-12" />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
          <div 
            className="bg-white h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-white/90 text-sm mt-2 text-right">{Math.round(progressPercentage)}%</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 text-center">
          <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold">{progress.currentDay}</div>
          <div className="text-xs text-muted-foreground">Dia Atual</div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 text-center">
          <Flame className="w-6 h-6 mx-auto mb-2 text-orange-600" />
          <div className="text-2xl font-bold">{completedDays}</div>
          <div className="text-xs text-muted-foreground">Completos</div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 text-center">
          <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold">{totalDays - completedDays}</div>
          <div className="text-xs text-muted-foreground">Restantes</div>
        </div>
      </div>

      {/* Workout Days */}
      <div>
        <h3 className="font-bold text-xl mb-4">Seus Treinos</h3>
        <div className="grid gap-4">
          {workoutPlan.map((day) => {
            const isCompleted = progress.completedDays.includes(day.day);
            const isCurrent = day.day === progress.currentDay;
            const isLocked = day.day > progress.currentDay;

            return (
              <DayCard
                key={day.day}
                day={day.day}
                title={day.title}
                difficulty={day.difficulty}
                totalTime={day.totalTime}
                totalCalories={day.totalCalories}
                completed={isCompleted}
                locked={isLocked}
                current={isCurrent}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
