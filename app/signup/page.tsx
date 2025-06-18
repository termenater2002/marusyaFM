"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Проверка полей
    if (!email || !password || !confirmPassword) {
      setError("Заполните все поля");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    
    // Заглушка регистрации - перенаправление на главную
    console.log("Регистрация:", email);
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
              {error && error.includes("существует") && <p className="error-text">{error}</p>}
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
            
            <div className="form-group">
              <label htmlFor="confirm-password">Подтвердите пароль</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
              {error && error.includes("Пароли") && <p className="error-text">{error}</p>}
            </div>
            
            <button type="submit" className="btn login-btn">
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
          </form>
          
          <div className="signup-link">
            <p>УЖЕ ЗАРЕГИСТРИРОВАНЫ? <Link href="/login" className="accent-link">ВОЙТИ</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
