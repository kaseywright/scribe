import { ConnectionHandler, RpcConnectionHandler } from "@theia/core";
import { ContainerModule } from "@theia/core/shared/inversify";
import { FileProcessorService } from "./file-processor-service";

export default new ContainerModule((bind) => {
  bind(FileProcessorService).toSelf().inSingletonScope();
  bind(ConnectionHandler)
    .toDynamicValue(
      (ctx) =>
        new RpcConnectionHandler("/services/file-processor", () => {
          return ctx.container.get<FileProcessorService>(FileProcessorService);
        })
    )
    .inSingletonScope();
});
