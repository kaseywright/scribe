import { injectable } from "@theia/core/shared/inversify";
import { FileProcessorServiceInterface } from "../common/file-processor-protocol";
import { convertUsfmToUsj, convertUsjToUsfm } from "./conversion-utils";
import { Usj } from "@biblionexus-foundation/scripture-utilities";

@injectable()
export class FileProcessorService implements FileProcessorServiceInterface {
  async processFileContent(content: string): Promise<string> {
    console.log("Backend: FileProcessorService.processFileContent called");

    try {
      const { usj, error } = await convertUsfmToUsj(content);
      if (error) {
        console.error("Backend: USFM conversion error:", error);
        return JSON.stringify({ error: "Failed to convert USFM" });
      }

      console.log("Backend: USFM successfully converted to USJ");
      return JSON.stringify(usj);
    } catch (e) {
      console.error("Backend: Unexpected error during USFM conversion:", e);
      return JSON.stringify({ error: "Unexpected error during conversion" });
    }
  }
  async serializeUsj(usj: Usj): Promise<string> {
    console.log("Backend: FileProcessorService.convertUsjToUsfm called");

    try {
      const { usfm } = await convertUsjToUsfm(usj);
      return usfm;
    } catch (e) {
      console.error("Backend: Unexpected error during USJ conversion:", e);
      return JSON.stringify({ error: "Unexpected error during conversion" });
    }
  }

  dispose(): void {
    // Implement if needed
  }

  setClient(client: FileProcessorServiceInterface): void {
    // Implement if needed
  }
}
