import { Message, ReactWidget } from "@theia/core/lib/browser";
import * as React from "@theia/core/shared/react";

import {
  injectable,
  inject,
  postConstruct,
} from "@theia/core/shared/inversify";
import {
  AbstractViewContribution,
  FrontendApplicationContribution,
  FrontendApplication,
} from "@theia/core/lib/browser";
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state";
import { WorkspaceService } from "@theia/workspace/lib/browser";
import Button from "../../components/Button";

@injectable()
export class BottomEditorRightWidget extends ReactWidget {
  static readonly ID = "scribe.editor.bottom.right";
  static readonly LABEL = "Editor Bottom Right";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = BottomEditorRightWidget.ID;
    this.title.label = BottomEditorRightWidget.LABEL;
    this.title.caption = BottomEditorRightWidget.LABEL;
    this.title.closable = true;

    this.update();
  }

  protected override onActivateRequest(msg: Message): void {
    super.onActivateRequest(msg);
    const elArr = this.node.getElementsByTagName("a");
    if (elArr && elArr.length > 0) {
      (elArr[0] as HTMLElement).focus();
    }
  }
  protected render(): React.ReactNode {
    return (
      <div className="bg-[var(--theia-editor-background)]">
        <p className="font-semibold text-xs text-center tracking-wide leading-4 text-[var(--theia-settings-textInputForeground)]var(--theia-settings-textInputForeground)]">
          Tsv translation notes english
        </p>
        <div className="mt-2.5 rounded-lg flex items-center justify-between gap-[5px] bg-[var(rgb(245 245 245 / 0.4))] p-[5px]">
          <Button
            label="Book"
            className="dark:bg-zinc-800 bg-[var(--theia-editor-background)] text-[var(--theia-settings-textInputForeground)] w-1/3 uppercase font-semibold"
          />
          <Button
            label="Chapter"
            className="dark:bg-zinc-800 bg-[var(--theia-editor-background)] text-[var(--theia-settings-textInputForeground)] w-1/3 uppercase font-semibold"
          />
          <Button
            label="Verse"
            className="dark:bg-zinc-800 bg-[var(--theia-editor-background)] text-[var(--theia-settings-textInputForeground)] w-1/3 uppercase font-semibold"
          />
        </div>
        <article className="text-[var(--theia-settings-textInputForeground)]leading-[18px] mt-2.5   text-xs tracking-wide text-center whitespace-pre-line">
          1:9b and was baptized by John in the Jordan. and [then] John baptized
          Jesus/him in the Jordan [River]. -OR- • [When he arrived at the place
          where John was preaching,| John baptized him in the Jordan [River].
        </article>
        <div></div>
      </div>
    );
  }
}

@injectable()
export class BottomEditorRightContribution
  extends AbstractViewContribution<BottomEditorRightWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: BottomEditorRightWidget.ID,
      widgetName: BottomEditorRightWidget.LABEL,
      defaultWidgetOptions: {
        area: "main",
        mode: "split-right",
      },
    });
  }

  async onStart(app: FrontendApplication): Promise<void> {
    this.stateService
      .reachedState("ready")
      .then(() =>
        this.openView({ reveal: false, area: "bottom", mode: "split-right" })
      );
  }
}
