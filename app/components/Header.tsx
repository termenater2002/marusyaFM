import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        AI SPACE
      </div>
      
      <nav className="nav-links">
        <Link href="/" className="nav-link">
          ВСЕ НЕЙРОСЕТИ
        </Link>
        <Link href="/favorites" className="nav-link">
          МОИ ИЗБРАННЫЕ
        </Link>
        <Link href="/login">
          <button className="btn">ВОЙТИ</button>
        </Link>
      </nav>
    </header>
  );
}
