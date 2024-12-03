import {
  ApplicationShell,
  Widget,
  WidgetManager,
} from "@theia/core/lib/browser";
import { inject, injectable } from "inversify";

const RESOURCE_VIEWER_FACTORY_ID = "resource-viewer";

const EDITOR_WIDGET_ID = "custom-file-widget";

@injectable()
export class LayoutManager {
  @inject(ApplicationShell)
  shell: ApplicationShell;

  @inject(WidgetManager)
  widgetManager: WidgetManager;

  private createTabArea = (widgets: Widget[]) => {
    return {
      type: "tab-area" as const,
      widgets,
      currentIndex: 0,
    };
  };

  public resetDefaultLayout = () => {
    const allWidgets = this.shell.getWidgets("main");

    const editorWidgets = allWidgets.filter((widget) =>
      widget.id.startsWith(EDITOR_WIDGET_ID)
    );

    const resourceViewerWidget = allWidgets.filter((widget) =>
      widget.id.startsWith(RESOURCE_VIEWER_FACTORY_ID)
    );

    const editorTabs = this.createTabArea(editorWidgets);
    const resourceViewerTabs = this.createTabArea(resourceViewerWidget);

    const splitArea = this.createSplitArea("horizontal", [
      resourceViewerTabs,
      editorTabs,
    ]);

    const newLayout = {
      main: splitArea,
    };

    this.shell.mainPanel.restoreLayout(newLayout);
  };

  private createSplitArea = (
    orientation: "horizontal" | "vertical",
    children: ReturnType<typeof this.createTabArea>[]
  ) => {
    return {
      type: "split-area" as const,
      orientation,
      children,
      sizes: new Array(children.length).fill(1 / children.length),
    };
  };
}
