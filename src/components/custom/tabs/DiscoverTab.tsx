'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, Award, Users, Play, BookOpen, Dumbbell, ArrowLeft, Clock, Flame, CheckCircle } from 'lucide-react';

interface Workout {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  calories: number;
  icon: string;
  color: string;
  exercises: {
    name: string;
    reps: string;
    rest: string;
  }[];
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: string;
  participants: string;
  exercises: {
    name: string;
    reps: string;
    completed: boolean;
  }[];
}

const workouts: Workout[] = [
  {
    id: 1,
    title: 'Treino HIIT de 15 minutos',
    description: 'Queime calorias rapidamente com este treino intenso',
    category: 'Cardio',
    duration: '15 min',
    calories: 200,
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
    exercises: [
      { name: 'Polichinelos', reps: '30 segundos', rest: '10s' },
      { name: 'Burpees', reps: '30 segundos', rest: '10s' },
      { name: 'Mountain Climbers', reps: '30 segundos', rest: '10s' },
      { name: 'Agachamento com salto', reps: '30 segundos', rest: '10s' },
      { name: 'High Knees', reps: '30 segundos', rest: '10s' },
      { name: 'Prancha', reps: '30 segundos', rest: '10s' }
    ]
  },
  {
    id: 2,
    title: 'Yoga para Iniciantes',
    description: 'Relaxe e fortaleça seu corpo com yoga',
    category: 'Flexibilidade',
    duration: '20 min',
    calories: 100,
    icon: '🧘',
    color: 'from-green-500 to-teal-600',
    exercises: [
      { name: 'Postura da Montanha', reps: '1 minuto', rest: '0s' },
      { name: 'Cachorro olhando para baixo', reps: '1 minuto', rest: '15s' },
      { name: 'Guerreiro I', reps: '1 min cada lado', rest: '15s' },
      { name: 'Guerreiro II', reps: '1 min cada lado', rest: '15s' },
      { name: 'Postura da Criança', reps: '2 minutos', rest: '0s' },
      { name: 'Postura do Gato-Vaca', reps: '1 minuto', rest: '15s' },
      { name: 'Savasana (relaxamento)', reps: '5 minutos', rest: '0s' }
    ]
  },
  {
    id: 3,
    title: 'Treino de Força em Casa',
    description: 'Construa músculos sem equipamentos',
    category: 'Força',
    duration: '30 min',
    calories: 250,
    icon: '💪',
    color: 'from-blue-500 to-purple-600',
    exercises: [
      { name: 'Flexões', reps: '3x12', rest: '30s' },
      { name: 'Agachamentos', reps: '3x15', rest: '30s' },
      { name: 'Afundos', reps: '3x10 cada perna', rest: '30s' },
      { name: 'Prancha', reps: '3x45 segundos', rest: '30s' },
      { name: 'Abdominais', reps: '3x20', rest: '30s' },
      { name: 'Ponte de glúteos', reps: '3x15', rest: '30s' },
      { name: 'Mergulhos de tríceps', reps: '3x12', rest: '30s' }
    ]
  },
  {
    id: 4,
    title: 'Alongamento Matinal',
    description: 'Comece o dia com energia',
    category: 'Mobilidade',
    duration: '10 min',
    calories: 50,
    icon: '🌅',
    color: 'from-yellow-500 to-orange-600',
    exercises: [
      { name: 'Alongamento de pescoço', reps: '30 segundos', rest: '0s' },
      { name: 'Rotação de ombros', reps: '30 segundos', rest: '0s' },
      { name: 'Alongamento de braços', reps: '30 segundos cada', rest: '0s' },
      { name: 'Torção de tronco', reps: '30 segundos cada lado', rest: '0s' },
      { name: 'Alongamento de pernas', reps: '1 minuto cada', rest: '0s' },
      { name: 'Alongamento de panturrilha', reps: '30 segundos cada', rest: '0s' },
      { name: 'Respiração profunda', reps: '1 minuto', rest: '0s' }
    ]
  }
];

export function DiscoverTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('trending');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: 'Desafio 30 Dias',
      description: 'Complete 30 dias consecutivos de treino',
      progress: 12,
      total: 30,
      icon: '🏆',
      participants: '2.5k',
      exercises: [
        { name: 'Flexões', reps: '3x10', completed: false },
        { name: 'Agachamentos', reps: '3x15', completed: false },
        { name: 'Prancha', reps: '3x30 segundos', completed: false },
        { name: 'Abdominais', reps: '3x15', completed: false },
        { name: 'Polichinelos', reps: '3x20', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Queima de 10.000 Calorias',
      description: 'Queime 10.000 calorias este mês',
      progress: 3200,
      total: 10000,
      icon: '🔥',
      participants: '1.8k',
      exercises: [
        { name: 'Corrida 20 min', reps: '1x', completed: false },
        { name: 'HIIT 15 min', reps: '1x', completed: false },
        { name: 'Burpees', reps: '3x15', completed: false },
        { name: 'Mountain Climbers', reps: '3x30 segundos', completed: false },
        { name: 'Pular corda', reps: '10 minutos', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Mestre do Yoga',
      description: 'Complete 20 sessões de yoga',
      progress: 7,
      total: 20,
      icon: '🧘',
      participants: '950',
      exercises: [
        { name: 'Saudação ao Sol', reps: '5x', completed: false },
        { name: 'Postura do Guerreiro', reps: '1 min cada lado', completed: false },
        { name: 'Cachorro olhando para baixo', reps: '2 minutos', completed: false },
        { name: 'Postura da Árvore', reps: '1 min cada lado', completed: false },
        { name: 'Meditação', reps: '5 minutos', completed: false }
      ]
    },
  ]);

  const articles = [
    {
      id: 1,
      title: '10 Dicas para Manter a Motivação',
      category: 'Motivação',
      readTime: '5 min',
      image: '📖',
    },
    {
      id: 2,
      title: 'Nutrição Pré e Pós-Treino',
      category: 'Nutrição',
      readTime: '7 min',
      image: '🥗',
    },
    {
      id: 3,
      title: 'Como Evitar Lesões no Treino',
      category: 'Saúde',
      readTime: '6 min',
      image: '🩹',
    },
  ];

  const toggleExerciseCompletion = (exerciseIndex: number) => {
    if (selectedChallenge) {
      const updatedExercises = [...selectedChallenge.exercises];
      updatedExercises[exerciseIndex].completed = !updatedExercises[exerciseIndex].completed;
      
      setSelectedChallenge({
        ...selectedChallenge,
        exercises: updatedExercises
      });

      // Atualizar também no array de challenges
      setChallenges(challenges.map(c => 
        c.id === selectedChallenge.id 
          ? { ...c, exercises: updatedExercises }
          : c
      ));
    }
  };

  // Visualização de desafio específico
  if (selectedChallenge) {
    const completedCount = selectedChallenge.exercises.filter(e => e.completed).length;
    const totalExercises = selectedChallenge.exercises.length;
    const completionPercentage = (completedCount / totalExercises) * 100;

    return (
      <div className="p-4 space-y-6">
        {/* Header com botão voltar */}
        <div className="pt-4">
          <button
            onClick={() => setSelectedChallenge(null)}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>

        {/* Challenge Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-3xl text-white shadow-xl">
          <div className="flex items-start justify-between mb-3">
            <div className="text-6xl">{selectedChallenge.icon}</div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              <Users className="w-4 h-4" />
              {selectedChallenge.participants}
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">{selectedChallenge.title}</h1>
          <p className="text-white/90 mb-4">{selectedChallenge.description}</p>
          
          {/* Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progresso Geral</span>
              <span className="font-bold">{selectedChallenge.progress}/{selectedChallenge.total}</span>
            </div>
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${(selectedChallenge.progress / selectedChallenge.total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Today's Exercises */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-purple-600" />
              Exercícios de Hoje
            </h2>
            <div className="text-sm font-medium text-purple-600">
              {completedCount}/{totalExercises} completos
            </div>
          </div>

          {/* Completion Progress */}
          <div className="mb-4">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {selectedChallenge.exercises.map((exercise, index) => (
              <div
                key={index}
                onClick={() => toggleExerciseCompletion(index)}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                  exercise.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  exercise.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-br from-purple-500 to-pink-600 text-white'
                }`}>
                  {exercise.completed ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold mb-1 ${exercise.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {exercise.name}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    📊 {exercise.reps}
                  </div>
                </div>
                {exercise.completed && (
                  <div className="text-green-600 font-bold text-sm">
                    ✓ Completo
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        {completedCount === totalExercises && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl text-white text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="font-bold text-xl mb-2">Parabéns!</h3>
            <p className="text-white/90">Você completou todos os exercícios de hoje!</p>
          </div>
        )}
      </div>
    );
  }

  // Visualização de treino específico
  if (selectedWorkout) {
    return (
      <div className="p-4 space-y-6">
        {/* Header com botão voltar */}
        <div className="pt-4">
          <button
            onClick={() => setSelectedWorkout(null)}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>

        {/* Workout Header */}
        <div className={`bg-gradient-to-r ${selectedWorkout.color} p-6 rounded-3xl text-white shadow-xl`}>
          <div className="flex items-start justify-between mb-3">
            <div className="text-6xl">{selectedWorkout.icon}</div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {selectedWorkout.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{selectedWorkout.title}</h1>
          <p className="text-white/90 mb-4">{selectedWorkout.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {selectedWorkout.duration}
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4" />
              {selectedWorkout.calories} kcal
            </span>
          </div>
        </div>

        {/* Exercises List */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-purple-600" />
            Exercícios
          </h2>
          <div className="space-y-4">
            {selectedWorkout.exercises.map((exercise, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{exercise.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>📊 {exercise.reps}</span>
                    {exercise.rest !== '0s' && <span>⏱️ Descanso: {exercise.rest}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg">
          <Play className="w-6 h-6" />
          Começar Treino
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Descubra</h1>
        <p className="text-muted-foreground">
          Explore novos treinos, desafios e conteúdos 🌟
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('trending')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedCategory === 'trending'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Em Alta
        </button>
        
        <button
          onClick={() => setSelectedCategory('challenges')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedCategory === 'challenges'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Award className="w-4 h-4" />
          Desafios
        </button>
        
        <button
          onClick={() => setSelectedCategory('articles')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedCategory === 'articles'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Artigos
        </button>
      </div>

      {/* Trending Content */}
      {selectedCategory === 'trending' && (
        <div className="space-y-4">
          <h2 className="font-bold text-xl">Treinos em Alta</h2>
          <div className="grid gap-4">
            {workouts.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedWorkout(item)}
                className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className={`bg-gradient-to-r ${item.color} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{item.icon}</div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-white/90 text-sm mb-4">{item.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>⏱️ {item.duration}</span>
                    <span>🔥 {item.calories} kcal</span>
                  </div>
                </div>
                <div className="p-4">
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Ver Treino
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges */}
      {selectedCategory === 'challenges' && (
        <div className="space-y-4">
          <h2 className="font-bold text-xl">Desafios Ativos</h2>
          <div className="grid gap-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge)}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{challenge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} participantes</span>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-bold">{challenge.progress}/{challenge.total}</span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                  Ver Desafio
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Articles */}
      {selectedCategory === 'articles' && (
        <div className="space-y-4">
          <h2 className="font-bold text-xl">Artigos Recomendados</h2>
          <div className="grid gap-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{article.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        📖 {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg">{article.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
