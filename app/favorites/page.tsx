"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AICard from "../components/AICard";
import { aiData } from "../data/ai";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);

  // Загружаем избранное из localStorage при запуске
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    setFavorites(initialFavorites);
    
    // Получаем данные нейросетей по ID из избранного
    const items = aiData.filter(ai => initialFavorites.includes(ai.id));
    setFavoriteItems(items);
  }, []);

  // Функция для удаления из избранного
  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter(favId => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // Обновляем список отображаемых элементов
    setFavoriteItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-6">
          Мои избранные нейросети ({favoriteItems.length})
        </h1>

        {favoriteItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteItems.map((ai) => (
              <AICard
                key={ai.id}
                id={ai.id}
                name={ai.name}
                image={ai.image}
                tags={ai.tags}
                rating={ai.rating}
                description={ai.description}
                isFavorite={true}
                onFavoriteToggle={() => removeFromFavorites(ai.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-favorites">
            <p className="text-center text-lg">
              У вас пока нет избранных нейросетей. Добавьте их из{" "}
              <a href="/" className="accent-link">
                каталога
              </a>.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
