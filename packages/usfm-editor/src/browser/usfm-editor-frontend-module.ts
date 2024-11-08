import { ContainerModule } from "@theia/core/shared/inversify";
import {
  OpenHandler,
  WidgetFactory,
  WebSocketConnectionProvider,
} from "@theia/core/lib/browser";

import { FileOpenHandler } from "./file-opener-handler";
import { CustomFileWidget } from "./custom-file-widget";
import {
  FileProcessorService,
  FileProcessorServiceInterface,
  FILE_PROCESSOR_PATH,
} from "../common/file-processor-protocol";

import "../../src/browser/style/index.css";

export const Saveable = Symbol("Saveable");
export default new ContainerModule((bind) => {
  bind(CustomFileWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((ctx) => ({
      id: CustomFileWidget.ID,
      createWidget: () => ctx.container.get<CustomFileWidget>(CustomFileWidget),
    }))
    .inSingletonScope();

  bind(FileOpenHandler).toSelf().inSingletonScope();
  bind(OpenHandler).toService(FileOpenHandler);

  bind(FileProcessorService)
    .toDynamicValue((ctx) => {
      const connection = ctx.container.get(WebSocketConnectionProvider);
      return connection.createProxy<FileProcessorServiceInterface>(
        FILE_PROCESSOR_PATH
      );
    })
    .inSingletonScope();

  bind(Saveable).toService(CustomFileWidget);
});
