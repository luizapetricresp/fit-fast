'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { generateWorkoutPlan, type QuizData } from '@/lib/workouts';
import { Play, Pause, SkipForward, CheckCircle2, ArrowLeft, Volume2, VolumeX } from 'lucide-react';

export default function WorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const day = parseInt(params.day as string);
  
  // Load quiz data from localStorage
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [workout, setWorkout] = useState<any>(null);

  useEffect(() => {
    const savedQuiz = localStorage.getItem('quiz-data');
    if (savedQuiz) {
      const quiz = JSON.parse(savedQuiz);
      setQuizData(quiz);
      const plan = generateWorkoutPlan(quiz);
      const foundWorkout = plan.find(w => w.day === day);
      setWorkout(foundWorkout);
    }
  }, [day]);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (workout && workout.exercises.length > 0) {
      setTimeLeft(workout.exercises[0].duration);
    }
  }, [workout]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleExerciseComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  const handleExerciseComplete = () => {
    if (!workout) return;

    const currentExercise = workout.exercises[currentExerciseIndex];
    
    if (isResting) {
      // Rest period ended, move to next exercise
      if (currentExerciseIndex < workout.exercises.length - 1) {
        const nextIndex = currentExerciseIndex + 1;
        setCurrentExerciseIndex(nextIndex);
        setTimeLeft(workout.exercises[nextIndex].duration);
        setIsResting(false);
      } else {
        // Workout completed
        completeWorkout();
      }
    } else {
      // Exercise ended, start rest period
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setTimeLeft(currentExercise.rest);
        setIsResting(true);
      } else {
        // Last exercise, no rest needed
        completeWorkout();
      }
    }
  };

  const completeWorkout = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    
    // Save progress
    const saved = localStorage.getItem('workout-progress');
    const data = saved ? JSON.parse(saved) : { completedDays: [], currentDay: 1 };
    
    if (!data.completedDays.includes(day)) {
      data.completedDays.push(day);
      data.currentDay = Math.min(day + 1, 90);
      localStorage.setItem('workout-progress', JSON.stringify(data));
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = () => {
    if (!workout) return;
    
    if (isResting) {
      // Skip rest, go to next exercise
      if (currentExerciseIndex < workout.exercises.length - 1) {
        const nextIndex = currentExerciseIndex + 1;
        setCurrentExerciseIndex(nextIndex);
        setTimeLeft(workout.exercises[nextIndex].duration);
        setIsResting(false);
      }
    } else {
      // Skip exercise, go to rest or next exercise
      handleExerciseComplete();
    }
  };

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Treino não encontrado</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + (isResting ? 0.5 : 0)) / workout.exercises.length) * 100;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="mb-6">
            <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">🎉 Parabéns!</h1>
            <p className="text-lg text-muted-foreground">
              Você completou o treino do Dia {day}!
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {workout.exercises.length}
                </div>
                <div className="text-sm text-muted-foreground">Exercícios</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {workout.totalCalories}
                </div>
                <div className="text-sm text-muted-foreground">Calorias</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Voltar ao Início
            </button>
            {quizData && day < generateWorkoutPlan(quizData).length && (
              <button
                onClick={() => router.push(`/workout/${day + 1}`)}
                className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-700 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Próximo Treino →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">{workout.title}</h1>
            <p className="text-sm text-orange-100">
              {workout.exercises.length} exercícios • {Math.round(workout.totalTime / 60)} min
            </p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-200 dark:bg-gray-800 h-2">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Exercise Display */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl mb-6">
          {/* Exercise Icon */}
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{currentExercise.image}</div>
            <h2 className="text-3xl font-bold mb-2">
              {isResting ? '⏸️ Descanso' : currentExercise.name}
            </h2>
            <p className="text-lg text-muted-foreground">
              {isResting ? 'Prepare-se para o próximo' : currentExercise.reps}
            </p>
          </div>

          {/* Timer */}
          <div className="text-center mb-8">
            <div className={`text-8xl font-bold mb-2 ${isResting ? 'text-blue-500' : 'text-orange-500'}`}>
              {timeLeft}
            </div>
            <p className="text-muted-foreground">segundos</p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handlePlayPause}
              className="p-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full hover:shadow-xl transition-all transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </button>
            <button
              onClick={handleSkip}
              className="p-6 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <SkipForward className="w-8 h-8" />
            </button>
          </div>

          {/* Exercise Counter */}
          <div className="text-center text-muted-foreground">
            Exercício {currentExerciseIndex + 1} de {workout.exercises.length}
          </div>
        </div>

        {/* Instructions */}
        {!isResting && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">📋 Como Fazer:</h3>
            <ol className="space-y-2">
              {currentExercise.instructions.map((instruction: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Next Exercise Preview */}
        {currentExerciseIndex < workout.exercises.length - 1 && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl p-4">
            <p className="text-sm text-muted-foreground mb-2">Próximo exercício:</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{workout.exercises[currentExerciseIndex + 1].image}</span>
              <div>
                <p className="font-semibold">{workout.exercises[currentExerciseIndex + 1].name}</p>
                <p className="text-sm text-muted-foreground">
                  {workout.exercises[currentExerciseIndex + 1].reps}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
