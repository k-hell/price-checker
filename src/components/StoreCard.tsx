"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function StoreCard() {
  const [store, setStore] = useState<string>("");
  const [tempStore, setTempStore] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempStore(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setStore(tempStore);
    }
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
            <div className="">
              <div className="flex gap-3">
                <Input placeholder="object" />
                <Input placeholder="value" />
              </div>
              <Button className="mt-3" variant="outline">
                Add
              </Button>
            </div>
            <Button className="w-1/3" variant="secondary">
              Submit
            </Button>
          </>
        )}
      </Card>
    </>
  );
}
