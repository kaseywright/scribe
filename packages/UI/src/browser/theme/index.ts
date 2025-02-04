import {
  inject,
  injectable,
  postConstruct,
} from "@theia/core/shared/inversify";
import { MonacoThemingService } from "@theia/monaco/lib/browser/monaco-theming-service";

@injectable()
export class ScribeCustomTheme {
  @inject(MonacoThemingService)
  protected readonly monacoThemingService: MonacoThemingService;

  @postConstruct()
  protected async init() {
    this.monacoThemingService.register(
      {
        id: "scribe-custom-theme",
        label: "Scribe Custom Theme",
        uiTheme: "vs-dark",
        uri: customTheme,
      },
      {
        "./light_theia.json": require("@theia/monaco/data/monaco-themes/vscode/light_theia.json"),
      }
    );
  }
}

const customTheme = JSON.stringify({
  $schema: "vscode://schemas/color-theme",
  name: "Scribe Custom Theme(light)",
  include: "./light_plus.json",
  colors: {
    "activityBar.background": "#ececec",
    "activityBar.activeBorder": "#6aa17c",
    "activityBar.foreground": "#af6666",
  },
});
