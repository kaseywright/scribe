// bible-navigator-widget.tsx
import * as React from "@theia/core/shared/react";
import {
  inject,
  injectable,
  postConstruct,
} from "@theia/core/shared/inversify";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import { Message } from "@phosphor/messaging";
import { Book, BIBLE_BOOKS } from "../utils/books";
const { useState, useEffect } = React;
import { VerseRefUtils, VerseRefValue } from "@scribe/theia-utils/lib/browser";

interface BibleNavigatorProps {
  verseRefUtils: VerseRefUtils;
}
export const BibleNavigator = ({ verseRefUtils }: BibleNavigatorProps) => {
  const [books, setBooks] = useState<Book[]>(BIBLE_BOOKS);
  const [currentRef, setCurrentRef] = React.useState<VerseRefValue | null>(
    null
  );
  console.log("????", verseRefUtils.getVerseRef());
  useEffect(() => {
    const initVerseRef = async () => {
      const ref = await verseRefUtils.getVerseRef();
      setCurrentRef(ref);
      // Expand the current book
      setBooks(
        books.map((book) =>
          book.id === ref.book ? { ...book, isExpanded: true } : book
        )
      );
    };

    initVerseRef();

    // Subscribe to verse ref changes
    verseRefUtils.onVerseRefChange((newRef) => {
      setCurrentRef(newRef);
      setBooks(
        books.map((book) =>
          book.id === newRef.book ? { ...book, isExpanded: true } : book
        )
      );
    });
  }, [verseRefUtils]);

  const toggleBook = (bookId: string) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, isExpanded: !book.isExpanded } : book
      )
    );
  };
  const handleChapterClick = async (bookId: string, chapterNum: number) => {
    // Default to verse 1 when selecting a chapter
    await verseRefUtils.setVerseRef({
      book: bookId,
      chapter: chapterNum,
      verse: 1,
    });
  };
  return (
    <div className="bible-navigator p-2">
      {books.map((book) => (
        <div key={book.id} className="book-container mb-2">
          <div
            className={`book-header p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center ${
              currentRef?.book === book.id ? "bg-blue-100" : "bg-gray-100"
            }`}
            onClick={() => toggleBook(book.id)}
          >
            <span>{book.name}</span>
            <span>{book.isExpanded ? "▼" : "▶"}</span>
          </div>
          {book.isExpanded && (
            <div className="chapters-grid grid grid-cols-5 gap-2 p-2">
              {book.chapters.map((chapter) => (
                <div
                  key={chapter.number}
                  className={`chapter-item p-2 text-center cursor-pointer rounded ${
                    currentRef?.book === book.id &&
                    currentRef?.chapter === chapter.number
                      ? "bg-blue-500 text-white"
                      : "bg-blue-100 hover:bg-blue-200"
                  }`}
                  onClick={() => handleChapterClick(book.id, chapter.number)}
                >
                  {chapter.number}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

@injectable()
export class BibleNavigatorWidget extends ReactWidget {
  static readonly ID = "bible-navigator:widget";
  static readonly LABEL = "Bible Navigator";

  @inject(VerseRefUtils)
  protected readonly verseRefUtils: VerseRefUtils;

  @postConstruct()
  protected init(): void {
    this.id = BibleNavigatorWidget.ID;
    this.title.label = BibleNavigatorWidget.LABEL;
    this.title.caption = BibleNavigatorWidget.LABEL;
    this.title.closable = true;
    this.title.iconClass = "fa fa-book";
    this.update();
  }

  protected render(): React.ReactNode {
    return <BibleNavigator verseRefUtils={this.verseRefUtils} />;
  }

  protected onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    this.node.focus();
  }
}
