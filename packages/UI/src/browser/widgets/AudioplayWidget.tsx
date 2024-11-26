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
import { Badge } from "../../components/ui/Badge";
import {
  IconMicrophone,
  IconMinus,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlus,
  IconRefresh,
  IconSettings,
  IconTrashX,
} from "@tabler/icons-react";
import Button from "../../components/Button";
import ButtonGroups from "../../components/ButtonGroup";

@injectable()
export class AudioPlayWidget extends ReactWidget {
  static readonly ID = "Audio-play-widget";
  static readonly LABER = "Audio";

  @postConstruct()
  protected init(): void {
    this.doInit();
  }

  protected async doInit(): Promise<void> {
    this.id = AudioPlayWidget.ID;
    this.title.label = AudioPlayWidget.LABER;
    this.title.caption = AudioPlayWidget.LABER;
    this.title.closable = true;
    this.update();
  }

  render(): React.ReactNode {
    return (
      <div className="">
        <div className=" h-[30%]  border-t border-zinc-200 dark:border-zinc-900 ">
          <ButtonGroups />
          {/* <IconAudio className="fill-zinc-100  w-[100vw]  dark:stroke-zinc-800 dark:fill-zinc-800 " /> */}

          <div className="flex">
            <div className="2xl:w-[15%] w-[20%] flex flex-col gap-4 items-center ">
              <span className="uppercase leading-3 dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium ">
                Audio
              </span>
              costom select
              {/* <CustomSelect
                options={sources}
                placeholder="Source"
                triggerClassName="w-fit h-5 uppercase gap-1 text-[10px] bg-cyan-400 text-zinc-50 rounded-full"
              /> */}
            </div>
            <div className="w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700" />
            <div className="2xl:w-[15%] w-[20%] flex flex-col gap-4 items-center ">
              <span className="uppercase leading-3 dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium ">
                Speed
              </span>
              speed select
              {/* <CustomSelect
                options={speeds}
                placeholder="2x"
                triggerClassName="w-fit h-5 uppercase gap-1 text-[10px] bg-cyan-400 text-zinc-50 rounded-full"
              /> */}
            </div>
            <div className="w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700" />
            <div className="2xl:w-[40%] w-[50%] flex justify-between gap-7 px-16">
              <div className="space-y-2">
                <p className="uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium ">
                  Rewind
                </p>
                <Button
                  className="rounded-lg"
                  icon={
                    <IconRefresh size={14} stroke={2} strokeLinejoin="miter" />
                  }
                />
              </div>
              <div className="space-y-2">
                <p className="uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium ">
                  Record
                </p>
                <Button
                  className="rounded-lg"
                  icon={
                    <IconMicrophone
                      size={14}
                      stroke={2}
                      strokeLinejoin="miter"
                    />
                  }
                />
              </div>
              <div className="space-y-2">
                <p className="uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium ">
                  Play
                </p>
                <Button
                  className="dark:bg-cyan-500 rounded-lg bg-cyan-400 hover:bg-cyan-500 dark:hover:bg-cyan-400 text-zinc-800 dark:text-zinc-50  dark:border-cyan-700"
                  icon={
                    <IconPlayerPlay
                      size={14}
                      stroke={2}
                      strokeLinejoin="miter"
                    />
                  }
                />
              </div>
              <div className="space-y-2">
                <p className="uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium ">
                  Pause
                </p>
                <Button
                  className="rounded-lg"
                  icon={
                    <IconPlayerPause
                      size={14}
                      stroke={2}
                      strokeLinejoin="miter"
                    />
                  }
                />
              </div>
              <div className="space-y-2">
                <p className="uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium ">
                  Delete
                </p>
                <Button
                  className="rounded-lg"
                  icon={
                    <IconTrashX size={14} stroke={2} strokeLinejoin="miter" />
                  }
                />
              </div>
              <div className="space-y-4">
                <p className="uppercase dark:text-zinc-500 text-zinc-400 text-[10px] text-center  font-medium ">
                  Volume
                </p>
                <span className="flex items-center gap-x-2">
                  <IconMinus
                    size={14}
                    stroke={2}
                    strokeLinejoin="miter"
                    className="cursor-pointer dark:text-zinc-50 text-zinc-700"
                  />
                  <span className="bg-white rounded-full h-2 w-40 border relative">
                    <span className="bg-cyan-400 rounded-full h-2 w-[70%] absolute  -bottom-[1px] -left-[1px]"></span>
                  </span>
                  <IconPlus
                    size={14}
                    stroke={2}
                    strokeLinejoin="miter"
                    className="cursor-pointer dark:text-zinc-50 text-zinc-700"
                  />
                </span>
              </div>
            </div>
            <div className="w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700" />
            <div className="2xl:w-[20%] w-[25%] flex flex-col gap-4 items-center ">
              <span className="uppercase leading-3 dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium ">
                Takes
              </span>
              <div className="flex items-center gap-[10px]">
                <Button
                  className="dark:bg-green-500 rounded-full min-w-7 max-w-7 h-7 bg-green-400 hover:bg-green-500 dark:hover:bg-green-400 text-zinc-800 dark:text-zinc-50  dark:border-green-700"
                  label="A"
                />
                <Button
                  className="dark:bg-white border-cyan-400 rounded-full min-w-7 max-w-7 h-7 bg-white hover:bg-green-500  text-zinc-800 dark:text-black  dark:border-cyan-400"
                  label="B"
                />
                <Button
                  className="dark:bg-white border-cyan-400 rounded-full min-w-7 max-w-7 h-7 bg-white hover:bg-green-500  text-zinc-800 dark:text-black  dark:border-cyan-400"
                  label="C"
                />
              </div>
            </div>
            <div className="w-[1px] h-7 mt-auto bg-gray-300 dark:bg-zinc-700" />

            <div className="2xl:w-[10%] w-[15%] flex flex-col gap-4 items-center  ">
              <p className="uppercase dark:text-zinc-500 text-zinc-400 text-[10px]   font-medium ">
                Settings
              </p>
              <IconSettings
                size={24}
                stroke={2}
                strokeLinejoin="miter"
                className="dark:text-zinc-50 text-zinc-500"
              />
            </div>
          </div>
          <div className="p-5 flex items-center justify-end">
            <Badge className="h-4 max-h-4">saved 5 mins ago</Badge>
          </div>
        </div>
      </div>
    );
  }
}

@injectable()
export class AudioPlayContribution
  extends AbstractViewContribution<AudioPlayWidget>
  implements FrontendApplicationContribution
{
  @inject(FrontendApplicationStateService)
  protected readonly stateService: FrontendApplicationStateService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  constructor() {
    super({
      widgetId: AudioPlayWidget.ID,
      widgetName: AudioPlayWidget.LABER,
      defaultWidgetOptions: {
        area: "bottom",
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
