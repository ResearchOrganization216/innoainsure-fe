import { classNames } from "primereact/utils";
import { Accordion } from "./theme/Accordion";
import { Button } from "./theme/Button";
import { Calendar } from "./theme/Calendar";
import { Checkbox } from "./theme/Checkbox";
import { Dropdown } from "./theme/Dropdown";
import { FieldSet } from "./theme/FieldSet";
import { OrganizationChart } from "./theme/OrganizationChart";
import { Password } from "./theme/Password";
import { Steps } from "./theme/Steps";
import { TabMenu } from "./theme/TabMenu";

const design = {
  message: {
    root: ({ props }) => ({
      className: classNames(
        "inline-flex items-center justify-center align-top",
        "p-3 m-0 rounded-md",
        {
          "bg-blue-100 border-0 text-blue-700": props.severity == "info",
          "bg-green-100 border-0 text-green-700": props.severity == "success",
          "bg-orange-100 border-0 text-orange-700": props.severity == "warn",
          "bg-red-100 border-0 text-red-700": props.severity == "error",
        },
      ),
    }),
    icon: "text-base mr-2",
  },
  inputtext: {
    root: ({ props, context }: any) => ({
      className: classNames(
        "m-0",
        "w-full text-gray-600  bg-white  border border-primary-border transition-colors duration-200 appearance-none rounded-lg h-[45px]",
        {
          "hover:border-primary-blue focus:outline-none focus:outline-offset-0 focus:ring-0 ring-primary-blue ":
            !context.disabled,
          "opacity-60 !bg-gray-100 select-none pointer-events-none cursor-default":
            context.disabled,
        },
        {
          "text-sm px-3 py-3": props.size == "large",
          "text-xs px-2 py-2": props.size == "small",
          "p-3 text-sm": props.size == null,
        },
      ),
    }),
  },
  button: Button,
  password: Password,
  sidebar: {
    mask: {
      className: classNames("!items-start !top-[85px] "),
    },
    root: () => ({
      className: classNames(
        "bg-secondary-blue text-white border-0 lg:w-[240px] ",
      ),
    }),
    content: { className: classNames() },
  },
  checkbox: Checkbox,
  progressbar: {
    root: {
      className: classNames(
        "overflow-hidden relative",
        "border-0 h-2 bg-gray-200 rounded-md",
      ),
    },
    value: ({ props }) => ({
      className: classNames("border-0 m-0 bg-blue-500", {
        "transition-width duration-1000 ease-in-out absolute items-center border-0 flex h-full justify-center overflow-hidden w-0":
          props.mode !== "indeterminate",
        "progressbar-value-animate before:absolute before:top-0 before:left-0 before:bottom-0 before:bg-inherit after:absolute after:top-0 after:left-0 after:bottom-0 after:bg-inherit after:delay-1000":
          props.mode == "indeterminate",
      }),
    }),
    label: {
      className: classNames("inline-flex", "text-white leading-6"),
    },
  },
  dialog: {
    root: ({ state }) => ({
      className: classNames(
        "rounded-lg shadow-lg border-0",
        "max-h-[90%] transform scale-100 relative",
        "m-0 ",
        {
          "transition-none transform-none !w-screen !h-screen !max-h-full !top-0 !left-0":
            state.maximized,
        },
      ),
    }),
    header: {
      className: classNames(
        "flex items-center justify-between shrink-0",
        "bg-white text-gray-800 border-t-0  rounded-tl-lg rounded-tr-lg pt-8 px-8 pb-4",
      ),
    },
    headerTitle: "text-2xl font-bold text-primary-text",
    headerIcons: "flex items-center",
    closeButton: {
      className: classNames(
        "flex items-center justify-center overflow-hidden relative",
        "w-10 h-10 text-gray-500 border-0 bg-transparent border:none transition duration-200 ease-in-out mr-2 last:mr-0",
        "hover:text-gray-700 hover:border-transparent hover:bg-gray-200",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]", // focus
      ),
    },
    closeButtonIcon: "w-4 h-4 inline-block",
    content: ({ state }) => ({
      className: classNames(
        "overflow-y-auto",
        "bg-white text-gray-700  pb-8 pt-0",

        {
          grow: state.maximized,
        },
      ),
    }),
    footer: {
      className: classNames(
        "shrink-0 ",
        "bg-white px-8 pb-8 text-right rounded-b-lg",
      ),
    },
    mask: ({ state }) => ({
      className: classNames("transition duration-200 ", {
        "bg-black/40": state.containerVisible,
      }),
    }),
    transition: ({ props }) => {
      return props.position === "top"
        ? {
            enterFromClass:
              "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0",
            enterActiveClass: "transition-all duration-200 ease-out",
            leaveActiveClass: "transition-all duration-200 ease-out",
            leaveToClass:
              "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0",
          }
        : props.position === "bottom"
          ? {
              enterFromClass: "opacity-0 scale-75 translate-y-full",
              enterActiveClass: "transition-all duration-200 ease-out",
              leaveActiveClass: "transition-all duration-200 ease-out",
              leaveToClass:
                "opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0",
            }
          : props.position === "left" ||
              props.position === "top-left" ||
              props.position === "bottom-left"
            ? {
                enterFromClass:
                  "opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0",
                enterActiveClass: "transition-all duration-200 ease-out",
                leaveActiveClass: "transition-all duration-200 ease-out",
                leaveToClass:
                  "opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0",
              }
            : props.position === "right" ||
                props.position === "top-right" ||
                props.position === "bottom-right"
              ? {
                  enterFromClass:
                    "opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0",
                  enterActiveClass: "transition-all duration-200 ease-out",
                  leaveActiveClass: "transition-all duration-200 ease-out",
                  leaveToClass:
                    "opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0",
                }
              : {
                  enterFromClass: "opacity-0 scale-75",
                  enterActiveClass: "transition-all duration-200 ease-out",
                  leaveActiveClass: "transition-all duration-200 ease-out",
                  leaveToClass: "opacity-0 scale-75",
                };
    },
  },
  dropdown: Dropdown,
  inputtextarea: {
    root: ({ context }) => ({
      className: classNames(
        "m-0",
        "font-sans text-sm text-gray-600  p-3 border border-primary-border  transition-colors duration-200 appearance-none rounded-lg",
        "hover:border-primary-blue focus:outline-none focus:outline-offset-0",
        {
          "opacity-60 select-none pointer-events-none cursor-default":
            context.disabled,
        },
      ),
    }),
  },
  inputswitch: {
    root: ({ props }) => ({
      className: classNames("inline-block relative", "w-12 h-7", {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      }),
    }),
    input: {
      className: classNames(
        "absolute appearance-none top-0 left-0 size-full p-0 m-0 opacity-0 z-10 outline-none cursor-pointer",
      ),
    },
    slider: ({ props }) => ({
      className: classNames(
        "absolute cursor-pointer top-0 left-0 right-0 bottom-0 border border-transparent",
        "transition-colors duration-200 rounded-2xl",
        "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]",
        "before:absolute before:content-'' before:top-1/2 before:bg-white  before:w-5 before:h-5 before:left-1 before:-mt-2.5 before:rounded-full before:transition-duration-200",
        {
          "bg-gray-200 hover:bg-gray-300": !props.checked,
          "bg-secondary-skyBlue before:transform before:translate-x-5":
            props.checked,
        },
      ),
    }),
  },

  inputnumber: {
    root: "w-full inline-flex",
    input: {
      root: ({ props }) => ({
        className: classNames({
          "rounded-tr-none rounded-br-none":
            props.showButtons && props.buttonLayout == "stacked",
        }),
      }),
    },
    buttongroup: ({ props }) => ({
      className: classNames({
        "flex flex-col": props.showButtons && props.buttonLayout == "stacked",
      }),
    }),
    incrementbutton: ({ props }) => ({
      className: classNames("flex !items-center !justify-center", {
        "rounded-br-none rounded-bl-none rounded-bl-none !p-0 flex-1 w-[3rem]":
          props.showButtons && props.buttonLayout == "stacked",
      }),
    }),
    decrementbutton: ({ props }) => ({
      className: classNames("flex !items-center !justify-center", {
        "rounded-tr-none rounded-tl-none rounded-tl-none !p-0 flex-1 w-[3rem]":
          props.showButtons && props.buttonLayout == "stacked",
      }),
    }),
  },
  confirmpopup: {
    root: {
      className: classNames(
        "bg-white text-gray-700 border-0 rounded-md shadow-lg",
        "z-40 transform origin-center",
        "mt-3 absolute left-0 top-0",
        "before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-6 before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-white dark:before:border-b-gray-900",
        "dark:border dark:border-blue-900/40 dark:bg-gray-900  dark:text-white/80",
      ),
    },
    content: "p-5 items-center flex",
    icon: "text-2xl",
    message: "ml-4",
    footer: " justify-end flex space-x-4 px-5 py-5 pt-0 ",
  },
  toast: {
    root: {
      className: classNames("w-96", "opacity-90"),
    },
    message: ({ state, index }) => ({
      className: classNames("my-4 rounded-md w-full", {
        "bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700":
          state.messages[index] &&
          state.messages[index].message.severity == "info",
        "bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700":
          state.messages[index] &&
          state.messages[index].message.severity == "success",
        "bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700":
          state.messages[index] &&
          state.messages[index].message.severity == "warn",
        "bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700":
          state.messages[index] &&
          state.messages[index].message.severity == "error",
      }),
    }),
    content: "flex items-center py-5 px-7",
    icon: {
      className: classNames("w-6 h-6", "text-lg mr-2"),
    },
    text: "text-base font-normal flex flex-col flex-1 grow shrink ml-4",
    summary: "font-bold block",
    detail: "mt-1 block",
    closebutton: {
      className: classNames(
        "w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out",
        "ml-auto overflow-hidden relative",
        "flex items-center justify-center",
        "hover:bg-white/30",
      ),
    },
    transition: {
      enterFromClass: "opacity-0 translate-x-0 translate-y-2/4 translate-z-0",
      enterActiveClass: "transition-transform transition-opacity duration-300",
      leaveFromClass: "max-h-40",
      leaveActiveClass: "transition-all duration-500 ease-in",
      leaveToClass: "max-h-0 opacity-0 mb-0 overflow-hidden",
    },
  },
  fileupload: {
    input: "hidden",
    buttonbar: {
      className: classNames(
        "flex flex-wrap",
        "bg-gray-50  p-5 border border-solid border-gray-300  text-gray-700  rounded-tr-lg rounded-tl-lg gap-2 border-b-0",
      ),
    },
    basicButton: {
      className: classNames(
        "text-white bg-blue-500 border border-blue-500 p-3 px-5 rounded-md text-base",
        "overflow-hidden relative",
      ),
    },
    chooseButton: {
      className: classNames(
        "text-white bg-blue-500 border border-blue-500 p-3 px-5 rounded-md text-base",
        "overflow-hidden relative",
      ),
    },
    chooseIcon: "mr-2 inline-block",
    chooseButtonLabel: "flex-1 font-bold",
    uploadButton: {
      icon: "mr-2",
    },
    cancelButton: {
      icon: "mr-2",
    },
    content: {
      className: classNames(
        "relative",
        "bg-white  p-8 border border-gray-300  text-gray-700  rounded-b-lg",
      ),
    },
    file: {
      className: classNames(
        "flex items-center flex-wrap",
        "p-4 border border-gray-300 rounded gap-2 mb-2",
      ),
    },
    thumbnail: "shrink-0",
    fileName: "mb-2",
    fileSize: "mr-2",
    uploadIcon: "mr-2",
  },
  radioButton: {
    root: {
      className: classNames(
        "relative inline-flex cursor-pointer select-none align-bottom",
        "w-6 h-6",
      ),
    },
    input: ({ props }) => ({
      className: classNames(
        "flex justify-center items-center",
        "border-4 w-10 h-10 text-gray-700 rounded-full transition duration-200 ease-in-out bg-[#FF0000]",
        {
          "border-gray-300 bg-white": !props.checked,
          "border-primary-red bg-primary-red": props.checked,
        },
        {
          "!hover:border-primary-red  focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]":
            !props.disabled,
          "cursor-default opacity-60": props.disabled,
        },
      ),
    }),
    icon: ({ props }) => ({
      className: classNames(
        "transform rounded-full",
        "block w-3 h-3 transition duration-200 bg-[#FF0000]",
        {
          "backface-hidden scale-10 invisible": !props.checked,
          "transform scale-100 visible": props.checked,
        },
      ),
    }),
  },
  calendar: Calendar,
  tabMenu: TabMenu,
  steps: Steps,
  fieldset: FieldSet,
  organizationChart: OrganizationChart,
  accordion: Accordion,
};

export { design };
