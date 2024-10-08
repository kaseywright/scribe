import React, { useEffect, useState } from "@theia/core/shared/react";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import type { ConfigResourceValues } from "../../browser/resources/types";

const ResourceTypeDisplay = ({
  resourceType,
  downloadedResources,
  openResource,
}: {
  resourceType: {
    value: string;
    label: string;
    getTableDisplayData: () => Promise<any[]>; // TODO: type this
    downloadHandler: (resource: any) => void; // TODO: type this
  };

  downloadedResources: ConfigResourceValues[];

  openResource: (resource: ConfigResourceValues) => void;
}) => {
  const [resourceTableData, setResourceTableData] = useState<any[]>([]);

  useEffect(() => {
    resourceType.getTableDisplayData().then((data) => {
      setResourceTableData(data);
    });
  }, [resourceType]);

  const handleDownload = (resource: any) => {
    resourceType.downloadHandler(resource);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1>{resourceType.label}</h1>
      <h2>Online Resources</h2>
      <table className="table-auto w-full">
        <thead className="font-semibold">
          <tr>
            <td>Resource</td>
            <td>Owner</td>
            <td>Version</td>
            <td></td>
          </tr>
        </thead>

        <tbody className="gap-3">
          {resourceTableData?.map((resource) => (
            <tr>
              <td>{resource.name}</td>

              <td>
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
                title={`Released on : ${new Date(
                  resource.version.releaseDate
                ).toLocaleDateString()}`}
              >
                {resource.version.tag}
              </td>
              <td className="flex items-center justify-center px-2">
                {!downloadedResources.find(
                  (item) => item.id === resource.id
                ) ? (
                  <VSCodeButton
                    title="Download Resource"
                    appearance="secondary"
                    className="w-full"
                    onClick={() => handleDownload(resource)}
                  >
                    <i className="codicon codicon-cloud-download"></i>
                  </VSCodeButton>
                ) : (
                  <VSCodeButton
                    title="Open Resource"
                    appearance="primary"
                    className="w-full"
                    onClick={() =>
                      openResource(
                        downloadedResources.find(
                          (item) => item.id === resource.id
                        )!
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

export default ResourceTypeDisplay;
