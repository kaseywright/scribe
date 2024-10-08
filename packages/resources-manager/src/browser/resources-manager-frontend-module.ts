/**
 * Generated using theia-extension-generator
 */
import { ContainerModule } from "@theia/core/shared/inversify";

import "../../src/styles/resources-manager.css";
import "../output-tailwind.css";

import {
  FrontendApplicationContribution,
  StylingParticipant,
  WidgetFactory,
  bindViewContribution,
} from "@theia/core/lib/browser";
import { ResourceManagerFactory } from "./resources-manager-factory";
import { ResourcesViewerWidget } from "./resources-manager-widget";
import { ResourceManagerFrontendContribution } from "./resource-manager-contribution";
import { ResourceManagerUtils } from "./utils";
import { ResourceViewerFactory } from "./resource-viewer/resource-viewer-factory";
import { ResourceViewerOpener } from "./resource-viewer/resource-viewer-opener";
import {
  ResourcePickerDialogProps,
  ResourcesPickerWidget,
} from "./resource-picker-widget";
import { ResourcePickerContribution } from "./resource-picker-contribution";
import { CommandContribution, MenuContribution } from "@theia/core";

export default new ContainerModule(
  (
    bind,
    unbind,
    isBound,
    rebind,
    unbindAsync,
    onActivation,
    onDeactivation
  ) => {
    // Replace this line with the desired binding, e.g. "bind(CommandContribution).to(ScribeTheiaContribution)
    bind(ResourcesViewerWidget).toSelf();
    bind<WidgetFactory>(WidgetFactory).toDynamicValue((ctx) => ({
      id: ResourcesViewerWidget.ID,
      createWidget: () => ctx.container.get(ResourcesViewerWidget),
    }));
    bind(ResourceManagerFactory).toSelf().inSingletonScope();
    bind(WidgetFactory).toService(ResourceManagerFactory);
    bind(FrontendApplicationContribution).toService(
      ResourceManagerFrontendContribution
    );
    bindViewContribution(bind, ResourceManagerFrontendContribution);
    bind(StylingParticipant).toService(ResourceManagerFrontendContribution);
    bind(ResourceManagerUtils).toSelf().inSingletonScope();

    bind(ResourceViewerFactory).toSelf().inSingletonScope();
    bind(WidgetFactory).toService(ResourceViewerFactory);

    bind(ResourceViewerOpener).toSelf().inSingletonScope();

    bind(ResourcePickerDialogProps).toConstantValue({
      title: "Resources Picker",
    });

    bind(ResourcesPickerWidget).toSelf().inSingletonScope();

    bind(ResourcePickerContribution).toSelf().inSingletonScope();
    bind(CommandContribution).toService(ResourcePickerContribution);
  }
);
