"use client";
import React, { useState } from "react";

import StoreCard from "@/components/StoreCard";

export default function HomeContent() {
  const [cards, setCards] = useState<number[]>([0]);
  const [syncedObjects, setSyncedObjects] = useState<string[]>([]);

  const addNewCard = (objects: string[]) => {
    setCards([...cards, cards.length]);
    setSyncedObjects(objects);
  };

  return (
    <>
      {cards.map((_, index) => (
        <StoreCard
          key={index}
          onSubmit={addNewCard}
          syncedObjects={index === 0 ? [] : syncedObjects}
        />
      ))}
    </>
  );
}
