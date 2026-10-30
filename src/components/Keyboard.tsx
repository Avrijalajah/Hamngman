import clsx from "clsx";

const KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface KeyboardProps {
  onKeyboardClick: (letter: string) => void;
  inactiveLetters: string[]; // huruf yang salah
  activeLetters: string[]; // huruf yang benar
  disabled: boolean; // true saat menang/kalah
}

function Keyboard({
  onKeyboardClick,
  inactiveLetters,
  activeLetters,
  disabled,
}: KeyboardProps) {
  return (
    <section className="flex flex-wrap w-140 gap-2">
      {KEYS.map((letter, index) => {
        const lowerLetter = letter.toLowerCase();

        const isInactive = inactiveLetters.includes(lowerLetter);
        const isActive = activeLetters.includes(lowerLetter);

        return (
          <div
            key={index}
            onClick={() => onKeyboardClick(lowerLetter)}
            className={clsx("border-2 font-semibold p-5", {
              "opacity-30 pointer-events-none": isInactive,
              "bg-green-500 text-white pointer-events-none": isActive,
              // game selesai: semua tombol non-aktif
              "opacity-50 pointer-events-none": disabled,
            })}
          >
            {letter}
          </div>
        );
      })}
    </section>
  );
}

export default Keyboard;
