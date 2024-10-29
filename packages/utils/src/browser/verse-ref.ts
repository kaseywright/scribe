import {
  inject,
  injectable,
  postConstruct,
} from "@theia/core/shared/inversify";
import { GlobalStateStorage } from "./global-state-storage";
import { URI } from "@theia/core";

// FOR the documentation:
const DEFAULT_VERSE_REF_URI = URI.fromComponents({
  scheme: "scribe", // scheme is always scribe
  path: "/GEN/1/1", // after the authority
  authority: "bible.verse", // after scheme://
  query: "", // after ?
  fragment: "", // after #
});

// bible.verse || bible.range/GEN/1,1-2,3
// scribe://bible.verse/GEN/1/1

// GEN 1.1

// scribe://ta.en/GEN/1/1

@injectable()
export class VerseRefUtils {
  static readonly VerseRefKey = "scribe-bible-verse-ref";

  value: URI;

  @inject(GlobalStateStorage)
  private readonly globalStateStorage: GlobalStateStorage;

  @postConstruct()
  init() {
    this.globalStateStorage
      .getData(VerseRefUtils.VerseRefKey)
      .then((verseRefString) => {
        if (!verseRefString) {
          this.value = DEFAULT_VERSE_REF_URI;
          this.globalStateStorage.setData(
            VerseRefUtils.VerseRefKey,
            this.value.toString()
          );
        } else {
          this.value = new URI(verseRefString as string);
        }
      })
      .catch(() => {
        this.value = DEFAULT_VERSE_REF_URI;
        this.globalStateStorage.setData(
          VerseRefUtils.VerseRefKey,
          this.value.toString()
        );
      });
  }

  async getVerseRefString(): Promise<string> {
    return this.value.toString();
  }

  async getVerseRef(): Promise<VerseRefValue> {
    const path = this.value.path.toString();
    return this._pathToVerseRef(path);
  }

  private _pathToVerseRef(path: string): VerseRefValue {
    const book = path.split("/")[1];
    const chapter = parseInt(path.split("/")[2]);
    const verse = parseInt(path.split("/")[3]);
    return { book, chapter, verse };
  }

  private _verseRefToPath(verseRef: VerseRefValue): string {
    return `/${verseRef.book}/${verseRef.chapter}/${verseRef.verse}`;
  }

  async setVerseRef(verseRef: VerseRefValue): Promise<void> {
    const path = this._verseRefToPath(verseRef);
    this.value = this.value.withPath(path);
    await this.globalStateStorage.setData(
      VerseRefUtils.VerseRefKey,
      this.value.toString()
    );
  }

  private _listenForVerseRefChanges(
    callback?: (verseRef: VerseRefValue) => void
  ): void {
    return this.globalStateStorage.onUpdate(
      VerseRefUtils.VerseRefKey,
      (data) => {
        this.value = new URI(data as string);
        if (callback) {
          callback(this._pathToVerseRef(this.value.path.toString()));
        }
      }
    );
  }

  async onVerseRefChange(
    callback: (verseRef: VerseRefValue) => void
  ): Promise<void> {
    this._listenForVerseRefChanges(callback);
  }

  getVerseRefUri(): URI {
    return this.value;
  }
}

export type VerseRefValue = {
  book: string;
  chapter: number;
  verse: number;
};
