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
    getTableDisplayData: (search?: string) => Promise<any[]>; // TODO: type this
    downloadHandler: (resource: any) => void; // TODO: type this
  };

  downloadedResources: ConfigResourceValues[];

  openResource: (resource: ConfigResourceValues) => void;
}) => {
  const [resourceTableData, setResourceTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");
  const [activeButton, setActiveButton] = useState("download");
  const [itemsPerPage, setItemPerPage] = useState(7);

  useEffect(() => {
    resourceType.getTableDisplayData(searchTerm).then((data) => {
      setResourceTableData(data);
    });
  }, [searchTerm, resourceType]);

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
    <div className="flex flex-col w-full ">
      <div className="flex  p-2 gap-2 mb-3  justify-between mx-2">
        <div className="flex gap-1 p-1 rounded-lg ">
          <VSCodeButton
            title="Download"
            className={`rounded-lg duration-200 downloadButton  font-extrabold border ${
              activeButton === "download"
                ? "text-cyan-700 border-cyan-800 bg-cyan-950"
                : "bg-transparent"
            } `}
            onClick={() => {
              setActiveButton("download"), setCurrentPage(0);
            }}
          >
            DOWNLOAD
          </VSCodeButton>
          <VSCodeButton
            title="Online "
            className={`rounded-lg duration-200 downloadButton  font-extrabold border ${
              activeButton === "online"
                ? "text-cyan-700 border-cyan-800 bg-cyan-950"
                : "bg-transparent"
            } `}
            onClick={() => {
              setActiveButton("online"), setCurrentPage(0);
            }}
          >
            ONLINE
          </VSCodeButton>
        </div>
        <div className="w-1/3  text-right items-center ">
          <Search
            className="border  border-gray-300"
            placeHolder="Search sjsjdhsj"
            HandleChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-1 justify-between flex-col  gap-2 mx-3 border rounded-md border-gray-300 pb-3  min-h-[55vh]  ">
        <div className="max-h-[50vh] overflow-scroll">
          <table className="table-auto w-full border-b border-gray-300 p-10  ">
            <thead className="font-semibold pb-4 ">
              <tr
                className="py-3 border-b border-gray-300 sticky "
                style={{ padding: "10px", paddingBottom: "10px" }}
              >
                <td className="px-4 py-2 w-1/4">Words</td>
                <td className="px-4 py-2 w-1/4">Owner</td>
                <td className="px-4 py-2 w-1/4">Versions</td>
                <td className="w-1/4"></td>
              </tr>
            </thead>

            <tbody className="gap-3  ">
              {paginatedData.length > 0 ? (
                paginatedData?.map((resource) => (
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
                          className="w-full flex justify-center"
                          onClick={() => handleDownload(resource)}
                        >
                          <i className="codicon codicon-cloud-download"></i>
                        </VSCodeButton>
                      ) : (
                        <VSCodeButton
                          title="Open Resource"
                          appearance="primary"
                          className="w-full bg-cyan-950 flex justify-center"
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
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No Resources available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-2 items-center pt-3 w-full px-2 border-t border-gray-300">
          <div className="flex items-center justify-center gap-1 mr-7">
            <h1 className="font-semibold">Rows per page</h1>
            <select
              name="select"
              onChange={(value) => {
                setItemPerPage(Number(value.target.value));
                setCurrentPage(0);
              }}
              id="2"
              className="rounded-md flex items-center text-center justify-center bg-gray-800 border p-1"
            >
              <option>7</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="font-semibold">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <VSCodeButton
              title="Previous Page"
              appearance="secondary"
              className="rounded-md border"
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              &#10094;{" "}
            </VSCodeButton>
            <VSCodeButton
              title="Next Page"
              appearance="secondary"
              className="rounded-md border"
              onClick={nextPage}
              disabled={startIndex + itemsPerPage >= filteredData.length}
            >
              &#10095;
            </VSCodeButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResourceTypeDisplay;
