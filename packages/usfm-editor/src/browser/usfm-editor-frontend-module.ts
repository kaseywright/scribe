import { ContainerModule } from "@theia/core/shared/inversify";
// import "../../lib/output-tailwind.css";
import {
  OpenHandler,
  WidgetFactory,
  WebSocketConnectionProvider,
  FrontendApplicationContribution,
} from "@theia/core/lib/browser";

import { FileOpenHandler } from "./file-opener-handler";
import { CustomFileWidget } from "./custom-file-widget";
import {
  FileProcessorService,
  FileProcessorServiceInterface,
  FILE_PROCESSOR_PATH,
} from "../common/file-processor-protocol";

import "../../src/browser/style/index.css";
import { BibleNavigatorWidget } from "./navigator-widget";
import { BibleNavigatorContribution } from "./navigator-contribution";

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

  bind(BibleNavigatorWidget).toSelf();
  bind(BibleNavigatorContribution).toSelf().inSingletonScope();
  bind(FrontendApplicationContribution).toService(BibleNavigatorContribution);
  bind(WidgetFactory)
    .toDynamicValue((ctx) => ({
      id: BibleNavigatorWidget.ID,
      createWidget: () =>
        ctx.container.get<BibleNavigatorWidget>(BibleNavigatorWidget),
    }))
    .inSingletonScope();
});
