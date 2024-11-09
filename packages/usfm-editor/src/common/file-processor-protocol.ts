import { Usj } from "@biblionexus-foundation/scripture-utilities";
import { JsonRpcServer } from "@theia/core/lib/common/messaging";

export const FileProcessorService = Symbol("FileProcessorService");
export const FILE_PROCESSOR_PATH = "/services/file-processor";

export interface FileProcessorServiceInterface
  extends JsonRpcServer<FileProcessorServiceInterface> {
  processFileContent(content: string): Promise<string>; // Now returns a JSON string
  serializeUsj(usj: Usj): Promise<string>; // Now returns a JSON string
}
