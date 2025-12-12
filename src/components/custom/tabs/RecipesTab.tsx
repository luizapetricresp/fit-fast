'use client';

import { useState } from 'react';
import { Search, Filter, Clock, Flame, ChefHat, X } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  category: 'cafe' | 'almoco' | 'jantar' | 'lanche-salgado' | 'lanche-doce' | 'bebida';
  type: 'doce' | 'salgado' | 'bebida';
  prepTime: string;
  calories: number;
  difficulty: 'fácil' | 'médio' | 'difícil';
  ingredients: string[];
  instructions: string[];
  tags: string[];
  icon: string;
}

const recipes: Recipe[] = [
  // CAFÉ DA MANHÃ (20 receitas)
  {
    id: 1,
    title: 'Omelete de claras com espinafre',
    category: 'cafe',
    type: 'salgado',
    prepTime: '10 min',
    calories: 180,
    difficulty: 'fácil',
    icon: '🍳',
    tags: ['proteína', 'low carb', 'rápido'],
    ingredients: [
      '3 claras de ovo',
      '1 xícara de espinafre',
      'Sal e pimenta a gosto',
      '1 colher (chá) de azeite'
    ],
    instructions: [
      'Bata as claras com sal e pimenta.',
      'Aqueça o azeite em uma frigideira.',
      'Adicione o espinafre e refogue rapidamente.',
      'Despeje as claras e cozinhe até firmar.',
      'Dobre ao meio e sirva.'
    ]
  },
  {
    id: 2,
    title: 'Panqueca de banana e aveia',
    category: 'cafe',
    type: 'doce',
    prepTime: '15 min',
    calories: 220,
    difficulty: 'fácil',
    icon: '🥞',
    tags: ['aveia', 'banana', 'fit'],
    ingredients: [
      '1 banana madura',
      '2 ovos',
      '3 colheres (sopa) de aveia',
      'Canela a gosto'
    ],
    instructions: [
      'Amasse a banana em um bowl.',
      'Adicione os ovos e misture bem.',
      'Acrescente a aveia e canela.',
      'Aqueça uma frigideira antiaderente.',
      'Faça panquecas pequenas e doure dos dois lados.'
    ]
  },
  {
    id: 3,
    title: 'Iogurte com granola e frutas',
    category: 'cafe',
    type: 'doce',
    prepTime: '5 min',
    calories: 250,
    difficulty: 'fácil',
    icon: '🥣',
    tags: ['prático', 'frutas', 'probiótico'],
    ingredients: [
      '1 pote de iogurte natural',
      '3 colheres (sopa) de granola',
      'Frutas picadas (morango, banana, kiwi)',
      '1 colher (chá) de mel (opcional)'
    ],
    instructions: [
      'Coloque o iogurte em uma tigela.',
      'Adicione a granola por cima.',
      'Decore com frutas picadas.',
      'Regue com mel se desejar.'
    ]
  },
  {
    id: 4,
    title: 'Tapioca recheada com queijo',
    category: 'cafe',
    type: 'salgado',
    prepTime: '10 min',
    calories: 200,
    difficulty: 'fácil',
    icon: '🫓',
    tags: ['brasileiro', 'sem glúten', 'rápido'],
    ingredients: [
      '4 colheres (sopa) de tapioca',
      '2 fatias de queijo branco',
      'Sal a gosto'
    ],
    instructions: [
      'Aqueça uma frigideira antiaderente.',
      'Espalhe a tapioca formando um círculo.',
      'Quando começar a grudar, adicione o queijo.',
      'Dobre ao meio e espere derreter.',
      'Sirva quente.'
    ]
  },
  {
    id: 5,
    title: 'Smoothie verde energético',
    category: 'cafe',
    type: 'bebida',
    prepTime: '5 min',
    calories: 150,
    difficulty: 'fácil',
    icon: '🥤',
    tags: ['detox', 'energético', 'verde'],
    ingredients: [
      '1 banana',
      '1 folha de couve',
      '200ml de água de coco',
      '1 colher (sopa) de chia'
    ],
    instructions: [
      'Coloque todos os ingredientes no liquidificador.',
      'Bata até ficar homogêneo.',
      'Sirva imediatamente.'
    ]
  },
  {
    id: 6,
    title: 'Pão integral com pasta de abacate',
    category: 'cafe',
    type: 'salgado',
    prepTime: '8 min',
    calories: 280,
    difficulty: 'fácil',
    icon: '🥑',
    tags: ['integral', 'gordura boa', 'prático'],
    ingredients: [
      '2 fatias de pão integral',
      '½ abacate maduro',
      'Sal, pimenta e limão',
      '1 ovo cozido (opcional)'
    ],
    instructions: [
      'Torre o pão integral.',
      'Amasse o abacate com sal, pimenta e limão.',
      'Espalhe sobre o pão.',
      'Adicione ovo cozido fatiado se desejar.'
    ]
  },
  {
    id: 7,
    title: 'Mingau de aveia com canela',
    category: 'cafe',
    type: 'doce',
    prepTime: '10 min',
    calories: 240,
    difficulty: 'fácil',
    icon: '🥣',
    tags: ['aveia', 'quentinho', 'conforto'],
    ingredients: [
      '½ xícara de aveia',
      '1 xícara de leite (ou vegetal)',
      'Canela em pó',
      '1 colher (chá) de mel'
    ],
    instructions: [
      'Aqueça o leite em uma panela.',
      'Adicione a aveia e mexa.',
      'Cozinhe por 5 minutos mexendo sempre.',
      'Adicione canela e mel.',
      'Sirva quente.'
    ]
  },
  {
    id: 8,
    title: 'Crepioca proteica',
    category: 'cafe',
    type: 'salgado',
    prepTime: '12 min',
    calories: 210,
    difficulty: 'fácil',
    icon: '🥞',
    tags: ['proteína', 'brasileiro', 'fit'],
    ingredients: [
      '1 ovo',
      '2 colheres (sopa) de tapioca',
      'Recheio: frango desfiado ou queijo',
      'Temperos a gosto'
    ],
    instructions: [
      'Bata o ovo com a tapioca.',
      'Despeje em frigideira quente.',
      'Quando firmar, adicione o recheio.',
      'Dobre e sirva.'
    ]
  },
  {
    id: 9,
    title: 'Vitamina de frutas vermelhas',
    category: 'cafe',
    type: 'bebida',
    prepTime: '5 min',
    calories: 180,
    difficulty: 'fácil',
    icon: '🍓',
    tags: ['antioxidante', 'frutas', 'cremoso'],
    ingredients: [
      '½ xícara de morangos',
      '½ xícara de framboesas',
      '1 banana',
      '200ml de leite'
    ],
    instructions: [
      'Coloque todas as frutas no liquidificador.',
      'Adicione o leite.',
      'Bata até ficar cremoso.',
      'Sirva gelado.'
    ]
  },
  {
    id: 10,
    title: 'Wrap de ovo com vegetais',
    category: 'cafe',
    type: 'salgado',
    prepTime: '15 min',
    calories: 260,
    difficulty: 'médio',
    icon: '🌯',
    tags: ['proteína', 'vegetais', 'completo'],
    ingredients: [
      '1 tortilha integral',
      '2 ovos mexidos',
      'Tomate, alface e cenoura ralada',
      'Sal e pimenta'
    ],
    instructions: [
      'Prepare os ovos mexidos temperados.',
      'Aqueça a tortilha.',
      'Coloque os ovos e vegetais no centro.',
      'Enrole como um wrap.',
      'Corte ao meio e sirva.'
    ]
  },
  {
    id: 11,
    title: 'Bolo de caneca fit',
    category: 'cafe',
    type: 'doce',
    prepTime: '5 min',
    calories: 150,
    difficulty: 'fácil',
    icon: '☕',
    tags: ['microondas', 'rápido', 'fit'],
    ingredients: [
      '1 ovo',
      '2 colheres (sopa) de aveia',
      '1 colher (chá) de cacau',
      'Adoçante a gosto'
    ],
    instructions: [
      'Misture todos os ingredientes em uma caneca.',
      'Leve ao microondas por 2 minutos.',
      'Deixe esfriar um pouco.',
      'Sirva na própria caneca.'
    ]
  },
  {
    id: 12,
    title: 'Queijo cottage com mel e nozes',
    category: 'cafe',
    type: 'doce',
    prepTime: '3 min',
    calories: 220,
    difficulty: 'fácil',
    icon: '🧀',
    tags: ['proteína', 'prático', 'crocante'],
    ingredients: [
      '½ xícara de queijo cottage',
      '1 colher (sopa) de mel',
      '2 colheres (sopa) de nozes picadas',
      'Canela (opcional)'
    ],
    instructions: [
      'Coloque o cottage em uma tigela.',
      'Regue com mel.',
      'Adicione as nozes por cima.',
      'Polvilhe canela se desejar.'
    ]
  },
  {
    id: 13,
    title: 'Torrada com ricota e tomate',
    category: 'cafe',
    type: 'salgado',
    prepTime: '8 min',
    calories: 190,
    difficulty: 'fácil',
    icon: '🍞',
    tags: ['leve', 'proteína', 'italiano'],
    ingredients: [
      '2 fatias de pão integral',
      '3 colheres (sopa) de ricota',
      '1 tomate fatiado',
      'Manjericão e azeite'
    ],
    instructions: [
      'Torre o pão.',
      'Espalhe a ricota.',
      'Adicione fatias de tomate.',
      'Finalize com manjericão e fio de azeite.'
    ]
  },
  {
    id: 14,
    title: 'Açaí bowl fitness',
    category: 'cafe',
    type: 'doce',
    prepTime: '10 min',
    calories: 300,
    difficulty: 'fácil',
    icon: '🍇',
    tags: ['energético', 'antioxidante', 'brasileiro'],
    ingredients: [
      '100g de polpa de açaí',
      '1 banana',
      'Granola',
      'Frutas picadas'
    ],
    instructions: [
      'Bata o açaí com a banana.',
      'Coloque em uma tigela.',
      'Decore com granola e frutas.',
      'Sirva imediatamente.'
    ]
  },
  {
    id: 15,
    title: 'Sanduíche natural de frango',
    category: 'cafe',
    type: 'salgado',
    prepTime: '12 min',
    calories: 280,
    difficulty: 'fácil',
    icon: '🥪',
    tags: ['proteína', 'completo', 'prático'],
    ingredients: [
      '2 fatias de pão integral',
      '100g de frango desfiado',
      'Alface, tomate e cenoura',
      'Iogurte natural para temperar'
    ],
    instructions: [
      'Misture o frango com iogurte.',
      'Monte o sanduíche com vegetais.',
      'Corte ao meio.',
      'Sirva fresco.'
    ]
  },
  {
    id: 16,
    title: 'Overnight oats',
    category: 'cafe',
    type: 'doce',
    prepTime: '5 min + gelar',
    calories: 260,
    difficulty: 'fácil',
    icon: '🥣',
    tags: ['aveia', 'prático', 'preparo antecipado'],
    ingredients: [
      '½ xícara de aveia',
      '½ xícara de leite',
      '1 colher (sopa) de chia',
      'Frutas e mel'
    ],
    instructions: [
      'Misture aveia, leite e chia em um pote.',
      'Deixe na geladeira durante a noite.',
      'Pela manhã, adicione frutas e mel.',
      'Sirva frio.'
    ]
  },
  {
    id: 17,
    title: 'Ovo pochê com aspargos',
    category: 'cafe',
    type: 'salgado',
    prepTime: '15 min',
    calories: 200,
    difficulty: 'médio',
    icon: '🥚',
    tags: ['proteína', 'gourmet', 'low carb'],
    ingredients: [
      '2 ovos',
      '6 aspargos',
      'Sal, pimenta e azeite',
      'Vinagre para a água'
    ],
    instructions: [
      'Cozinhe os aspargos no vapor.',
      'Ferva água com vinagre.',
      'Quebre o ovo delicadamente na água.',
      'Cozinhe por 3-4 minutos.',
      'Sirva sobre os aspargos.'
    ]
  },
  {
    id: 18,
    title: 'Smoothie bowl tropical',
    category: 'cafe',
    type: 'doce',
    prepTime: '10 min',
    calories: 280,
    difficulty: 'fácil',
    icon: '🥥',
    tags: ['tropical', 'cremoso', 'colorido'],
    ingredients: [
      '1 manga',
      '½ xícara de abacaxi',
      '1 banana congelada',
      'Coco ralado e granola'
    ],
    instructions: [
      'Bata manga, abacaxi e banana.',
      'Coloque em uma tigela.',
      'Decore com coco e granola.',
      'Adicione outras frutas se desejar.'
    ]
  },
  {
    id: 19,
    title: 'Pão de queijo fit',
    category: 'cafe',
    type: 'salgado',
    prepTime: '20 min',
    calories: 160,
    difficulty: 'médio',
    icon: '🧀',
    tags: ['brasileiro', 'sem glúten', 'queijo'],
    ingredients: [
      '½ xícara de polvilho',
      '¼ xícara de queijo ralado',
      '1 ovo',
      '2 colheres (sopa) de leite'
    ],
    instructions: [
      'Misture todos os ingredientes.',
      'Faça bolinhas pequenas.',
      'Coloque em forma untada.',
      'Asse a 180°C por 20 minutos.'
    ]
  },
  {
    id: 20,
    title: 'Café da manhã inglês fit',
    category: 'cafe',
    type: 'salgado',
    prepTime: '20 min',
    calories: 350,
    difficulty: 'médio',
    icon: '🍳',
    tags: ['proteína', 'completo', 'internacional'],
    ingredients: [
      '2 ovos',
      '2 fatias de bacon magro',
      'Tomate grelhado',
      'Cogumelos salteados',
      '1 fatia de pão integral'
    ],
    instructions: [
      'Grelhe o bacon até ficar crocante.',
      'Frite os ovos.',
      'Grelhe o tomate cortado ao meio.',
      'Salteie os cogumelos.',
      'Torre o pão e monte o prato.'
    ]
  },

  // ALMOÇO E JANTAR (29 receitas - removida a de frango grelhado)
  {
    id: 22,
    title: 'Salada completa com frango desfiado',
    category: 'almoco',
    type: 'salgado',
    prepTime: '15 min',
    calories: 280,
    difficulty: 'fácil',
    icon: '🥗',
    tags: ['salada', 'proteína', 'leve'],
    ingredients: [
      '1 prato de folhas verdes',
      '½ peito de frango desfiado',
      '1 tomate picado',
      '½ cenoura ralada',
      'Azeite e limão'
    ],
    instructions: [
      'Misture as folhas, tomate e cenoura.',
      'Acrescente o frango desfiado.',
      'Tempere com limão, azeite e sal.'
    ]
  },
  {
    id: 23,
    title: 'Tilápia assada com limão e ervas',
    category: 'jantar',
    type: 'salgado',
    prepTime: '30 min',
    calories: 220,
    difficulty: 'fácil',
    icon: '🐟',
    tags: ['peixe', 'low carb', 'assado'],
    ingredients: [
      '1 filé de tilápia',
      'Suco de 1 limão',
      'Sal, azeite e ervas (alecrim, orégano)'
    ],
    instructions: [
      'Tempere a tilápia com limão, sal e ervas.',
      'Coloque em uma forma com fio de azeite.',
      'Asse por 20 minutos a 200°C.'
    ]
  },
  {
    id: 24,
    title: 'Estrogonoff fit com iogurte',
    category: 'almoco',
    type: 'salgado',
    prepTime: '20 min',
    calories: 320,
    difficulty: 'médio',
    icon: '🍲',
    tags: ['proteína', 'fit', 'cremoso'],
    ingredients: [
      '200g de frango picado',
      '2 colheres (sopa) de iogurte natural',
      '½ cebola picada',
      '2 colheres (sopa) de molho de tomate'
    ],
    instructions: [
      'Refogue a cebola e o frango.',
      'Junte o molho de tomate.',
      'Desligue o fogo e misture o iogurte.',
      'Mexa e sirva com arroz integral.'
    ]
  },
  {
    id: 25,
    title: 'Abóbora recheada com carne moída',
    category: 'jantar',
    type: 'salgado',
    prepTime: '40 min',
    calories: 380,
    difficulty: 'médio',
    icon: '🎃',
    tags: ['proteína', 'recheado', 'assado'],
    ingredients: [
      '1 pedaço grande de abóbora',
      '150g carne moída',
      'Temperos a gosto'
    ],
    instructions: [
      'Asse a abóbora 20 min até amolecer.',
      'Refogue carne moída com temperos.',
      'Recheie a abóbora e leve ao forno por mais 10 min.'
    ]
  },
  {
    id: 26,
    title: 'Arroz integral com frango e cenoura',
    category: 'almoco',
    type: 'salgado',
    prepTime: '35 min',
    calories: 400,
    difficulty: 'fácil',
    icon: '🍚',
    tags: ['integral', 'proteína', 'completo'],
    ingredients: [
      '¾ xícara de arroz integral',
      '100g frango cozido',
      '1 cenoura ralada',
      '½ cebola picada',
      'Azeite e temperos'
    ],
    instructions: [
      'Refogue ½ cebola com azeite.',
      'Acrescente ¾ xícara de arroz integral e mexa.',
      'Adicione água e cozinhe.',
      'Misture frango cozido e cenoura ralada.'
    ]
  },
  {
    id: 27,
    title: 'Espaguete de abobrinha ao molho de tomate',
    category: 'jantar',
    type: 'salgado',
    prepTime: '20 min',
    calories: 180,
    difficulty: 'fácil',
    icon: '🍝',
    tags: ['low carb', 'vegetariano', 'leve'],
    ingredients: [
      '2 abobrinhas médias',
      '1 xícara de molho de tomate caseiro',
      'Azeite e ervas'
    ],
    instructions: [
      'Passe a abobrinha no "espiralizador".',
      'Refogue rapidamente em azeite.',
      'Acrescente molho de tomate caseiro.',
      'Finalize com ervas.'
    ]
  },
  {
    id: 28,
    title: 'Carne moída magra com batata-doce',
    category: 'almoco',
    type: 'salgado',
    prepTime: '30 min',
    calories: 420,
    difficulty: 'fácil',
    icon: '🥩',
    tags: ['proteína', 'carboidrato', 'completo'],
    ingredients: [
      '150g de carne moída magra',
      '1 batata-doce média',
      'Sal, alho e cebola'
    ],
    instructions: [
      'Refogue 150g de carne magra.',
      'Tempere com sal, alho e cebola.',
      'Sirva com batata-doce cozida.'
    ]
  },
  {
    id: 29,
    title: 'Risoto fit de frango',
    category: 'jantar',
    type: 'salgado',
    prepTime: '40 min',
    calories: 380,
    difficulty: 'médio',
    icon: '🍚',
    tags: ['cremoso', 'proteína', 'fit'],
    ingredients: [
      '1 xícara de arroz arbóreo',
      '100g frango desfiado',
      '½ cebola',
      'Caldo de legumes',
      '2 colheres de iogurte natural'
    ],
    instructions: [
      'Refogue cebola e arroz arbóreo.',
      'Vá colocando caldo quente aos poucos.',
      'Quando estiver quase pronto, adicione frango desfiado.',
      'Finalize com um pouco de iogurte.'
    ]
  },
  {
    id: 30,
    title: 'Caçarola low carb de brócolis',
    category: 'jantar',
    type: 'salgado',
    prepTime: '35 min',
    calories: 250,
    difficulty: 'fácil',
    icon: '🥦',
    tags: ['low carb', 'vegetariano', 'assado'],
    ingredients: [
      '2 xícaras de brócolis cozido',
      '2 ovos',
      '½ xícara de queijo cottage'
    ],
    instructions: [
      'Misture brócolis cozido, 2 ovos e queijo cottage.',
      'Coloque em forma.',
      'Asse por 20–25 min.'
    ]
  },
  {
    id: 31,
    title: 'Hambúrguer caseiro magro',
    category: 'jantar',
    type: 'salgado',
    prepTime: '20 min',
    calories: 280,
    difficulty: 'fácil',
    icon: '🍔',
    tags: ['proteína', 'grelhado', 'caseiro'],
    ingredients: [
      '150g carne moída magra',
      'Sal e ervas a gosto'
    ],
    instructions: [
      'Modele 150g carne moída com sal e ervas.',
      'Grelhe dos dois lados.',
      'Sirva com salada.'
    ]
  },
  {
    id: 32,
    title: 'Torta de frango sem farinha',
    category: 'almoco',
    type: 'salgado',
    prepTime: '35 min',
    calories: 320,
    difficulty: 'médio',
    icon: '🥧',
    tags: ['low carb', 'proteína', 'assado'],
    ingredients: [
      '200g frango desfiado',
      '2 ovos',
      '½ xícara de queijo ralado'
    ],
    instructions: [
      'Misture frango desfiado, 2 ovos e queijo.',
      'Coloque em forma pequena.',
      'Asse 25 min.'
    ]
  },
  {
    id: 33,
    title: 'Panqueca de frango low carb',
    category: 'jantar',
    type: 'salgado',
    prepTime: '25 min',
    calories: 290,
    difficulty: 'médio',
    icon: '🥞',
    tags: ['low carb', 'proteína', 'recheado'],
    ingredients: [
      '2 ovos',
      '1 colher (sopa) de requeijão',
      '100g frango desfiado'
    ],
    instructions: [
      'Bata 2 ovos com 1 colh. (sopa) de requeijão.',
      'Faça panquecas finas.',
      'Recheie com frango desfiado.'
    ]
  },
  {
    id: 34,
    title: 'Lasanha de berinjela',
    category: 'almoco',
    type: 'salgado',
    prepTime: '45 min',
    calories: 340,
    difficulty: 'médio',
    icon: '🍆',
    tags: ['low carb', 'assado', 'italiano'],
    ingredients: [
      '2 berinjelas grandes',
      '200g frango desfiado',
      '1 xícara de molho de tomate',
      'Queijo ralado'
    ],
    instructions: [
      'Corte berinjela em tiras e grelhe.',
      'Monte camadas com molho de tomate e frango.',
      'Asse 20–30 min.'
    ]
  },
  {
    id: 35,
    title: 'Caldo detox de legumes',
    category: 'jantar',
    type: 'salgado',
    prepTime: '25 min',
    calories: 120,
    difficulty: 'fácil',
    icon: '🥣',
    tags: ['detox', 'leve', 'vegetariano'],
    ingredients: [
      '1 abobrinha',
      '1 cenoura',
      '2 folhas de couve',
      'Temperos'
    ],
    instructions: [
      'Cozinhe abobrinha, cenoura e couve.',
      'Bata tudo no liquidificador.',
      'Tempere e sirva.'
    ]
  },
  {
    id: 36,
    title: 'Frango empanado na airfryer',
    category: 'almoco',
    type: 'salgado',
    prepTime: '25 min',
    calories: 310,
    difficulty: 'fácil',
    icon: '🍗',
    tags: ['proteína', 'crocante', 'airfryer'],
    ingredients: [
      '2 filés de frango',
      '1 ovo',
      '½ xícara de aveia',
      'Temperos'
    ],
    instructions: [
      'Passe filés de frango no ovo.',
      'Empane com aveia.',
      'Coloque na airfryer 15 min a 180°C.'
    ]
  },
  {
    id: 37,
    title: 'Tilápia crocante sem óleo',
    category: 'jantar',
    type: 'salgado',
    prepTime: '25 min',
    calories: 240,
    difficulty: 'fácil',
    icon: '🐟',
    tags: ['peixe', 'crocante', 'assado'],
    ingredients: [
      '1 filé de tilápia',
      '½ xícara de aveia',
      'Temperos'
    ],
    instructions: [
      'Misture aveia + temperos.',
      'Empane a tilápia.',
      'Asse 20 min ou airfryer.'
    ]
  },
  {
    id: 38,
    title: 'Salmão com crosta de gergelim',
    category: 'jantar',
    type: 'salgado',
    prepTime: '20 min',
    calories: 380,
    difficulty: 'médio',
    icon: '🍣',
    tags: ['peixe', 'ômega 3', 'gourmet'],
    ingredients: [
      '1 filé de salmão',
      '2 colheres de gergelim',
      'Sal e azeite'
    ],
    instructions: [
      'Passe o salmão em gergelim.',
      'Grelhe 3–4 min cada lado.'
    ]
  },
  {
    id: 39,
    title: 'Purê de couve-flor low carb',
    category: 'almoco',
    type: 'salgado',
    prepTime: '20 min',
    calories: 90,
    difficulty: 'fácil',
    icon: '🥔',
    tags: ['low carb', 'acompanhamento', 'cremoso'],
    ingredients: [
      '1 couve-flor média',
      '1 colher (chá) de manteiga light',
      'Sal'
    ],
    instructions: [
      'Cozinhe couve-flor até amolecer.',
      'Bata com sal e 1 colh. (chá) de manteiga light.'
    ]
  },
  {
    id: 40,
    title: 'Frango xadrez fit',
    category: 'almoco',
    type: 'salgado',
    prepTime: '25 min',
    calories: 330,
    difficulty: 'médio',
    icon: '🥘',
    tags: ['proteína', 'oriental', 'colorido'],
    ingredients: [
      '200g frango em cubos',
      '1 pimentão vermelho',
      '1 pimentão verde',
      '½ cebola',
      'Shoyu light'
    ],
    instructions: [
      'Refogue frango em cubos.',
      'Junte pimentões e cebola.',
      'Finalize com shoyu light.'
    ]
  },
  {
    id: 41,
    title: 'Tofu grelhado',
    category: 'jantar',
    type: 'salgado',
    prepTime: '15 min',
    calories: 180,
    difficulty: 'fácil',
    icon: '🧈',
    tags: ['vegetariano', 'proteína vegetal', 'grelhado'],
    ingredients: [
      '200g tofu',
      'Shoyu',
      'Temperos'
    ],
    instructions: [
      'Corte tofu em cubos.',
      'Tempere com shoyu.',
      'Grelhe até dourar.'
    ]
  },
  {
    id: 42,
    title: 'Arroz de couve-flor',
    category: 'almoco',
    type: 'salgado',
    prepTime: '15 min',
    calories: 80,
    difficulty: 'fácil',
    icon: '🍚',
    tags: ['low carb', 'acompanhamento', 'leve'],
    ingredients: [
      '1 couve-flor média',
      'Azeite e alho'
    ],
    instructions: [
      'Triture couve-flor até virar "arroz".',
      'Refogue com azeite e alho.'
    ]
  },
  {
    id: 43,
    title: 'Escondidinho de batata-doce',
    category: 'almoco',
    type: 'salgado',
    prepTime: '40 min',
    calories: 420,
    difficulty: 'médio',
    icon: '🥔',
    tags: ['proteína', 'carboidrato', 'assado'],
    ingredients: [
      '2 batatas-doces',
      '150g frango desfiado',
      'Temperos'
    ],
    instructions: [
      'Faça purê de batata-doce.',
      'Recheie com frango.',
      'Asse 20 min.'
    ]
  },
  {
    id: 44,
    title: 'Sopa de abóbora',
    category: 'jantar',
    type: 'salgado',
    prepTime: '30 min',
    calories: 150,
    difficulty: 'fácil',
    icon: '🎃',
    tags: ['sopa', 'leve', 'cremoso'],
    ingredients: [
      '2 xícaras de abóbora em cubos',
      'Temperos',
      'Água'
    ],
    instructions: [
      'Cozinhe cubos de abóbora.',
      'Bata com água do cozimento.',
      'Tempere.'
    ]
  },
  {
    id: 45,
    title: 'Salada tropical com manga',
    category: 'almoco',
    type: 'salgado',
    prepTime: '15 min',
    calories: 220,
    difficulty: 'fácil',
    icon: '🥭',
    tags: ['salada', 'tropical', 'refrescante'],
    ingredients: [
      'Folhas verdes',
      '1 manga picada',
      '100g frango ou atum',
      'Azeite e limão'
    ],
    instructions: [
      'Misture folhas verdes, manga picada e frango ou atum.',
      'Tempere com azeite e limão.'
    ]
  },
  {
    id: 46,
    title: 'Macarrão integral com atum',
    category: 'almoco',
    type: 'salgado',
    prepTime: '20 min',
    calories: 380,
    difficulty: 'fácil',
    icon: '🍝',
    tags: ['integral', 'proteína', 'prático'],
    ingredients: [
      '100g macarrão integral',
      '1 lata de atum',
      '1 tomate picado',
      'Azeite'
    ],
    instructions: [
      'Cozinhe o macarrão.',
      'Misture atum + tomate + azeite.',
      'Sirva.'
    ]
  },
  {
    id: 47,
    title: 'Moqueca leve de peixe',
    category: 'jantar',
    type: 'salgado',
    prepTime: '35 min',
    calories: 320,
    difficulty: 'médio',
    icon: '🐟',
    tags: ['peixe', 'brasileiro', 'cremoso'],
    ingredients: [
      '200g peixe em pedaços',
      '1 pimentão',
      '½ cebola',
      '½ xícara de leite de coco light'
    ],
    instructions: [
      'Refogue pimentões + cebola.',
      'Coloque peixe em pedaços.',
      'Adicione leite de coco light.',
      'Cozinhe 15 min.'
    ]
  },
  {
    id: 48,
    title: 'Omelete grande recheada',
    category: 'almoco',
    type: 'salgado',
    prepTime: '15 min',
    calories: 280,
    difficulty: 'fácil',
    icon: '🍳',
    tags: ['proteína', 'prático', 'recheado'],
    ingredients: [
      '3 ovos',
      'Verduras picadas',
      'Queijo (opcional)'
    ],
    instructions: [
      'Bata 3 ovos.',
      'Coloque verduras picadas.',
      'Cozinhe em fogo baixo.'
    ]
  },
  {
    id: 49,
    title: 'Tabule',
    category: 'almoco',
    type: 'salgado',
    prepTime: '20 min',
    calories: 180,
    difficulty: 'fácil',
    icon: '🥗',
    tags: ['árabe', 'salada', 'refrescante'],
    ingredients: [
      '½ xícara de trigo fino',
      '1 tomate',
      '½ pepino',
      'Hortelã e limão'
    ],
    instructions: [
      'Hidrate trigo fino.',
      'Misture tomate, pepino, hortelã e limão.'
    ]
  },
  {
    id: 50,
    title: 'Feijão com legumes',
    category: 'almoco',
    type: 'salgado',
    prepTime: '40 min',
    calories: 320,
    difficulty: 'fácil',
    icon: '🫘',
    tags: ['proteína vegetal', 'completo', 'brasileiro'],
    ingredients: [
      '1 xícara de feijão',
      'Legumes picados (cenoura, abobrinha)',
      'Temperos'
    ],
    instructions: [
      'Cozinhe feijão normalmente.',
      'Acrescente legumes picados.',
      'Ferva mais 10 min.'
    ]
  },

  // LANCHES SALGADOS (20 receitas)
  {
    id: 51,
    title: 'Coxinha fit de batata-doce',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '30 min',
    calories: 180,
    difficulty: 'médio',
    icon: '🍗',
    tags: ['fit', 'assado', 'brasileiro'],
    ingredients: [
      '1 batata-doce grande',
      '100g frango desfiado',
      'Temperos'
    ],
    instructions: [
      'Cozinhe batata-doce e amasse.',
      'Recheie com frango.',
      'Modele e leve à airfryer 15 min.'
    ]
  },
  {
    id: 52,
    title: 'Bolinho de frango airfryer',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '25 min',
    calories: 150,
    difficulty: 'fácil',
    icon: '🍗',
    tags: ['proteína', 'airfryer', 'prático'],
    ingredients: [
      '150g frango desfiado',
      '1 ovo',
      'Cheiro-verde'
    ],
    instructions: [
      'Misture frango desfiado + ovo + cheiro-verde.',
      'Modele bolinhos.',
      'Airfryer 12 min.'
    ]
  },
  {
    id: 53,
    title: 'Palitos de abobrinha assados',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '25 min',
    calories: 120,
    difficulty: 'fácil',
    icon: '🥒',
    tags: ['vegetariano', 'crocante', 'assado'],
    ingredients: [
      '2 abobrinhas',
      '½ xícara de aveia',
      'Ervas'
    ],
    instructions: [
      'Corte abobrinha em tiras.',
      'Empane com aveia e ervas.',
      'Asse 20 min.'
    ]
  },
  {
    id: 54,
    title: 'Torta de legumes',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '35 min',
    calories: 220,
    difficulty: 'médio',
    icon: '🥧',
    tags: ['vegetariano', 'assado', 'completo'],
    ingredients: [
      '2 ovos',
      '½ xícara de aveia',
      '1 xícara de legumes picados'
    ],
    instructions: [
      'Misture ovos + aveia + legumes.',
      'Asse 25 min.'
    ]
  },
  {
    id: 55,
    title: 'Pão de queijo fit',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '25 min',
    calories: 160,
    difficulty: 'fácil',
    icon: '🧀',
    tags: ['brasileiro', 'queijo', 'assado'],
    ingredients: [
      '½ xícara de tapioca',
      '½ xícara de queijo ralado',
      '1 ovo'
    ],
    instructions: [
      'Misture tapioca + queijo + ovo.',
      'Asse 20 min.'
    ]
  },
  {
    id: 56,
    title: 'Chips de batata-doce',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '30 min',
    calories: 140,
    difficulty: 'fácil',
    icon: '🥔',
    tags: ['crocante', 'assado', 'snack'],
    ingredients: [
      '1 batata-doce',
      'Azeite',
      'Sal'
    ],
    instructions: [
      'Corte fininho.',
      'Asse até dourar.'
    ]
  },
  {
    id: 57,
    title: 'Bolinho de brócolis',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '30 min',
    calories: 130,
    difficulty: 'fácil',
    icon: '🥦',
    tags: ['vegetariano', 'assado', 'proteína'],
    ingredients: [
      '1 xícara de brócolis cozido',
      '1 ovo',
      '2 colheres de queijo ralado'
    ],
    instructions: [
      'Misture brócolis + ovo + queijo.',
      'Asse 20 min.'
    ]
  },
  {
    id: 58,
    title: 'Quibe de abóbora',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '40 min',
    calories: 200,
    difficulty: 'médio',
    icon: '🎃',
    tags: ['árabe', 'vegetariano', 'assado'],
    ingredients: [
      '1 xícara de abóbora cozida',
      '½ xícara de trigo',
      'Temperos'
    ],
    instructions: [
      'Misture abóbora cozida + trigo + temperos.',
      'Asse 30 min.'
    ]
  },
  {
    id: 59,
    title: 'Empadinha de frango sem massa',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '30 min',
    calories: 170,
    difficulty: 'médio',
    icon: '🥧',
    tags: ['low carb', 'proteína', 'assado'],
    ingredients: [
      '100g frango desfiado',
      '2 colheres de requeijão light',
      'Temperos'
    ],
    instructions: [
      'Misture frango + requeijão light.',
      'Coloque em forminhas.',
      'Asse 20 min.'
    ]
  },
  {
    id: 60,
    title: 'Bolinho de atum',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '25 min',
    calories: 160,
    difficulty: 'fácil',
    icon: '🐟',
    tags: ['proteína', 'assado', 'prático'],
    ingredients: [
      '1 lata de atum',
      '1 ovo',
      '2 colheres de aveia'
    ],
    instructions: [
      'Misture atum + ovo + aveia.',
      'Asse 20 min.'
    ]
  },
  {
    id: 61,
    title: 'Mini wraps light',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '10 min',
    calories: 120,
    difficulty: 'fácil',
    icon: '🌯',
    tags: ['leve', 'prático', 'proteína'],
    ingredients: [
      'Folhas de alface',
      'Peito de peru',
      'Queijo cottage'
    ],
    instructions: [
      'Use folha de alface + peito de peru + cottage.'
    ]
  },
  {
    id: 62,
    title: 'Ovos cozidos temperados',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '15 min',
    calories: 140,
    difficulty: 'fácil',
    icon: '🥚',
    tags: ['proteína', 'prático', 'rápido'],
    ingredients: [
      '2 ovos',
      'Sal, pimenta e páprica'
    ],
    instructions: [
      'Cozinhe os ovos.',
      'Corte ao meio e coloque sal + pimenta + páprica.'
    ]
  },
  {
    id: 63,
    title: 'Bruschetta integral',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '15 min',
    calories: 150,
    difficulty: 'fácil',
    icon: '🍞',
    tags: ['italiano', 'integral', 'leve'],
    ingredients: [
      '2 fatias de pão integral',
      '1 tomate picado',
      'Manjericão e azeite'
    ],
    instructions: [
      'Torre pão integral.',
      'Cubra com tomate + manjericão + azeite.'
    ]
  },
  {
    id: 64,
    title: 'Mini pizza de berinjela',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '20 min',
    calories: 130,
    difficulty: 'fácil',
    icon: '🍕',
    tags: ['low carb', 'italiano', 'assado'],
    ingredients: [
      '1 berinjela',
      'Molho de tomate',
      'Queijo ralado'
    ],
    instructions: [
      'Fatie a berinjela.',
      'Cubra com molho e queijo.',
      'Asse 15 min.'
    ]
  },
  {
    id: 65,
    title: 'Torta fria de ricota',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '20 min',
    calories: 180,
    difficulty: 'médio',
    icon: '🥧',
    tags: ['frio', 'proteína', 'leve'],
    ingredients: [
      '1 xícara de ricota',
      '½ cenoura ralada',
      'Temperos',
      'Pão integral'
    ],
    instructions: [
      'Misture ricota + cenoura + temperos.',
      'Monte camadas no pão integral.'
    ]
  },
  {
    id: 66,
    title: 'Pastel de forno integral',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '35 min',
    calories: 220,
    difficulty: 'médio',
    icon: '🥟',
    tags: ['integral', 'assado', 'brasileiro'],
    ingredients: [
      'Massa integral',
      '100g frango desfiado',
      'Temperos'
    ],
    instructions: [
      'Recheie massa integral com frango.',
      'Asse até dourar.'
    ]
  },
  {
    id: 67,
    title: 'Bolinho de couve-flor',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '30 min',
    calories: 120,
    difficulty: 'fácil',
    icon: '🥦',
    tags: ['vegetariano', 'low carb', 'assado'],
    ingredients: [
      '1 xícara de couve-flor',
      '1 ovo',
      'Temperos'
    ],
    instructions: [
      'Misture couve-flor + ovo + temperos.',
      'Asse até dourar.'
    ]
  },
  {
    id: 68,
    title: 'Nuggets caseiros',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '25 min',
    calories: 190,
    difficulty: 'médio',
    icon: '🍗',
    tags: ['proteína', 'airfryer', 'kids'],
    ingredients: [
      '200g frango triturado',
      '½ xícara de aveia',
      'Temperos'
    ],
    instructions: [
      'Misture frango triturado + aveia + temperos.',
      'Airfryer 15 min.'
    ]
  },
  {
    id: 69,
    title: 'Pão integral recheado light',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '10 min',
    calories: 180,
    difficulty: 'fácil',
    icon: '🥪',
    tags: ['prático', 'integral', 'leve'],
    ingredients: [
      '2 fatias de pão integral',
      'Queijo cottage',
      '1 tomate',
      'Sal'
    ],
    instructions: [
      'Coloque cottage + tomate + sal no pão.'
    ]
  },
  {
    id: 70,
    title: 'Mini sanduíche de cottage',
    category: 'lanche-salgado',
    type: 'salgado',
    prepTime: '10 min',
    calories: 160,
    difficulty: 'fácil',
    icon: '🥪',
    tags: ['proteína', 'prático', 'leve'],
    ingredients: [
      'Pão integral',
      'Queijo cottage',
      'Peito de peru'
    ],
    instructions: [
      'Monte sanduíche com pão integral + cottage + peito de peru.'
    ]
  },

  // LANCHES DOCES (15 receitas)
  {
    id: 71,
    title: 'Gelatina natural com frutas',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '15 min + gelar',
    calories: 80,
    difficulty: 'fácil',
    icon: '🍮',
    tags: ['leve', 'refrescante', 'frutas'],
    ingredients: [
      '1 pacote de gelatina sem açúcar',
      'Frutas picadas'
    ],
    instructions: [
      'Prepare gelatina sem açúcar.',
      'Adicione frutas picadas.',
      'Leve à geladeira.'
    ]
  },
  {
    id: 72,
    title: 'Mousse fit de maracujá',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '20 min + gelar',
    calories: 120,
    difficulty: 'fácil',
    icon: '🍮',
    tags: ['cremoso', 'tropical', 'leve'],
    ingredients: [
      '1 xícara de iogurte natural',
      'Polpa de 1 maracujá',
      '1 envelope de gelatina sem sabor'
    ],
    instructions: [
      'Misture iogurte + maracujá + gelatina sem sabor.',
      'Leve à geladeira.'
    ]
  },
  {
    id: 73,
    title: 'Bolo de chocolate low carb',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '30 min',
    calories: 180,
    difficulty: 'médio',
    icon: '🍰',
    tags: ['low carb', 'chocolate', 'assado'],
    ingredients: [
      '2 ovos',
      '2 colheres de cacau',
      '½ xícara de aveia',
      'Adoçante'
    ],
    instructions: [
      'Misture ovo + cacau + aveia + adoçante.',
      'Asse 15–20 min.'
    ]
  },
  {
    id: 74,
    title: 'Pudim sem açúcar',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '50 min',
    calories: 150,
    difficulty: 'médio',
    icon: '🍮',
    tags: ['cremoso', 'clássico', 'fit'],
    ingredients: [
      '2 xícaras de leite desnatado',
      '2 ovos',
      'Adoçante'
    ],
    instructions: [
      'Bata leite desnatado + ovos + adoçante.',
      'Banho-maria 40 min.'
    ]
  },
  {
    id: 75,
    title: 'Banana assada com canela',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '15 min',
    calories: 100,
    difficulty: 'fácil',
    icon: '🍌',
    tags: ['frutas', 'simples', 'quentinho'],
    ingredients: [
      '1 banana',
      'Canela em pó'
    ],
    instructions: [
      'Corte a banana.',
      'Polvilhe canela.',
      'Leve ao forno 10 min.'
    ]
  },
  {
    id: 76,
    title: 'Bombom de uva fit',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '10 min + congelar',
    calories: 60,
    difficulty: 'fácil',
    icon: '🍇',
    tags: ['frutas', 'chocolate', 'gelado'],
    ingredients: [
      'Uvas',
      'Pasta de cacau 100%'
    ],
    instructions: [
      'Cubra uvas com pasta de cacau.',
      'Congele.'
    ]
  },
  {
    id: 77,
    title: 'Trufa proteica',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '15 min',
    calories: 140,
    difficulty: 'fácil',
    icon: '🍫',
    tags: ['proteína', 'chocolate', 'energético'],
    ingredients: [
      '1 scoop de whey',
      '1 colher de cacau',
      '1 colher de pasta de amendoim'
    ],
    instructions: [
      'Misture whey + cacau + pasta de amendoim.',
      'Modele bolinhas.'
    ]
  },
  {
    id: 78,
    title: 'Brownie fit',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '25 min',
    calories: 160,
    difficulty: 'fácil',
    icon: '🍫',
    tags: ['chocolate', 'assado', 'fit'],
    ingredients: [
      '2 colheres de cacau',
      '½ xícara de aveia',
      '1 banana'
    ],
    instructions: [
      'Misture cacau + aveia + banana.',
      'Asse 20 min.'
    ]
  },
  {
    id: 79,
    title: 'Biscoito de aveia',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '20 min',
    calories: 130,
    difficulty: 'fácil',
    icon: '🍪',
    tags: ['aveia', 'crocante', 'assado'],
    ingredients: [
      '1 xícara de aveia',
      '1 banana',
      '1 colher de cacau'
    ],
    instructions: [
      'Misture aveia + banana + cacau.',
      'Asse 15 min.'
    ]
  },
  {
    id: 80,
    title: 'Torta light de maçã',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '35 min',
    calories: 170,
    difficulty: 'médio',
    icon: '🍎',
    tags: ['frutas', 'assado', 'canela'],
    ingredients: [
      '2 maçãs',
      '½ xícara de aveia',
      'Canela'
    ],
    instructions: [
      'Misture maçã + aveia + canela.',
      'Asse 25 min.'
    ]
  },
  {
    id: 81,
    title: 'Sorbet de frutas',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '10 min',
    calories: 90,
    difficulty: 'fácil',
    icon: '🍨',
    tags: ['gelado', 'frutas', 'refrescante'],
    ingredients: [
      'Frutas congeladas (morango, manga, etc)'
    ],
    instructions: [
      'Congele fruta.',
      'Bata no processador.'
    ]
  },
  {
    id: 82,
    title: 'Geladinho proteico',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '10 min + congelar',
    calories: 100,
    difficulty: 'fácil',
    icon: '🧊',
    tags: ['proteína', 'gelado', 'refrescante'],
    ingredients: [
      '1 scoop de whey',
      'Água',
      'Frutas picadas'
    ],
    instructions: [
      'Misture whey + água + fruta.',
      'Congele em forminhas.'
    ]
  },
  {
    id: 83,
    title: 'Creme de cacau com banana congelada',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '10 min',
    calories: 120,
    difficulty: 'fácil',
    icon: '🍌',
    tags: ['gelado', 'chocolate', 'cremoso'],
    ingredients: [
      '1 banana congelada',
      '1 colher de cacau'
    ],
    instructions: [
      'Bata banana congelada + cacau no processador.'
    ]
  },
  {
    id: 84,
    title: 'Panqueca doce',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '15 min',
    calories: 150,
    difficulty: 'fácil',
    icon: '🥞',
    tags: ['chocolate', 'quentinho', 'prático'],
    ingredients: [
      '1 banana',
      '1 ovo',
      '1 colher de cacau'
    ],
    instructions: [
      'Misture banana + ovo + cacau.',
      'Faça panquecas pequenas.'
    ]
  },
  {
    id: 85,
    title: 'Iogurte gelado com mel',
    category: 'lanche-doce',
    type: 'doce',
    prepTime: '5 min',
    calories: 110,
    difficulty: 'fácil',
    icon: '🍯',
    tags: ['gelado', 'cremoso', 'prático'],
    ingredients: [
      '1 pote de iogurte natural',
      '1 colher de mel'
    ],
    instructions: [
      'Misture iogurte + mel.',
      'Leve ao freezer por 30 min.'
    ]
  },

  // BEBIDAS E SMOOTHIES (15 receitas)
  {
    id: 86,
    title: 'Suco detox verde',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 60,
    difficulty: 'fácil',
    icon: '🥬',
    tags: ['detox', 'verde', 'energético'],
    ingredients: [
      '2 folhas de couve',
      '1 limão',
      'Água',
      'Gengibre'
    ],
    instructions: [
      'Bata couve + limão + água + gengibre no liquidificador.'
    ]
  },
  {
    id: 87,
    title: 'Smoothie de frutas vermelhas',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 120,
    difficulty: 'fácil',
    icon: '🍓',
    tags: ['antioxidante', 'cremoso', 'frutas'],
    ingredients: [
      '½ xícara de morango',
      '½ xícara de amora',
      '½ xícara de iogurte natural',
      'Água'
    ],
    instructions: [
      'Bata morango + amora + iogurte + água.'
    ]
  },
  {
    id: 88,
    title: 'Limonada com chia',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 50,
    difficulty: 'fácil',
    icon: '🍋',
    tags: ['refrescante', 'hidratante', 'chia'],
    ingredients: [
      '2 limões',
      'Água',
      '1 colher de chia hidratada'
    ],
    instructions: [
      'Misture limão + água + chia hidratada.'
    ]
  },
  {
    id: 89,
    title: 'Água saborizada',
    category: 'bebida',
    type: 'bebida',
    prepTime: '5 min',
    calories: 20,
    difficulty: 'fácil',
    icon: '💧',
    tags: ['hidratante', 'refrescante', 'leve'],
    ingredients: [
      'Água',
      'Rodelas de laranja',
      'Hortelã'
    ],
    instructions: [
      'Coloque água + laranja + hortelã em uma jarra.',
      'Deixe na geladeira por 1 hora.'
    ]
  },
  {
    id: 90,
    title: 'Chá gelado termogênico',
    category: 'bebida',
    type: 'bebida',
    prepTime: '15 min',
    calories: 10,
    difficulty: 'fácil',
    icon: '🍵',
    tags: ['termogênico', 'gelado', 'energético'],
    ingredients: [
      'Chá verde',
      'Gelo',
      'Limão'
    ],
    instructions: [
      'Prepare chá verde.',
      'Adicione gelo + limão.'
    ]
  },
  {
    id: 91,
    title: 'Suco de abacaxi com hortelã',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 90,
    difficulty: 'fácil',
    icon: '🍍',
    tags: ['tropical', 'refrescante', 'digestivo'],
    ingredients: [
      '2 fatias de abacaxi',
      'Hortelã',
      'Água'
    ],
    instructions: [
      'Bata abacaxi + hortelã + água.'
    ]
  },
  {
    id: 92,
    title: 'Shake proteico',
    category: 'bebida',
    type: 'bebida',
    prepTime: '5 min',
    calories: 150,
    difficulty: 'fácil',
    icon: '🥤',
    tags: ['proteína', 'pós-treino', 'energético'],
    ingredients: [
      '1 scoop de whey',
      '200ml de leite vegetal',
      '½ banana'
    ],
    instructions: [
      'Bata whey + leite vegetal + banana.'
    ]
  },
  {
    id: 93,
    title: 'Suco de melancia detox',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 70,
    difficulty: 'fácil',
    icon: '🍉',
    tags: ['hidratante', 'detox', 'refrescante'],
    ingredients: [
      '2 fatias de melancia',
      'Gengibre',
      'Água'
    ],
    instructions: [
      'Bata melancia + gengibre + água.'
    ]
  },
  {
    id: 94,
    title: 'Smoothie tropical',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 130,
    difficulty: 'fácil',
    icon: '🥭',
    tags: ['tropical', 'cremoso', 'frutas'],
    ingredients: [
      '½ manga',
      '½ xícara de leite de coco',
      'Gelo'
    ],
    instructions: [
      'Bata manga + leite de coco + gelo.'
    ]
  },
  {
    id: 95,
    title: 'Água com gengibre',
    category: 'bebida',
    type: 'bebida',
    prepTime: '5 min',
    calories: 5,
    difficulty: 'fácil',
    icon: '💧',
    tags: ['termogênico', 'hidratante', 'simples'],
    ingredients: [
      'Água',
      'Fatias de gengibre'
    ],
    instructions: [
      'Coloque fatias de gengibre na água.',
      'Deixe descansar por 30 min.'
    ]
  },
  {
    id: 96,
    title: 'Suco antioxidante',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 100,
    difficulty: 'fácil',
    icon: '🫐',
    tags: ['antioxidante', 'energético', 'frutas'],
    ingredients: [
      '½ xícara de açaí sem açúcar',
      '½ xícara de morango',
      'Água'
    ],
    instructions: [
      'Bata açaí sem açúcar + morango + água.'
    ]
  },
  {
    id: 97,
    title: 'Café proteico gelado',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 120,
    difficulty: 'fácil',
    icon: '☕',
    tags: ['proteína', 'energético', 'gelado'],
    ingredients: [
      '1 xícara de café',
      '1 scoop de whey',
      'Gelo'
    ],
    instructions: [
      'Misture café + whey + gelo no liquidificador.'
    ]
  },
  {
    id: 98,
    title: 'Chocolate quente fit',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 110,
    difficulty: 'fácil',
    icon: '☕',
    tags: ['chocolate', 'quentinho', 'conforto'],
    ingredients: [
      '1 colher de cacau',
      '1 xícara de leite desnatado',
      'Adoçante'
    ],
    instructions: [
      'Aqueça cacau + leite desnatado + adoçante.'
    ]
  },
  {
    id: 99,
    title: 'Chá calmante noturno',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 5,
    difficulty: 'fácil',
    icon: '🍵',
    tags: ['relaxante', 'noturno', 'natural'],
    ingredients: [
      'Camomila',
      'Mel (opcional)'
    ],
    instructions: [
      'Prepare chá de camomila.',
      'Adicione mel se desejar.'
    ]
  },
  {
    id: 100,
    title: 'Limonada suíça light',
    category: 'bebida',
    type: 'bebida',
    prepTime: '10 min',
    calories: 40,
    difficulty: 'fácil',
    icon: '🍋',
    tags: ['refrescante', 'cremoso', 'clássico'],
    ingredients: [
      '2 limões',
      'Água gelada',
      'Adoçante',
      'Leite condensado light (opcional)'
    ],
    instructions: [
      'Bata limão + água gelada + adoçante.',
      'Adicione um pouco de leite condensado light se desejar.'
    ]
  }
];

export function RecipesTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const categories = [
    { id: 'all', label: 'Todas', icon: '🍽️' },
    { id: 'cafe', label: 'Café', icon: '☕' },
    { id: 'almoco', label: 'Almoço', icon: '🍱' },
    { id: 'jantar', label: 'Jantar', icon: '🍽️' },
    { id: 'lanche-salgado', label: 'Lanches', icon: '🥪' },
    { id: 'lanche-doce', label: 'Doces', icon: '🍰' },
    { id: 'bebida', label: 'Bebidas', icon: '🥤' },
  ];

  const types = [
    { id: 'all', label: 'Todos' },
    { id: 'doce', label: 'Doces' },
    { id: 'salgado', label: 'Salgados' },
    { id: 'bebida', label: 'Bebidas' },
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesType = selectedType === 'all' || recipe.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  if (selectedRecipe) {
    return (
      <div className="p-4 space-y-6">
        {/* Header com botão voltar */}
        <div className="pt-4">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4 hover:underline"
          >
            ← Voltar
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{selectedRecipe.icon}</div>
            <div>
              <h1 className="text-3xl font-bold">{selectedRecipe.title}</h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedRecipe.prepTime}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  {selectedRecipe.calories} kcal
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedRecipe.difficulty === 'fácil' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  selectedRecipe.difficulty === 'médio' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {selectedRecipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {selectedRecipe.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Ingredientes */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-purple-600" />
            Ingredientes
          </h2>
          <ul className="space-y-2">
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modo de Preparo */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="font-bold text-xl mb-4">Modo de Preparo</h2>
          <ol className="space-y-3">
            {selectedRecipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="pt-1">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Receitas Saudáveis</h1>
        <p className="text-muted-foreground">
          Mais de 100 receitas deliciosas e nutritivas 🍽️
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar receitas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedType === type.id
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Recipe Cards */}
      <div className="grid gap-4">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma receita encontrada 😔</p>
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{recipe.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {recipe.calories} kcal
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        recipe.difficulty === 'fácil' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        recipe.difficulty === 'médio' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
