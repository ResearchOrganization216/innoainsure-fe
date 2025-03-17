import { FC } from "react";

interface FormLabelProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
}

export const FormLabel: FC<FormLabelProps> = ({
  label,
  required = false,
  htmlFor,
}) => {
  return (
    <label className="block py-1 text-sm font-normal" htmlFor={htmlFor}>
      {label}
      {required && <span className="text-primary-red">*</span>}
    </label>
  );
};
