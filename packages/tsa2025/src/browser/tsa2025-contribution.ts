import { injectable } from '@theia/core/shared/inversify';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import { AquiferWidget } from './tsa2025-widget';
import { MenuModelRegistry } from '@theia/core';

export const AquiferCommand: Command = { id: 'aquifer:command' };

@injectable()
// Add contribution interface to be implemented, e.g. "Tsa2025Contribution implements CommandContribution"
export class AquiferContribution extends AbstractViewContribution<AquiferWidget> {
    constructor() {
        super({
            widgetId: AquiferWidget.ID,
            widgetName: AquiferWidget.LABEL,
            defaultWidgetOptions: { area: 'right' },
            toggleCommandId: AquiferCommand.id
        });
    }

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(AquiferCommand, {
            execute: () => super.openView({ activate: false, reveal: true })
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        super.registerMenus(menus);
    }
}