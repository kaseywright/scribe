import * as React from "@theia/core/shared/react";
import {
  inject,
  injectable,
  postConstruct,
} from "@theia/core/shared/inversify";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import {
  AbstractViewContribution,
  FrontendApplicationContribution,
  FrontendApplication,
} from "@theia/core/lib/browser";
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import AudioComponents from "../../components/AudioComponents";

@injectable()
export class AudioWidget extends ReactWidget {
  static readonly ID = "Audio-page-widget";
  static readonly LABER = "main";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = AudioWidget.ID;
    this.title.label = AudioWidget.LABER;
    this.title.caption = AudioWidget.LABER;
    this.title.closable = true;
    this.update();
  }

  render(): React.ReactNode {
    return <AudioComponents />;
  }
}

@injectable()
export class AudioContribution
  extends AbstractViewContribution<AudioWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: AudioWidget.ID,
      widgetName: AudioWidget.LABER,
      defaultWidgetOptions: {
        area: "main",
      },
    });
  }

  async onStart(app: FrontendApplication): Promise<void> {
    this.stateService.reachedState("ready").then(() => {
      this.openView({
        activate: true,
        reveal: true,
      });
    });
  }
}
