import { classNames } from "primereact/utils";

export const TabMenu = {
  root: "overflow-x-auto",
  menu: {
    className: classNames(
      "flex m-0 p-0 list-none flex-nowrap",
      "bg-white border-solid border-gray-300 border-b-2",
      "outline-none no-underline text-base list-none",
    ),
  },
  menuitem: "mr-0",
  action: ({ context, parent }) => ({
    className: classNames(
      "cursor-pointer select-none flex items-center relative no-underline overflow-hidden",
      "border-b-2 p-5 font-bold rounded-t-lg ",
      {
        "border-primary-border bg-white text-[#848484] hover:bg-white hover:text-gray-600":
          parent.state.activeIndex !== context.index, // Condition-based hover styles.
        "bg-white border-primary-blue border-b-[3px] text-primary-blue":
          parent.state.activeIndex === context.index, // Condition-based active styles.
      },
    ),
    style: { top: "2px" },
  }),
  icon: "mr-2",
};
