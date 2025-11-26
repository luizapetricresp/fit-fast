'use client';

import { useState } from 'react';
import { Home, BookOpen, Compass, BarChart3, User, Apple, Pill, CreditCard } from 'lucide-react';
import { type QuizData } from '@/lib/workouts';
import { PlanTab } from './tabs/PlanTab';
import { RecipesTab } from './tabs/RecipesTab';
import { DiscoverTab } from './tabs/DiscoverTab';
import { ReportTab } from './tabs/ReportTab';
import { ProfileTab } from './tabs/ProfileTab';
import { NutritionTab } from './tabs/NutritionTab';
import { MedicationsTab } from './tabs/MedicationsTab';
import { PaymentsTab } from './tabs/PaymentsTab';

interface MainAppProps {
  quizData: QuizData;
  onResetQuiz: () => void;
}

type TabType = 'plan' | 'recipes' | 'discover' | 'report' | 'profile' | 'nutrition' | 'medications' | 'payments';

export function MainApp({ quizData, onResetQuiz }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<TabType>('plan');

  const tabs = [
    { id: 'recipes' as TabType, label: 'Receitas', icon: BookOpen },
    { id: 'nutrition' as TabType, label: 'Alimentação', icon: Apple },
    { id: 'medications' as TabType, label: 'Remédios', icon: Pill },
    { id: 'plan' as TabType, label: 'Plano', icon: Home },
    { id: 'payments' as TabType, label: 'Premium', icon: CreditCard },
    { id: 'report' as TabType, label: 'Relatório', icon: BarChart3 },
    { id: 'profile' as TabType, label: 'Meu', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'plan' && <PlanTab quizData={quizData} />}
        {activeTab === 'recipes' && <RecipesTab />}
        {activeTab === 'discover' && <DiscoverTab />}
        {activeTab === 'report' && <ReportTab quizData={quizData} />}
        {activeTab === 'profile' && <ProfileTab quizData={quizData} onResetQuiz={onResetQuiz} />}
        {activeTab === 'nutrition' && <NutritionTab quizData={quizData} />}
        {activeTab === 'medications' && <MedicationsTab quizData={quizData} />}
        {activeTab === 'payments' && <PaymentsTab />}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
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