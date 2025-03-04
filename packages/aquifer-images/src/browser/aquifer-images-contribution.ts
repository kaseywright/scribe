import { injectable } from '@theia/core/shared/inversify';
import { AbstractViewContribution } from '@theia/core/lib/browser';
import { Command, CommandRegistry } from '@theia/core/lib/common/command';
import { AquiferWidget } from './aquifer-images-widget';
import { MenuModelRegistry } from '@theia/core';

export const AquiferCommand: Command = { id: 'aquifer:command' };

@injectable()
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