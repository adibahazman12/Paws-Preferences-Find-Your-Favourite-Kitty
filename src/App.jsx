import { useState } from "react";
import CatCard from "./CatCard";
import Summary from "./Summary";

export default function App() {
  const [cats] = useState(
    Array.from({ length: 15 }, () => `https://cataas.com/cat?${Math.random()}`)
  );
  const [likedCats, setLikedCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "right") setLikedCats([...likedCats, cats[currentIndex]]);
    setCurrentIndex(currentIndex + 1);
  };

  const restart = () => {
    setCurrentIndex(0);
    setLikedCats([]);
  };

  // Buat 10 floating emoji kucing untuk background
  const floatingEmojis = Array.from({ length: 10 }).map((_, i) => (
    <div
      key={i}
      className="pouring-emoji"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    >
      🐱
    </div>
  ));

  return (
    <div className="app-wrapper">
      {/* Floating kucing background */}
      {floatingEmojis}

      {/* Header utama */}
      <div className="header-title">Swipe right for purr-fect match !</div>

      {/* Kotak utama card */}
      <div className="app-container">
        {currentIndex < cats.length ? (
          <div className="card-stack">
            {cats
              .slice(currentIndex)
              .map((cat, i) => (
                <CatCard
                  key={cat}
                  cat={cat}
                  onSwipe={handleSwipe}
                  stackIndex={i}
                />
              ))
              .reverse()}
          </div>
        ) : (
          <Summary likedCats={likedCats} restart={restart} />
        )}
      </div>
    </div>
  );
}
