"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type StoreCardProps = {
  onSubmit: () => void;
};

export default function StoreCard({ onSubmit }: StoreCardProps) {
  const [store, setStore] = useState<string>("");
  const [tempStore, setTempStore] = useState<string>("");
  const [objectInput, setObjectInput] = useState<string>("");
  const [valueInput, setValueInput] = useState<string>("");
  const [items, setItems] = useState<
    { object: string; value: string; isDisabled: boolean }[]
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempStore(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setStore(tempStore);
    }
  };

  const handleAddItem = () => {
    if (!objectInput || !valueInput) return;
    setItems([
      ...items,
      { object: objectInput, value: valueInput, isDisabled: true },
    ]);
    setObjectInput("");
    setValueInput("");
  };

  const handleRemoveItem = () => {
    if (items.length === 0) return;
    const newItems = [...items];
    newItems.pop();
    setItems(newItems);
  };

  const handleNextStore = () => {
    onSubmit();
  };

  return (
    <>
      <Card className="flex w-1/6 flex-col items-center justify-center gap-3 p-3">
        {!store ? (
          <>
            <Input
              placeholder="Enter store name"
              value={tempStore}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold">{store}</h1>
            <div>
              <div className="flex flex-col gap-3">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Input value={item.object} disabled placeholder="object" />
                    <Input value={item.value} disabled placeholder="value" />
                  </div>
                ))}
                <div className="flex gap-3">
                  <Input
                    placeholder="object"
                    value={objectInput}
                    onChange={(e) => setObjectInput(e.target.value)}
                  />
                  <Input
                    placeholder="value"
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  className="mt-3"
                  variant="outline"
                  onClick={handleAddItem}
                >
                  Add
                </Button>
                <Button
                  className="mt-3"
                  variant="outline"
                  onClick={handleRemoveItem}
                >
                  -
                </Button>
              </div>
            </div>
            {items.length > 1 && (
              <Button
                className="w-1/3"
                variant="secondary"
                onClick={handleNextStore}
              >
                Submit
              </Button>
            )}
          </>
        )}
      </Card>
    </>
  );
}
