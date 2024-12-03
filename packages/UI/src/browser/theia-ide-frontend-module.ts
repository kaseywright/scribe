/********************************************************************************
 * Copyright (C) 2020 TypeFox, EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 *
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import "../../src/browser/styles/scribe-theia.css";
import "../../lib/browser/output-tailwind.css";

import { WidgetFactory } from "@theia/core/lib/browser";
import { ContainerModule } from "@theia/core/shared/inversify";
import { GettingStartedWidget } from "@theia/getting-started/lib/browser/getting-started-widget";
import { TheiaIDEGettingStartedWidget } from "./theia-ide-getting-started-widget";
import { ScribeTheiaContribution } from "./scribe-theia-contribution";
import { ToolbarDefaultsOverride } from "./toolbar-defaults-override";
import { ToolbarDefaultsFactory } from "@theia/toolbar/lib/browser/toolbar-defaults";
import { bindAllToolbarContributions } from "./toolbar-contributions";
import { bindAllWidgetsContributions } from "./widgets";
import { LayoutManager } from "./layout-manager";

export default new ContainerModule((bind, _unbind, isBound, rebind) => {
  bind(ScribeTheiaContribution).toSelf();
  rebind(ToolbarDefaultsFactory).toConstantValue(ToolbarDefaultsOverride);

  bind(TheiaIDEGettingStartedWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: GettingStartedWidget.ID,
      createWidget: () =>
        context.container.get<TheiaIDEGettingStartedWidget>(
          TheiaIDEGettingStartedWidget
        ),
    }))
    .inSingletonScope();
  bindAllToolbarContributions(bind);
  bindAllWidgetsContributions(bind);
  bind(LayoutManager).toSelf().inSingletonScope();
});
