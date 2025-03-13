import { classNames } from "primereact/utils";

export const Accordion = {
  root: "!mb-4",
  accordiontab: {
    root: "!mb-4",
    header: ({ props }) => ({
      className: classNames(
        {
          "select-none pointer-events-none cursor-default opacity-60":
            props?.disabled,
        }, // Condition
      ),
    }),
    headerAction: ({ context }) => ({
      className: classNames(
        "flex items-center cursor-pointer relative no-underline select-none", // Alignments
        "p-5 transition duration-200 ease-in-out rounded-t-md font-bold transition-shadow duration-200", // Padding and transition
        "border border-gray-300 text-gray-600", // Borders and colors
        "hover:border-gray-300 hover:bg-gray-200 hover:text-gray-800", // Hover
        {
          "rounded-br-md rounded-bl-md": !context.selected,
          "rounded-br-0 rounded-bl-0 text-gray-800 border-primary-blue":
            context.selected,
        }, // Condition
      ),
    }),
    headerIcon: "inline-block mr-2",
    headerTitle: "leading-none text-primary-blue text-[20px]",
    content: {
      className: classNames(
        "p-5 border border-primary-blue bg-white text-gray-700 border-t-0 rounded-tl-none rounded-tr-none rounded-br-lg rounded-bl-lg",
      ),
    },
  },
};
