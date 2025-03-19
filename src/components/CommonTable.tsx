import { NoItemsPerPage } from "@/constants/common";
import { PaginationState } from "@/models/PaginationState";
import { clsx } from "clsx";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { TabMenu } from "primereact/tabmenu";
import React, { Dispatch, Key, SetStateAction, useState } from "react";

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

interface TableProps {
  headers: { key: string; label: string }[];
  data: { [key: string]: any }[];
  customRenderers?: {
    [key: string]: (value: any, item: any) => React.ReactNode;
  };
  includeActions?: boolean;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onRowClick?: (row: any) => void;
  selection?: boolean;
  isSmallTable?: boolean;
  setPaginationState?: Dispatch<SetStateAction<PaginationState>>;
  setActiveTab?: Dispatch<SetStateAction<string>>;
  paginationState?: PaginationState;
  totalPages?: number;
  className?: string;
  itemCount?: boolean;
  endPage?: number;
  startPage?: number;
  totalItems?: number;
}

const TableCell: React.FC<TableCellProps> = ({ children, className }) => {
  return (
    <td
      className={`whitespace-nowrap px-6 py-4 text-sm text-gray-500 ${className}`}
    >
      {children}
    </td>
  );
};

const CommonTable: React.FC<TableProps> = ({
  headers,
  data,
  customRenderers,
  includeActions,
  onEdit,
  onDelete,
  onRowClick,
  selection,
  setPaginationState,
  setActiveTab,
  isSmallTable = false,
  paginationState,
  totalPages,
  className = "pr-8",
  itemCount,
  endPage,
  startPage,
  totalItems,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const itemRenderer = (item, itemIndex, type) => (
    <a
      className={`p-menuitem-link align-items-center flex gap-2 px-4 pb-3 ${
        itemIndex === activeIndex ? "border-b-[3px] border-primary-blue" : " "
      } `}
      onClick={() => {
        setActiveIndex(itemIndex);
        if (setActiveTab && type === "Agent") {
          setActiveTab(AGENT_TAB);
        } else if (setActiveTab && type === "Institute") {
          setActiveTab(INSTITUTION_TAB);
        }
      }}
    >
      <span
        className={`font-bold ${
          itemIndex === activeIndex ? "text-[#02385B]" : "text-[#848484]"
        } `}
      >
        {item.label}
      </span>
      {itemCount && (
        <div
          className={`h-[26px] w-[26px] rounded-full border text-center text-[13px] font-bold text-white ${
            itemIndex === activeIndex ? "bg-[#658CEF]" : "bg-[#87A5B9]"
          }`}
        >
          {item.count}
        </div>
      )}
    </a>
  );

  const menuItems = [
    {
      label: "Agent",
      count: 4,
      template: (item) => itemRenderer(item, 0, "Agent"),
    },
    {
      label: "Institutional",
      count: 8,
      template: (item) => itemRenderer(item, 1, "Institute"),
    },
  ];
  return (
    <div
      className={clsx("relative mt-6 ", className, {
        "h-[calc(100vh-355px)] 2xl:h-[calc(100vh-400px)]": !isSmallTable,
        "h-[calc(100vh-436px)] 2xl:h-[calc(100vh-550px)]": isSmallTable,
      })}
    >
      {selection && (
        <div>
          <TabMenu
            model={menuItems}
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          />
        </div>
      )}
      <div
        className={`${
          isSmallTable
            ? "min-h-[30vh]  md:max-h-[30vh] lg:max-h-[30vh]"
            : "max-h-[49vh] min-h-[45vh]"
        } overflow-x-auto`}
      >
        <div className="border-b border-primary-border">
          <table className="min-w-full divide-y divide-primary-border">
            <thead>
              <tr className="sticky top-0 z-10 bg-white pb-6">
                {headers.map((header) => (
                  <th
                    key={header.key}
                    scope="col"
                    className="px-6 py-4 text-left font-bold text-primary-text first:pl-0 last:text-center"
                  >
                    {header.label}
                  </th>
                ))}
                {includeActions && (
                  <th
                    scope="col"
                    className="px-6 py-4 text-center font-bold text-primary-text first:pl-0"
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-border bg-white text-primary-text">
              {data?.map((item, idx: Key) => (
                <tr key={idx} onClick={() => onRowClick && onRowClick(item)}>
                  {headers.map((header) => {
                    const value = item[header.key];
                    const customRenderer = customRenderers?.[header.key];
                    return (
                      <TableCell
                        key={header.key}
                        className="max-w-[200px] text-wrap text-primary-text first:pl-0 last:text-center"
                      >
                        {customRenderer ? customRenderer(value, item) : value}
                      </TableCell>
                    );
                  })}
                  {includeActions && (
                    <TableCell className="flex  justify-center  text-primary-text first:pl-0">
                      {/* Action buttons */}
                      <div className="flex space-x-2">
                        {onEdit && (
                          <div
                            title="Edit User"
                            className="cursor-pointer rounded border border-primary-blue px-3 py-2 hover:bg-blue-50"
                            onClick={() => onEdit && onEdit(item)}
                          >
                            <i className="pi pi-pencil" />
                          </div>
                        )}
                        {onDelete && (
                          <div
                            title="Delete User"
                            className="cursor-pointer rounded border border-primary-blue px-3 py-2 hover:bg-blue-50"
                            onClick={() => onDelete && onDelete(item)}
                          >
                            <i className="pi pi-trash" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between pb-5 pt-5">
        <div
          className="flex items-center"
          style={{ justifyContent: "flex-start" }}
        >
          <span className=" text-[12px] text-primary-text">
            Items per page:
          </span>
          <Dropdown
            value={paginationState?.selectedItemsPerPage}
            onChange={(e) =>
              setPaginationState &&
              setPaginationState((prevState) => ({
                ...prevState,
                selectedItemsPerPage: e.value,
                currentPage: 1,
              }))
            }
            options={NoItemsPerPage}
            optionLabel="name"
            placeholder="Select"
            pt={{
              root: {
                className:
                  "!border-[1px] !rounded-[5px] !border-primary-border !focus:ring-0 mx-3 !w-[90px] !h-[30px] items-center",
              },
              input: {
                className: "!text-right !text-sm",
              },
              trigger: {
                className: "!ml-[-150px]",
              },
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span>
            {startPage}-{endPage} of {totalItems}
          </span>

          <Button
            onClick={() =>
              setPaginationState &&
              setPaginationState((prevState) => ({
                ...prevState,
                currentPage: prevState.currentPage - 1,
              }))
            }
            disabled={paginationState?.currentPage === 1}
          >
            {"<"}
          </Button>
          <Button
            onClick={() =>
              setPaginationState &&
              setPaginationState((prevState) => ({
                ...prevState,
                currentPage: prevState.currentPage + 1,
              }))
            }
            disabled={paginationState?.currentPage === totalPages}
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommonTable;
