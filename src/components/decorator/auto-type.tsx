import { Slot } from "@radix-ui/react-slot";
import React from "react";

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

const default_sentences = [
  "I am Sample #1",
  "I am Sample #2",
  "I am Sample #3",
  "I am Sample #4",
  "I am Sample #5",
  "I am Sample #6",
];

const register = new Map<HTMLElement, Set<() => void>>();

// TEST CASE #1
// test("replace writers to avoid leakage", function noLeakage() {
//   const suggestions = typeSuggestions(
//     { swapDuration: 3000 },
//     (v) => console.log(v)
//   )
//
//   const data = Array(30).fill(0).map(() => suggestions.write())
// })

function createWriter({ swapDuration, writeId, sentences: sentences_, onWrite }: {
  swapDuration: number;
  writeId: number;
  sentences: string[];
  onWrite: WriteEventHandlerFn
}) {
  const collector = new Set<ReturnType<typeof typeWords>>();
  let stop = true;
  let terminated = false;
  const sentences = sentences_;

  return {
    async restart() {
      if (stop === true) {
        stop = false;
      }

      // if (!inputEl.contentEditable) return;
      const wordGenerator = WordGenerator(sentences, () => stop);

      for await (const sentence of wordGenerator) {
        if (terminated) {
          break;
        }

        console.log("Attempting to write", writeId, sentence)

        if (!sentence) {
          await delay(swapDuration);
          console.log("Pausing", { stop, writeId })
          continue;
        }

        console.log("Writing", writeId, sentence)
        const word_typer = typeWords(sentence, onWrite)
        collector.add(word_typer);

        await word_typer.start()
        await delay(swapDuration);
      }

      return 'Done!'
    },
    play() {
      stop = false;
    },
    stop() {
      stop = true;
    },
    terminate() {
      terminated = true;
      console.log(`Terminating Write(${writeId})`)

      for (const typer of Array.from(collector)) {
        typer.terminate();
      }

      collector.clear();
      this.stop();
    }
  } as const;
}

export function typeSuggestions(
  config: Partial<{ swapDuration: number }>,
  onWrite: WriteEventHandlerFn
) {
  let count = 0;
  const { swapDuration = 3000 } = config ?? {};

  count += 1;
  let current = createWriter({
    writeId: count,
    swapDuration,
    onWrite,
    sentences: ['']
  })

  return {
    write(sentences = default_sentences) {
      current.terminate();

      count += 1;
      current = createWriter({
        writeId: count,
        swapDuration,
        onWrite,
        sentences
      });

      return current.restart();
    },
    continue() {
      current.play();
    },
    pause() {
      current.stop()
    },
    terminate() {
      current.terminate()
    }
  }
}

export function typeWords(
  text: string,
  onWrite: WriteEventHandlerFn,
) {
  let pause = false;
  const id = crypto.randomUUID();

  return {
    id: id,
    async start() {
      onWrite({ type: "CLEAR" });

      const gen = TextGenerator(text.split(" "), pause);
      for await (const word of gen) {
        if (pause) {
          onWrite({ type: "CLEAR" });
          break;
        }
        await delay(200);
        onWrite({ type: "APPEND", value: word });
      }
    },
    terminate() {
      pause = true;
    }
  }
}


export function AutoType(props: {
  otherText: string[];
  focusText: string;
  swapDuration?: number;
  children?: React.ReactNode;
}) {
  const textArea = React.useRef<HTMLTextAreaElement>();

  React.useEffect(() => {
    const el = textArea.current;

    if (!el) return;
    const handleWriteEvent = (event) => {
      if (event.type === 'CLEAR')
        textArea.current.placeholder = '';

      if (event.type === 'APPEND')
        textArea.current.placeholder += `${event.value} `;
    }

    const handle = typeSuggestions(
      { swapDuration: props.swapDuration },
      handleWriteEvent
    );

    const onFocus = () => {
      handle.pause();
      // if (!el.value) {
      //   // collector.add(typeWords(el, props.focusText));
      // }
    };

    const onBlur = () => {
      if (el.value) return;
      handle.continue();
    };


    el.addEventListener("focus", onFocus);
    el.addEventListener("blur", onBlur);

    handle.write(default_sentences);

    return () => {
      handle.terminate();
      el.removeEventListener("focus", onFocus);
      el.removeEventListener("blur", onBlur);
    };
  }, [props.focusText, props.swapDuration]);

  return <Slot ref={textArea}>{props.children}</Slot>;
}

async function* TextGenerator(words: string[], pause?: boolean) {
  for (const word of words) {
    if (pause) break;
    yield word;
  }
}

async function* WordGenerator(words: string[], pause: () => boolean) {
  let count = 0;

  while (true) {
    if (count > words.length - 1) {
      count = 0;
    }

    if (pause()) {
      yield undefined;
      continue;
    }

    yield words[count];

    if (!pause()) {
      count++;
    }
  }
}

type WriteEventHandlerFn = (a: { type: "APPEND" | "CLEAR", value?: string }) => void;
