import Image from 'next/image';
import Link from 'next/link';

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
}

export default function AICard({ id, name, image, tags, rating, description }: AICardProps) {
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
          <button className="filter-button">ДОБАВИТЬ В ИЗБРАННОЕ</button>
        </div>
      </div>
    </div>
  );
}
