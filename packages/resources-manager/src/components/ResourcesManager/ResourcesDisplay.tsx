import React, { useEffect, useState } from "@theia/core/shared/react";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import type { ConfigResourceValues } from "../../browser/resources/types";
import Search from "../ui/Search";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [activeButton, setActiveButton] = useState("download");
  const itemsPerPage = 7;

  useEffect(() => {
    resourceType.getTableDisplayData().then((data) => {
      setResourceTableData(data);
    });
  }, [resourceType]);

  const handleDownload = (resource: any) => {
    resourceType.downloadHandler(resource);
  };
  const startIndex = currentPage * itemsPerPage;

  // FILTER THE DATA BASED ON THE ACTIVE BUTTON

  const filteredData = resourceTableData.filter((resource) => {
    const isDownloaded = downloadedResources.some(
      (item) => item.id === resource.id
    );
    return activeButton === "download" ? isDownloaded : !isDownloaded;
  });

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const nextPage = () => {
    if (startIndex + itemsPerPage < resourceTableData.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  return (
    <div className="flex flex-col w-full">
      <div className="flex  p-2 gap-2 mb-3  justify-between mx-2">
        <div className="flex gap-1 p-1 rounded-lg bg-gray-300 border">
          <VSCodeButton
            title="Download Resource"
            className={`rounded-md duration-200 font-bold ${
              activeButton === "download"
                ? "hover:bg-cyan-200 dark:bg-cyan-950"
                : "bg-transparent"
            } `}
            onClick={() => {
              setActiveButton("download"), setCurrentPage(0);
            }}
          >
            Download Resource
          </VSCodeButton>
          <VSCodeButton
            title="Online Resource"
            className={`rounded-md duration-200 font-bold ${
              activeButton === "online"
                ? "hover:bg-cyan-200 dark:bg-cyan-950"
                : "bg-transparent"
            } `}
            onClick={() => {
              setActiveButton("online"), setCurrentPage(0);
            }}
          >
            Online Resource
          </VSCodeButton>
        </div>
        <div className="w-1/3  text-right items-center ">
          <Search
            className="border  border-gray-300"
            placeHolder="Search sjsjdhsj"
            HandleChange={(event) => {
              console.log(event.target.value, "check console");
            }}
          />
        </div>
      </div>
      <div className="flex flex-1 justify-between flex-col gap-2 mx-3 border rounded-md border-gray-300 pb-3  min-h-[55vh]  ">
        <table className="table-auto w-full border-b border-gray-300 p-10  ">
          <thead className="font-semibold pb-4 ">
            <tr
              className="py-3 border-b border-gray-300 "
              style={{ padding: "10px", paddingBottom: "10px" }}
            >
              <td className="px-4 py-2 w-1/4">Words</td>
              <td className="px-4 py-2 w-1/4">Owner</td>
              <td className="px-4 py-2 w-1/4">Versions</td>
              <td className="w-1/4"></td>
            </tr>
          </thead>

          <tbody className="gap-3">
            {paginatedData?.map((resource) => (
              <tr className="border-b border-gray-300 py-2">
                <td className="px-3">{resource.name}</td>

                <td className="px-4 py-2 w-1/4">
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
                  className="px-4 py-2 w-1/4"
                >
                  {resource.version.tag}
                </td>
                <td className="flex items-center justify-center px-4  py-2 w-1/4">
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
        <div className="flex justify-between items-end pt-3 w-full px-2 border-t border-gray-300">
          <VSCodeButton
            title="Previous Page"
            appearance="secondary"
            className="rounded-md border"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            Previous
          </VSCodeButton>
          <div className="font-semibold">
            Page {currentPage + 1} of {totalPages}
          </div>
          <VSCodeButton
            title="Next Page"
            appearance="secondary"
            className="rounded-md border"
            onClick={nextPage}
            disabled={startIndex + itemsPerPage >= filteredData.length}
          >
            Next
          </VSCodeButton>
        </div>
      </div>
    </div>
  );
};
export default ResourceTypeDisplay;
