// bible-navigator-contribution.ts
import { injectable } from "@theia/core/shared/inversify";
import {
  AbstractViewContribution,
  FrontendApplication,
} from "@theia/core/lib/browser";
import { Command, CommandRegistry } from "@theia/core/lib/common/command";
import { MenuModelRegistry } from "@theia/core";
import { BibleNavigatorWidget } from "./navigator-widget";

export const BibleNavigatorCommand: Command = { id: "bible-navigator:command" };

@injectable()
export class BibleNavigatorContribution extends AbstractViewContribution<BibleNavigatorWidget> {
  constructor() {
    super({
      widgetId: BibleNavigatorWidget.ID,
      widgetName: BibleNavigatorWidget.LABEL,
      defaultWidgetOptions: { area: "left" },
      toggleCommandId: BibleNavigatorCommand.id,
    });
  }
  async onStart(app: FrontendApplication): Promise<void> {
    // This will open the widget when the application starts
    await this.openView({ activate: true });
  }

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(BibleNavigatorCommand, {
      execute: () => super.openView({ activate: false, reveal: true }),
    });
  }

  registerMenus(menus: MenuModelRegistry): void {
    super.registerMenus(menus);
  }
}
