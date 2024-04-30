// import React, { ReactNode } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";

// import _ from "lodash";
// import { AlertType, useAlert, useFormikSubmit } from "../../hooks";
// import { OverLayLoading } from "../OverLayLoading";

// export interface FormBaseFields { }

// export interface FormBaseComponent {
//     onSubmit: (data: FormBaseFields) => Promise<void>;
//     validationSchema: Yup.ObjectSchema<FormBaseFields>;
//     initialFieldValues: FormBaseFields;
//     children: ReactNode[];
// }

// export const FormBase:  = ({
//     onSubmit,
//     validationSchema,
//     initialFieldValues,
//     children,
// }) => {
//     const { showAlert } = useAlert();

//     const { handleSubmit, isLoading } = useFormikSubmit<FormBaseFields>({
//         onSubmit: onSubmit,
//         validationSchema: validationSchema,
//     });

//     return (
//         <>
//             <OverLayLoading open={isLoading} />
//             <Formik
//                 initialValues={initialFieldValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//             >
//                 {({ isSubmitting, errors, isValid, isValidating }) => {
//                     if (isSubmitting) {
//                         if (!isValid && isValidating) {
//                             Object.entries(errors).forEach(([k, v]: [string, unknown]) => {
//                                 if (!_.isNil(v) && _.isString(v) && !_.isEmpty(v)) {
//                                     showAlert(v, { type: AlertType.Error });
//                                 }
//                             });
//                         }
//                     }
//                     return <Form>{...children}</Form>;
//                 }}
//             </Formik>
//         </>
//     );
// };

// export default FormBase;
