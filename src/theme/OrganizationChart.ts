import { classNames } from "primereact/utils";

export const OrganizationChart = {
  table: "mx-auto my-0 border-spacing-0 border-separate",
  cell: "text-center align-top py-0 px-3",
  node: ({ context }) => {
    return {
      className: classNames(
        "relative inline-block bg-primary-blue border rounded-[15px] text-white text-[18px] font-bold p-5 min-h-[85px] min-w-[273px] h-auto ",
        {
          "border-secondary-yellow border-[5px]": context.selected,
          "border-gray-300": !context.selected,
        },
        "focus:border-secondary-yellow active:border-secondary-yellow", // Focus styles
      ),
    };
  },

  linecell: "text-center align-top py-0 px-3",
  linedown: {
    className: classNames(
      "mx-auto my-[2px] h-[60px] border-[4px] border-[#146796] border-dashed",
    ),
  },
  lineleft: ({ context }) => ({
    className: classNames(
      "text-center align-top py-0 px-3 rounded-none border-r border-gray-300 h-[52px]",
      {
        "border-t": context.lineTop,
      },
    ),
  }),
  lineright: ({ context }) => ({
    className: classNames(
      "text-center align-top py-0 px-3 rounded-none h-[52px]",
      {
        "border-t border-gray-300": context.lineTop,
      },
    ),
  }),
  nodecell: "text-center align-top py-0 px-3 ",
  nodetoggler: {
    className: classNames(
      "invisible absolute z-0 bottom-[-0.75rem] left-2/4 -ml-3 w-6 h-6 bg-inherit text-inherit border-[1px] border-secondary-border rounded-[2px] z-2 cursor-pointer no-underline select-none",
      "focus:border-secondary-blue", // Focus styles
    ),
  },
  nodetogglericon:
    "relative inline-block w-[8px] h-[8px] mb-3 text-primary-black z-0",
};
