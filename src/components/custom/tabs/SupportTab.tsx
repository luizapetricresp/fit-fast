'use client';

import { useState } from 'react';
import { Mail, Send, MessageCircle, CheckCircle } from 'lucide-react';

export function SupportTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar link mailto com os dados do formulário
    const subject = encodeURIComponent(`Suporte FitFast - ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);
    const mailtoLink = `mailto:fitfast.contato@gmail.com?subject=${subject}&body=${body}`;
    
    // Abrir cliente de email
    window.location.href = mailtoLink;
    
    // Mostrar mensagem de sucesso
    setSubmitted(true);
    
    // Resetar formulário após 3 segundos
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-2">Suporte</h1>
        <p className="text-muted-foreground">
          Estamos aqui para ajudar você! 💬
        </p>
      </div>

      {/* Contact Info Card */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Entre em Contato</h2>
            <p className="text-white/90 text-sm">Responderemos em breve</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm text-white/80 mb-2">Email de Suporte:</p>
          <a 
            href="mailto:fitfast.contato@gmail.com"
            className="text-lg font-bold hover:underline flex items-center gap-2"
          >
            fitfast.contato@gmail.com
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="w-6 h-6 text-purple-600" />
          <h2 className="font-bold text-xl">Envie sua Mensagem</h2>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-bold text-xl mb-2">Mensagem Enviada!</h3>
            <p className="text-muted-foreground">
              Seu cliente de email foi aberto. Envie a mensagem para entrar em contato conosco.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu.email@exemplo.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder="Descreva sua dúvida ou problema..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-5 h-5" />
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="font-bold text-xl mb-4">Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-bold mb-2">Como funciona o plano personalizado?</h3>
            <p className="text-sm text-muted-foreground">
              Nosso sistema cria um plano baseado em suas respostas do questionário inicial, incluindo treinos e dieta personalizados.
            </p>
          </div>
          <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-bold mb-2">Posso modificar meu plano?</h3>
            <p className="text-sm text-muted-foreground">
              Sim! Você pode redefinir seu plano a qualquer momento na aba "Meu" clicando em "Redefinir Plano".
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Como acompanhar meu progresso?</h3>
            <p className="text-sm text-muted-foreground">
              Na aba "Meu" você encontra gráficos de evolução de peso e pode registrar suas medidas regularmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
