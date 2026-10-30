import clsx from "clsx";

interface HangmanWordProps {
  word: string;
  selectedLetters: string[];
  reveal: boolean; // true saat kalah
  isWinner: boolean; // true saat menang
}

function HangmanWord({
  word,
  selectedLetters,
  reveal,
  isWinner,
}: HangmanWordProps) {
  return (
    <section className="flex gap-6">
      {word.split("").map((letter, index) => {
        const isGuessed = selectedLetters.includes(letter);

        return (
          <span
            key={index}
            className="uppercase font-semibold text-5xl border-b-6 pb-2 border-black"
          >
            <span
              className={clsx({
                // huruf tampil jika sudah ditebak, atau saat kalah (reveal)
                visible: isGuessed || reveal,
                invisible: !isGuessed && !reveal,
                // kalah: huruf yang tidak berhasil ditebak jadi merah
                "text-red-500": reveal && !isGuessed,
                // menang: semua huruf hijau
                "text-green-500": isWinner,
              })}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </section>
  );
}

export default HangmanWord;
