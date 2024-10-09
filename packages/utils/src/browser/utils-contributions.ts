import {
  inject,
  injectable,
  postConstruct,
} from "@theia/core/shared/inversify";
import {
  CommandContribution,
  CommandRegistry,
} from "@theia/core/lib/common/command";
import { GlobalStateStorage } from "./global-state-storage";

@injectable()
export class GlobalStateCommandContribution implements CommandContribution {
  @inject(GlobalStateStorage)
  private readonly globalStateStorage: GlobalStateStorage;

  @postConstruct()
  protected init(): void {
    this.globalStateStorage.onDidUpdateEvent((e) => {
      console.log("GlobalStateCommandContribution: Global State updated!", e);
    });
  }

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(
      {
        id: "utils.set-global-state",
        label: "Set Global State",
      },
      {
        execute: () => {
          console.log("Set Global State executed!");
          this.globalStateStorage.setData(
            "test",
            "test -> " + new Date().toLocaleTimeString()
          );
        },
      }
    );
  }
}
