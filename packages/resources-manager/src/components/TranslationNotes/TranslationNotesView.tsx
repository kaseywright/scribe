import { useState, useEffect } from "react";
import {
  VSCodePanels,
  VSCodePanelTab,
  VSCodePanelView,
} from "@vscode/webview-ui-toolkit/react";

import React from "@theia/core/shared/react";

import TranslationNoteScroller from "./TranslationNoteScroller";
import { Badge } from "../ui/Badge";
import Button from "../Button";
import TranslationNote from "./TranslationNote";
import type { VerseRefValue } from "@scribe/theia-utils/lib/browser";

type CommandToFunctionMap = Record<string, (data: any) => void>;

export type TnTSV = {
  [chapter: number]: {
    [verse: number]: any;
  };
};
export const extractBookChapterVerse = (
  refString: string
): { bookID: string; chapter: number; verse: number } => {
  const match = refString.match(/([A-Za-z0-9]{3}) (\d+):(\d+)/);

  return match
    ? {
        bookID: match[1],
        chapter: parseInt(match[2], 10),
        verse: parseInt(match[3], 10),
      }
    : { bookID: "GEN", chapter: 1, verse: 1 };
};

function TranslationNotesView({
  tnTsv: translationNotesObj,
  verseRef,
}: {
  tnTsv: TnTSV;
  verseRef: VerseRefValue;
}) {
  const [noteIndex, setNoteIndex] = useState<number>(0);

  console.log("COMPONENT RENDER DATA - : ", Object.keys(translationNotesObj));

  useEffect(() => {
    setNoteIndex(0);
  }, [verseRef]);

  const incrementNoteIndex = () =>
    setNoteIndex((prevIndex) =>
      prevIndex <
      translationNotesObj[verseRef?.chapter]?.[verseRef?.verse].length - 1
        ? prevIndex + 1
        : prevIndex
    );
  const decrementNoteIndex = () =>
    setNoteIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));

  const notes =
    translationNotesObj?.[verseRef?.chapter]?.[verseRef?.verse] || [];

  if (!notes || notes.length === 0) {
    return <div>No notes found</div>;
  }

  return (
    <main>
      <section className="translation-note-view">
        <div className="flex items-center border-b py-2.5 px-2 dark:border-zinc-900 border-zinc-200 justify-between">
          <Badge variant="destructive">
            {noteIndex + 1} of {notes.length}
          </Badge>
          <div className="flex items-center gap-[5px]">
            <Button
              icon={
                <span className="arrow-button codicon codicon-chevron-left"></span>
              }
              onClick={decrementNoteIndex}
            />
            <Button
              icon={
                <span className="arrow-button codicon codicon-chevron-right"></span>
              }
              onClick={incrementNoteIndex}
            />
          </div>
        </div>
        <VSCodePanels activeid="tab-verse" aria-label="note-type-tab">
          <VSCodePanelView id="view-verse">
            <div className="mt-2.5 font-normal space-y-2 mx-auto max-w-md">
              <article className="dark:text-zinc-50 text-zinc-700 leading-5   text-xs tracking-wide text-center whitespace-pre-line">
                {<TranslationNote note={notes[noteIndex]} />}
              </article>
            </div>
          </VSCodePanelView>
        </VSCodePanels>
      </section>
    </main>
  );
}

export default TranslationNotesView;
