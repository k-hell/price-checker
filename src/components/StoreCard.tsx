"use client";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type StoreCardProps = {
  onSubmit: (objects: string[]) => void;
  syncedObjects?: string[];
};

export default function StoreCard({
  onSubmit,
  syncedObjects = [],
}: StoreCardProps) {
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
    if (!objectInput || !valueInput) {
      console.log("Error: Both fields are required.");
      return;
    }
    setItems([
      ...items,
      { object: objectInput, value: valueInput, isDisabled: true },
    ]);
    setObjectInput("");
    setValueInput("");
  };

  const handleSubmit = () => {
    if (items.some((item) => !item.value)) {
      console.log("Error: All items must have values.");
      return;
    }
    onSubmit(items.map((item) => item.object));
  };

  const handleRemoveItem = () => {
    setItems((prevItems) => prevItems.slice(0, -1));
  };

  useEffect(() => {
    if (syncedObjects.length > 0) {
      setItems(
        syncedObjects.map((object) => ({
          object,
          value: "",
          isDisabled: false,
        })),
      );
    }
  }, [syncedObjects]);

  const handleValueChange = (index: number, value: string) => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, value } : item)),
    );
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
                    <Input
                      value={item.value}
                      onChange={(e) => handleValueChange(index, e.target.value)}
                      placeholder="value"
                    />
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
                className="mt-3 w-1/3"
                variant="secondary"
                onClick={handleSubmit}
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
