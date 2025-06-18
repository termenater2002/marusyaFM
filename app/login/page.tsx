"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика аутентификации
    // Для демонстрации просто проверим, что поля не пустые
    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }
    
    // Заглушка успешного входа - перенаправление на главную страницу
    console.log("Вход выполнен:", email);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="logo-header">
        <Link href="/">
          <div className="logo">
            <Image 
              src="/logo.svg" 
              alt="AI Space" 
              width={30} 
              height={30} 
              className="mr-2" 
            />
            AI SPACE
          </div>
        </Link>
      </div>

      <div className="flex flex-grow items-center justify-center">
        <div className="login-container">
          <div className="logo-center">
            <div className="logo">
              <Image 
                src="/logo.svg" 
                alt="AI Space" 
                width={42} 
                height={42} 
                className="mr-2" 
              />
              AI SPACE
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              {error && <p className="error-text">Неверный email или пароль</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>
            
            <button type="submit" className="btn login-btn">
              ВОЙТИ
            </button>
          </form>
          
          <div className="signup-link">
            <p>НЕТ АККАУНТА? <Link href="/signup" className="accent-link">ЗАРЕГИСТРИРОВАТЬСЯ</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
