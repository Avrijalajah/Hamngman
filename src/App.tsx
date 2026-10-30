import { useEffect, useState } from "react";
import HangmanDraw from "./components/HangmanDraw";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import words from "../wordList.json";

const MAX_ATTEMPT = 6;

function App() {
  // Mengambil satu kata random di wordList.json
  const [currentWord] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });

  // State penampung huruf-huruf yang dipilih pemain
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  // Mengetahui berapa kali pemain salah menebak
  const incorrectLetters = selectedLetters.filter((letter: string) => {
    return !currentWord.includes(letter);
  });

  // Kalah: salah tebak sudah mencapai batas
  const isLoser = incorrectLetters.length >= MAX_ATTEMPT;

  // Menang: semua huruf pada kata sudah ditebak
  const isWinner = currentWord
    .split("")
    .every((letter) => selectedLetters.includes(letter));

  const isGameOver = isLoser || isWinner;

  const addLetter = (letter: string) => {
    // Jika huruf sudah dipilih atau game sudah selesai, abaikan
    if (selectedLetters.includes(letter) || isGameOver) return;

    setSelectedLetters((prev) => [...prev, letter]);
  };

  useEffect(() => {
    const onKeyboardPress = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addLetter(key);
    };

    document.addEventListener("keypress", onKeyboardPress);

    return () => {
      document.removeEventListener("keypress", onKeyboardPress);
    };
  }, [selectedLetters]);

  return (
    <section className="flex flex-col items-center gap-10">
      <div className="text-2xl font-semibold">
        {isLoser && "Nice try, refresh and try again!"}
        {isWinner && "You win, refresh and try again!"}
      </div>

      <HangmanDraw attempt={incorrectLetters.length} />
      <HangmanWord
        word={currentWord}
        selectedLetters={selectedLetters}
        reveal={isLoser}
        isWinner={isWinner}
      />
      <Keyboard
        onKeyboardClick={addLetter}
        inactiveLetters={incorrectLetters}
        activeLetters={selectedLetters.filter((letter) => {
          return currentWord.includes(letter);
        })}
        disabled={isGameOver}
      />
    </section>
  );
}

export default App;
