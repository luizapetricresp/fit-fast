'use client';

import { useState } from 'react';
import { Home, BookOpen, Compass, BarChart3, User, Users, HeadphonesIcon } from 'lucide-react';
import { type QuizData } from '@/lib/workouts';
import { HomeTab } from './tabs/HomeTab';
import { PlanTab } from './tabs/PlanTab';
import { RecipesTab } from './tabs/RecipesTab';
import { DiscoverTab } from './tabs/DiscoverTab';
import { ArticlesTab } from './tabs/ArticlesTab';
import { CommunityTab } from './tabs/CommunityTab';
import { ReportTab } from './tabs/ReportTab';
import { ProfileTab } from './tabs/ProfileTab';
import { SupportTab } from './tabs/SupportTab';

interface MainAppProps {
  quizData: QuizData;
  onResetQuiz: () => void;
}

type TabType = 'home' | 'plan' | 'recipes' | 'discover' | 'articles' | 'community' | 'report' | 'profile' | 'support';

export function MainApp({ quizData, onResetQuiz }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const tabs = [
    { id: 'home' as TabType, label: 'Início', icon: Home },
    { id: 'plan' as TabType, label: 'Plano', icon: BarChart3 },
    { id: 'recipes' as TabType, label: 'Receitas', icon: BookOpen },
    { id: 'discover' as TabType, label: 'Descubra', icon: Compass },
    { id: 'community' as TabType, label: 'Comunidade', icon: Users },
    { id: 'support' as TabType, label: 'Suporte', icon: HeadphonesIcon },
    { id: 'profile' as TabType, label: 'Meu', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'home' && <HomeTab quizData={quizData} />}
        {activeTab === 'plan' && <PlanTab quizData={quizData} />}
        {activeTab === 'recipes' && <RecipesTab />}
        {activeTab === 'discover' && <DiscoverTab />}
        {activeTab === 'articles' && <ArticlesTab />}
        {activeTab === 'community' && <CommunityTab />}
        {activeTab === 'report' && <ReportTab quizData={quizData} />}
        {activeTab === 'support' && <SupportTab />}
        {activeTab === 'profile' && <ProfileTab quizData={quizData} onResetQuiz={onResetQuiz} />}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-1">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-2 rounded-lg transition-all ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
