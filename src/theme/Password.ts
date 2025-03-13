import { classNames } from "primereact/utils";

const TRANSITIONS = {
  overlay: {
    enterFromClass: "opacity-0 scale-75",
    enterActiveClass:
      "transition-transform transition-opacity duration-150 ease-in",
    leaveActiveClass: "transition-opacity duration-150 ease-linear",
    leaveToClass: "opacity-0",
  },
};
export const Password = {
  root: () => ({
    className: classNames("w-full relative rounded-lg"),
  }),
  showicon: {
    className: classNames("absolute", "right-4 text-primary-gray "),
  },
  hideicon: {
    className: classNames("absolute", "right-4 text-primary-gray "),
  },
  panel: "p-5 bg-white text-gray-700 shadow-md rounded-md",
  meter: "mb-2 bg-gray-300 h-3",
  meterlabel: ({ state, props }) => ({
    className: classNames(
      "transition-width duration-1000 ease-in-out h-full",
      {
        "bg-red-500": state.meter?.strength == "weak",
        "bg-orange-500": state.meter?.strength == "medium",
        "bg-green-500": state.meter?.strength == "strong",
      },
      { "pr-[2.5rem] ": props.toggleMask },
    ),
  }),
  transition: TRANSITIONS.overlay,
};
