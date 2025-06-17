"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import AICard from "./components/AICard";
import { aiData, categories } from "./data/ai";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [sortBy, setSortBy] = useState("rating");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Filter AIs by category
  const filteredAI =
    selectedCategory === 1
      ? aiData
      : aiData.filter((ai) =>
          ai.tags.some((tag) => tag.id === selectedCategory - 1)
        );

  // Sort AIs by selected criteria
  const sortedAI = [...filteredAI].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-6">
            Все Нейросети ({aiData.length})
          </h1>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="dropdown-click">
              <button className="filter-button" onClick={toggleSortDropdown}>
                СОРТИРОВАТЬ ПО{" "}
                {sortBy === "rating" ? "РЕЙТИНГУ" : "ИМЕНИ"} <span>▼</span>
              </button>
              {isSortDropdownOpen && (
                <div className="dropdown-content-click">
                  <button
                    className={`dropdown-item ${
                      sortBy === "rating" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSortBy("rating");
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    По рейтингу
                  </button>
                  <button
                    className={`dropdown-item ${
                      sortBy === "name" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSortBy("name");
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    По имени
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAI.map((ai) => (
              <AICard
                key={ai.id}
                id={ai.id}
                name={ai.name}
                image={ai.image}
                tags={ai.tags}
                rating={ai.rating}
                description={ai.description}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

