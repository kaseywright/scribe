import { Usj } from "@biblionexus-foundation/scripture-utilities";
import USFMParser from "sj-usfm-grammar";

let usfmParserInstance: any;
let usfmParserInitialized: any;

export async function initializeParser() {
  if (!usfmParserInstance) {
    if (!usfmParserInitialized) {
      usfmParserInitialized = await USFMParser.init();
    }
    await usfmParserInitialized;
    usfmParserInstance = new USFMParser();
  }
  return usfmParserInstance;
}

export async function convertUsfmToUsj(usfm: string) {
  if (!usfmParserInstance) {
    usfmParserInstance = await initializeParser();
  }
  try {
    const usj = usfmParserInstance.usfmToUsj(usfm);
    return { usj };
  } catch (e) {
    return { usj: { content: [] }, error: e };
  }
}

export async function convertUsjToUsfm(usj: Usj) {
  if (!usfmParserInstance) {
    usfmParserInstance = await initializeParser();
  }
  const usfm = usfmParserInstance.usjToUsfm(usj);
  return { usfm };
}

initializeParser()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("USFM Parser initialized successfully");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Error initializing USFM Parser:", err);
  });
