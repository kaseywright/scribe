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
import {
  IconPhoto,
  // IconRefresh,
  // IconPlayerPlay,
  IconMicrophone,
  // IconPlayerPause,
  // IconTrashX,
  // IconMinus,
  // IconPlus,
  // IconSettings,
} from "@tabler/icons-react";
import Button from "../../components/Button";

import { ScrollArea, ScrollBar } from "../../components/ui/ScrollArea";
import QuestionCard from "../../components/QuestionCard";
import { Textarea } from "../../components/ui/TextArea";
@injectable()
export class ChatWidget extends ReactWidget {
  static readonly ID = "Chat-widget";
  static readonly LABER = "Chat Left";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = ChatWidget.ID;
    this.title.label = ChatWidget.LABER;
    this.title.caption = ChatWidget.LABER;
    this.title.closable = true;
    this.update();
  }

  render(): React.ReactNode {
    return (
      <div>
        <ScrollArea className="w-full h-full overflow-y-auto pb-2">
          <ScrollBar orientation="vertical" />

          <div className="flex items-center sticky dark:bg-zinc-950 bg-white  top-0 z-20 gap-[5px] border-b py-2.5 px-2 dark:border-zinc-900 border-zinc-200 justify-center">
            <Button
              label="Discuss"
              className="dark:border-cyan-900 bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-950  border-cyan-300 text-cyan-700"
            />
            <Button label="Suggest" />
            <Button label="Checks" />
          </div>
          <div className="space-y-2.5   px-5 py-2.5">
            <QuestionCard isAudio />
            <QuestionCard isImage />
            <QuestionCard />

            <QuestionCard />
            <QuestionCard />
            <QuestionCard />

            <div className=" absolute bottom-0 pt-4 pb-[11px] bg-white dark:bg-zinc-950 w-full left-0 px-5">
              <div className="relative">
                <Textarea
                  className="h-20"
                  placeholder="Ask AI Bot some questions"
                />
                <div className="flex absolute bottom-2.5 right-2.5 items-center gap-2.5">
                  <Button
                    size="icon"
                    className="dark:bg-cyan-500 bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-400 text-zinc-800 dark:text-black  dark:border-cyan-700"
                    icon={
                      <IconPhoto size={12} stroke={2} strokeLinejoin="miter" />
                    }
                  />
                  <Button
                    size="icon"
                    className="dark:bg-cyan-500 bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-400 text-zinc-800 dark:text-black  dark:border-cyan-700"
                    icon={
                      <IconMicrophone
                        size={12}
                        stroke={2}
                        strokeLinejoin="miter"
                      />
                    }
                  />
                  <Button
                    size="icon"
                    className="dark:bg-cyan-500 bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-400 text-zinc-800 dark:text-black  dark:border-cyan-700"
                    icon={
                      <IconPhoto size={12} stroke={2} strokeLinejoin="miter" />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }
}

@injectable()
export class ChatContribution
  extends AbstractViewContribution<ChatWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: ChatWidget.ID,
      widgetName: ChatWidget.LABER,
      defaultWidgetOptions: {
        area: "right",
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
