"use client";
import React, { useState } from "react";
import StoreCard from "@/components/StoreCard";

export default function Home() {
  const [cards, setCards] = useState<number[]>([0]);

  const addNewCard = () => {
    setCards([...cards, cards.length]);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center gap-6">
        {cards.map((_, index) => (
          <StoreCard key={index} onSubmit={addNewCard} />
        ))}
      </div>
    </>
  );
}
