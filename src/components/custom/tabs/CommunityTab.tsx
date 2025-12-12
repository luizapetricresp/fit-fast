'use client';

import { useState, useEffect } from 'react';
import { Send, Heart, MessageCircle, TrendingUp } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: Date;
  liked: boolean;
}

export function CommunityTab() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  // Carrega comentários do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('community-comments');
    if (saved) {
      const parsed = JSON.parse(saved);
      setComments(parsed.map((c: any) => ({ ...c, timestamp: new Date(c.timestamp) })));
    } else {
      // Comentários iniciais de exemplo
      const initialComments: Comment[] = [
        {
          id: '1',
          author: 'Maria Silva',
          avatar: '👩',
          content: 'Completei meu primeiro mês de treinos! Perdi 3kg e estou me sentindo incrível! 💪',
          likes: 24,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          liked: false
        },
        {
          id: '2',
          author: 'João Santos',
          avatar: '👨',
          content: 'Alguém mais está fazendo o desafio de 30 dias? Estou no dia 15 e não vou desistir!',
          likes: 18,
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          liked: false
        },
        {
          id: '3',
          author: 'Ana Costa',
          avatar: '👩‍🦰',
          content: 'Dica: experimentem fazer o treino pela manhã! Mudou completamente minha energia durante o dia ☀️',
          likes: 31,
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          liked: false
        },
        {
          id: '4',
          author: 'Pedro Lima',
          avatar: '👨‍🦱',
          content: 'Consegui fazer 20 flexões seguidas hoje! Quando comecei mal conseguia 5. Progresso! 🔥',
          likes: 42,
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          liked: false
        },
        {
          id: '5',
          author: 'Carla Mendes',
          avatar: '👩‍🦳',
          content: 'Quem mais ama treinar em casa? Economia de tempo e dinheiro! 🏠',
          likes: 15,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          liked: false
        }
      ];
      setComments(initialComments);
      localStorage.setItem('community-comments', JSON.stringify(initialComments));
    }
  }, []);

  const handlePostComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Você',
        avatar: '😊',
        content: newComment,
        likes: 0,
        timestamp: new Date(),
        liked: false
      };
      
      const updated = [comment, ...comments];
      setComments(updated);
      localStorage.setItem('community-comments', JSON.stringify(updated));
      setNewComment('');
    }
  };

  const handleLike = (id: string) => {
    const updated = comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    });
    setComments(updated);
    localStorage.setItem('community-comments', JSON.stringify(updated));
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    return 'Agora';
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Comunidade</h1>
        <p className="text-muted-foreground">
          Compartilhe seu progresso e inspire outros! 🌟
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/90 text-sm mb-1">Membros ativos</p>
            <p className="text-3xl font-bold">2.847</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-2xl font-bold">+12%</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm text-white/90">
            💬 {comments.length} posts de progresso esta semana
          </p>
        </div>
      </div>

      {/* Post Input */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold text-lg mb-3">Compartilhe seu progresso</h3>
        <div className="flex gap-3">
          <div className="text-4xl">😊</div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Como foi seu treino hoje? Compartilhe suas conquistas..."
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={3}
            />
            <button
              onClick={handlePostComment}
              disabled={!newComment.trim()}
              className="mt-3 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Publicar
            </button>
          </div>
        </div>
      </div>

      {/* Comments Feed */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Feed da Comunidade</h3>
        
        {comments.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-muted-foreground">Seja o primeiro a compartilhar seu progresso!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-start gap-3">
                <div className="text-4xl">{comment.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-bold">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(comment.timestamp)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
                        comment.liked
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${comment.liked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{comment.likes}</span>
                    </button>
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
