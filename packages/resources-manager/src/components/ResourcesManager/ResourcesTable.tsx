import * as React from "@theia/core/shared/react";
import { DownloadedResource, ResourceDisplay } from "./types";

import {
  VSCodeButton,
  VSCodeDropdown,
  VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";
import { ConfigResourceValues } from "@/browser/resources/types";

declare module "react" {
  interface InputHTMLAttributes<T> extends React.HTMLAttributes<T> {
    webkitdirectory?: boolean;
  }
}

const { useEffect, useRef, useState } = React;

const ResourcesTable = ({
  resourcesTypes,
  downloadedResources,
  openResource,
}: {
  resourcesTypes: {
    value: string;
    label: string;
    getTableDisplayData: () => Promise<any[]>; // TODO: type this
    downloadHandler: (resource: any) => void; // TODO: type this
  }[];

  downloadedResources: ConfigResourceValues[];

  openResource: (resource?: ConfigResourceValues) => void;
}) => {
  const initRef = useRef(false);
  const [selectedResourceType, setSelectedResourceType] = useState<string>(
    resourcesTypes[0]?.value ?? ""
  );

  const [resourceTableData, setResourceTableData] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedResourceType || resourcesTypes.length === 0) {
      return;
    }

    const selectedResourceTypeData = resourcesTypes.find(
      (type) => type.value === selectedResourceType
    );

    if (selectedResourceTypeData) {
      selectedResourceTypeData.getTableDisplayData().then((data) => {
        setResourceTableData(data);
      });
    }
  }, [selectedResourceType]);

  useEffect(() => {
    if (resourcesTypes.length === 0) {
      return;
    }

    if (!initRef.current) {
      initRef.current = true;
      setSelectedResourceType(resourcesTypes[0].value);
      return;
    }
  }, [resourcesTypes]);

  const handleDownload = (
    resource: ResourceDisplay<Record<string, unknown>>
  ) => {
    const selectedResourceTypeData = resourcesTypes.find(
      (type) => type.value === selectedResourceType
    );

    if (selectedResourceTypeData) {
      selectedResourceTypeData.downloadHandler(resource);
    }
  };

  const { importedOfflineResource, handleImportResource, handleAddResource } =
    useImportOfflineResource();

  return (
    <div className="text-foreground">
      <div className="flex justify-between w-full">
        <span className="text-foreground">Filter Resources</span>
        <VSCodeDropdown
          className="w-1/2 bg-background border-muted"
          onInput={(e: any) => {
            setSelectedResourceType(
              (
                e.target as unknown as {
                  value: string;
                }
              ).value
            );
          }}
        >
          {resourcesTypes.map((type) => (
            <VSCodeOption onClick={() => setSelectedResourceType(type.value)}>
              {type.label}
            </VSCodeOption>
          ))}
        </VSCodeDropdown>
      </div>
      {importedOfflineResource ? (
        <div className="flex flex-col border border-muted rounded-md p-4 my-2">
          <h1 className="font-semibold text-foreground">Selected Resource:</h1>
          <div className="flex flex-col text-muted">
            <p>Name: {importedOfflineResource.metadata.name}</p>
            <p>ID: {importedOfflineResource.metadata.id}</p>
            <p>Version: {importedOfflineResource.metadata.version}</p>
            <p>Path: {importedOfflineResource.path}</p>
            <VSCodeButton
              onClick={() => handleAddResource(selectedResourceType)}
              className="bg-primary text-foreground"
            >
              <i className="codicon codicon-cloud-upload"></i>
            </VSCodeButton>
          </div>
        </div>
      ) : (
        <div className="flex justify-between mt-2">
          <div className="min-w-2 text-foreground">Import Resources</div>
          <VSCodeButton
            onClick={() => {
              handleImportResource({ selectedResourceType });
            }}
            className="min-w-28"
          >
            <i className="codicon codicon-cloud-upload"></i>
          </VSCodeButton>
        </div>
      )}
      <table className="table-auto w-full border-collapse">
        <thead className="font-semibold border-b border-muted">
          <tr>
            <td className="py-2">Resource</td>
            <td className="py-2">Owner</td>
            <td className="py-2">Version</td>
            <td className="py-2"></td>
          </tr>
        </thead>

        <tbody className="gap-3">
          {resourceTableData?.map((resource) => (
            <tr className="border-b border-muted">
              <td className="py-2">{resource.name}</td>
              <td className="py-2">
                {resource.owner.avatarUrl ? (
                  <img
                    src={resource.owner.avatarUrl}
                    alt={resource.owner.name}
                    className="w-8 h-8 rounded-lg object-contain"
                  />
                ) : (
                  resource.owner.name
                )}
              </td>
              <td
                className="py-2"
                title={`Released on : ${new Date(
                  resource.version.releaseDate
                ).toLocaleDateString()}`}
              >
                {resource.version.tag}
              </td>
              <td className="flex items-center justify-center px-2 py-2">
                {!downloadedResources.find(
                  (item) => item.id === resource.id
                ) ? (
                  <VSCodeButton
                    title="Download Resource"
                    appearance="secondary"
                    className="w-full bg-background"
                    onClick={() => handleDownload(resource)}
                  >
                    <i className="codicon codicon-cloud-download"></i>
                  </VSCodeButton>
                ) : (
                  <VSCodeButton
                    title="Open Resource"
                    appearance="primary"
                    className="w-full bg-primary"
                    onClick={() =>
                      openResource(
                        downloadedResources.find(
                          (item) => item.id === resource.id
                        )
                      )
                    }
                  >
                    <i className="codicon codicon-eye"></i>
                  </VSCodeButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const useImportOfflineResource = () => {
  const [importedOfflineResource, setImportedOfflineResource] = useState<{
    path: string;
    fsPath: string;
    metadata: {
      name: string;
      id: string;
      version: string;
      [x: string]: unknown;
    };
  } | null>(null);

  const handleImportResource = ({
    selectedResourceType,
  }: {
    selectedResourceType: string;
  }) => {
    // postMessage({
    //   type: MessageType.GET_OFFLINE_RESOURCE_IMPORT_URI,
    //   payload: {
    //     selectedResourceType,
    //   },
    // });
  };

  const handleAddResource = (selectedResourceType: string) => {
    // postMessage({
    //   type: MessageType.ADD_OFFLINE_RESOURCE,
    //   payload: {
    //     path: importedOfflineResource?.path,
    //     fsPath: importedOfflineResource?.fsPath,
    //     metadata: importedOfflineResource?.metadata,
    //     selectedResourceType: selectedResourceType,
    //   },
    // });
    setImportedOfflineResource(null);
  };

  useEffect(() => {
    // setMessageListeners((event) => {
    //   switch (event.data.type) {
    //     case MessageType.SET_OFFLINE_RESOURCE_IMPORT_URI:
    //       setImportedOfflineResource(event.data.payload ?? null);
    //       break;
    //   }
    // });
  }, []);

  return { importedOfflineResource, handleImportResource, handleAddResource };
};

export default ResourcesTable;
