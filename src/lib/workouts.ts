export interface QuizData {
  currentWeight: number;
  targetWeight: number;
  height: number;
  muscleGroups: string[];
  fitnessLevel: 'iniciante' | 'intermediário' | 'avançado';
  medication?: {
    takesMedication: boolean;
    medicationName?: string;
    category?: 'fitoterápico' | 'suplemento' | 'prescrição';
    dosesPerDay?: number;
    times?: string[];
  };
}

export interface Exercise {
  name: string;
  reps: string;
  duration: number; // in seconds
  rest: number; // in seconds
  instructions: string[];
  image: string;
}

export interface WorkoutDay {
  day: number;
  title: string;
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
  totalTime: number; // in minutes
  totalCalories: number;
  exercises: Exercise[];
}

export function generateWorkoutPlan(quizData: QuizData): WorkoutDay[] {
  const plan: WorkoutDay[] = [];
  const totalDays = 90; // 90 days plan

  // Base difficulty from fitness level
  let baseDifficulty: 'iniciante' | 'intermediário' | 'avançado' = quizData.fitnessLevel;

  // Adjust difficulty based on medication
  if (quizData.medication?.takesMedication) {
    if (quizData.medication.category === 'prescrição') {
      // Prescription meds might require easier workouts initially
      baseDifficulty = 'iniciante';
    }
  }

  const muscleGroups = quizData.muscleGroups.length > 0 ? quizData.muscleGroups : ['abdomen', 'pernas', 'bracos'];

  for (let day = 1; day <= totalDays; day++) {
    // Cycle through muscle groups
    const focusGroup = muscleGroups[day % muscleGroups.length];

    // Progress difficulty over time
    let difficulty = baseDifficulty;
    if (day > 30 && baseDifficulty === 'iniciante') {
      difficulty = 'intermediário';
    } else if (day > 60 && baseDifficulty !== 'avançado') {
      difficulty = 'avançado';
    }

    // Generate workout title based on focus
    const titles = {
      abdomen: ['Abdominal Definido', 'Core Forte', 'Barriga Chapada', 'Abdominais Avançados'],
      pernas: ['Pernas Poderosas', 'Glúteos Firmes', 'Quadríceps Explosivos', 'Pernas de Aço'],
      bracos: ['Braços Definidos', 'Bíceps e Tríceps', 'Braços Fortes', 'Músculos Superiores'],
      gluteos: ['Glúteos Perfeitos', 'Bumbum Fitness', 'Glúteos Elevados', 'Pós-erior Forte'],
      peito: ['Peito Esportivo', 'Peitoral Definido', 'Peito Forte', 'Superior Frontal'],
      costas: ['Costas Poderosas', 'Dorsal Forte', 'Costas Definidas', 'Posterior Superior']
    };

    const groupTitles = titles[focusGroup as keyof typeof titles] || ['Treino Completo'];
    const title = groupTitles[day % groupTitles.length];

    // Generate exercises based on focus group and difficulty
    const exercises = generateExercises(focusGroup, difficulty);

    // Calculate time and calories based on difficulty
    const timeMultipliers = { iniciante: 30, intermediário: 45, avançado: 60 };
    const calorieMultipliers = { iniciante: 200, intermediário: 300, avançado: 400 };

    const totalTime = timeMultipliers[difficulty];
    const totalCalories = calorieMultipliers[difficulty];

    plan.push({
      day,
      title,
      difficulty,
      totalTime,
      totalCalories,
      exercises
    });
  }

  return plan;
}

function generateExercises(focusGroup: string, difficulty: 'iniciante' | 'intermediário' | 'avançado'): Exercise[] {
  const exerciseDatabase = {
    abdomen: [
      {
        name: 'Abdominal Crunch',
        reps: '3x15',
        duration: 30,
        rest: 20,
        instructions: ['Deite de costas no chão', 'Dobre os joelhos', 'Levante o tronco em direção aos joelhos', 'Volte lentamente'],
        image: '💪'
      },
      {
        name: 'Prancha',
        reps: '3x30s',
        duration: 30,
        rest: 20,
        instructions: ['Deite de bruços', 'Apoie nos antebraços e pontas dos pés', 'Mantenha o corpo reto', 'Segure a posição'],
        image: '🏋️'
      },
      {
        name: 'Elevação de Pernas',
        reps: '3x12',
        duration: 25,
        rest: 15,
        instructions: ['Deite de costas', 'Mantenha as pernas estendidas', 'Levante as pernas até 90 graus', 'Desça lentamente'],
        image: '🦵'
      }
    ],
    pernas: [
      {
        name: 'Agachamento',
        reps: '3x12',
        duration: 40,
        rest: 30,
        instructions: ['Fique em pé com pés na largura dos ombros', 'Desça como se fosse sentar', 'Volte à posição inicial', 'Mantenha as costas retas'],
        image: '🦵'
      },
      {
        name: 'Afundo',
        reps: '3x10 cada perna',
        duration: 35,
        rest: 25,
        instructions: ['Dê um passo à frente', 'Desça até o joelho quase tocar o chão', 'Volte à posição inicial', 'Alterne as pernas'],
        image: '🏃'
      },
      {
        name: 'Panturrilha em Pé',
        reps: '3x15',
        duration: 30,
        rest: 20,
        instructions: ['Fique em pé', 'Levante os calcanhares', 'Desça lentamente', 'Mantenha o equilíbrio'],
        image: '🦵'
      }
    ],
    bracos: [
      {
        name: 'Flexão de Braço',
        reps: '3x10',
        duration: 35,
        rest: 25,
        instructions: ['Deite de bruços', 'Apoie as mãos no chão', 'Levante o corpo', 'Desça controladamente'],
        image: '💪'
      },
      {
        name: 'Tríceps na Parede',
        reps: '3x12',
        duration: 30,
        rest: 20,
        instructions: ['Vire de costas para a parede', 'Apoie as mãos na parede', 'Dobre os cotovelos', 'Volte à posição inicial'],
        image: '💪'
      },
      {
        name: 'Braços em Círculo',
        reps: '3x15 cada direção',
        duration: 25,
        rest: 15,
        instructions: ['Estenda os braços lateralmente', 'Faça círculos pequenos', 'Mantenha os braços retos', 'Alterne direções'],
        image: '💪'
      }
    ],
    gluteos: [
      {
        name: 'Ponte',
        reps: '3x15',
        duration: 35,
        rest: 25,
        instructions: ['Deite de costas', 'Dobre os joelhos', 'Levante os quadris', 'Contraia os glúteos'],
        image: '🍑'
      },
      {
        name: 'Agachamento Sumô',
        reps: '3x12',
        duration: 40,
        rest: 30,
        instructions: ['Abra os pés além da largura dos ombros', 'Desça como se fosse sentar', 'Volte à posição inicial', 'Mantenha os joelhos alinhados'],
        image: '🦵'
      },
      {
        name: 'Chute de Glúteo',
        reps: '3x10 cada perna',
        duration: 30,
        rest: 20,
        instructions: ['Fique em quatro apoios', 'Levante uma perna para trás', 'Contraia o glúteo', 'Volte lentamente'],
        image: '🍑'
      }
    ],
    peito: [
      {
        name: 'Flexão de Braço',
        reps: '3x10',
        duration: 35,
        rest: 25,
        instructions: ['Deite de bruços', 'Apoie as mãos no chão', 'Levante o corpo', 'Desça controladamente'],
        image: '💪'
      },
      {
        name: 'Abertura de Braços',
        reps: '3x12',
        duration: 30,
        rest: 20,
        instructions: ['Fique em pé', 'Estenda os braços lateralmente', 'Traga os braços à frente', 'Como se abraçasse alguém'],
        image: '💪'
      },
      {
        name: 'Parede Push',
        reps: '3x15',
        duration: 25,
        rest: 15,
        instructions: ['Fique em frente à parede', 'Apoie as mãos na parede', 'Empurre a parede', 'Volte lentamente'],
        image: '🏗️'
      }
    ],
    costas: [
      {
        name: 'Remada Alta',
        reps: '3x12',
        duration: 35,
        rest: 25,
        instructions: ['Fique em pé', 'Puxe os cotovelos para trás', 'Como se remasse', 'Mantenha as costas retas'],
        image: '🏋️'
      },
      {
        name: 'Prancha Invertida',
        reps: '3x20s',
        duration: 20,
        rest: 15,
        instructions: ['Deite de costas', 'Apoie nos calcanhares e mãos', 'Levante os quadris', 'Mantenha o corpo reto'],
        image: '🏋️'
      },
      {
        name: 'Superman',
        reps: '3x10',
        duration: 30,
        rest: 20,
        instructions: ['Deite de bruços', 'Estenda os braços à frente', 'Levante braços e pernas', 'Mantenha por 2 segundos'],
        image: '🦸'
      }
    ]
  };

  const groupExercises = exerciseDatabase[focusGroup as keyof typeof exerciseDatabase] || exerciseDatabase.abdomen;

  // Adjust reps based on difficulty
  const adjustedExercises = groupExercises.map(exercise => {
    let adjustedReps = exercise.reps;
    if (difficulty === 'iniciante') {
      adjustedReps = exercise.reps.replace(/(\d+)/g, (match) => Math.floor(parseInt(match) * 0.7).toString());
    } else if (difficulty === 'avançado') {
      adjustedReps = exercise.reps.replace(/(\d+)/g, (match) => Math.floor(parseInt(match) * 1.3).toString());
    }
    return { ...exercise, reps: adjustedReps };
  });

  return adjustedExercises;
}