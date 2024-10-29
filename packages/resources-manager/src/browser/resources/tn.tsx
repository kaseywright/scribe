import * as React from "@theia/core/shared/react";
import { ScribeResource, Door43ApiResponse, Door43RepoResponse } from "./types";
import TranslationNotesView, {
  TnTSV,
} from "@/components/TranslationNotes/TranslationNotesView";
import { getDocumentAsScriptureTSV } from "@/utils/translationNotes";
import {
  downloadDoor43Resource,
  fetchDoor43ResourceDisplayData,
} from "./utils";
import { IconNotes } from "@tabler/icons-react";
import type {
  VerseRefUtils,
  VerseRefValue,
} from "@scribe/theia-utils/lib/browser";

export const tnResource: ScribeResource<Door43RepoResponse, TnTSV> = {
  id: "codex.tn",
  displayLabel: "Notes",
  icon: <IconNotes />,

  getTableDisplayData: async (query?: string) => {
    try {
      const data = await fetchDoor43ResourceDisplayData(tnResource.id, {
        subject: "TSV Translation Notes",
        metadataType: "rc",
        query: query || "",
      });
      return data ?? [];
    } catch (error) {
      return [];
    }
  },

  downloadResource: async (resourceInfo, { fs, resourceFolderUri }) =>
    downloadDoor43Resource(tnResource.id, resourceInfo, {
      fs,
      resourceFolderUri,
    }),
  openHandlers: {
    verseRefSubscription: true,
    async readResourceData(uri, fs, ctx) {
      const verseRef = await ctx.verseRefUtils.getVerseRef();
      return await getDocumentAsScriptureTSV(verseRef, uri, fs);
    },
    render(data, ctx) {
      if (!ctx) {
        return null;
      }

      return (
        <TranslationNotesWrapper
          verseRefUtils={ctx.verseRefUtils}
          data={data}
        />
      );
    },
  },
};

const TranslationNotesWrapper = (props: {
  verseRefUtils: VerseRefUtils;
  data: TnTSV;
}) => {
  const [ref, setRef] = React.useState<VerseRefValue>({
    book: "GEN",
    chapter: 1,
    verse: 1,
  });

  React.useLayoutEffect(() => {
    props.verseRefUtils.onVerseRefChange((ref) => setRef(ref));
    props.verseRefUtils.getVerseRef().then((ref) => setRef(ref));
  }, []);

  return (
    <div>
      <div className="text-white text-3xl">{JSON.stringify(ref)}</div>
      <TranslationNotesView tnTsv={props.data} verseRef={ref} />
    </div>
  );
};
