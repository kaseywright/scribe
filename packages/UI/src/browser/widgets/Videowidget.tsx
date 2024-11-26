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
import MediaPlayer from "../../components/MediaPlayer";

@injectable()
export class VideoWidget extends ReactWidget {
  static readonly ID = "Video-page-widget";
  static readonly LABER = "Video";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = VideoWidget.ID;
    this.title.label = VideoWidget.LABER;
    this.title.caption = VideoWidget.LABER;
    this.title.closable = true;
    this.update();
  }

  render(): React.ReactNode {
    return (
      <div>
        <MediaPlayer type="image" source="/images/media.png" />
        <MediaPlayer type="video" source="8ddBB8r6_KA" />;
      </div>
    );
  }
}

@injectable()
export class VideoContribution
  extends AbstractViewContribution<VideoWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: VideoWidget.ID,
      widgetName: VideoWidget.LABER,
      defaultWidgetOptions: {
        area: "left",
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
