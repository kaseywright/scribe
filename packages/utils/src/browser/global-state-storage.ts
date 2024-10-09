import { Emitter } from "@theia/core";
import { injectable } from "@theia/core/shared/inversify";

import { WorkspaceStorageService } from "@theia/workspace/lib/browser/workspace-storage-service";

@injectable()
export class GlobalStateStorage extends WorkspaceStorageService {
  private readonly setDataEmitter = new Emitter<{
    key: string;
    data: unknown;
  }>();
  readonly onDidUpdateEvent = this.setDataEmitter.event;

  override setData<T>(key: string, data: T): Promise<void> {
    super.setData(key, data);
    this.setDataEmitter.fire({ key, data });
    return Promise.resolve();
  }

  onUpdate(key: string, listener: <T>(data: T) => void) {
    this.onDidUpdateEvent((e) => {
      if (e.key === key) {
        listener(e.data);
      }
    });
  }
}
