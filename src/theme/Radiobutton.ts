import { classNames } from "primereact/utils";

export const Radiobutton = {
  root: {
    className: classNames(
      "relative inline-flex cursor-pointer select-none align-bottom",
      "w-6 h-6",
    ),
  },
  input: ({ props }) => ({
    className: classNames(
      "flex justify-center items-center",
      "border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out",
      {
        "border-[#02385B] bg-primary-red": !props.checked,
        "border-primary-blue bg-[#02385B]": props.checked,
      },
      {
        "hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]":
          !props.disabled,
        "cursor-default opacity-60": props.disabled,
      },
    ),
  }),
  icon: ({ props }) => ({
    className: classNames(
      "transform rounded-full",
      "block w-3 h-3 transition duration-200 bg-primary-red",
      {
        "backface-hidden scale-10 invisible": !props.checked,
        "transform scale-100 visible": props.checked,
      },
    ),
  }),
};
