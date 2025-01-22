import { FC, ReactNode } from "react";
import "./FormField.css";

interface IFormFieldProps {
  children: ReactNode;
  errorMessage?: string;
}

export const FormField: FC<IFormFieldProps> = ({
  children,
  errorMessage,
}) => {
  let labelClass = errorMessage ? "form-field form-field-invalid" : "form-field";

  return (<>
    <label className={labelClass}>
      {errorMessage && (
        <span className="form-field__error-text">{errorMessage}</span>
      )}
      <div className="form-field-wrapper">
        {children}
      </div>
    </label>
  </>);
};
