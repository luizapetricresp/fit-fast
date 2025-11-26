'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, Award, Users, Play, BookOpen, Dumbbell } from 'lucide-react';

export function DiscoverTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('trending');

  const trendingContent = [
    {
      id: 1,
      title: 'Treino HIIT de 15 minutos',
      description: 'Queime calorias rapidamente com este treino intenso',
      category: 'Cardio',
      duration: '15 min',
      calories: 200,
      icon: '🔥',
      color: 'from-orange-500 to-red-600',
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
    },
  ];

  const challenges = [
    {
      id: 1,
      title: 'Desafio 30 Dias',
      description: 'Complete 30 dias consecutivos de treino',
      progress: 12,
      total: 30,
      icon: '🏆',
      participants: '2.5k',
    },
    {
      id: 2,
      title: 'Queima de 10.000 Calorias',
      description: 'Queime 10.000 calorias este mês',
      progress: 3200,
      total: 10000,
      icon: '🔥',
      participants: '1.8k',
    },
    {
      id: 3,
      title: 'Mestre do Yoga',
      description: 'Complete 20 sessões de yoga',
      progress: 7,
      total: 20,
      icon: '🧘',
      participants: '950',
    },
  ];

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
            {trendingContent.map((item) => (
              <div
                key={item.id}
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
                    Começar Treino
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
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800"
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
                  Participar do Desafio
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
