import { classNames } from "primereact/utils";

export const Button = {
  root: ({ props, context }) => ({
    className: classNames(
      "items-center gap-2 justify-center cursor-pointer inline-flex overflow-hidden text-[12px] relative select-none text-center align-bottom h-fit",
      "transition duration-200 ease-in-out",
      "focus:outline-none focus:outline-offset-0",
      {
        "border ":
          !props.link &&
          props.severity === null &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        "text-blue-600 bg-transparent border-transparent ": props.link,
        "text-white bg-primary-blue border-primary-blue ": !context.disabled,
      },
      {
        "text-white bg-primary-blackButton hover:bg-gray-700 ":
          props.severity === "secondary" &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        "text-white dark:text-gray-900 bg-green-500 dark:bg-green-400 border border-green-500 dark:border-green-400 hover:bg-green-600 dark:hover:bg-green-500 hover:border-green-600 dark:hover:border-green-500":
          props.severity === "success" &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        "text-white dark:text-gray-900 dark:bg-blue-400 bg-blue-500 dark:bg-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500":
          props.severity === "info" &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        "text-white dark:text-gray-900 bg-orange-500 dark:bg-orange-400 border border-orange-500 dark:border-orange-400 hover:bg-orange-600 dark:hover:bg-orange-500 hover:border-orange-600 dark:hover:border-orange-500":
          props.severity === "warning" &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        "text-white dark:text-gray-900 bg-purple-500 dark:bg-purple-400 border border-purple-500 dark:border-purple-400 hover:bg-purple-600 dark:hover:bg-purple-500 hover:border-purple-600 dark:hover:border-purple-500":
          props.severity === "help" &&
          !props.text &&
          !props.outlined &&
          !props.plain,
        "text-white dark:text-gray-900 bg-red-500 dark:bg-red-400 border border-red-500 dark:border-red-400 hover:bg-red-600 dark:hover:bg-red-500 hover:border-red-600 dark:hover:border-red-500":
          props.severity === "danger" &&
          !props.text &&
          !props.outlined &&
          !props.plain,
      },
      { "shadow-lg": props.raised },
      { "rounded-[5px]": !props.rounded, "rounded-full": props.rounded },
      {
        "bg-transparent border-transparent": props.text && !props.plain,
        "text-blue-500 dark:text-blue-400 hover:bg-blue-300/20":
          props.text &&
          (props.severity === null || props.severity === "info") &&
          !props.plain,
        "text-gray-500 dark:text-grayy-400 hover:bg-gray-300/20":
          props.text && props.severity === "secondary" && !props.plain,
        "text-green-500 dark:text-green-400 hover:bg-green-300/20":
          props.text && props.severity === "success" && !props.plain,
        "text-orange-500 dark:text-orange-400 hover:bg-orange-300/20":
          props.text && props.severity === "warning" && !props.plain,
        "text-purple-500 dark:text-purple-400 hover:bg-purple-300/20":
          props.text && props.severity === "help" && !props.plain,
        "text-red-500 dark:text-red-400 hover:bg-red-300/20":
          props.text && props.severity === "danger" && !props.plain,
      },
      { "shadow-lg": props.raised && props.text },
      {
        "text-gray-500 hover:bg-gray-300/20": props.plain && props.text,
        "text-gray-500 border border-gray-500 hover:bg-gray-300/20":
          props.plain && props.outlined,
        "text-white bg-gray-500 border border-gray-500 hover:bg-gray-600 hover:border-gray-600":
          props.plain && !props.outlined && !props.text,
      },
      {
        "bg-transparent border border-primary-blue":
          props.outlined && !props.plain,
        "!text-primary-blue border border-primary-blue  hover:bg-blue-300/20":
          props.outlined &&
          (props.severity === null || props.severity === "info") &&
          !props.plain,
        "text-gray-500 dark:text-gray-400 border border-gray-500 dark:border-gray-400 hover:bg-gray-300/20":
          props.outlined && props.severity === "secondary" && !props.plain,
        "text-green-500 dark:text-green-400 border border-green-500 dark:border-green-400 hover:bg-green-300/20":
          props.outlined && props.severity === "success" && !props.plain,
        "text-orange-500 dark:text-orange-400 border border-orange-500 dark:border-orange-400 hover:bg-orange-300/20":
          props.outlined && props.severity === "warning" && !props.plain,
        "text-purple-500 dark:text-purple-400 border border-purple-500 dark:border-purple-400 hover:bg-purple-300/20":
          props.outlined && props.severity === "help" && !props.plain,
        "text-red-500 dark:text-red-400 border border-red-500 dark:border-red-400 hover:bg-red-300/20":
          props.outlined && props.severity === "danger" && !props.plain,
      },
      {
        "px-4 py-[10px] text-sm": props.size === null,
        "text-xs py-2 px-3": props.size === "small",
        " py-4 px-4": props.size === "large",
      },
      { "flex-column": props.iconPos == "top" || props.iconPos == "bottom" },
      {
        "bg-[#021B1D] shadow-none text-[#8A8AA1] bg-opacity-[0.03] pointer-events-none cursor-default":
          context.disabled,
      },
    ),
  }),
  label: ({ props }) => ({
    className: classNames(
      "flex-1",
      "duration-200",
      "font-bold text-base",
      {
        "hover:underline": props.link,
      },
      { "invisible w-0": props.label == null },
    ),
  }),
};
