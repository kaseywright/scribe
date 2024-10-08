import * as React from "@theia/core/shared/react";
import { ReactDialog } from "@theia/core/lib/browser/dialogs/react-dialog";
import { inject, injectable } from "@theia/core/shared/inversify";
import { DialogProps } from "@theia/core/lib/browser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resourcesGroups } from "./resources";
import ResourceTypeDisplay from "../components/ResourcesManager/ResourcesDisplay";

import { Message } from "@theia/core/lib/browser";

import { MessageService } from "@theia/core";
import {
  ConfigResourceValues,
  DownloadResourceUtils,
  ScribeResource,
} from "./resources/types";
import { registeredResources } from "./resources";
import { WorkspaceService } from "@theia/workspace/lib/browser/workspace-service";
import { FileService } from "@theia/filesystem/lib/browser/file-service";

import { ResourceManagerUtils } from "./utils";
import { ResourceViewerOpener } from "./resource-viewer/resource-viewer-opener";
@injectable()
export class ResourcePickerDialogProps extends DialogProps {}

@injectable()
export class ResourcesPickerWidget extends ReactDialog<void> {
  static readonly ID = "ResourcesPickerWidget";

  constructor(
    @inject(ResourcePickerDialogProps)
    protected override readonly props: ResourcePickerDialogProps
  ) {
    super({
      title: "Resources Picker",
    });
    // this.titleNode.className = "bg-grey-300 text-lg font-semibold";

    // this.titleNode.parentElement!.className =
    //   "bg-red-500 justify-between flex items-center p-2";
    // this.titleNode.parentElement!.innerHTML = "Parent";
  }

  private downloadedResources: ConfigResourceValues[] = [];

  @inject(ResourceViewerOpener)
  protected readonly resourceViewerOpener: ResourceViewerOpener;

  @inject(MessageService)
  protected readonly messageService: MessageService;

  @inject(WorkspaceService)
  protected readonly workspaceService: WorkspaceService;

  @inject(FileService)
  protected readonly fs: FileService;

  @inject(ResourceManagerUtils)
  protected readonly resourcesManagerUtils: ResourceManagerUtils;

  protected onAfterAttach(msg: Message): void {
    super.onAfterAttach(msg);
    this.resourcesManagerUtils
      .getDownloadedResourcesFromProjectConfig()
      .then((resources) => {
        this.downloadedResources = resources ?? [];
        this.update();
      });
  }

  get value(): any {
    console.log("value");
    return "value";
  }

  render(): React.ReactNode {
    const allUngroupedResources = resourcesGroups.flatMap(
      (group) => group.resources
    );

    const openHandler = async (
      resourceInfo: ConfigResourceValues,
      resource: ScribeResource
    ) => {
      if (!resource) {
        await this.messageService.error("Resource type not found");
        return;
      }

      this.close();

      await this.resourceViewerOpener.open(resourceInfo, {
        ...resource.openHandlers,
        id: resource.id,
      });
    };
    return (
      <div className="w-[90vw] h-[80vh] flex relative gap-3 justify-between">
        <Tabs
          defaultValue={allUngroupedResources[0].id}
          className="w-full flex"
        >
          <TabsList className="flex flex-col w-1/4 h-fit">
            {resourcesGroups.map((group) => (
              <div key={group.id} className="flex flex-col gap-2 w-full">
                <h1>{group.name}</h1>
                {group.resources.map((resource) => (
                  <TabsTrigger value={resource.id} asChild>
                    <button className="flex gap-2">
                      {resource.icon}
                      <span>{resource.displayLabel}</span>
                    </button>
                  </TabsTrigger>
                ))}
              </div>
            ))}
          </TabsList>
          <div className="w-3/4">
            {allUngroupedResources.map((resource) => (
              <TabsContent value={resource.id}>
                <ResourceTypeDisplay
                  resourceType={{
                    value: resource.id,
                    label: resource.displayLabel,
                    getTableDisplayData: resource.getTableDisplayData,
                    downloadHandler: <ResourceInfo extends {}>(
                      resourceInfo: ResourceInfo
                    ) =>
                      this._downloadResource(
                        resourceInfo,
                        resource.downloadResource
                      ),
                  }}
                  downloadedResources={this.downloadedResources}
                  openResource={(resourceInfo) =>
                    openHandler(resourceInfo, resource)
                  }
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    );
  }

  async _downloadResource<TResourceInfo>(
    resourceInfo: TResourceInfo,
    downloadHandler: (
      resourceInfo: TResourceInfo,
      { fs, resourceFolderUri }: DownloadResourceUtils
    ) => Promise<ConfigResourceValues>
  ) {
    try {
      const currentFolderURI = (await this.workspaceService.roots)?.[0]
        .resource;

      if (!currentFolderURI) {
        await this.messageService.error(
          "Please open a workspace folder to download resources"
        );
        return;
      }

      const fs = this.fs;

      const resourceFolderUri = currentFolderURI.withPath(
        currentFolderURI.path.join(".project", "resources")
      );

      const prog = await this.messageService.showProgress({
        text: "Downloading resource ...",
      });

      const downloadedResource = await downloadHandler(resourceInfo, {
        fs,
        resourceFolderUri,
      });

      prog.report({ message: "Updating the configuration" });

      const updatedDownloadedResourcePath = {
        ...downloadedResource,
        localPath: downloadedResource.localPath.includes(
          currentFolderURI.path.fsPath()
        )
          ? downloadedResource.localPath.replace(
              currentFolderURI.path.fsPath(),
              ""
            )
          : downloadedResource.localPath,
      };

      await this.resourcesManagerUtils.addDownloadedResourceToProjectConfig(
        updatedDownloadedResourcePath
      );

      this.update();
      prog.cancel();

      this.messageService.info("Resource downloaded successfully");
    } catch (error) {
      console.error(error);
      await this.messageService.error("Unable to download resource ...");
    }
  }
}
