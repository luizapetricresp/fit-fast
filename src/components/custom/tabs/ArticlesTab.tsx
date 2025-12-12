'use client';

import { useState } from 'react';
import { BookOpen, Clock, ArrowLeft } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
  readTime: string;
  icon: string;
  content: string[];
}

const articles: Article[] = [
  {
    id: 1,
    title: '10 Dicas para Manter a Motivação',
    category: 'Motivação',
    readTime: '5 min',
    icon: '📖',
    content: [
      'Manter-se motivado não é apenas uma questão de força de vontade — é uma habilidade que pode ser treinada. A motivação oscila naturalmente, mas com algumas estratégias simples, você pode criar um ambiente interno e externo que favoreça a constância. Aqui estão 10 dicas práticas que realmente funcionam.',
      '',
      '1. Defina metas claras e realistas',
      'Objetivos vagos geram desânimo. Transforme "quero melhorar" em "vou treinar 3x por semana" ou "vou perder 2 kg em um mês". Clareza cria foco.',
      '',
      '2. Divida grandes metas em pequenas etapas',
      'Metas muito grandes parecem inalcançáveis. Quebre-as em microtarefas e comemore cada avanço.',
      '',
      '3. Use lembretes visuais',
      'Frases motivacionais, fotos, checklists e até o papel de parede do celular ajudam a manter sua mente alinhada com seus objetivos.',
      '',
      '4. Crie uma rotina fixa',
      'A motivação sobe e desce, mas a rotina te mantém firme mesmo nos dias ruins. Transforme o hábito em padrão.',
      '',
      '5. Cerque-se de pessoas que incentivam',
      'Energia é contagiosa. Amigos, familiares e até comunidades online podem ser combustível para sua jornada.',
      '',
      '6. Monitore seu progresso',
      'Registrar peso, medidas, treinos ou conquistas cria uma sensação de evolução — e evolução motiva.',
      '',
      '7. Torne o processo prazeroso',
      'Experimente treinos diferentes, músicas novas, locais variados. O corpo responde melhor quando a mente está envolvida.',
      '',
      '8. Recompense-se',
      'Comemore objetivos atingidos com pequenos presentes: uma roupa nova, um dia de descanso, um passeio.',
      '',
      '9. Aceite dias ruins sem culpa',
      'Falta de motivação não é fracasso — é humano. O importante é voltar.',
      '',
      '10. Visualize o resultado final',
      'Imagine-se alcançando a meta. A visualização fortalece a disciplina e ajuda a manter o caminho nos momentos difíceis.'
    ]
  },
  {
    id: 2,
    title: 'Nutrição Pré e Pós-Treino',
    category: 'Nutrição',
    readTime: '7 min',
    icon: '🥗',
    content: [
      'A alimentação antes e depois do treino é decisiva para seu desempenho, sua recuperação e seus resultados. Seja para ganhar massa, perder gordura ou melhorar a performance, entender o que comer — e quando comer — faz toda a diferença.',
      '',
      'Por que o pré-treino é importante?',
      'Ele fornece energia, evita fadiga precoce e melhora o rendimento. Sem um bom pré-treino, seu corpo recorre a músculos para fazer energia, prejudicando seu progresso.',
      '',
      'O que comer no pré-treino?',
      'O ideal é combinar carboidratos + proteínas leves.',
      '',
      'Boas opções:',
      '• Banana com aveia',
      '• Pão integral com ovo',
      '• Iogurte com frutas',
      '• Batata-doce',
      '• Shake leve com proteína e carboidratos complexos',
      '',
      'Quanto tempo antes comer?',
      '• 1 a 2 horas antes: refeição maior, com carboidratos complexos.',
      '• 20 a 40 minutos antes: snacks leves (frutas, barras, iogurte).',
      '',
      'Por que o pós-treino é essencial?',
      'Durante o treino, você gera microlesões nos músculos e consome energia. O pós-treino serve para reparar, repor e recuperar.',
      '',
      'O que comer no pós-treino?',
      'A combinação ideal é proteínas de rápida absorção + carboidratos.',
      '',
      'Exemplos:',
      '• Whey protein + fruta',
      '• Frango com arroz',
      '• Omelete com pão integral',
      '• Iogurte natural com mel',
      '',
      'E as gorduras?',
      'Podem estar presentes, mas em pequenas quantidades, já que retardam a digestão. Guarde refeições mais gordurosas para outros horários.',
      '',
      'Hidratação, o fator esquecido',
      'Durante o treino, você perde líquido e minerais. É essencial repor:',
      '• Água',
      '• Água de coco',
      '• Isotônicos (em treinos intensos)',
      '',
      'Sugestão prática de cardápios',
      '',
      'Pré-treino (rápido)',
      '🍌 Banana + 1 colher de pasta de amendoim',
      '',
      'Pré-treino (com tempo)',
      '🍠 Batata-doce + frango',
      '',
      'Pós-treino imediato',
      '🥤 Shake de whey protein',
      '',
      'Pós-treino completo',
      '🍚 Arroz + carne magra + legumes'
    ]
  },
  {
    id: 3,
    title: 'Como Evitar Lesões no Treino',
    category: 'Saúde',
    readTime: '6 min',
    icon: '🩹',
    content: [
      'Lesões podem te afastar dos treinos por semanas — ou meses. A boa notícia é que a maioria delas pode ser evitada com cuidados simples no dia a dia de treino.',
      '',
      '1. Aquecimento é obrigatório',
      'De 5 a 10 minutos elevam a temperatura corporal e aumentam a mobilidade. Pode ser caminhada, bicicleta leve ou movimentos articulares.',
      '',
      '2. Priorize a técnica sobre a carga',
      'Levantar mais peso não significa treinar melhor. A má execução é a principal causa de lesões em academias. Comece leve, aprenda o movimento e só então evolua.',
      '',
      '3. Aumente a carga gradualmente',
      'O corpo precisa de adaptação. O ideal é progredir entre 2% e 10% por semana, dependendo da sua experiência.',
      '',
      '4. Respeite os intervalos de descanso',
      'Músculos crescem e recuperam fora do treino. Dormir bem e descansar entre séries e dias é crucial.',
      '',
      '5. Cuide da mobilidade e flexibilidade',
      'Treinos de alongamento, liberação miofascial ou yoga ajudam a melhorar a amplitude de movimento e reduzem tensões.',
      '',
      '6. Use calçados e equipamentos adequados',
      'Um tênis errado pode gerar dores no joelho, canelite e até lesões de impacto.',
      '',
      '7. Mantenha uma boa alimentação',
      'Falta de nutrientes deixa músculos e tendões mais vulneráveis. Priorize proteína, carboidratos e hidratação adequada.',
      '',
      '8. Escute o seu corpo',
      'Dor aguda não é normal. Se sentir incômodo persistente, reduza a carga ou procure orientação profissional.',
      '',
      '9. Faça treinos complementares',
      'Fortalecer o core, trabalhar equilíbrio e musculaturas auxiliares protege articulações e melhora estabilidade.',
      '',
      '10. Tenha acompanhamento profissional',
      'Um treinador ajusta carga, postura, técnica e intensidade — e isso reduz drasticamente o risco de lesões.'
    ]
  },
  {
    id: 4,
    title: 'Benefícios do Treino em Jejum',
    category: 'Treino',
    readTime: '5 min',
    icon: '⏰',
    content: [
      'O treino em jejum tem ganhado popularidade, mas será que é para você?',
      'O QUE É:',
      'Treinar em jejum significa exercitar-se sem ter comido por 8-12 horas, geralmente pela manhã.',
      '',
      'POSSÍVEIS BENEFÍCIOS:',
      '• Maior oxidação de gordura como fonte de energia',
      '• Melhora na sensibilidade à insulina',
      '• Aumento da produção de hormônio do crescimento',
      '• Pode acelerar a perda de gordura',
      '',
      'CUIDADOS IMPORTANTES:',
      '• Não é recomendado para iniciantes',
      '• Evite treinos muito intensos em jejum',
      '• Hidrate-se bem antes e durante',
      '• Comece gradualmente',
      '',
      'QUEM DEVE EVITAR:',
      '• Pessoas com diabetes',
      '• Quem tem histórico de hipoglicemia',
      '• Gestantes e lactantes',
      '• Quem busca ganho de massa muscular',
      '',
      'RECOMENDAÇÕES:',
      'Se decidir treinar em jejum, comece com atividades leves como caminhada. Observe como seu corpo reage e ajuste conforme necessário.',
      '',
      'CONCLUSÃO:',
      'O treino em jejum pode funcionar para algumas pessoas, mas não é obrigatório para perder peso. O mais importante é encontrar o que funciona melhor para você!'
    ]
  },
  {
    id: 5,
    title: 'Importância do Sono para Resultados',
    category: 'Saúde',
    readTime: '6 min',
    icon: '😴',
    content: [
      'Você sabia que o sono é tão importante quanto treino e alimentação para seus resultados?',
      'POR QUE O SONO É CRUCIAL:',
      '• É durante o sono que os músculos se recuperam e crescem',
      '• Regula hormônios importantes como testosterona e cortisol',
      '• Melhora o desempenho físico e mental',
      '• Controla o apetite e metabolismo',
      '',
      'QUANTO DORMIR:',
      '• Adultos: 7-9 horas por noite',
      '• Atletas: 8-10 horas',
      '• Qualidade é tão importante quanto quantidade',
      '',
      'DICAS PARA MELHORAR O SONO:',
      '• Mantenha horários regulares para dormir e acordar',
      '• Evite telas 1 hora antes de dormir',
      '• Deixe o quarto escuro, silencioso e fresco',
      '• Evite cafeína após 14h',
      '• Não treine muito próximo da hora de dormir',
      '• Faça um ritual relaxante antes de dormir',
      '',
      'SINAIS DE SONO INSUFICIENTE:',
      '• Fadiga constante',
      '• Dificuldade de concentração',
      '• Aumento do apetite',
      '• Recuperação lenta dos treinos',
      '• Irritabilidade',
      '',
      'IMPACTO NOS RESULTADOS:',
      'Estudos mostram que dormir menos de 6 horas pode reduzir em até 60% os ganhos musculares e aumentar o acúmulo de gordura.',
      '',
      'CONCLUSÃO:',
      'Priorize seu sono! É um dos pilares fundamentais para alcançar seus objetivos fitness.'
    ]
  },
  {
    id: 6,
    title: 'Hidratação: Mais Importante do que Você Pensa',
    category: 'Saúde',
    readTime: '5 min',
    icon: '💧',
    content: [
      'A água é essencial para praticamente todas as funções do corpo, especialmente para quem treina.',
      'POR QUE HIDRATAR:',
      '• Regula temperatura corporal',
      '• Transporta nutrientes',
      '• Lubrifica articulações',
      '• Melhora desempenho físico',
      '• Acelera recuperação',
      '',
      'QUANTO BEBER:',
      '• Fórmula básica: 35ml por kg de peso',
      '• Exemplo: pessoa de 70kg = 2,45 litros por dia',
      '• Aumente em dias de treino e calor',
      '',
      'SINAIS DE DESIDRATAÇÃO:',
      '• Sede (já é sinal de desidratação leve)',
      '• Urina escura',
      '• Fadiga',
      '• Dor de cabeça',
      '• Tontura',
      '',
      'HIDRATAÇÃO NO TREINO:',
      'Antes: 400-600ml 2 horas antes',
      'Durante: 150-250ml a cada 15-20 minutos',
      'Depois: Reponha 150% do peso perdido',
      '',
      'DICAS PRÁTICAS:',
      '• Tenha sempre uma garrafa de água por perto',
      '• Beba água ao acordar',
      '• Adicione frutas para variar o sabor',
      '• Use apps para lembrar de beber água',
      '• Coma alimentos ricos em água (melancia, pepino)',
      '',
      'MITOS:',
      '❌ "Só beba quando sentir sede" - Sede já indica desidratação',
      '❌ "Café e chá não contam" - Contam sim, mas prefira água pura',
      '❌ "8 copos é suficiente para todos" - Varia conforme peso e atividade',
      '',
      'CONCLUSÃO:',
      'Mantenha-se hidratado! É simples, gratuito e faz toda diferença nos seus resultados.'
    ]
  }
];

export function ArticlesTab() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return (
      <div className="p-4 space-y-6">
        {/* Header com botão voltar */}
        <div className="pt-4">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-4 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{selectedArticle.icon}</div>
            <div>
              <h1 className="text-3xl font-bold">{selectedArticle.title}</h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                  {selectedArticle.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedArticle.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="prose dark:prose-invert max-w-none">
            {selectedArticle.content.map((paragraph, index) => {
              // Linha vazia = espaçamento
              if (paragraph === '') {
                return <div key={index} className="h-4" />;
              }
              
              // Títulos em maiúsculas ou que terminam com ":"
              if (paragraph.match(/^[A-ZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞŸ\s]+:?$/) || paragraph.endsWith(':')) {
                return (
                  <h3 key={index} className="font-bold text-xl mt-6 mb-3 text-purple-600 dark:text-purple-400">
                    {paragraph}
                  </h3>
                );
              }
              
              // Itens com bullet point
              if (paragraph.startsWith('•')) {
                return (
                  <p key={index} className="ml-4 mb-2 text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                );
              }
              
              // Itens numerados
              if (paragraph.match(/^\d+\./)) {
                return (
                  <p key={index} className="font-semibold mb-2 mt-4 text-gray-900 dark:text-gray-100">
                    {paragraph}
                  </p>
                );
              }
              
              // Parágrafos normais
              return (
                <p key={index} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Artigos</h1>
        <p className="text-muted-foreground">
          Aprenda mais sobre fitness e saúde 📚
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">{article.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Clique para ler o artigo completo
                </p>
              </div>
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
