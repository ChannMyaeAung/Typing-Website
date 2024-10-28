import React, { useCallback } from "react";
import TypingClient from "./TypingClient";
import { getWords } from "../lib/data";

export interface WordsProps {
  title: string;
  text_short: string;
  text_medium: string;
  text_long: string;
  content: any;
}

export default async function Typing() {
  const words: WordsProps[] = await getWords();

  console.log(words);

  return (
    <>
      <TypingClient words={words} />
    </>
  );
}
