import { classNames } from "primereact/utils";

export const FieldSet = {
  root: {
    className: classNames(
      "border border-secondary-border bg-white text-gray-700 rounded-md block inline-size-min", // Borders, background, text color, spacing, and inline size.
    ),
  },
  legend: ({ props }) => ({
    className: classNames(
      "text-primary-black bg-white font-bold rounded-md font-normal",
      {
        "p-0 transition-none hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900":
          props.toggleable,
        "px-[10px] py-[2px] ml-3": !props.toggleable,
      },
    ),
  }),
  toggler: ({ props }) => ({
    className: classNames("flex items-center justify-center", {
      "p-5 text-gray-700 rounded-md transition-none cursor-pointer overflow-hidden relative select-none hover:text-gray-900 focus:focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)] ":
        props.toggleable,
    }),
  }),
  togglerIcon: "mr-2 inline-block", // Margin and display style.
  legendTitle: "flex items-center justify-center leading-none", // alignments, and leading style.
  content: "p-5", // Padding.
};
