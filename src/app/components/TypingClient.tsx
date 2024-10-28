"use client";
import React, { useCallback, useEffect, useState } from "react";
import { WordsProps } from "./Typing";

export default function TypingClient({ words }: { words: WordsProps[] }) {
  const [currentWords, setCurrentWords] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [totalChars, setTotalChars] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>("text_short");

  console.log(words);

  const generateWords = useCallback((): string => {
    if (words.length === 0) return "";
    if (selectedTab === "text_short") {
      return words.map((word) => word.text_short).join(" ");
    } else if (selectedTab === "text_medium") {
      return words.map((word) => word.text_medium).join(" ");
    } else {
      return words.map((word) => word.text_long).join(" ");
    }
  }, [selectedTab]);

  const resetTest = useCallback(() => {
    setCurrentWords(generateWords());
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(0);
    setIsCompleted(false);
    setIsActive(false);
    setCorrectChars(0);
    setTotalChars(0);
  }, [generateWords]);

  useEffect(() => {
    resetTest();
  }, [resetTest, selectedTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);
    if (!startTime) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    // Only do calculations if we're active
    if (isActive) {
      // Calculate accuracy
      let correct = 0;
      const inputLength = value.length;
      for (let i = 0; i < inputLength; i++) {
        if (value[i] === currentWords[i]) {
          correct++;
        }
      }

      setCorrectChars(correct);
      setTotalChars(inputLength);
      setAccuracy(Math.round((correct / inputLength) * 100) || 100);

      // Calculate WPM
      if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; //in minutes
        const charsTyped = value.length;
        const wordsTyped = charsTyped / 5; //average word length is 5 characters
        setWpm(Math.round(wordsTyped / timeElapsed) || 0);
      }

      // Check if test is complete
      if (value.length === currentWords.length) {
        setIsActive(false);
        setIsCompleted(true);
      }
    }
  };

  const handleFocus = () => {
    if (!startTime) {
      setStartTime(Date.now());
      setIsActive(true);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Top Bar */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-500">Chan's Typing</h1>
          <div className="flex gap-4">
            <div className="text-xl">
              <span className="text-gray-400">WPM: </span>
              <span className="text-green-500">{wpm}</span>
            </div>
            <div className="text-xl">
              <span className="text-gray-400">Accuracy: </span>
              <span className="text-green-500">{accuracy}%</span>
            </div>
            <div className="text-xl">
              <span className="text-gray-400">Correct Chars: </span>
              <span className="text-green-500">{correctChars}</span>
            </div>
            <div className="text-xl">
              <span className="text-gray-400">Total Chars: </span>
              <span className="text-green-500">{totalChars}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-6">
          <button
            className={`${selectedTab === "text_short" ? "text-gray-900 bg-green-500" : "text-gray-400 bg-slate-600"} py-2 px-4 rounded transition-all hover:text-gray-900 hover:bg-green-600`}
            onClick={() => setSelectedTab("text_short")}
          >
            Short
          </button>
          <button
            className={`${selectedTab === "text_medium" ? "text-gray-900 bg-green-500" : "text-gray-400 bg-slate-600"} py-2 px-4 rounded transition-all hover:text-gray-900 hover:bg-green-600`}
            onClick={() => setSelectedTab("text_medium")}
          >
            Medium
          </button>
          <button
            className={`${selectedTab === "text_long" ? "text-gray-900 bg-green-500" : "text-gray-400 bg-slate-600"} py-2 px-4 rounded transition-all hover:text-gray-900 hover:bg-green-600`}
            onClick={() => setSelectedTab("text_long")}
          >
            Long
          </button>
        </div>

        {/* A box to display text */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg font-mono text-lg leading-relaxed">
          {currentWords.split("").map((char, index) => {
            let color = "text-gray-400";
            if (index < userInput.length) {
              color =
                userInput[index] === char ? "text-green-500" : "text-red-500";
            }
            return (
              <span key={index} className={color}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Text area for users to type */}
        <div>
          <textarea
            className="w-full p-4 bg-gray-800 rounded-lg font-mono text-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isCompleted ? true : false}
            rows={3}
            value={userInput}
            onChange={handleInputChange}
            onFocus={handleFocus}
            placeholder="Start typing..."
          />
          <button
            onClick={resetTest}
            className="px-4 py-2 mt-4 bg-green-500 text-gray-900 rounded hover:bg-green-600 focus:outline-none transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
