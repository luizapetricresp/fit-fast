export interface Exercise {
  id: string;
  name: string;
  duration: number; // segundos
  rest: number; // segundos de descanso
  reps?: string;
  calories: number;
  image: string;
  instructions: string[];
  muscleGroups: string[];
}

export interface WorkoutDay {
  day: number;
  title: string;
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
  exercises: Exercise[];
  totalTime: number;
  totalCalories: number;
  focus: string[];
}

export interface QuizData {
  currentWeight: number;
  targetWeight: number;
  height: number;
  muscleGroups: string[];
  fitnessLevel: 'iniciante' | 'intermediário' | 'avançado';
}

export const exercises: Exercise[] = [
  {
    id: 'jumping-jacks',
    name: 'Polichinelos',
    duration: 30,
    rest: 10,
    reps: '30 segundos',
    calories: 8,
    image: '🏃',
    muscleGroups: ['pernas', 'abdomen'],
    instructions: [
      'Fique em pé com os pés juntos',
      'Pule abrindo pernas e braços simultaneamente',
      'Retorne à posição inicial',
      'Mantenha ritmo constante'
    ]
  },
  {
    id: 'push-ups',
    name: 'Flexões',
    duration: 40,
    rest: 15,
    reps: 'x10',
    calories: 12,
    image: '💪',
    muscleGroups: ['bracos', 'peito'],
    instructions: [
      'Posição de prancha com mãos na largura dos ombros',
      'Desça o corpo mantendo as costas retas',
      'Empurre de volta à posição inicial',
      'Mantenha o core contraído'
    ]
  },
  {
    id: 'squats',
    name: 'Agachamentos',
    duration: 40,
    rest: 15,
    reps: 'x15',
    calories: 15,
    image: '🦵',
    muscleGroups: ['pernas', 'gluteos'],
    instructions: [
      'Fique em pé com pés na largura dos ombros',
      'Desça como se fosse sentar em uma cadeira',
      'Mantenha joelhos alinhados com os pés',
      'Retorne à posição inicial'
    ]
  },
  {
    id: 'plank',
    name: 'Prancha',
    duration: 30,
    rest: 10,
    reps: '30 segundos',
    calories: 10,
    image: '🧘',
    muscleGroups: ['abdomen', 'costas'],
    instructions: [
      'Apoie antebraços e pontas dos pés no chão',
      'Mantenha corpo reto da cabeça aos pés',
      'Contraia abdômen e glúteos',
      'Respire normalmente'
    ]
  },
  {
    id: 'lunges',
    name: 'Afundos',
    duration: 40,
    rest: 15,
    reps: 'x10 cada perna',
    calories: 14,
    image: '🦿',
    muscleGroups: ['pernas', 'gluteos'],
    instructions: [
      'Dê um passo à frente',
      'Desça até joelho traseiro quase tocar o chão',
      'Empurre com perna da frente para voltar',
      'Alterne as pernas'
    ]
  },
  {
    id: 'mountain-climbers',
    name: 'Escaladores',
    duration: 30,
    rest: 10,
    reps: '30 segundos',
    calories: 12,
    image: '⛰️',
    muscleGroups: ['abdomen', 'pernas'],
    instructions: [
      'Posição de prancha alta',
      'Traga joelho direito em direção ao peito',
      'Retorne e repita com joelho esquerdo',
      'Mantenha ritmo rápido'
    ]
  },
  {
    id: 'crunches',
    name: 'Abdominais',
    duration: 40,
    rest: 15,
    reps: 'x20',
    calories: 10,
    image: '💥',
    muscleGroups: ['abdomen'],
    instructions: [
      'Deite de costas com joelhos dobrados',
      'Mãos atrás da cabeça',
      'Levante ombros do chão contraindo abdômen',
      'Desça controladamente'
    ]
  },
  {
    id: 'burpees',
    name: 'Burpees',
    duration: 40,
    rest: 20,
    reps: 'x8',
    calories: 18,
    image: '🔥',
    muscleGroups: ['pernas', 'bracos', 'abdomen'],
    instructions: [
      'Comece em pé',
      'Agache e apoie mãos no chão',
      'Jogue pernas para trás (prancha)',
      'Retorne e pule para cima'
    ]
  },
  {
    id: 'leg-raises',
    name: 'Elevação de Pernas',
    duration: 30,
    rest: 15,
    reps: 'x12',
    calories: 11,
    image: '🦵',
    muscleGroups: ['abdomen', 'pernas'],
    instructions: [
      'Deite de costas com pernas estendidas',
      'Levante pernas até 90 graus',
      'Desça controladamente sem tocar o chão',
      'Mantenha lombar no chão'
    ]
  },
  {
    id: 'tricep-dips',
    name: 'Mergulhos de Tríceps',
    duration: 30,
    rest: 15,
    reps: 'x12',
    calories: 10,
    image: '💪',
    muscleGroups: ['bracos'],
    instructions: [
      'Use uma cadeira ou banco',
      'Mãos na borda, pernas estendidas',
      'Desça dobrando cotovelos',
      'Empurre de volta'
    ]
  },
  {
    id: 'high-knees',
    name: 'Joelhos Altos',
    duration: 30,
    rest: 10,
    reps: '30 segundos',
    calories: 10,
    image: '🏃‍♂️',
    muscleGroups: ['pernas', 'abdomen'],
    instructions: [
      'Corra no lugar elevando joelhos',
      'Traga joelhos até altura do quadril',
      'Mantenha ritmo rápido',
      'Balance braços naturalmente'
    ]
  },
  {
    id: 'bicycle-crunches',
    name: 'Abdominal Bicicleta',
    duration: 40,
    rest: 15,
    reps: 'x20',
    calories: 12,
    image: '🚴',
    muscleGroups: ['abdomen'],
    instructions: [
      'Deite de costas, mãos atrás da cabeça',
      'Traga cotovelo direito ao joelho esquerdo',
      'Alterne os lados em movimento de pedalada',
      'Mantenha abdômen contraído'
    ]
  },
  {
    id: 'glute-bridges',
    name: 'Ponte de Glúteos',
    duration: 40,
    rest: 15,
    reps: 'x15',
    calories: 11,
    image: '🍑',
    muscleGroups: ['gluteos', 'pernas'],
    instructions: [
      'Deite de costas, joelhos dobrados',
      'Eleve quadril contraindo glúteos',
      'Mantenha ombros no chão',
      'Desça controladamente'
    ]
  },
  {
    id: 'side-plank',
    name: 'Prancha Lateral',
    duration: 30,
    rest: 15,
    reps: '30s cada lado',
    calories: 9,
    image: '🧘‍♀️',
    muscleGroups: ['abdomen', 'costas'],
    instructions: [
      'Apoie antebraço e lateral do pé',
      'Mantenha corpo reto',
      'Contraia abdômen lateral',
      'Alterne os lados'
    ]
  },
  {
    id: 'superman',
    name: 'Superman',
    duration: 30,
    rest: 15,
    reps: 'x12',
    calories: 8,
    image: '🦸',
    muscleGroups: ['costas', 'gluteos'],
    instructions: [
      'Deite de bruços, braços estendidos',
      'Levante braços e pernas simultaneamente',
      'Mantenha por 2 segundos',
      'Desça controladamente'
    ]
  },
  {
    id: 'wall-sit',
    name: 'Agachamento na Parede',
    duration: 40,
    rest: 15,
    reps: '40 segundos',
    calories: 10,
    image: '🧱',
    muscleGroups: ['pernas', 'gluteos'],
    instructions: [
      'Encoste costas na parede',
      'Desça até joelhos em 90 graus',
      'Mantenha a posição',
      'Respire normalmente'
    ]
  }
];

export const generatePersonalizedWorkout = (quizData: QuizData): WorkoutDay[] => {
  const { currentWeight, targetWeight, muscleGroups, fitnessLevel } = quizData;
  
  // Calcula quantos kg precisa perder
  const weightToLose = currentWeight - targetWeight;
  
  // Define duração do plano baseado no peso a perder (1kg por semana é saudável)
  const weeksNeeded = Math.ceil(weightToLose / 0.5); // 0.5kg por semana é mais realista
  const daysNeeded = Math.min(weeksNeeded * 7, 90); // Máximo 90 dias
  
  // Filtra exercícios baseado nos grupos musculares selecionados
  const relevantExercises = exercises.filter(ex => 
    ex.muscleGroups.some(group => muscleGroups.includes(group))
  );
  
  // Adiciona exercícios de cardio para emagrecimento (sempre incluir)
  const cardioExercises = exercises.filter(ex => 
    ['jumping-jacks', 'burpees', 'mountain-climbers', 'high-knees'].includes(ex.id)
  );
  
  const plan: WorkoutDay[] = [];
  
  // Define número de exercícios por nível
  const exerciseCountByLevel = {
    'iniciante': 6,
    'intermediário': 8,
    'avançado': 10
  };
  
  const baseExerciseCount = exerciseCountByLevel[fitnessLevel];
  
  for (let day = 1; day <= daysNeeded; day++) {
    // Progressão gradual: aumenta exercícios a cada 10 dias
    const progressionBonus = Math.floor(day / 10);
    const exerciseCount = baseExerciseCount + progressionBonus;
    
    // Garante pelo menos 2 exercícios de cardio por treino (emagrecimento)
    const cardioCount = Math.min(3, Math.floor(exerciseCount * 0.4));
    const muscleCount = exerciseCount - cardioCount;
    
    // Seleciona exercícios
    const selectedCardio = cardioExercises
      .sort(() => Math.random() - 0.5)
      .slice(0, cardioCount);
    
    const selectedMuscle = relevantExercises
      .filter(ex => !cardioExercises.includes(ex))
      .sort(() => Math.random() - 0.5)
      .slice(0, muscleCount);
    
    const dayExercises = [...selectedCardio, ...selectedMuscle]
      .sort(() => Math.random() - 0.5);
    
    // Ajusta intensidade baseado no nível
    const intensityMultiplier = {
      'iniciante': 1,
      'intermediário': 1.2,
      'avançado': 1.5
    }[fitnessLevel];
    
    const adjustedExercises = dayExercises.map(ex => ({
      ...ex,
      duration: Math.round(ex.duration * intensityMultiplier),
      calories: Math.round(ex.calories * intensityMultiplier)
    }));
    
    const totalTime = adjustedExercises.reduce((acc, ex) => acc + ex.duration + ex.rest, 0);
    const totalCalories = adjustedExercises.reduce((acc, ex) => acc + ex.calories, 0);
    
    // Define dificuldade baseada no progresso
    let difficulty: 'iniciante' | 'intermediário' | 'avançado';
    if (day <= Math.floor(daysNeeded * 0.3)) {
      difficulty = 'iniciante';
    } else if (day <= Math.floor(daysNeeded * 0.7)) {
      difficulty = 'intermediário';
    } else {
      difficulty = 'avançado';
    }
    
    plan.push({
      day,
      title: `Dia ${day} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
      difficulty,
      exercises: adjustedExercises,
      totalTime,
      totalCalories,
      focus: muscleGroups.map(g => {
        const labels: Record<string, string> = {
          'abdomen': 'Abdômen',
          'pernas': 'Pernas',
          'bracos': 'Braços',
          'gluteos': 'Glúteos',
          'peito': 'Peito',
          'costas': 'Costas'
        };
        return labels[g];
      })
    });
  }
  
  return plan;
};

export const generateWorkoutPlan = (quizData: QuizData): WorkoutDay[] => {
  // Se tiver quizData, usa o plano personalizado
  if (quizData) {
    return generatePersonalizedWorkout(quizData);
  }
  
  // Caso contrário, gera um plano padrão de 30 dias
  const plan: WorkoutDay[] = [];
  
  for (let day = 1; day <= 30; day++) {
    const difficulty = day <= 10 ? 'iniciante' : day <= 20 ? 'intermediário' : 'avançado';
    const exerciseCount = day <= 10 ? 5 : day <= 20 ? 7 : 9;
    
    // Seleciona exercícios variados
    const dayExercises = exercises
      .sort(() => Math.random() - 0.5)
      .slice(0, exerciseCount);
    
    const totalTime = dayExercises.reduce((acc, ex) => acc + ex.duration + ex.rest, 0);
    const totalCalories = dayExercises.reduce((acc, ex) => acc + ex.calories, 0);
    
    const focuses = ['Corpo Inteiro', 'Cardio', 'Força'];
    
    plan.push({
      day,
      title: `Dia ${day} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
      difficulty,
      exercises: dayExercises,
      totalTime,
      totalCalories,
      focus: [focuses[day % 3]]
    });
  }
  
  return plan;
};
