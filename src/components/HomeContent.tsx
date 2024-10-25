"use client";
import React, { useState } from "react";

import StoreCard from "@/components/StoreCard";

export default function HomeContent() {
  const [cards, setCards] = useState<number[]>([0]);

  const addNewCard = () => {
    setCards([...cards, cards.length]);
  };

  return (
    <>
      {cards.map((_, index) => (
        <StoreCard key={index} onSubmit={addNewCard} />
      ))}
    </>
  );
}
