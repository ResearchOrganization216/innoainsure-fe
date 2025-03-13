import { classNames } from "primereact/utils";

export const Calendar = {
  root: ({ props }) => ({
    className: classNames("  max-w-full relative", {
      "opacity-60 select-none pointer-events-none cursor-default":
        props.disabled,
    }),
  }),
  panel: ({ props }) => ({
    className: classNames("bg-white w-fit", {
      "shadow-md border-0 absolute": !props.inline,
      "inline-block overflow-x-auto border border-gray-300  p-2 rounded-lg":
        props.inline,
    }),
  }),
  dropdownButton: {
    root: ({ props }) => ({
      className: classNames({
        "rounded-l-none !pl-[14px] !pr-[7px] !h-[45px] bg-white border-primary-border !text-[#324356]":
          props.icon,
      }),
    }),
  },
  input: {
    root: ({ parent }) => ({
      className: classNames({
        "rounded-[2px]": !parent.props.showIcon,
        "border-r rounded-r-none": parent.props.showIcon,
      }),
    }),
  },
  header: {
    className: classNames(
      "flex items-center justify-between",
      "px-2 text-gray-700 bg-white  font-semibold m-0 border-b border-gray-300 rounded-t-lg",
    ),
  },
  monthTitle: {
    className: classNames(
      "text-gray-700  transition duration-200 font-semibold p-2",

      "hover:text-blue-500",
    ),
  },
  table: {
    className: classNames("border-collapse w-full", "px-2"),
  },
  tablebody: {
    className: classNames("border-collapse w-full", "px-2"),
  },
  tableHeaderCell: "p-2",
  weekday: "text-gray-600 ",
  day: "p-1",
  previousButton: {
    className: classNames(
      "flex items-center justify-center cursor-pointer overflow-hidden relative",
      "w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
      "hover:text-gray-700 hover:border-transparent hover:bg-gray-200",
    ),
  },
  title: "leading-8 mx-auto",
  yearTitle: {
    className: classNames(
      "text-gray-700 transition duration-200 font-semibold p-2",
      "hover:text-blue-500",
    ),
  },
  nextButton: {
    className: classNames(
      "flex items-center justify-center cursor-pointer overflow-hidden relative",
      "w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
      "hover:text-gray-700 hover:border-transparent hover:bg-gray-200 ",
    ),
  },
  dayLabel: ({ context }) => ({
    className: classNames(
      "w-10 h-10 rounded-full transition-shadow duration-200 border-transparent border",
      "flex items-center justify-center mx-auto overflow-hidden relative",
      "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]",
      {
        "opacity-60 cursor-default": context.disabled,
        "cursor-pointer": !context.disabled,
      },
      {
        "text-gray-600 bg-transprent hover:bg-gray-200":
          !context.selected && !context.disabled,
        "text-blue-700 bg-blue-100 hover:bg-blue-200":
          context.selected && !context.disabled,
      },
    ),
  }),
  monthPicker: "my-2",
  month: ({ context }) => ({
    className: classNames(
      "w-1/3 inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
      "p-2 transition-shadow duration-200 rounded-lg",
      "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] ",
      {
        "text-gray-600  bg-transprent hover:bg-gray-200 ":
          !context.selected && !context.disabled,
        "text-blue-700 bg-blue-100 hover:bg-blue-200":
          context.selected && !context.disabled,
      },
    ),
  }),
  yearPicker: {
    className: classNames("my-2"),
  },
  year: ({ context }) => ({
    className: classNames(
      "w-1/2 inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
      "p-2 transition-shadow duration-200 rounded-lg",
      "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]",
      {
        "text-gray-600 bg-transprent hover:bg-gray-200":
          !context.selected && !context.disabled,
        "text-blue-700 bg-blue-100 hover:bg-blue-200":
          context.selected && !context.disabled,
      },
    ),
  }),
  timePicker: {
    className: classNames(
      "flex justify-center items-center",
      "border-t-1 border-solid border-gray-300 p-2",
    ),
  },
  separatorContainer: "flex items-center flex-col px-2",
  separator: "text-xl",
  hourPicker: "flex items-center flex-col px-2",
  minutePicker: "flex items-center flex-col px-2",
  ampmPicker: "flex items-center flex-col px-2",
  incrementButton: {
    className: classNames(
      "flex items-center justify-center cursor-pointer overflow-hidden relative",
      "w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
      "hover:text-gray-700  hover:border-transparent hover:bg-gray-200",
    ),
  },
  decrementButton: {
    className: classNames(
      "flex items-center justify-center cursor-pointer overflow-hidden relative",
      "w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out",
      "hover:text-gray-700 hover:border-transparent hover:bg-gray-200",
    ),
  },
  groupContainer: "flex",
  group: {
    className: classNames(
      "flex-1 ",
      "border-l border-gray-300 pr-0.5 pl-0.5 pt-0 pb-0",
      "first:pl-0 first:border-l-0",
    ),
  },
};
