import { ContainerModule } from "@theia/core/shared/inversify";
import { GlobalStateStorage } from "./global-state-storage";
import { GlobalStateCommandContribution } from "./utils-contributions";
import { CommandContribution } from "@theia/core";
import { VerseRefUtils } from "./verse-ref";

export default new ContainerModule((bind) => {
  bind(GlobalStateStorage).toSelf().inSingletonScope();
  bind(GlobalStateCommandContribution).toSelf().inSingletonScope();
  bind(CommandContribution).toService(GlobalStateCommandContribution);
  bind(VerseRefUtils).toSelf().inSingletonScope();
});
