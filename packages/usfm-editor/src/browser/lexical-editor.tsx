import * as React from "@theia/core/shared/react";
import { BookCode, Usj } from "@biblionexus-foundation/scripture-utilities";

import {
  Editor,
  getViewOptions,
  DEFAULT_VIEW_MODE,
  immutableNoteCallerNodeName,
  UsjNodeOptions,
} from "@biblionexus-foundation/scribe-editor";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "@theia/core/shared/react";
import { Emitter } from "@theia/core";

export type TextDirection = "ltr" | "rtl" | "auto";
export interface ScriptureReference {
  bookCode: BookCode;
  chapterNum: number;
  verseNum: number;
}
const defaultUsj: Usj = {
  type: "USJ",
  version: "0.2.1",
  content: [],
};
const defaultScrRef: ScriptureReference = {
  /* PSA */ bookCode: "PSA",
  chapterNum: 1,
  verseNum: 1,
};
// const directions: TextDirection[] = ["ltr", "rtl", "auto"];
/** Forward reference for the editor. */
export type EditorRef = {
  /** Method to focus the editor. */
  focus(): void;
  /** Method to set the USJ Scripture data. */
  setUsj(usj: Usj): void;
  getScrollPosition: () => number;
  setScrollPosition: (position: number) => void;
  addEventListener?: (
    type: string,
    listener: EventListenerOrEventListenerObject
  ) => void;
};

export default function LexicalEditor({
  usjInput,
  onDirtyChangedEmitter,
  isDirty,
  onUsjUpdate,
}: {
  usjInput?: Usj;
  isDirty?: boolean;
  onDirtyChangedEmitter?: Emitter<void>;
  onUsjUpdate?: (usj: Usj) => void;
}) {
  const [usj, setUsj] = useState<Usj>(defaultUsj);
  const editorRef = useRef<EditorRef>(null);

  const [scrRef, setScrRef] = useState(defaultScrRef);
  // const [textDirection, setTextDirection] = useState<TextDirection>("rtl");

  const [viewMode] = useState(DEFAULT_VIEW_MODE);
  const viewOptions = useMemo(() => getViewOptions(viewMode), [viewMode]);

  const nodeOptions: UsjNodeOptions = {
    [immutableNoteCallerNodeName]: {
      onClick: (e: SyntheticEvent) => {
        console.log("Note caller clicked", e);
      },
    },
  };

  useEffect(() => {
    if (usjInput) {
      console.log("Setting usjInput", usjInput);
      setUsj(usjInput);
      isDirty = false;
    }
  }, [usjInput]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (usj && editorRef.current) {
        editorRef.current.setUsj(usj);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [usj]);

  // const [isDirty, setIsDirty] = useState(false);

  const onUsjChange = useCallback(
    (newUsj: Usj) => {
      if (onUsjUpdate) {
        console.log("Usj changed in editor", newUsj);
        onUsjUpdate(newUsj); // Call the callback with the new USJ
      }
    },
    [usj]
  );

  return (
    <div className="lexical-editor-container">
      <div className="editor-wrapper p-4">
        <Editor
          usjInput={usj}
          ref={editorRef}
          onChange={onUsjChange}
          viewOptions={viewOptions}
          nodeOptions={nodeOptions}
          scrRef={scrRef}
          setScrRef={setScrRef}
        />
      </div>
    </div>
  );
}
