import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="logo">
        <Image 
          src="/logo.svg" 
          alt="AI Space" 
          width={30} 
          height={30} 
          className="mr-2"
        />
        <span className="hidden sm:inline">AI SPACE</span>
      </Link>
      
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
