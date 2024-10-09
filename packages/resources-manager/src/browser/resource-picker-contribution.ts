import { type CommandContribution, type CommandRegistry } from "@theia/core";
import { ApplicationShell } from "@theia/core/lib/browser";

import {
  inject,
  injectable,
  postConstruct,
} from "@theia/core/shared/inversify";
import { ResourcesPickerWidget } from "./resource-picker-widget";
import type { DeflatedToolbarTree } from "@theia/toolbar/lib/browser/toolbar-interfaces";
import { ToolbarAlignment } from "@theia/toolbar/lib/browser/toolbar-interfaces";
import { RESOURCE_PICKER_OPEN_DIALOG } from "./commands";

@injectable()
export class ResourcePickerContribution implements CommandContribution {
  @inject(ResourcesPickerWidget)
  protected readonly resourcesPickerWidget: ResourcesPickerWidget;

  @inject(ApplicationShell)
  protected readonly applicationShell: ApplicationShell;
  @postConstruct()
  init(): void {}

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(RESOURCE_PICKER_OPEN_DIALOG, {
      execute: () => {
        this.resourcesPickerWidget.open();
      },
    });
  }
}
