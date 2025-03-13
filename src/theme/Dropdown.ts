import { classNames } from "primereact/utils";

export const Dropdown = {
  root: ({ props }) => ({
    className: classNames(
      "cursor-pointer inline-flex relative select-none h-[45px] items-center",
      "bg-white border border-primary-border  transition-colors duration-200 ease-in-out rounded-md",
      "hover:border-primary-blue focus:outline-none focus:outline-offset-0",
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
    ),
  }),
  input: ({ props }) => ({
    className: classNames(
      "cursor-pointer block min-w-[200px] flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative",
      "bg-transparent border-0 text-gray-800",
      "p-3 transition duration-200 bg-transparent rounded appearance-none font-sans text-sm",
      "focus:outline-none focus:shadow-none",
      { "pr-7": props.showClear },
    ),
  }),
  trigger: {
    className: classNames(
      "flex items-center justify-center shrink-0",
      "bg-transparent text-gray-700 w-12 rounded-tr-lg rounded-br-lg",
    ),
  },
  wrapper: {
    className: classNames(
      "max-h-[200px] overflow-auto",
      "bg-white text-gray-700 border-0 rounded-md shadow-lg",
    ),
  },
  list: "py-3 list-none m-0",
  item: ({ context }) => ({
    className: classNames(
      "cursor-pointer font-normal overflow-hidden relative whitespace-nowrap",
      "m-0 p-3 border-0  transition-shadow duration-200 rounded-none",
      "hover:text-gray-700 hover:bg-gray-200",
      {
        "text-gray-700": !context.focused && !context.selected,
        "bg-gray-300 text-gray-700 ": context.focused && !context.selected,
        "bg-blue-400 !text-primary-blue ": context.focused && context.selected,
        "bg-blue-50 !text-primary-blue ": !context.focused && context.selected,
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },
    ),
  }),
  itemgroup: {
    className: classNames(
      "m-0 p-3 text-gray-800 bg-white font-bold",
      "cursor-auto",
    ),
  },
  header: {
    className: classNames(
      "p-3 border-b border-gray-300 text-gray-700 bg-gray-100 mt-0 rounded-tl-lg rounded-tr-lg",
    ),
  },
  filtercontainer: "relative",
  filterinput: {
    className: classNames(
      "pr-7 -mr-7",
      "w-full",
      "font-sans text-base text-gray-700 bg-white py-3 px-3 border border-primary-blue transition duration-200 rounded-lg appearance-none",
      "hover:border-blue-500",
    ),
  },
  filtericon: "-mt-2 absolute top-1/2",
  clearicon: "text-gray-500 right-12 -mt-2 absolute top-1/2",
  // transition: TRANSITIONS.overlay //commented to commit
};
