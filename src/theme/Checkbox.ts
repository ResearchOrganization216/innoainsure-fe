import { classNames } from "primereact/utils";

export const Checkbox = {
  root: {
    className: classNames(
      "cursor-pointer inline-flex relative select-none align-bottom",
      "w-6 h-6",
    ),
  },
  input: {
    className: classNames(
      "absolute appearance-none top-0 left-0 size-full p-0 m-0 opacity-0 z-10 outline-none cursor-pointer",
    ),
  },
  box: ({ props, context }) => ({
    className: classNames(
      "flex items-center justify-center",
      "border-2 w-6 h-6 text-gray-600 rounded-sm transition-colors duration-200",
      {
        "border-primary-blue bg-white": !context.checked,
        "border-primary-blue border-[3px] p-2 bg-white": context.checked,
      },
      {
        "hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]":
          !props.disabled,
        "cursor-default opacity-60": props.disabled,
      },
    ),
  }),
  icon: "w-[26px] h-[14px] transition-all duration-200 border-primary-blue border-[8px]",
};
