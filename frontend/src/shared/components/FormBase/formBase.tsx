import React, { CSSProperties } from "react";
import { Formik, Form, FormikHelpers, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";

import _ from "lodash";
import { AlertType, useAlert, useFormikSubmit } from "../../hooks";
import { OverLayLoading } from "../OverLayLoading";

export type FormBaseFields = any;

export type FormFieldRenderFunction = (
  formikState: FormikProps<FormikValues>,
  helpers?: FormikHelpers<FormikValues>,
) => JSX.Element;

export interface FormBaseComponent {
  onSubmit: (data: FormBaseFields) => Promise<void>;
  validationSchema: Yup.ObjectSchema<FormBaseFields>;
  initialFieldValues: FormBaseFields;
  createFormJsxFieldCb: FormFieldRenderFunction;
  style?: CSSProperties;
}

export const FormBase: React.FC<FormBaseComponent> = ({
  onSubmit,
  validationSchema,
  initialFieldValues,
  createFormJsxFieldCb,
  style = {},
}) => {
  const { showAlert } = useAlert();

  const { handleSubmit, isLoading } = useFormikSubmit<FormBaseFields>({
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <>
      <OverLayLoading open={isLoading} />
      <Formik
        initialValues={initialFieldValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikState) => {
          const jsx = createFormJsxFieldCb(formikState);
          if (formikState.isSubmitting) {
            if (!formikState.isValid && formikState.isValidating) {
              Object.entries(formikState.errors).forEach(([k, v]: [string, unknown]) => {
                if (!_.isNil(v) && _.isString(v) && !_.isEmpty(v)) {
                  showAlert(v, { type: AlertType.Error });
                }
              });
            }
          }
          return <Form style={style}>{jsx}</Form>;
        }}
      </Formik>
    </>
  );
};

export default FormBase;
