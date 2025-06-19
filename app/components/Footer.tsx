"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Theme = 'light' | 'dark' | 'system';

export default function Footer() {
  const [theme, setTheme] = useState<Theme>('system');
  
  // Установка темы при загрузке и при изменении
  useEffect(() => {
    // Получаем сохраненную тему из localStorage, если она есть
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Если нет сохраненной темы, используем системную
      setTheme('system');
      applyTheme('system');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Удаляем все предыдущие классы тем
    root.classList.remove('theme-light', 'theme-dark');
    
    // Применяем новую тему
    if (newTheme === 'light') {
      root.classList.add('theme-light');
    } else if (newTheme === 'dark') {
      root.classList.add('theme-dark');
    } else {
      // Если тема 'system', определяем по предпочтениям пользователя
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
    }
    
    // Сохраняем выбор в localStorage
    localStorage.setItem('theme', newTheme);
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <footer className="footer">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="theme-selector mb-4 md:mb-0">
            <span className="theme-label">Тема:</span>
            <div className="theme-buttons">
              <button 
                onClick={() => changeTheme('light')} 
                className={`theme-button ${theme === 'light' ? 'active' : ''}`}
                aria-label="Светлая тема"
              >
                Светлая
              </button>
              <button 
                onClick={() => changeTheme('system')} 
                className={`theme-button ${theme === 'system' ? 'active' : ''}`}
                aria-label="Системная тема"
              >
                Авто
              </button>
              <button 
                onClick={() => changeTheme('dark')} 
                className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
                aria-label="Темная тема"
              >
                Тёмная
              </button>
            </div>
          </div>
          
          <div className="contact-info text-center md:text-right">
            <p className="mb-1">© 2025 AI SPACE</p>
            <div className="contact-links">
              <a href="mailto:termenater2005@yandex.ru" className="contact-link">
                Email
              </a>
              <a href="https://github.com/termenater2002" target="_blank" rel="noopener noreferrer" className="contact-link">
                GitHub
              </a>
              <a href="https://t.me/termenater" target="_blank" rel="noopener noreferrer" className="contact-link">
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
