import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Tag {
  id: number;
  name: string;
}

interface AICardProps {
  id: number;
  name: string;
  image: string;
  tags: Tag[];
  rating: number;
  description: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export default function AICard({ 
  id, 
  name, 
  image, 
  tags, 
  rating, 
  description, 
  isFavorite: propIsFavorite,
  onFavoriteToggle 
}: AICardProps) {
  // Состояние для отслеживания избранного
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Синхронизируем с пропсами или localStorage при монтировании
  useEffect(() => {
    if (propIsFavorite !== undefined) {
      setIsFavorite(propIsFavorite);
    } else {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(id));
    }
  }, [id, propIsFavorite]);
  
  // Функция для переключения избранного
  const toggleFavorite = () => {
    // Если есть callback от родителя, используем его
    if (onFavoriteToggle) {
      onFavoriteToggle();
      return;
    }
    
    // Иначе обрабатываем сами
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter((favId: number) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      <div className="relative h-64 w-full">
        <Image 
          src={image} 
          alt={name} 
          fill 
          style={{objectFit: 'cover'}} 
          className="card-image"
        />
      </div>
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <div className="flex flex-wrap mb-2">
          {tags.map((tag) => (
            <span key={tag.id} className="tag">{tag.name}</span>
          ))}
        </div>
        <div className="mb-3">
          <span className="rating">
            <span className="mr-1">⭐</span> {rating.toFixed(1)}
          </span>
        </div>
        <p className="card-description">{description}</p>
        <div className="card-actions">
          <Link href={`/ai/${id}`}>
            <button className="filter-button">ДЕТАЛИ</button>
          </Link>
          <button 
            className={`filter-button favorite-button ${isFavorite ? 'favorite-active' : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? 'УБРАТЬ ИЗ ИЗБРАННОГО' : 'ДОБАВИТЬ В ИЗБРАННОЕ'}
          </button>
        </div>
      </div>
    </div>
  );
}
