import {
  FrontendApplicationContribution,
  WidgetFactory,
  bindViewContribution,
} from "@theia/core/lib/browser";
import { interfaces } from "@theia/core/shared/inversify";
import { AiSidebar, AiSidebarContribution } from "./AiSidebar";
import {
  MainEditorLeftContribution,
  MainEditorLeftWidget,
} from "./MainEditorLeft";
import { AudioWidget, AudioContribution } from "./AudioWidget";
import {
  MainEditorRightContribution,
  MainEditorRightWidget,
} from "./MainEditorRight";
import {
  BottomEditorLeft,
  BottomEditorLeftContribution,
} from "./BottomEditorLeft";
import {
  BottomEditorRightContribution,
  BottomEditorRightWidget,
} from "./BottomEditorRight";
import { ChatContribution, ChatWidget } from "./ChatWidget";
import { VideoContribution, VideoWidget } from "./Videowidget";
import { AudioPlayContribution, AudioPlayWidget } from "./AudioplayWidget";

export const bindAllWidgetsContributions = (bind: interfaces.Bind) => {
  // sidebar widget binds
  bindViewContribution(bind, AiSidebarContribution);
  bind(FrontendApplicationContribution).toService(AiSidebarContribution);
  bind(AiSidebar).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: AiSidebar.ID,
      createWidget: () => context.container.get<AiSidebar>(AiSidebar),
    }))
    .inSingletonScope();

  // left editor widget binds
  bindViewContribution(bind, MainEditorLeftContribution);
  bind(FrontendApplicationContribution).toService(MainEditorLeftContribution);
  bind(MainEditorLeftWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: MainEditorLeftWidget.ID,
      createWidget: () =>
        context.container.get<MainEditorLeftWidget>(MainEditorLeftWidget),
    }))
    .inSingletonScope();

  // right editor widget binds
  bindViewContribution(bind, MainEditorRightContribution);
  bind(FrontendApplicationContribution).toService(MainEditorRightContribution);
  bind(MainEditorRightWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: MainEditorRightWidget.ID,
      createWidget: () =>
        context.container.get<MainEditorRightWidget>(MainEditorRightWidget),
    }))
    .inSingletonScope();
  // Bottom Editor Left
  bindViewContribution(bind, BottomEditorLeftContribution);
  bind(FrontendApplicationContribution).toService(BottomEditorLeftContribution);
  bind(BottomEditorLeft).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: BottomEditorLeft.ID,
      createWidget: () =>
        context.container.get<BottomEditorLeft>(BottomEditorLeft),
    }))
    .inSingletonScope();

  // Bottom Editor Right
  bindViewContribution(bind, BottomEditorRightContribution);
  bind(FrontendApplicationContribution).toService(
    BottomEditorRightContribution
  );
  bind(BottomEditorRightWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: BottomEditorRightWidget.ID,
      createWidget: () =>
        context.container.get<BottomEditorRightWidget>(BottomEditorRightWidget),
    }))
    .inSingletonScope();

  // Audio widget binds
  bindViewContribution(bind, AudioContribution);
  bind(FrontendApplicationContribution).toService(AudioContribution);
  bind(AudioWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: AudioWidget.ID,
      createWidget: () => context.container.get<AudioWidget>(AudioWidget),
    }))
    .inSingletonScope();

  // chat widget binds
  bindViewContribution(bind, ChatContribution);
  bind(FrontendApplicationContribution).toService(ChatContribution);
  bind(ChatWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: ChatWidget.ID,
      createWidget: () => context.container.get<ChatWidget>(ChatWidget),
    }))
    .inSingletonScope();

  // Video widget binds
  bindViewContribution(bind, VideoContribution);
  bind(FrontendApplicationContribution).toService(VideoContribution);
  bind(VideoWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: VideoWidget.ID,
      createWidget: () => context.container.get<VideoWidget>(VideoWidget),
    }))
    .inSingletonScope();

  // Audio Play widget binds
  bindViewContribution(bind, AudioPlayContribution);
  bind(FrontendApplicationContribution).toService(AudioPlayContribution);
  bind(AudioPlayWidget).toSelf();
  bind(WidgetFactory)
    .toDynamicValue((context) => ({
      id: AudioPlayWidget.ID,
      createWidget: () =>
        context.container.get<AudioPlayWidget>(AudioPlayWidget),
    }))
    .inSingletonScope();
};
