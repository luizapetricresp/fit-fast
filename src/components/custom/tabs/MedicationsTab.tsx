'use client';

import { useState } from 'react';
import { Pill, AlertTriangle, CheckCircle, TrendingUp, Scale, Ruler, Activity, Clock, Shield } from 'lucide-react';
import { type QuizData } from '@/lib/workouts';

interface MedicationsTabProps {
  quizData: QuizData;
}

export function MedicationsTab({ quizData }: MedicationsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const medications = [
    {
      id: 1,
      name: 'Orlistat (Xenical)',
      category: 'prescrição',
      description: 'Reduz a absorção de gorduras no intestino',
      effects: ['Redução da absorção de gordura', 'Perda de peso gradual', 'Melhora do colesterol'],
      risks: ['Diarreia', 'Incontinência fecal', 'Deficiência de vitaminas'],
      care: ['Tomar com refeições', 'Suplementar vitaminas A, D, E, K', 'Dieta com baixo teor de gordura'],
      dosage: '1 cápsula (120mg) 3x ao dia',
      icon: '💊'
    },
    {
      id: 2,
      name: 'Sibutramina',
      category: 'prescrição',
      description: 'Suprime o apetite e acelera o metabolismo',
      effects: ['Redução do apetite', 'Aumento do gasto calórico', 'Perda de peso'],
      risks: ['Aumento da pressão arterial', 'Taquicardia', 'Insônia'],
      care: ['Monitorar pressão arterial', 'Evitar cafeína excessiva', 'Acompanhamento médico mensal'],
      dosage: '10-15mg por dia',
      icon: '💊'
    },
    {
      id: 3,
      name: 'Fluoxetina (Prozac)',
      category: 'prescrição',
      description: 'Antidepressivo que auxilia na perda de peso',
      effects: ['Redução do apetite', 'Melhora do humor', 'Controle emocional'],
      risks: ['Náuseas', 'Insônia', 'Diminuição da libido'],
      care: ['Tomar pela manhã', 'Não interromper abruptamente', 'Acompanhamento psiquiátrico'],
      dosage: '20-60mg por dia',
      icon: '💊'
    },
    {
      id: 4,
      name: 'Garcinia Cambogia',
      category: 'fitoterápico',
      description: 'Fruta que inibe a produção de gordura',
      effects: ['Inibição da síntese de gordura', 'Redução do apetite', 'Aumento da saciedade'],
      risks: ['Náuseas leves', 'Dor de cabeça', 'Interação com medicamentos'],
      care: ['Tomar 30min antes das refeições', 'Não exceder dose recomendada', 'Consultar médico se diabético'],
      dosage: '500-1000mg 3x ao dia',
      icon: '🍊'
    },
    {
      id: 5,
      name: 'Chá Verde',
      category: 'fitoterápico',
      description: 'Antioxidante que acelera o metabolismo',
      effects: ['Aumento do metabolismo', 'Queima de gordura', 'Antioxidante'],
      risks: ['Insônia (se tomado tarde)', 'Irritação gástrica', 'Interação com cafeína'],
      care: ['Não tomar após 16h', 'Beber sem açúcar', 'Não exceder 3 xícaras/dia'],
      dosage: '2-3 xícaras por dia',
      icon: '🍵'
    },
    {
      id: 6,
      name: 'Hibiscus',
      category: 'fitoterápico',
      description: 'Flor que auxilia na perda de peso e pressão',
      effects: ['Redução da pressão arterial', 'Diurético natural', 'Antioxidante'],
      risks: ['Hipotensão', 'Interação com anti-hipertensivos', 'Não recomendado para gestantes'],
      care: ['Não tomar com medicamentos para pressão', 'Beber morno', 'Consultar médico'],
      dosage: '2-3 xícaras por dia',
      icon: '🌺'
    },
    {
      id: 7,
      name: 'CLA (Ácido Linoleico Conjugado)',
      category: 'suplemento',
      description: 'Ácido graxo que reduz gordura corporal',
      effects: ['Redução da gordura abdominal', 'Preservação da massa muscular', 'Melhora da composição corporal'],
      risks: ['Problemas digestivos', 'Aumento de gordura no fígado', 'Interação com anticoagulantes'],
      care: ['Tomar com refeições', 'Ciclar uso (2 meses sim, 1 não)', 'Monitorar função hepática'],
      dosage: '3-6g por dia',
      icon: '🧴'
    },
    {
      id: 8,
      name: 'Cafeína',
      category: 'suplemento',
      description: 'Estimulante que acelera o metabolismo',
      effects: ['Aumento do metabolismo', 'Melhora do foco', 'Queima de gordura'],
      risks: ['Ansiedade', 'Insônia', 'Taquicardia'],
      care: ['Não tomar após 14h', 'Limitar a 400mg/dia', 'Evitar se cardíaco'],
      dosage: '200-400mg por dia',
      icon: '☕'
    }
  ];

  const filteredMedications = selectedCategory === 'all'
    ? medications
    : medications.filter(med => med.category === selectedCategory);

  const safetyChecklist = [
    'Consultar médico antes de iniciar qualquer tratamento',
    'Informar sobre outros medicamentos em uso',
    'Verificar contraindicações e interações',
    'Monitorar efeitos colaterais',
    'Não exceder doses recomendadas',
    'Manter acompanhamento médico regular',
    'Interromper uso se surgirem efeitos adversos'
  ];

  // Dados simulados de progresso
  const progressData = {
    weight: [
      { week: 'Sem 1', weight: quizData.currentWeight },
      { week: 'Sem 2', weight: quizData.currentWeight - 0.8 },
      { week: 'Sem 3', weight: quizData.currentWeight - 1.6 },
      { week: 'Sem 4', weight: quizData.currentWeight - 2.4 },
    ],
    imc: [
      { week: 'Sem 1', imc: (quizData.currentWeight / ((quizData.height/100)**2)).toFixed(1) },
      { week: 'Sem 2', imc: ((quizData.currentWeight - 0.8) / ((quizData.height/100)**2)).toFixed(1) },
      { week: 'Sem 3', imc: ((quizData.currentWeight - 1.6) / ((quizData.height/100)**2)).toFixed(1) },
      { week: 'Sem 4', imc: ((quizData.currentWeight - 2.4) / ((quizData.height/100)**2)).toFixed(1) },
    ]
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Remédios para Emagrecer</h1>
        <p className="text-muted-foreground">
          Informações completas sobre medicamentos e suplementos 💊
        </p>
      </div>

      {/* Safety Warning */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-2xl p-5 border border-red-200 dark:border-red-800">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2 text-red-700 dark:text-red-400">Atenção Importante</h3>
            <p className="text-sm text-red-600 dark:text-red-400 mb-3">
              Esta seção é apenas informativa. Sempre consulte um médico antes de iniciar qualquer tratamento.
              O uso inadequado pode causar sérios problemas de saúde.
            </p>
            <p className="text-xs text-red-500 dark:text-red-300">
              E-mail de suporte: fitfast.contato@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Safety Checklist */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-green-600" />
          Checklist de Segurança
        </h3>
        <div className="space-y-2">
          {safetyChecklist.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Pill className="w-4 h-4" />
          Todos
        </button>

        <button
          onClick={() => setSelectedCategory('prescrição')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedCategory === 'prescrição'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Pill className="w-4 h-4" />
          Prescrição
        </button>

        <button
          onClick={() => setSelectedCategory('fitoterápico')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedCategory === 'fitoterápico'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Pill className="w-4 h-4" />
          Fitoterápicos
        </button>

        <button
          onClick={() => setSelectedCategory('suplemento')}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
            selectedCategory === 'suplemento'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          <Pill className="w-4 h-4" />
          Suplementos
        </button>
      </div>

      {/* Medications List */}
      <div className="space-y-4">
        {filteredMedications.map((medication) => (
          <div key={medication.id} className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">{medication.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-1">{medication.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{medication.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Effects */}
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-3">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Efeitos Benéficos</h4>
                    <ul className="text-sm space-y-1">
                      {medication.effects.map((effect, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risks */}
                  <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-3">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Riscos</h4>
                    <ul className="text-sm space-y-1">
                      {medication.risks.map((risk, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Care */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Cuidados</h4>
                    <ul className="text-sm space-y-1">
                      {medication.care.map((care, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          {care}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Dosagem:</span>
                  <span>{medication.dosage}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Tracking */}
      {quizData.medication?.takesMedication && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            Seu Progresso com {quizData.medication.medicationName}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weight Progress */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Evolução do Peso</span>
              </div>
              <div className="space-y-2">
                {progressData.weight.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">{entry.week}</span>
                    <span className="text-lg font-bold">{entry.weight.toFixed(1)} kg</span>
                  </div>
                ))}
              </div>
            </div>

            {/* IMC Progress */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Evolução do IMC</span>
              </div>
              <div className="space-y-2">
                {progressData.imc.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">{entry.week}</span>
                    <span className="text-lg font-bold">{entry.imc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl">
            <p className="text-sm text-center text-gray-700 dark:text-gray-300">
              📊 Continue acompanhando seu progresso. Lembre-se: resultados variam por pessoa.
              Mantenha uma alimentação saudável e prática regular de exercícios.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}