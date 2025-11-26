'use client';

import { CheckCircle2, Lock, Circle } from 'lucide-react';
import Link from 'next/link';

interface DayCardProps {
  day: number;
  title: string;
  difficulty?: 'iniciante' | 'intermediário' | 'avançado';
  totalTime: number;
  totalCalories: number;
  completed: boolean;
  locked: boolean;
  current: boolean;
}

export function DayCard({
  day,
  title,
  difficulty = 'iniciante',
  totalTime,
  totalCalories,
  completed,
  locked,
  current
}: DayCardProps) {
  const difficultyColors = {
    iniciante: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediário: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    avançado: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };

  // Garantir que difficulty é válido antes de usar
  const validDifficulty = difficulty || 'iniciante';

  const content = (
    <div
      className={`
        relative p-4 rounded-2xl border-2 transition-all duration-300
        ${completed ? 'bg-green-50 border-green-500 dark:bg-green-950/30' : ''}
        ${current ? 'bg-gradient-to-br from-orange-50 to-pink-50 border-orange-500 dark:from-orange-950/30 dark:to-pink-950/30 shadow-lg scale-105' : ''}
        ${locked ? 'bg-gray-50 border-gray-200 dark:bg-gray-900/30 opacity-60' : ''}
        ${!completed && !current && !locked ? 'bg-white border-gray-200 dark:bg-gray-800 hover:border-orange-400 hover:shadow-md' : ''}
      `}
    >
      {/* Status Icon */}
      <div className="absolute -top-3 -right-3">
        {completed && (
          <CheckCircle2 className="w-8 h-8 text-green-500 bg-white dark:bg-gray-900 rounded-full" />
        )}
        {locked && (
          <Lock className="w-8 h-8 text-gray-400 bg-white dark:bg-gray-900 rounded-full p-1" />
        )}
        {current && (
          <Circle className="w-8 h-8 text-orange-500 bg-white dark:bg-gray-900 rounded-full p-1 fill-orange-500" />
        )}
      </div>

      {/* Day Number */}
      <div className="text-4xl font-bold text-gray-300 dark:text-gray-700 mb-2">
        {day.toString().padStart(2, '0')}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg mb-2">{title}</h3>

      {/* Difficulty Badge */}
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${difficultyColors[validDifficulty]}`}>
        {validDifficulty.charAt(0).toUpperCase() + validDifficulty.slice(1)}
      </span>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>⏱️</span>
          <span>{Math.round(totalTime / 60)} min</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🔥</span>
          <span>{totalCalories} kcal</span>
        </div>
      </div>

      {/* Current Day Indicator */}
      {current && (
        <div className="mt-3 text-center">
          <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
            ▶ Treino de Hoje
          </span>
        </div>
      )}
    </div>
  );

  if (locked) {
    return content;
  }

  return (
    <Link href={`/workout/${day}`} className="block">
      {content}
    </Link>
  );
}
